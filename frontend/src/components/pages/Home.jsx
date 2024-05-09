import { Box } from "@mui/material";
import SearchInput from "../common/SearchInput";
import EmblaCarousel from "../common/EmblaCarousel/EmblaCarousel";
import "../../styles/embla.css";

const OPTIONS = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Home = () => {
  return (
    <Box>
      <SearchInput />
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      Home
    </Box>
  );
};

export default Home;
