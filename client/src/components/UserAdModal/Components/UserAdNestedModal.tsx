import { useState, useContext, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import {
  Card,
  CardActions,
  TextField,
  Select,
  MenuItem,
  Box,
  InputAdornment,
  FormLabel,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { updateAd } from "@/apis/user-ads";
import { UserAdType } from "@/types/types";
import { AuthContext } from "@/components/Providers/AuthProvider";
import { useFormik } from "formik";

// styles
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontFamily: "Arial",
    fontWeight: "bold",
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #f0c040",
      },
    },
    "& .MuiInputLabel-outlined-notchedOutline ": {
      color: "#f0c040",
    },
  },
  "& .MuiInputLabel-outlined ": {
    color: "#2196f3",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "#f0c040",
      fontWeight: "bold",
    },
  },

  "& fieldset": {
    borderColor: "#2196f3",
  },
});

const containerStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#131a22",
  color: "#fff",
  boxShadow: 24,
};

const textFieldStyle = {
  display: "flex",
  fontSize: "14px",
};
const caterogryMenuItemStyle = {
  fontWeight: "bold",
  color: "#131a22",
  fontSize: "14px",
};
//

const UserAdNestedModal = ({
  ad,
  openNestedModal,
  handleCloseNestedModal,
  adUpdated,
}: {
  ad: UserAdType;
  openNestedModal: boolean;
  handleCloseNestedModal: () => void;
  adUpdated: () => void;
}) => {
  const { user } = useContext(AuthContext);
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [errors, setError] = useState<boolean>(false);

  //inputs controllers
  const newAdSchema = yup.object({
    title: yup
      .string()
      .required("Le titre doit être renseigné")
      .min(10, "Le titre doit être explicite")
      .max(30, "Le titre doit être succinct"),
    category: yup.string().required("Il faut renseigner la catégorie"),
    price: yup.number().required("Il faut renseigner le prix").min(1),
    description: yup
      .string()
      .required("La description doit être renseigné")
      .min(10, "La descrition doit être explicite")
      .max(80, "La descrition doit être succincte"),
    image: yup
      .string()
      .required("Il faut renseigner une image")
      .url("L'image doit être un lien valide"),
  });
  //
  // form
  const formik = useFormik({
    initialValues: {
      image: ad.image,
      title: ad.title,
      category: ad.category,
      price: ad.price,
      description: ad.description,
      generic: null,
      adId: ad._id,
    },
    validationSchema: newAdSchema,

    onSubmit: async (values) => {
      setIsSubmiting(true);
      try {
        const response = await updateAd({
          ...values,
          author: user._id,
        });
        if (response.ok) {
          setSuccessUpdate(true);
          adUpdated();
        }
      } catch (e) {
        setError(true);
      } finally {
        setIsSubmiting(false);
      }
    },
  });
  //
  useEffect(() => {
    if (successUpdate) {
      setSuccessUpdate(false);
    }
  }, [errors, successUpdate]);

  return (
    <Modal
      open={openNestedModal}
      onClose={handleCloseNestedModal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            ...containerStyle,
            width: { xs: 260, sm: 460 },
          }}
        >
          <Box
            component="section"
            sx={{
              marginBottom: "20px",
              borderBottom: "1px solid #f0c040",
            }}
          >
            <FormLabel
              className="center-content primary"
              sx={{
                color: "#f0c040",
                height: "100%",
                marginY: "20px",
              }}
            >
              Modifier l'annonce
            </FormLabel>
          </Box>
          <Box
            component="section"
            sx={{
              padding: "0 10px",
              flexGrow: 1,
            }}
          >
            <Grid
              container
              sx={{
                gap: "20px 0",
                placeContent: "center space-between",
              }}
            >
              <Grid xs={12} md={5} lg={5} xl={5}>
                <CssTextField
                  id="outlined-basic"
                  label="Titre"
                  variant="outlined"
                  value={formik.values.title}
                  name="title"
                  onChange={formik.handleChange}
                  sx={{
                    ...textFieldStyle,
                  }}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid xs={12} md={5} lg={5} xl={5}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  name="category"
                  onChange={formik.handleChange}
                  sx={{
                    display: "flex",
                    border: "1px solid #2196f3",
                    color: "#fff",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #f0c040",
                    },
                  }}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                >
                  {" "}
                  <MenuItem
                    value={"mobile phones"}
                    sx={{
                      ...caterogryMenuItemStyle,
                    }}
                  >
                    Téléphones mobiles
                  </MenuItem>
                  <MenuItem
                    value={"laptop"}
                    sx={{
                      ...caterogryMenuItemStyle,
                    }}
                  >
                    Ordinateurs portables
                  </MenuItem>
                  <MenuItem
                    value={"televisions"}
                    sx={{
                      ...caterogryMenuItemStyle,
                    }}
                  >
                    Télévisions
                  </MenuItem>
                  <MenuItem
                    value={"computer accessories"}
                    sx={{
                      ...caterogryMenuItemStyle,
                    }}
                  >
                    Accessoires d'ordinateurs
                  </MenuItem>
                  <MenuItem
                    value={"headphones"}
                    sx={{
                      ...caterogryMenuItemStyle,
                    }}
                  >
                    Écouteurs
                  </MenuItem>
                  <MenuItem
                    value={"others"}
                    sx={{
                      ...caterogryMenuItemStyle,
                    }}
                  >
                    Autres
                  </MenuItem>
                </Select>
              </Grid>
              <Grid xs={12} md={5} lg={5} xl={5}>
                <CssTextField
                  id="outlined-basic"
                  label="Prix"
                  variant="outlined"
                  type="number"
                  value={formik.values.price}
                  name="price"
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" m="{1}" sx={{ color: "#fff" }}>
                          €
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    ...textFieldStyle,
                  }}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid xs={12} md={5} lg={5} xl={5}>
                <CssTextField
                  id="outlined-basic"
                  label="Url de l'image"
                  variant="outlined"
                  value={formik.values.image}
                  name="image"
                  onChange={formik.handleChange}
                  sx={{
                    ...textFieldStyle,
                  }}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                />
              </Grid>
              <Grid xs={12}>
                <CssTextField
                  id="outlined-multiline-flexible"
                  value={formik.values.description}
                  label="Description de l'annonce"
                  multiline
                  maxRows={2}
                  name="description"
                  onChange={formik.handleChange}
                  sx={{
                    ...textFieldStyle,
                  }}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
            </Grid>

            <CardActions
              sx={{
                margin: "20px 0",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={isSubmiting}
              >
                Valider
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="error"
                onClick={handleCloseNestedModal}
              >
                <CloseIcon />
              </Button>
            </CardActions>
          </Box>
        </Card>
      </form>
    </Modal>
  );
};

export default UserAdNestedModal;
