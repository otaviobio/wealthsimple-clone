import Lottie from "lottie-react";
import { Button } from "../../atoms/Button/Button";
import './Card.scss';
import { IonIcon } from '@ionic/react';
import { arrowForwardOutline, checkmarkDoneOutline } from 'ionicons/icons';

export function Card(props) {
  const {
    animationName,
    cardSpanText,
    cardText,
    cardSubText,
    cardList,
    btnText,
    cardBorder,
    cardBackgroundColor,
    cardBackgroundImage,
    cardPadding,
  } = props;

  return(
    <article
      className={cardBackgroundImage ? "cardContainer cardWithMinHeight" : "cardContainer"}
      style={{
        border: cardBorder,
        backgroundColor: cardBackgroundColor,
        backgroundImage: `url(${cardBackgroundImage})`,
        padding: cardPadding
      }}
    >
      <section className="card-main-container">
        <div className="card-text-container">
          {cardSpanText &&
            <span className="card-span-text">{cardSpanText}</span>
          }
          <h3>{cardText}</h3>
          {cardSubText &&
            <p>{cardSubText}</p>
          }
          {cardList &&
            <ul>
              {cardList.map((feature, idx) => {
                return(
                  <div key={idx}>
                    <IonIcon className='icon' icon={checkmarkDoneOutline} alt="Double checkmark icon" />
                    <p>{feature}</p>
                  </div>
                );
              })}
            </ul>
          }
        </div>

        {/* figure elements have defined margins in some browsers. Reset them in css if needed */}
        <figure className="card-image-container">
          <Lottie animationData={animationName} />
        </figure>
      </section>

      {btnText &&
        <Button
          className="btn-container"
          btnText={btnText}
          hasIcon
          iconName={arrowForwardOutline}
        />
      }
    </article>
  )
}
