import { backspaceOutline } from "ionicons/icons";
import { Button } from "../../atoms/Button/Button";
import './Numpad.scss';

export function NumPad({handleSetNumber, handleEraseChar}) {
  const numpadButtons = [
    {character: "1"},
    {character: "2"},
    {character: "3"},
    {character: "4"},
    {character: "5"},
    {character: "6"},
    {character: "7"},
    {character: "8"},
    {character: "9"},
    {character: "."},
    {character: "0"}
  ]

  return(
    <div className="numpad-container">
      {numpadButtons.map((button, idx) => {
        return(
          <Button
            key={idx}
            type="button"
            btnText={button.character}
            onClick={handleSetNumber}
          />
        )
      })}
      <Button
        type="button"
        hasIcon={true}
        iconName={backspaceOutline}
        onClick={handleEraseChar}
      />
    </div>
  )
}