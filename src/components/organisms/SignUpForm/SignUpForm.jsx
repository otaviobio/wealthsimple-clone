import { IonContent, IonPage, } from '@ionic/react';
import { useMultiSteps } from '../../../useMultisteps';
import { Button } from '../../atoms/Button/Button';
import './SignUpForm.scss'
import { arrowBackOutline } from 'ionicons/icons';
import { Input } from '../../atoms/Input/Input';
import { useState } from 'react';
import { NavMenu } from '../../molecules/NavMenu/NavMenu';

export function SignUpForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  console.log(formData)

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, } = useMultiSteps([
    <article>
      <h2>What's your legal name?</h2>
      <Input
        floatingLabel={true}
        name="firstName"
        id="firstName"
        inputLabel="First Name"
        type="text"
        onChange={handleChange}
        value={formData.firstName ?? ''}
      />
      <Input
        floatingLabel={true}
        name="middleName"
        id="middleName"
        inputLabel="Middle Name (optional)"
        type="text"
        onChange={handleChange}
        value={formData.middleName ?? ''}
      />
      <Input
        floatingLabel={true}
        name="lastName"
        id="lastName"
        inputLabel="Last Name"
        type="text"
        onChange={handleChange}
        value={formData.lastName ?? ''}
      />
    </article>,

    <article>
      <h2>What's your date of birth?</h2>
      <Input
        floatingLabel={true}
        name="date"
        id="date"
        type="text"
        inputLabel="Enter your birth date"
        onChange={handleChange}
        value={formData.date ?? ''}
      />
    </article>,

    <article>
      <h2>What's your phone number?</h2>
      <Input
        floatingLabel={true}
        name="phone"
        id="phone"
        type="text"
        inputLabel="Enter your phone number"
        onChange={handleChange}
        value={formData.phone ?? ''}
      />
    </article>,

    <article>
      <h2>Where do you live?</h2>
      <div className="custom-radio-button-container">
        <Input
          name="country"
          id="country"
          inputLabel="Canada"
          type="radio"
          onChange={handleChange}
          value="Canada"
          checked={formData.country === 'Canada'}
        />

        <Input
          name="country"
          id="country"
          inputLabel="Other"
          type="radio"
          onChange={handleChange}
          value="Other"
          checked={formData.country === 'Other'}
        />
      </div>
    </article>,

    <article>
      <h2>Confirm your details</h2>
      <p className="signup-details-finePrint">Please take a moment to make sure all of your information is correct.</p>
      <div className="signup-details-container">
        <div className="signup-details">
          <div>
            <p>Legal Name</p>
            <span>{formData.firstName} {formData.lastName}</span>
          </div>
        </div>
        <div className="signup-details">
          <div>
            <p>Date of birth</p>
            <span>{formData.date}</span>
          </div>
        </div>
        <div className="signup-details">
          <div>
            <p>Phone number</p>
            <span>{formData.phone}</span>
          </div>
        </div>
        <div className="signup-details">
          <div>
            <p>Country of Residence</p>
            <span>{formData.country}</span>
          </div>
        </div>
      </div>
    </article>,
  ])

  const currentStepPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  const progressBar = {
    height: "100%",
    width: `${currentStepPercentage}%`,
    backgroundColor: "#008080",
    borderRadius: "inherit",
    transition: 'width 1s ease-in-out',
  }

  return(
    <IonPage>
      <IonContent fullscreen>
        <NavMenu />
        <section className="signup-form-container">
          <div className="progress-bar-container">
            <div style={progressBar}></div>
          </div>
          {!isFirstStep && <Button hasIcon={true} iconName={arrowBackOutline} onClick={back} />}
          <form action="">
            {step}
          </form>
          {isLastStep ? <Button btnText="Finish" onClick={next} /> : <Button btnText="Continue" onClick={next} />}
        </section>
      </IonContent>
    </IonPage>
  );
}