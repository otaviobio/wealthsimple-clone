import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { pieChartOutline, analyticsOutline,  moveSharp, ribbonOutline } from 'ionicons/icons';
import './AppPage.scss';
import Activity from '../components/views/Activity/Activity';
import Move from '../components/views/Move/Move';
import Rewards from '../components/views/Rewards/Rewards';
import Portfolio from '../components/views/Portfolio/Portfolio';

const AppPage: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/portfolio" component={Portfolio} />
        <Route exact path="/app/activity" component={Activity} />
        <Route exact path="/app/move" component={Move} />
        <Route exact path="/app/rewards" component={Rewards} />
        
        <Route exact path="/">
          <Redirect to="/app/portfolio" />
        </Route>
        <Route exact path="/app">
          <Redirect to="/app/portfolio" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="portfolio" href="/app/portfolio">
          <IonIcon icon={pieChartOutline} />
          <IonLabel>Portfolio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="activity" href="/app/activity">
          <IonIcon icon={analyticsOutline} />
          <IonLabel>Activity</IonLabel>
        </IonTabButton>
        <IonTabButton tab="move" href="/app/move">
          <IonIcon icon={moveSharp} />
          <IonLabel>Move</IonLabel>
        </IonTabButton>
        <IonTabButton tab="rewards" href="/app/rewards">
          <IonIcon icon={ribbonOutline} />
          <IonLabel>Rewards</IonLabel> 
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppPage;
