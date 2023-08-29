import { IonContent, IonPage } from '@ionic/react';
import moneyTree from "../../../assets/images/gold-dollar-coin-plant.png";
import { Button } from '../../atoms/Button/Button';
import './Rewards.scss'

const Rewards: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <section className="rewards-container">
          <div className="rewards-main">
            <h2 className="rewards-title">Invite friends & get cash to trade</h2>
            <p className="rewards-message">You'll both get up to $3,000 in cash to trade stocks or crypto when they fund a DIY trading account.</p>
            <img src={moneyTree} alt="Gold dollar coin plant" />
            <p className="rewards-terms"><span>Terms of use</span> including terms specific for QC residents and Privacy Policy.</p>
          </div>
          <Button btnText="Invite friends"/>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Rewards;
