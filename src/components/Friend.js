import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

import "../css/friend.css";

const Friend = (props) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Box sx={{ borderRadius: "50%" }}>
          <CardMedia
            className="card_media"
            component="img"
            height="80"
            image="https://images.unsplash.com/photo-1571391733814-15ac29ac3544?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80"
            alt="green iguana"
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.city}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Friend;
