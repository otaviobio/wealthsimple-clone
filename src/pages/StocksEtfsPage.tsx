import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { NavMenu } from '../components/molecules/NavMenu/NavMenu';
import { PromoContentCard } from '../components/molecules/PromoContentCard/PromoContentCard';
import './StocksEtfsPage.scss';
import { promoCardsContent } from '../assets/data/promo-card-data';
import { PriceCard } from '../components/molecules/PriceCard/PriceCard';
import { priceCardsContent } from '../assets/data/price-card-data';

const StocksEtfsPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <NavMenu />
        {promoCardsContent.map((content, idx) => {
          return(
            <PromoContentCard
              key={idx}
              backgroundImage={content.backgroundImage}
              cardTitle={content.cardTitle}
              cardText={content.cardText}
              animationName={content.animation}
            />
          );
        })}
        {priceCardsContent.map((content, idx) => {
          return(
            <PriceCard
              key={idx}
              price={content.price}
              planTitle={content.planTitle}
              planDescription={content.planDescription}
              planFeatures={content.planFeatures}
              cardBorder={content.cardBorder}
            />
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default StocksEtfsPage;
