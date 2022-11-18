import { useMultiSteps } from '../../../useMultisteps';
import { Button } from '../../atoms/Button/Button';
import './MoveFunds.scss'
import { arrowBackOutline } from 'ionicons/icons';
import { Input } from '../../atoms/Input/Input';
import { useContext, useState } from 'react';
import { IonRouterLink, useIonToast } from '@ionic/react';
import { NumPad } from '../../organisms/NumPad/Numpad';
import { AccountsContext } from '../../../pages/AppPage';
import TransferChoice from '../../organisms/TransferChoiceModal/TransferChoice';

export default function MoveFunds() {
  const [formData, setFormData] = useState({});
  const {accountDetails, setAccountDetails, accountMovementType, setAccountMovementType} = useContext(AccountsContext)
  const [transferChoice, setTransferChoice] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  // handles state for the numpad start
  const [number, setNumber] = useState("0")
  
  const handleSetNumber = (e) => {
    if(number === "0") {
      setNumber("")
    }
    if(number.includes(".") & e.target.innerText === ".") {
      return number
    }
    setNumber(prevNumber => prevNumber + e.target.innerText)
  }

  const handleEraseChar = () => {
    const newNumber = number.slice(0, -1)
    setNumber(newNumber)
  }
   // handles state for the numpad end

  const handleDeposit = () => {
    setAccountDetails(currentArray => {
      return currentArray.map(account => {
        if(account.accountName === formData.depositAccount) {
          return{...account, accountTotal: account.accountTotal += Number(number)}
        }
        return {...account}
      })
    })
  }

  const handleWithdraw = () => {
    setAccountDetails(currentArray => {
      return currentArray.map(account => {
        if(account.accountName === formData.depositAccount) {
          return{...account, accountTotal: account.accountTotal -= Number(number)}
        }
        return {...account}
      })
    })
  }

  const handleTransfer = () => {
    setAccountDetails(currentArray => {
      return currentArray.map(account => {
        if(account.accountName === formData.transferFrom) {
          return{...account, accountTotal: account.accountTotal -= Number(number)}
        }
        if(account.accountName === formData.transferTo) {
          return{...account, accountTotal: account.accountTotal += Number(number)}
        }
        return {...account}
      })
    })
  }

  const [present] = useIonToast();

  const presentToast = (message) => {
    present({
      message: message,
      duration: 2000,
      position: "top"
    });
  };

  const handleSubmitTransaction = () => {
    switch (accountMovementType) {
      case "Deposit":
        handleDeposit()
        presentToast("Deposit completed successfully!")
        setAccountMovementType("")
        setTransferChoice("")
        break;

      case "Withdraw":
        handleWithdraw()
        presentToast("Withdrawal completed successfully!")
        setAccountMovementType("")
        setTransferChoice("")
        break;

      case "Transfer":
        handleTransfer()
        presentToast("Transfer completed successfully!")
        setAccountMovementType("")
        setTransferChoice("")
        break;
    
      default:
        break;
    }
  }

  const handleCancelTransaction = () => {
    setAccountMovementType("")
    setTransferChoice("")
  }

  const { step, isFirstStep, isLastStep, currentStepIndex, back, next, goTo } =
    useMultiSteps([
      <article>
        {accountMovementType === "Deposit" && <h2>Choose an account to deposit to</h2>}
        {accountMovementType === "Withdraw" && <h2>Choose an account to withdraw from</h2>}
        {accountMovementType !== "Transfer"
          ?
          <div className="move-button-container">
            {accountDetails.map((account, idx) => {
              return (
                <Input
                  key={idx}
                  name="depositAccount"
                  id={account.accountName}
                  inputLabel={account.accountName}
                  secondaryLabel={`CAD: $${account.accountTotal}`}
                  type="radio"
                  onChange={handleChange}
                  value={account.accountName}
                  checked={formData.depositAccount === `${account.accountName}`}
                />
              );
            })}
          </div>
          :
          <TransferChoice
            formData={formData}
            accountDetails={accountDetails}
            handleChange={handleChange}
            transferChoice={transferChoice}
            setTransferChoice={setTransferChoice}
          />
        }
      </article>,
      
      <article>
        {accountMovementType === "Deposit" && <h2>Choose a deposit method</h2>}
        {accountMovementType === "Withdraw" && <h2>Choose an account to receive the funds</h2>}
        <div className="move-button-container">
          <Input
            name="depositMethod"
            id="rbcChecking"
            inputLabel="RBC Checking (****303)"
            type="radio"
            onChange={handleChange}
            value="RBC Checking (****303)"
            checked={formData.depositMethod === "RBC Checking (****303)"}
          />
        </div>
      </article>,

      <article>
        <div className="move-numpad-header">
          <div className="numpad-result">
            <p>${number}</p>
          </div>
          <div className="select-container">
            <select name="frequency" id="frequency">
              <option value="one-time">One-time</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <select name="date" id="date">
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
            </select>
          </div>
          <div className="deposit-message">
            <p>You will receive this deposit in 5 business days.</p>
          </div>
        </div>
        <NumPad
          handleSetNumber={handleSetNumber}
          handleEraseChar={handleEraseChar}
        />
      </article>,

      <article>
        <h2>Confirm your deposit details</h2>
        <div className="deposit-details-container">
          <div className="deposit-details">
            <div>
              <p>Amount</p>
              <span>${Number(number).toFixed(2)}</span>
            </div>
            <div>
              <p>Frequency</p>
              <span>One-time</span>
            </div>
            <div>
              <p>Deposit date</p>
              <span>Nov 11, 2022</span>
            </div>
          </div>
          <div className="deposit-details">
            <div>
              <p>Processing time</p>
              <span>{accountMovementType === "Transfer" ? "Immediate" : "5 business days"}</span>
            </div>
          </div>
          <div className="deposit-details">
            <div>
              <p>From</p>
              <span>{accountMovementType === "Transfer" ? formData.transferFrom : formData.depositAccount}</span>
            </div>
            <div>
              <p>To</p>
              <span>{accountMovementType === "Transfer" ? formData.transferTo : formData.depositMethod}</span>
            </div>
          </div>
        </div>
        <span className="deposit-details-fine-print">Make sure to keep this amount in your bank account until you see the withdrawal in your bank transactions.</span>
      </article>,
    ]);

  return(
    <section className="move-container">
      {isFirstStep &&
        <IonRouterLink routerLink="/app/move">
          <Button
            hasIcon={true}
            iconName={arrowBackOutline}
          />
        </IonRouterLink>
      }
      {!isFirstStep &&
        <Button
          hasIcon={true}
          iconName={arrowBackOutline}
          onClick={currentStepIndex === 2 && accountMovementType === "Transfer"
            ? () => goTo(0)
            : back
          }
        />
      }
      <form action="">
        {step}
      </form>
      {isLastStep
        ? <div className="transaction-buttons-container">
            <IonRouterLink className="submit-transaction-button" routerLink="/app/portfolio">
              <Button btnText="Submit transaction" onClick={handleSubmitTransaction} />
            </IonRouterLink>
            <IonRouterLink className="cancel-transaction-button" routerLink="/app/move">
              <Button btnText="Cancel this transaction" onClick={handleCancelTransaction} />
            </IonRouterLink>
          </div>
          : currentStepIndex === 1 && accountMovementType === "Transfer"
            ? <Button btnText="Continue" onClick={goTo(2)} />
            : <Button btnText="Continue" onClick={next} />}
    </section>
  );
}