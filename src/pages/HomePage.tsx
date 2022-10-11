import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Hero } from '../components/molecules/Hero/Hero';
import { MainContentCard } from '../components/molecules/MainContentCard/MainContentCard';
import { NavMenu } from '../components/molecules/NavMenu/NavMenu';
import './HomePage.scss';
import { mainCardsContent, mainCardsContentBottomSession } from '../assets/data/main-card-data';
import Lottie from "lottie-react";
import pieChart from '../assets/lottie/pie-chart.json';
import earnBonuses from '../assets/lottie/earn-bonuses.json';
import { Button } from '../components/atoms/Button/Button';


const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <NavMenu />
        <Hero />
        <div className="after-animation-session">
          <div>
            <Lottie animationData={pieChart}/>
            <h2>Grow and manage your money, all in one place.</h2>
          </div>
          <div>
            <h2>Investing made simple.</h2>
            <p>No paperwork, no account minimums, no trust fund required.</p>
          </div>
        </div>
        {mainCardsContent.map((content, idx) => {
          return(
            <MainContentCard
              key={idx}
              animationName={content.animation}
              cardText={content.cardText}
              btnText={content.btnText}
            />
          );
        })}
        <h2 className="session-break">Spending and saving that pays off</h2>
        {mainCardsContentBottomSession.map((content, idx) => {
          return(
            <MainContentCard
              key={idx}
              animationName={content.animation}
              cardText={content.cardText}
              cardSubText={content.cardSubText}
              btnText={content.btnText}
            />
          )
        })}
        <div className='bottom-main'>
          <div className='bottom-info'>
            <h2>Set your money in motion</h2>
            <p>Sign up in minutes and start doing money right.</p>
          </div>
          <Button btnText="Download the app" />
        </div>
        <Lottie animationData={earnBonuses} />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
