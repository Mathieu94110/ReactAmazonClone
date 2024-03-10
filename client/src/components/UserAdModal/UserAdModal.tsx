import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

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

const userAdModal = ({ ad, handleOpen, handleClose }) => {
  return (
    <div className="modal">
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={handleOpen}
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
            <Button variant="contained" size="medium">
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
    </div>
  );
};

export default userAdModal;
