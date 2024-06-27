import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { Box } from "@mui/material";

const ShareRs = ({ dj }) => {
  const ShareUrl = "https://sound-rentals.vercel.app/dj-detail/" + `${dj.id}`;
  const titulo =
    "Perfil de " + `${dj.name}` + " " + `${dj.lastname}` + " en Sound Rentals";
  return (
    <Box display="flex" pt={3} justifyContent="center" >
      <Box>
        <FacebookShareButton
          url={ShareUrl}
          hashtag={"Dj" + `${dj.name}` + `${dj.lastname}`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
      </Box>
      <Box mx={2}>
        <TwitterShareButton url={ShareUrl} title={titulo}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
      </Box>
      <Box>
        <WhatsappShareButton url={ShareUrl} title={titulo}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
      </Box>
    </Box>
  );
};
export default ShareRs;
