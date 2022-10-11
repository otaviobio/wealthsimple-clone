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
  Animation
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
                  <IonLabel>Invest</IonLabel>
                </IonItem>
                <div className="ion-padding custom-accordion-item" slot="content">
                  Stocks & ETFs
                </div>
                <div className="ion-padding custom-accordion-item" slot="content">
                  Crypto
                </div>
                <div className="ion-padding custom-accordion-item" slot="content">
                  Managed Investing
                </div>
              </IonAccordion>
            </IonAccordionGroup>

            <IonLabel className='custom-nav-item'>Spend & Save</IonLabel>

            <IonLabel className='custom-nav-item'>Tax</IonLabel>

            <IonAccordionGroup>
              <IonAccordion value="first">
                <IonItem className='custom-accordion' color="favorite" slot="header">
                  <IonLabel>Learn</IonLabel>
                </IonItem>
                <div className="ion-padding custom-accordion-item" slot="content">
                  Magazine
                </div>
                <div className="ion-padding custom-accordion-item" slot="content">
                  Personal finance 101
                </div>
                <div className="ion-padding custom-accordion-item" slot="content">
                  Income tax calculator
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