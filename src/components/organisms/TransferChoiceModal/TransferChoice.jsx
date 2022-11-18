import { IonIcon } from "@ionic/react";
import { arrowDownOutline, chevronDownOutline, closeOutline } from "ionicons/icons";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import './TransferChoice.scss'

export default function TransferChoice({formData, accountDetails, handleChange, transferChoice, setTransferChoice}) {

  const handleTransferChoiceConfirmation = () => {
    if (formData.transferFrom === formData.transferTo) {
      window.alert("In order to transfer accounts must be different from each other.")
      return
    }
    setTransferChoice("")
  }
  
  return(
    <div className="transfer-main">
      {transferChoice === ""
        ? <div className="transfer-choice-container">
            <div className="transfer-custom-button">
              <Input
                floatingLabel={true}
                name="from"
                id="from"
                inputLabel="From"
                type="text"
                value={formData.transferFrom ?? "Choose a Wealthsimple account"}
                disabled="disabled"
              />
              <Button
                hasIcon={true}
                iconName={chevronDownOutline}
                onClick={() => setTransferChoice("transferFrom")}
                type="button"
              />
            </div>
            <IonIcon icon={arrowDownOutline} className="transfer-choice-divider" />
            <div className="transfer-custom-button">
              <Input
                floatingLabel={true}
                name="to"
                id="to"
                inputLabel="To"
                type="text"
                value={formData.transferTo ?? "Choose a Wealthsimple account"}
                disabled="disabled"
              />
              <Button
                hasIcon={true}
                iconName={chevronDownOutline}
                onClick={() => setTransferChoice("transferTo")}
                type="button"
              />
            </div>
          </div>
      : <div className="transfer-choice-modal">
          <div className="transfer-choice">
            <Button
              hasIcon={true}
              iconName={closeOutline}
              onClick={() => setTransferChoice("")}
            />
            <h2>Choose an account</h2>
            <div className="transfer-accounts-container">
              {accountDetails.map((account, idx) => {
                return (
                  <Input
                    key={idx}
                    name={
                      transferChoice === "transferFrom"
                      ? "transferFrom"
                      : transferChoice === "transferTo"
                        ? "transferTo"
                        : ""
                    }
                    id={account.accountName}
                    inputLabel={account.accountName}
                    secondaryLabel={`CAD: $${account.accountTotal}`}
                    type="radio"
                    onChange={handleChange}
                    value={account.accountName}
                    checked={
                      transferChoice === "transferFrom"
                      ? formData.transferFrom === `${account.accountName}`
                      : transferChoice === "transferTo"
                        ? formData.transferTo === `${account.accountName}`
                        : ""
                    }
                  />
                );
              })}
            </div>
            <Button
              btnText="Confirm"
              type="button"
              onClick={handleTransferChoiceConfirmation}
            />
          </div>
        </div>
      }
    </div>
  )
}