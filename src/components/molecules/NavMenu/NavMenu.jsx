import './NavMenu.scss';
import { reorderTwoOutline, closeOutline } from 'ionicons/icons';
import wslogo from '../../../assets/icons/logo-ws.svg';
import {
  IonIcon,
  IonAccordion, 
  IonAccordionGroup,
  IonItem, 
  IonLabel,
  CreateAnimation,
  IonRouterLink
} from '@ionic/react';
import { Button } from "../../atoms/Button/Button";
import { useState } from 'react';

export function NavMenu() {
  const [toggleNav, setToggleNav] = useState(false);

  return(
    <header>
      <nav onClick={() => setToggleNav(!toggleNav)}>
        <img src={wslogo} alt="Wealthsimple" />
        {!toggleNav ?
          <IonIcon className='icon' icon={reorderTwoOutline} alt="Hamburguer menu icon"/>
          :
          <CreateAnimation
            play
            duration={200}
            fromTo={[
              {
              property: 'opacity',
              fromValue: '0',
              toValue: '1'
              },
              {
              property: 'transform',
              fromValue: 'rotate(45deg)',
              toValue: 'rotate(0)'
              }
            ]}
          >
            <IonIcon className='icon' icon={closeOutline} alt="Close menu icon"/>
          </CreateAnimation>
        }
      </nav>
      {toggleNav &&
        <CreateAnimation
          play
          duration={500}
          fromTo={{
            property: 'opacity',
            fromValue: '0',
            toValue: '1'
          }}
        >
          <section className='nav-menu'>
            <IonAccordionGroup>
              <IonAccordion value="first" >
                <IonItem className='custom-accordion' color="favorite" slot="header">
                  <IonLabel>Calculators</IonLabel>
                </IonItem>
                <div className="custom-accordion-item" slot="content">
                  <IonRouterLink className="custom-accordion-link" routerLink="/calculator/retirement">
                    Retirement Calculator
                  </IonRouterLink>
                </div>
                <div className="custom-accordion-item" slot="content">
                  <IonRouterLink className="custom-accordion-link" routerLink="/calculator/tax">
                    Income tax calculator
                  </IonRouterLink>
                </div>
              </IonAccordion>
            </IonAccordionGroup>
            
            <div className="custom-accordion-direct-link" slot="content">
              <IonRouterLink className="custom-accordion-link" routerLink="/signup">
                Signup Form
              </IonRouterLink>
            </div>

            <div className="custom-accordion-direct-link" slot="content">
              <IonRouterLink className="custom-accordion-link" routerLink="/cards">
                Cards
              </IonRouterLink>
            </div>
            <IonAccordionGroup>
              <IonAccordion value="first" >
                <IonItem className='custom-accordion' color="favorite" slot="header">
                  <IonLabel>Pages</IonLabel>
                </IonItem>
                <div className="custom-accordion-item" slot="content">
                  <IonRouterLink className="custom-accordion-link" routerLink="/app">
                    App
                  </IonRouterLink>
                </div>
                <div className="custom-accordion-item" slot="content">
                  <IonRouterLink className="custom-accordion-link" routerLink="/">
                    Homepage
                  </IonRouterLink>
                </div>
              </IonAccordion>
            </IonAccordionGroup>

            <div className="nav-footer">
              <Button
                className="btn-container"
                btnText="Log in"
              />
            </div>
          </section>
        </CreateAnimation>
      }
    </header>
  )
}