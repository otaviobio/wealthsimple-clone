import { IonContent, IonPage, IonRouterLink, } from '@ionic/react';
import { Button } from '../../atoms/Button/Button';
import { buttonsData, linksData } from '../../../assets/data/move-tab-data';
import './Move.scss'
import { ListLink } from '../../atoms/ListLink/ListLink';
import { useContext } from 'react';
import { AccountsContext } from '../../../pages/AppPage';

const Move: React.FC = () => {
  const { setAccountMovementType } = useContext(AccountsContext)

  // @ts-ignore
  const handleMovementType = (movementType) => {
    setAccountMovementType(movementType)
  }
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <section className='container'>
          <div className="move-header">
            <h2>Move</h2>
            <div className="move-header-btn-container">
              {buttonsData.map((buttonData, idx) => {
                return(
                  <IonRouterLink key={idx} routerLink="/app/move/funds">
                    <Button
                      btnText={buttonData.buttonText}
                      hasIcon
                      hasBorder
                      iconName={buttonData.iconName}
                      onClick={() => handleMovementType(buttonData.buttonText)}
                    />
                  </IonRouterLink>
                )
              })}
            </div>
          </div>

          <div className="move-links-container">
            {linksData.map((linkData, idx) => {
              return(
                <ListLink
                  key={idx}
                  linkText={linkData.linkText}
                  linkSubText={linkData.linkSubText}
                  hasIcon={true}
                  iconName={linkData.iconName}
                />
              )
            })}
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Move;
