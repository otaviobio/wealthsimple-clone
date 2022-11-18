import './PriceCard.scss';
import { IonIcon } from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';

export function PriceCard(props) {
  const {
    price,
    planTitle,
    planDescription,
    planFeatures,
    cardBorder
  } = props;

  return(
    <div
      className={cardBorder ?
        "priceCardContainer withBorder" :
        "priceCardContainer"
      }
      style={{border: cardBorder}}
    >
      <span>{price}</span>
      <h2>{planTitle}</h2>
      <p>{planDescription}</p>
      <ul>
        {planFeatures.map((feature, idx) => {
          return(
            <div>
              <IonIcon className='icon' icon={checkmarkDoneOutline} alt="Close menu icon" />
              <p>{feature}</p>
            </div>
          );
        })}
      </ul>
      
    </div>
  )
}