import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserAd({ ad }) {
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
          <EditIcon
            sx={{
              color: "#f0c040",
              "&:hover": { transform: "translateY(-4px);" },
            }}
          />
        </Button>
        <Button>
          <DeleteIcon
            sx={{
              color: "#e74c3c",
              "&:hover": { transform: "translateY(-4px);" },
            }}
          />
        </Button>
      </CardActions>
    </Card>
  );
}
