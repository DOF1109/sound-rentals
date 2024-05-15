import { Box, Typography } from "@mui/material";

const Card = ({ image, name, genre }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{ width: "100%", height: "auto" }}
      />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {genre}
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
