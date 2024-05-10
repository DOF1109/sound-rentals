import { Box } from "@mui/material";
import SearchInput from "../common/SearchInput";
import EmblaCarousel from "../common/EmblaCarousel/EmblaCarousel";
import "../../styles/embla.css";
import Img1 from "../../assets/images/image-1-sr.webp";
import Img2 from "../../assets/images/image-2.webp";
import Img3 from "../../assets/images/image-3.webp";

const OPTIONS = { loop: true };

const images = [Img1, Img2, Img3];

const Home = () => {
  return (
    <Box>
      <SearchInput />
      <EmblaCarousel slides={images} options={OPTIONS} />
      Home
    </Box>
  );
};

export default Home;
