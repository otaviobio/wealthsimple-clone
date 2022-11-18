import Lottie from "lottie-react";
import { Button } from "../../atoms/Button/Button";
import './MainContentCard.scss';
import { arrowForwardOutline } from 'ionicons/icons';

export function MainContentCard(props) {
  const {
    animationName,
    cardText,
    cardSubText,
    btnText,
  } = props;
  return(
    <div className="mainContentCardContainer">
      <Lottie animationData={animationName} />
      <h3>{cardText}</h3>
      {cardSubText && <p>{cardSubText}</p>}
      {btnText &&
        <Button
          className="btn-container"
          btnText={btnText}
          hasIcon
          iconName={arrowForwardOutline}
        />
      }
    </div>
  )
}