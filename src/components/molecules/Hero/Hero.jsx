import './Hero.scss';

import { Button } from "../../atoms/Button/Button";
import { CreateAnimation } from '@ionic/react';

export function Hero(props) {
  return(
    <section>
      <CreateAnimation
        play
        duration={1200}
        fromTo={{
          property: 'opacity',
          fromValue: '0',
          toValue: '1'
        }}
      >
        <div className='hero-main'>
          <div className='hero-info'>
            <h1>Do money right</h1>
            <p>Forward-thinking financial tools trusted by over 2.5 million Canadians.</p>
          </div>
          <Button btnText="Get started"/>
        </div>
      </CreateAnimation>
    </section>
  )
}