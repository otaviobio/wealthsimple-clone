import Lottie from "lottie-react";
import './PromoContentCard.scss';

export function PromoContentCard(props) {
  const {
    animationName,
    cardTitle,
    cardText,
    backgroundImage,
  } = props;

  return(
    <div
      className={backgroundImage ?
        "promoContentCardContainer" :
        "promoContentCardContainer no-background"
      }
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <h2>{cardTitle}</h2>
      <p>{cardText}</p>
      <Lottie animationData={animationName} />
    </div>
  )
}