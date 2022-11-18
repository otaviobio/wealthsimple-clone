/* eslint-disable react/jsx-no-comment-textnodes */
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { pieChartOutline, searchOutline,  moveSharp, ribbonOutline } from 'ionicons/icons';
import './AppPage.scss';
import Discover from '../components/views/Discover/Discover';
import Move from '../components/views/Move/Move';
import Rewards from '../components/views/Rewards/Rewards';
import Portfolio from '../components/views/Portfolio/Portfolio';
import { createContext, useState } from 'react';
import MoveFunds from '../components/views/MoveFunds/MoveFunds';

export const AccountsContext = createContext({} as any)

const AppPage: React.FC = () => {
  const [accountDetails, setAccountDetails] = useState([
    {
      accountName: "Savings",
      accountTotal: 3500
    },
    {
      accountName: "Crypto",
      accountTotal: 2200
    },
    {
      accountName: "Stocks",
      accountTotal: 1000
    }
  ]);

  const [accountMovementType, setAccountMovementType] = useState("");
  
  return (
    <IonTabs>
        <IonRouterOutlet>
          {/* @ts-ignore */}
          <AccountsContext.Provider value={{
            accountDetails,
            setAccountDetails,
            accountMovementType,
            setAccountMovementType
          }}>
            <Route exact path="/app/portfolio" component={Portfolio} />
            <Route exact path="/app/discover" component={Discover} />
            <Route exact path="/app/move" component={Move} />
            <Route exact path="/app/move/funds" component={MoveFunds} />
            <Route exact path="/app/rewards" component={Rewards} />
          </AccountsContext.Provider>
          
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
          <IonTabButton tab="discover" href="/app/discover">
            <IonIcon icon={searchOutline} />
            <IonLabel>Discover</IonLabel>
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
