import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function UserAd({ ad }) {
  return (
    <Card sx={{ width: 260 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={ad.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {ad.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {ad.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ad.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Modifier
        </Button>
        <Button size="small" color="primary">
          Supprimer
        </Button>
      </CardActions>
    </Card>
  );
}
