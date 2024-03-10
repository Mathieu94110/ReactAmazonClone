import { useState } from "react";
import {
  Modal,
  Button,
  Divider,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { UserAdType } from "@/types/types";
import UserAdNestedModal from "./Components/UserAdNestedModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#131a22",
  color: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
};

const UserAdModal = ({
  ad,
  isOpen,
  handleOpen,
  handleClose,
}: {
  ad: UserAdType;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}) => {
  const [openNestedModal, setOpenNestedModal] = useState(false);
  const handleOpenNestedModal = (): void => {
    setOpenNestedModal(true);
  };
  const handleCloseNestedModal = (): void => {
    setOpenNestedModal(false);
  };

  return (
    <div className="modal">
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Card sx={{ ...style, width: { xs: 260, sm: 460 } }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={ad.image}
              src={ad.title}
              alt="green iguana"
            />
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: "#f0c040" }}
                >
                  {ad.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {ad.price} €
                </Typography>
              </Stack>
              <Divider />
              <Typography gutterBottom variant="h6" component="div">
                {ad.category}
              </Typography>
              <Divider />
              <Typography gutterBottom variant="h6" component="div">
                {ad.description}
              </Typography>
              <Divider />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              variant="contained"
              size="medium"
              onClick={handleOpenNestedModal}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="error"
              onClick={handleClose}
            >
              <CloseIcon />
            </Button>
          </CardActions>
        </Card>
      </Modal>

      <UserAdNestedModal
        ad={ad}
        openNestedModal={openNestedModal}
        handleCloseNestedModal={handleCloseNestedModal}
      />
    </div>
  );
};

export default UserAdModal;
