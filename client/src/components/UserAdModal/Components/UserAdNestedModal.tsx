import { useState, ChangeEvent, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  CardActions,
  TextField,
  SelectChangeEvent,
  Select,
  MenuItem,
  Box,
  Typography,
  InputAdornment,
  FormControl,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { updateAd } from "@/apis/user-ads";
import { UserAdInput, UserAdType } from "@/types/types";
import { AuthContext } from "@/components/Providers/AuthProvider";
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontFamily: "Arial",
    fontWeight: "bold",
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #131a22",
      },
    },
    "& .MuiInputLabel-outlined-notchedOutline ": {
      color: "#131a22",
    },
  },
  "& .MuiInputLabel-outlined ": {
    color: "#131a22",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "#131a22",
      fontWeight: "bold",
    },
  },
});

const containerStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  color: "#131a22",
  border: "1px solid #f0c040",
  boxShadow: 24,
};

const UserAdNestedModal = ({
  ad,
  openNestedModal,
  handleCloseNestedModal,
}: {
  ad: UserAdType;
  openNestedModal: boolean;
  handleCloseNestedModal: () => void;
}) => {
  const { user } = useContext(AuthContext);
  const [successUpdate, setSuccessUpdate] = useState<boolean>(false);

  const initialAdvalues: UserAdInput = {
    image: ad.image,
    title: ad.title,
    category: ad.category,
    price: ad.price,
    description: ad.description,
    generic: null,
  };
  const [adData, setAdData] = useState<UserAdInput>(initialAdvalues);
  const handleChange = (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAdData({ ...adData, [e.target.name]: e.target.value });
  };

  const defaultValues = {
    title: "",
    category: "",
    description: "",
    image: "",
    price: null,
    generic: null,
  };

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

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<UserAdInput>({
    defaultValues,
    resolver: yupResolver(newAdSchema) as any,
  });

  useEffect(() => {
    if (errors)
      setTimeout(() => {
        clearErrors();
      }, 3000);
    if (successUpdate) {
      setSuccessUpdate(false);
    }
  }, [errors, clearErrors, successUpdate]);

  async function submit(): Promise<void> {
    try {
      console.log(adData);
      //   clearErrors();
      //   const response = await updateAd({
      //     ...adData,
      //     author: user._id,
      //   });
      //   if (response.ok) {
      //     setSuccessUpdate(true);
      //   }
    } catch (e) {
      setError("generic", { type: "generic", message: "Il y a eu une erreur" });
    }
  }

  return (
    <Modal
      open={openNestedModal}
      onClose={handleCloseNestedModal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <form onSubmit={handleSubmit(submit)}>
        <Card
          sx={{
            ...containerStyle,
            width: { xs: 260, sm: 460 },
          }}
        >
          <Box>
            <Box
              component="section"
              sx={{
                backgroundColor: "#131a22",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginBottom: "20px",
                borderBottom: "1px solid #f0c040",
              }}
            >
              <FormLabel
                className="center-content primary"
                sx={{
                  color: "#f0c040",
                  margin: "0",
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
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CssTextField
                  id="outlined-basic"
                  label="Titre"
                  variant="outlined"
                  value={adData.title}
                  name="title"
                  onChange={handleChange}
                  sx={{
                    width: "45%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    fontSize: "14px",
                  }}
                />
                {errors.title && (
                  <p className="form-error">{errors.title.message}</p>
                )}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={adData.category}
                  name="category"
                  onChange={handleChange}
                  sx={{
                    width: "45%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#131a22",
                    },
                  }}
                >
                  <MenuItem
                    value={"mobile phones"}
                    sx={{
                      fontWeight: "bold",
                      color: "#131a22",
                      fontSize: "14px",
                    }}
                  >
                    Téléphones mobiles
                  </MenuItem>
                  <MenuItem
                    value={"laptop"}
                    sx={{
                      fontWeight: "bold",
                      color: "#131a22",
                      fontSize: "14px",
                    }}
                  >
                    Ordinateurs portables
                  </MenuItem>
                  <MenuItem
                    value={"televisions"}
                    sx={{
                      fontWeight: "bold",
                      color: "#131a22",
                      fontSize: "14px",
                    }}
                  >
                    Télévisions
                  </MenuItem>
                  <MenuItem
                    value={"computer accessories"}
                    sx={{
                      fontWeight: "bold",
                      color: "#131a22",
                      fontSize: "14px",
                    }}
                  >
                    Accessoires d'ordinateurs
                  </MenuItem>
                  <MenuItem
                    value={"headphones"}
                    sx={{
                      fontWeight: "bold",
                      color: "#131a22",
                      fontSize: "14px",
                    }}
                  >
                    Écouteurs
                  </MenuItem>
                  <MenuItem
                    value={"others"}
                    sx={{
                      fontWeight: "bold",
                      color: "#131a22",
                      fontSize: "14px",
                    }}
                  >
                    Autres
                  </MenuItem>
                </Select>
                {errors.category && (
                  <p className="form-error">{errors.category.message}</p>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CssTextField
                  id="outlined-basic"
                  label="Prix"
                  variant="outlined"
                  type="number"
                  value={adData.price}
                  name="price"
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">€</InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "45%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    fontSize: "14px",
                  }}
                />
                {errors.price && (
                  <p className="form-error">{errors.price.message}</p>
                )}
                <CssTextField
                  id="outlined-basic"
                  label="Url de l'image"
                  variant="outlined"
                  value={adData.image}
                  name="image"
                  onChange={handleChange}
                  sx={{
                    width: "45%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    fontSize: "14px",
                  }}
                />
                {errors.image && (
                  <p className="form-error">{errors.image.message}</p>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CssTextField
                  id="outlined-multiline-flexible"
                  value={adData.description}
                  label="Description de l'annonce"
                  multiline
                  maxRows={3}
                  name="description"
                  onChange={handleChange}
                  sx={{
                    width: "45%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                    fontSize: "14px",
                  }}
                />
                {errors.description && (
                  <p className="form-error">{errors.description.message}</p>
                )}
              </Box>
            </Box>
            <CardActions
              sx={{
                marginBottom: "20px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                disabled={isSubmitting}
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
