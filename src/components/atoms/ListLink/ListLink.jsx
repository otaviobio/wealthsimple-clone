import './ListLink.scss';
import { IonIcon } from '@ionic/react';

export function ListLink(props) {
  const {
    linkText,
    linkSubText,
    hasIcon = false,
    isAccountLink = false,
    accountTotal,
    iconName,
  } = props;

  return(
    <a
      className="list-link-container"
      // onClick={() => onLinkClick}
      href="#"
    >
      <div className="list-link-icon">
        { hasIcon && <IonIcon icon={iconName} />}
      </div>
      <div className="list-link-info">
        <div className="account-info">
          <p>{linkText}</p>
          <span>{linkSubText}</span>
        </div>
        { isAccountLink &&
          <div className="list-link-value">
            <p>${accountTotal} CAD</p>
          </div>
        }
      </div>
    </a>
  )
}