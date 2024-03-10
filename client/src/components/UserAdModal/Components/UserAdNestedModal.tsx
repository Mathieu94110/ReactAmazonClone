import { useState, ChangeEvent } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import {
  Card,
  CardActions,
  TextField,
  SelectChangeEvent,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { UserAdInput, UserAdType } from "@/types/types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  color: "#131a22",
  border: "2px solid #000",
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
  return (
    <Modal
      open={openNestedModal}
      onClose={handleCloseNestedModal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Card sx={{ ...style, width: { xs: 260, sm: 460 } }}>
        <Box component="section" sx={{ padding: "40px 10px" }}>
          <Box sx={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Titre"
              variant="outlined"
              value={adData.title}
              name="title"
              onChange={handleChange}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ad.category}
              label="Catégorie"
              name="category"
              onChange={handleChange}
            >
              <MenuItem value={"mobile phones"}>Téléphones mobiles</MenuItem>
              <MenuItem value={"laptop"}>Ordinateurs portables</MenuItem>
              <MenuItem value={"televisions"}>Télévisions</MenuItem>
              <MenuItem value={"computer accessories"}>
                Accessoires d'ordinateurs
              </MenuItem>
              <MenuItem value={"headphones"}>Écouteurs</MenuItem>
              <MenuItem value={"others"}>Autres</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField
              id="outlined-basic"
              label="Prix"
              variant="outlined"
              type="number"
              value={adData.price}
              name="price"
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Url de l'image"
              variant="outlined"
              value={adData.image}
              name="image"
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField
              id="outlined-multiline-flexible"
              value={adData.description}
              label="Description de l'annonce"
              multiline
              maxRows={3}
              name="description"
              onChange={handleChange}
            />
          </Box>
          <CardActions>
            <Button variant="contained" endIcon={<SendIcon />}>
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
    </Modal>
  );
};

export default UserAdNestedModal;
