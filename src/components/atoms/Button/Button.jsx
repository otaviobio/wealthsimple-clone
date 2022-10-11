import './Button.scss';
import { IonIcon } from '@ionic/react';

export function Button(props) {
  const {
    btnText,
    hasIcon = false,
    hasBorder = false,
    iconName,
    onButtonClick,
    isDisabled,
  } = props;

  return(
    <div
      className={`
        btn-container
        ${hasIcon ? 'with-icon' : ''}
        ${hasBorder ? 'border' : ''}
        ${isDisabled ? 'disabled' : ''}
      `}
      onClick={!isDisabled ? onButtonClick : () => {}}
    >
      <div>
        {btnText}
      </div>
      { hasIcon && <IonIcon icon={iconName} />}
    </div>
  )
}