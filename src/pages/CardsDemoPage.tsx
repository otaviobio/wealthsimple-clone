import { IonContent, IonPage, } from '@ionic/react';
import { NavMenu } from '../components/molecules/NavMenu/NavMenu';
import './CardsDemoPage.scss';
import { Card } from '../components/molecules/Card/Card';
import cryptoCity from '../assets/lottie/crypto-city.json';
import bitcoinPiggyBank from '../assets/lottie/bitcoin-piggy-bank.json';
import coins from "../assets/images/stocksandeftscoins.png";

const CardsDemoPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>

        <NavMenu />
        <div className="all-cards-container">
          <Card
            cardText="Trade thousands of stocks and ETFs, comission-free."
            animationName={cryptoCity}
            btnText="Explore Stocks and ETFs"
            cardPadding={0}
          />

          <Card
            cardText="Get Rewarded for saving too"
            cardSubText="Earn 1.5$ interest with our no-fee Save account."
            animationName={bitcoinPiggyBank}
            cardPadding={0}
          />

          <Card
            cardText="Start trading instantly"
            cardSubText="Sign up and start trading with anywhere from $1 to $5,000. With no account minimums, you can get started at your own pace."
            cardBackgroundColor="#ecf3d5"
            cardBackgroundImage={coins}
          />

          <Card
            cardSpanText="$0/month"
            cardText="Basic"
            cardSubText="Everything you need to start trading."
            cardList={[
              "Instantly trade up to $1,500",
              "No commissions",
              "No fees on Canadian trades",
              "No account minimums",
              "Fractional shares",
              "Unlimited price alerts"
            ]}
            cardBorder="2px solid #bdcf73"
          />
        </div>



      </IonContent>
    </IonPage>
  );
};

export default CardsDemoPage;


// {promoCardsContent.map((content, idx) => {
//   return(
//     <PromoContentCard
//       key={idx}
//       backgroundImage={content.backgroundImage}
//       cardTitle={content.cardTitle}
//       cardText={content.cardText}
//       animationName={content.animation}
//     />
//   );
// })}
// {priceCardsContent.map((content, idx) => {
//   return(
//     <PriceCard
//       key={idx}
//       price={content.price}
//       planTitle={content.planTitle}
//       planDescription={content.planDescription}
//       planFeatures={content.planFeatures}
//       cardBorder={content.cardBorder}
//     />
//   );
// })}