import React, { useState } from "react";
import { Button } from "../Button/Button";
import Portal from "../Portal/Portal";
import TooltipPopover from "./TooltipPopover";

const btnRef = React.createRef();

export function Tooltip() {
  const [coords, setCoords] = useState({}); // takes current button coordinates
  const [isOn, setOn] = useState(false); // toggles button visibility

  const updateTooltipCoords = button => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 2, // add half the width of the button for centering
      top: rect.y + window.scrollY // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };
  
  return(
    <>
    <Button
      btnText="Click me"
      ref={btnRef}
      onClick={e => {
        updateTooltipCoords(e.target);
        setOn(!isOn);
      }}
      />
    {
      isOn &&
      <Portal>
        <TooltipPopover
          coords={coords}
          updateTooltipCoords={() =>
            updateTooltipCoords(btnRef.current.buttonNode)
          }
        >
          <div>
            Awesome content that is never cut off by its parent container!
          </div>
        </TooltipPopover>
      </Portal>
    }
    </>
  )
}