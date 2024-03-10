import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardMedia,
  CardContent,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserAdType } from "@/types/types";

export default function UserAd({
  ad,
  deleteAd,
  seeAdDetails,
}: {
  ad: UserAdType;
  deleteAd: (v: string) => void;
  seeAdDetails: (v: string) => void;
}) {
  console.log(ad);
  return (
    <Card
      sx={{
        color: "white",
        backgroundColor: "#131a22",
        width: "260px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={ad.image}
          alt={ad.title}
          sx={{
            "&:hover": {
              scale: "1.1",
            },
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: 18,
            }}
          >
            {ad.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: 16,
            }}
          >
            {ad.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>
          <ZoomInIcon
            onClick={() => seeAdDetails(ad._id)}
            sx={{
              color: "#f0c040",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          />
        </Button>
        <Button>
          <DeleteIcon
            sx={{
              color: "#e74c3c",
              "&:hover": { transform: "translateY(-4px)" },
            }}
            onClick={() => deleteAd(ad._id)}
          />
        </Button>
      </CardActions>
    </Card>
  );
}
