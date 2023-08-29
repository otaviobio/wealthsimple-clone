import "./TaxCalculator.scss";
import { Input } from "../../atoms/Input/Input";
import { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { NavMenu } from "../../molecules/NavMenu/NavMenu";

export function TaxCalculator() {
  const [formData, setFormData] = useState({});

  const federalBrackets = [
    {
      bracketStart: 0,
      bracketEnd: 49020,
      bracketPercentage: 0.15,
    },
    {
      bracketStart: 49020,
      bracketEnd: 98040,
      bracketPercentage: 0.205,
    },
    {
      bracketStart: 98040,
      bracketEnd: 151978,
      bracketPercentage: 0.26,
    },
    {
      bracketStart: 151978,
      bracketEnd: 216511,
      bracketPercentage: 0.29,
    },
    {
      bracketStart: 216511,
      bracketEnd: 100000000000,
      bracketPercentage: 0.33,
    },
  ];

  const provincialBrackets = [
    {
      bracketStart: 0,
      bracketEnd: 45142,
      bracketPercentage: 0.0505,
    },
    {
      bracketStart: 45142,
      bracketEnd: 90287,
      bracketPercentage: 0.0915,
    },
    {
      bracketStart: 90287,
      bracketEnd: 150000,
      bracketPercentage: 0.1116,
    },
    {
      bracketStart: 150000,
      bracketEnd: 220000,
      bracketPercentage: 0.1216,
    },
    {
      bracketStart: 220000,
      bracketEnd: 100000000000,
      bracketPercentage: 0.1316,
    },
  ];

  const calculateTax = (taxableIncome, brackets) => {
    let currentBracketIndex = 0;
    for (let index in brackets) {
      const bracket = brackets[index];
      if (
        taxableIncome > bracket.bracketStart &&
        taxableIncome <= bracket.bracketEnd
      ) {
        currentBracketIndex = index;
        break;
      }
    }

    let result = 0;
    let rest = taxableIncome;
    for (let i = currentBracketIndex; i >= 0; i--) {
      const bracket = brackets[i];
      result += (rest - bracket.bracketStart) * bracket.bracketPercentage;
      rest -= rest - bracket.bracketStart;
    }
    return Number(result);
  };

  const handleChange = (e) => {
    const reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    }
  };

  const taxCalculatorData = [
    {
      name: "employmentIncome",
      id: "employmentIncome",
      label: "Employment income",
    },
    {
      name: "selfEmploymentIncome",
      id: "selfEmploymentIncome",
      label: "Self employment income",
    },
    {
      name: "rrspDeduction",
      id: "rrspDeduction",
      label: "RRSP deduction",
    },
    {
      name: "capitalGains",
      id: "capitalGains",
      label: "Capital gains",
    },
    // {
    //   name:"eligibleDividends",
    //   id:"eligibleDividends",
    //   label:"Eligible dividends",
    // },
    // {
    //   name:"ineligibleDividends",
    //   id:"ineligibleDividends",
    //   label:"ineligible dividends",
    // },
    // {
    //   name:"otherIncome",
    //   id:"otherIncome",
    //   label:"Other income (incl. CERB/CESB)",
    // },
    {
      name: "incomeTaxesPaid",
      id: "incomeTaxesPaid",
      label: "Income taxes paid",
    },
  ];

  const totalIncome =
    Number(formData.employmentIncome ?? 0) +
    Number(formData.selfEmploymentIncome ?? 0) +
    Number(formData.capitalGains ?? 0);

  const federalTax = calculateTax(totalIncome, federalBrackets);
  const provincialTax = calculateTax(totalIncome, provincialBrackets);
  const rrspDeduction = (formData.rrspDeduction ?? 0) * 0.48;
  const totalTax = federalTax + provincialTax - rrspDeduction
  const afterTaxIncome = totalIncome - totalTax

  return (
    <IonPage>
      <IonContent fullscreen>
        <NavMenu />
        <section className="tax-calculator-container">
          <form action="">
            <article>
              <h2>2022 Income Tax Calculator Ontario</h2>
              {taxCalculatorData.map((input, idx) => {
                return (
                  <Input
                    key={idx}
                    hasIcon={true}
                    icon="$"
                    hasTooltip={true}
                    name={input.name}
                    id={input.id}
                    inputLabel={input.label}
                    onChange={handleChange}
                    value={formData[input.name] ?? 0}
                  />
                );
              })}
            </article>
            {/* <Button type="submit" btnText="Review tax return" /> */}
          </form>
          <article className="tax-calculator-results">
            <h3>Your Results</h3>
            <ul>
              <li>
                <div>
                  <p>Total income</p>
                  <span>${totalIncome}</span>
                </div>
              </li>
              {formData.rrspDeduction > 0 && (
                <li>
                  <div>
                    <p>RRSP tax savings</p>
                    <span>${rrspDeduction.toFixed(2)}</span>
                  </div>
                </li>
              )}
              <li>
                <div>
                  <p>Total tax</p>
                  <span>${totalTax.toFixed(2)}</span>
                </div>
              </li>
              <li>
                <div>
                  <p>After tax income</p>
                  <span>${afterTaxIncome.toFixed(2)}</span>
                </div>
              </li>
              <li>
                <div>
                  <p>Average tax rate</p>
                  <span>{formData.capitalGains ?? "0.00"}%</span>
                </div>
              </li>
              <li>
                <div>
                  <p>Marginal tax rate</p>
                  <span>{formData.capitalGains ?? 20.5}%</span>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </IonContent>
    </IonPage>
  );
}

