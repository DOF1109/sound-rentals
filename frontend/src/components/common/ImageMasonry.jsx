import Masonry from "@mui/lab/Masonry";

export default function ImageMasonry({ images }) {
  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2} sx={{ m: "auto" }}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            srcSet={`${image}?w=162&auto=format&dpr=2 2x`}
            src={`${image}?w=162&auto=format`}
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
