import Masonry from "@mui/lab/Masonry";

export default function ImageMasonry(images) {
  return (
    <Masonry columns={3} spacing={2} sx={{ m: "auto" }}>
      {itemData.map((item, index) => (
        <div key={index}>
          <img
            srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
            src={`${item.img}?w=162&auto=format`}
            alt="Imágen del Dj"
            loading="lazy"
            style={{
              borderRadius: 4,
              display: "block",
              width: "100%",
            }}
          />
        </div>
      ))}
    </Masonry>
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
