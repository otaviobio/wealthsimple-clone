import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { brushOutline, caretDownSharp, caretUpSharp } from "ionicons/icons";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { useState } from "react";
import './RetirementCalculator.scss'
import { CalculatorChart } from "../../atoms/CalculatorChart/CalculatorChart";
import { NavMenu } from "../../molecules/NavMenu/NavMenu";

export function RetirementCalculator() {
  const [formData, setFormData] = useState(
    {
      age: 30,
      annualIncome: 50000,
      savings: 10000,
      savingsPercentageInRegisteredAccounts: 50,
      ageOfRetirement: 65,
      expectedAnnualExpenses: 35000,
      expectedMonthlySavings: 625
    }
  );

  const retirementGoal = formData.expectedAnnualExpenses * 25
  const monthsToRetire = (formData.ageOfRetirement - formData.age) * 12
  const projectedSavings = Math.round((formData.expectedMonthlySavings) * Math.pow(1 + 0.0171, monthsToRetire))
  const incomePercentageRetirement = Math.round((formData.expectedAnnualExpenses * 100) / formData.annualIncome)
  const incomePercentageSavings = Math.round((formData.expectedMonthlySavings * 100) / (formData.annualIncome /12))
  const forecastResult = retirementGoal - projectedSavings
  const totalSavings = projectedSavings + formData.savings

  console.log(retirementGoal)
  console.log(monthsToRetire)
  console.log(projectedSavings)

  function calculateCompoundInterest() {
    let principal = 10000
    let rate = 1.5
    let time = 420
    let additional = 625
    let interest = 0
    let total = 0

    for (let i = 0; i < time; i++) {
      interest = principal * (rate / 100)
      principal = principal + interest + additional
      total = total + interest
    }

    console.log("Total interest: " + Math.floor(total))
    console.log("Total amount: " + Math.floor(principal))
  }

  const retirementCalculatorData = [
    {
      upperText: "I'm",
      name: "age",
      id: "age",
      lowerText: "years old.",
      maskType: "noMask",
      formStep: "first"
    },
    {
      upperText: "I make",
      name: "annualIncome",
      id: "annualIncome",
      lowerText: "per year.",
      maskType: "reduced",
      noButtons: true,
      formStep: "first"
    },
    {
      upperText: "I have",
      name: "savings",
      id: "savings",
      lowerText: "in savings.",
      maskType: "reduced",
      noButtons: true,
      formStep: "first"
    },
    {
      upperText: "",
      name: "savingsPercentageInRegisteredAccounts",
      id: "savingsPercentageInRegisteredAccounts",
      lowerText: "of my savings are in registered accounts like TFSA or RRSP.",
      maskType: "percentage",
      formStep: "first"
    },
  ];

  const retirementPlanData = [
    {
      upperText: "I plan to retired when I'm",
      name: "ageOfRetirement",
      id: "ageOfRetirement",
      lowerText: "years old.",
      maskType: "noMask",
      formStep: "second",
    },
    {
      upperText: "When I'm retired, I expect to spend",
      name: "expectedAnnualExpenses",
      id: "expectedAnnualExpenses",
      lowerText: "every year.",
      maskType: "reduced",
      formStep: "second",
    },
    {
      upperText: "I plan to save",
      name: "expectedMonthlySavings",
      id: "expectedMonthlySavings",
      lowerText: "every month.",
      maskType: "noMask",
      formStep: "second",
    },
  ];

  function handleAdd(name, value) {
    const reg = /^[0-9\b]+$/;
    if (value === "" || reg.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value + 1,
      }));
    }
  }

  function handleSubtract(name, value) {
    const reg = /^[0-9\b]+$/;
    if (value === "" || reg.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value - 1,
      }));
    }
  }

  function handleChange(e) {
    const reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    }
  };

  const [formDataArray, setFormDataArray] = useState(retirementCalculatorData)
  const [isFormFirstStep, setIsFormFirstStep] = useState(true)

  function handleFormNextStep() {
    setFormDataArray(retirementPlanData);
    setIsFormFirstStep(false)
  }

  function handleEditFirstStep() {
    setFormDataArray(retirementCalculatorData);
    setIsFormFirstStep(true)
  }

  
  const [isElementClicked, setIsElementClicked] = useState(null);
  
  function handleElementClick(id) {
    if(isElementClicked === null) {
      setIsElementClicked(id)
    } else {
      setIsElementClicked(null)
    }
  }
  
  console.log(formData);
  console.log(formDataArray);

  const base = [0, retirementGoal, 0]
  const projection = [0, projectedSavings, 0]
  const labels = [`Age ${formData.age}`, `Age ${formData.ageOfRetirement}`, `Age 95`]
  
  
  return(
    <IonPage>
      <IonContent fullscreen>
        <NavMenu />
        <form className="retirement-calculator-form" action="">
          <h1>Retirement Calculator</h1>
          {retirementCalculatorData.map((data, idx) => {
            return(
              <>
                {data.formStep === "first" && !isFormFirstStep &&
                  <div className="second-step-display-container" onClick={handleEditFirstStep}>
                    <span>
                      {data.upperText} {data.maskType === "reduced"
                      ?
                      `$${formData[data.name]/1000}k`
                      :
                      data.maskType === "noMask"
                      ?
                      `${formData[data.name]}`
                      :
                      `${formData[data.name]}%`
                    } {data.lowerText}
                      <IonIcon icon={brushOutline}/>
                    </span>
                  </div>
                }
              </>
            )
          })}
          {formDataArray.map((input, idx) => {
            return(
              <div className="parent-container" key={idx}>
                <p>{input.upperText}</p>
                <div className="retirement-calculator-form-input-container">
                  <div className="input-value">
                    {isElementClicked === idx
                      ?
                      <Input
                      name={input.name}
                      id={input.id}
                      value={formData[input.name]}
                      onChange={handleChange}
                      autoFocus
                      />
                      :
                      <span onClick={() => handleElementClick(idx)}>
                        {input.maskType === "reduced"
                        ?
                        `$${formData[input.name]/1000}k`
                        :
                        input.maskType === "noMask"
                        ?
                        `${formData[input.name]}`
                        :
                        `${formData[input.name]}%`
                      }
                      </span>
                    }
                  </div>
                  {!input.noButtons && isElementClicked !== idx  &&
                    <div className="retirement-calculator-buttons-container">
                      <Button
                        type="button"
                        hasIcon={true}
                        iconName={caretUpSharp}
                        onClick={() => handleAdd(input.name, formData[input.name])}
                        />
                      <Button
                        type="button"
                        hasIcon={true}
                        iconName={caretDownSharp}
                        onClick={() => handleSubtract(input.name, formData[input.name])}
                        />
                    </div>
                  }
                </div>
                <p>{input.lowerText}</p>
                <div className="planning-text">
                  {!isFormFirstStep && idx === 0 &&
                    <p>You can start collecting full CPP and OAS benefits from 65 years of age.</p>
                  }
                  {!isFormFirstStep && idx === 1 &&
                    <p>This is <strong>{`${incomePercentageRetirement}%`}</strong> of your income. You'll probably need at least 70% of your pre-retirement income.</p>
                  }
                  {!isFormFirstStep && idx === 2 &&
                    <p>This is <strong>{`${incomePercentageSavings}%`}</strong> of your income. You'll probably need to save at least 15% of your income for retirement.</p>
                  }
                </div>
              </div>
            )
          })}
          {isFormFirstStep
            ?
            <Button type="button" btnText="Next" onClick={handleFormNextStep}/>
            : 
            <div className="summary-container">
              <div className="summary-text">
                <span>{`$${Math.floor(projectedSavings/1000)}k`}</span>
                <p>What you'll have</p>
              </div>
              <div className="summary-text">
                <span>{`$${Math.floor(retirementGoal/1000)}k`}</span>
                <p>What you'll need</p>
              </div>
              <CalculatorChart base={base} projection={projection} labels={labels}/>
              <p className="chart-label">Retirement</p>
              <div className="forecast-text">
                <strong>Our forecast:</strong>
                {forecastResult < 0
                ?
                <>            
                <p className="forecast on-track">You are on track!</p>
                <p>Based on what you've told us, you're already on track to reach your retirement goals.</p>
                <p>Congratulations!</p>
                </>
                :
                <>
                {forecastResult > 450000
                  ? <p className="forecast improvement-needed">Improvement Needed</p>
                  : forecastResult <= 450000 & forecastResult > 250000
                    ? <p className="forecast on-your-way">On Your Way</p>
                    : <p className=" forecast">Almost there</p>
                }
                <p>It looks like you'll be short by about <strong>{`$${Math.round(forecastResult / 1000)}k`}</strong></p>
                <p>You could get on track by saving at least <strong>{`$${Math.floor(forecastResult / 906.25)}`}</strong> more per month</p>
                </>
                }
                
              </div>
            </div>
          }
        </form>
      </IonContent>
    </IonPage>
  )
}
