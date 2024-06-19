import React from "react";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { NoMealsOutlined, Star, StarBorder } from "@mui/icons-material";

const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <IconButton onClick={onClick} sx={{ color: isFavorite ? "yellow" : "inherit", zIndex: 10 }}>
      {isFavorite ? <StarIcon /> : <StarOutlineIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
