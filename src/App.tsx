import { Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './pages/HomePage';
import CardsDemoPage from './pages/CardsDemoPage';
import AppPage from './pages/AppPage';
import './styles/global.scss';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ChartProvider from './ChartProvider';
import { SignUpForm } from './components/organisms/SignUpForm/SignUpForm';
import { RetirementCalculator } from './components/organisms/RetirementCalculator/RetirementCalculator';
import { TaxCalculator } from './components/organisms/TaxCalculator/TaxCalculator';

setupIonicReact();

const App: React.FC = () => (
  <ChartProvider>
    <IonApp className='global-screen'>
      <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/cards" component={CardsDemoPage}/>
            <Route path="/signup" component={SignUpForm}/>
            <Route exact path="/calculator/retirement" component={RetirementCalculator}/>
            <Route exact path="/calculator/tax" component={TaxCalculator}/>
            <Route path="/app" component={AppPage}/>
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </ChartProvider>
);

export default App;
