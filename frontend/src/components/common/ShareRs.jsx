import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappShareButton,
    WhatsappIcon
  } from "react-share"; 

const ShareRs = ({ dj }) => {
    const ShareUrl = "https://sound-rentals.vercel.app/dj-detail/" + `${dj.id}`;
    const titulo = "Perfil de " + `${dj.name}` + " " + `${dj.lastname}` + " en Sound Rentals";
return (
  <>
    <div>
    <FacebookShareButton url={ShareUrl} hashtag={"Dj" + `${dj.name}` + `${dj.lastname}`}>
    <FacebookIcon size={40} round={true}/>
    </FacebookShareButton>

    <TwitterShareButton url={ShareUrl} title={titulo}>
    <TwitterIcon size={40} round={true}/>
    </TwitterShareButton>

    <FacebookMessengerShareButton url={ShareUrl}>
    <FacebookMessengerIcon size={40} round={true}/>
    </FacebookMessengerShareButton>

    <WhatsappShareButton url={ShareUrl} title={titulo}>
    <WhatsappIcon size={40} round={true}/>
    </WhatsappShareButton>
  </div>
  </>
)

}
export default ShareRs;