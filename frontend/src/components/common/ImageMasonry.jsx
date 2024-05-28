// import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

export default function ImageMasonry() {
  return (
    // <Box sx={{ width: 500, minHeight: 829 }}>
    <Masonry columns={3} spacing={2} sx={{ m: "auto" }}>
      {itemData.map((item, index) => (
        <div key={index}>
          <Label>{index + 1}</Label>
          <img
            srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
            src={`${item.img}?w=162&auto=format`}
            alt={item.title}
            loading="lazy"
            style={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              display: "block",
              width: "100%",
            }}
          />
        </div>
      ))}
    </Masonry>
    // </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    title: "Snacks",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    title: "Tower",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
];
