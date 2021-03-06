import React from "react";

/**
 * Calculations is simply a page of information on all of the calculations done on the other pages
 */

const Calculations = () => {
  return (
    <div style={{ margin: "10px" }}>
      <h5>Gold:</h5>

      <ul style={{ fontSize: "10px" }}>
        <li>
          Weight is converted to ounces. <br />
          Conversion Rates: <br />
          (weight * 0.035274) grams -> ounces <br />
          (weight * 1.09714) troy ounces -> ounces <br />
          (weight * 0.0548571) pennyweight -> ounces
        </li>
        <li>
          Amount of Karats is divided by 24 (24 Karats is 99.9% purity), to
          convert the purity to a decimal out of 1
        </li>
        <li>
          Converted weight in ounces * purity * spot price of gold = price of
          the piece of gold
        </li>
        <li>
          Ex: 25 troy ounces of 15 karat gold... <br />
          25 ozt * (1.09714 conversion rate to oz) = 27.4285 oz <br />
          15 karats / 24 karats = 0.625 purity <br />
          27.4285 oz * 0.625 purity * $1232.32/oz (current spot price of gold) =
          $21,125.43
        </li>
      </ul>
      <h5> Silver:</h5>
      <ul style={{ fontSize: "10px" }}>
        <li>
          Weight is converted to ounces. <br />
          Conversion Rates: <br />
          (weight * 0.035274) grams -> ounces <br />
          (weight * 1.09714) troy ounces -> ounces <br />
          (weight * 0.0548571) pennyweight -> ounces
        </li>
        <li>
          The input for purity percentage is divided by 100 to get a decimal out
          of 1
        </li>
        <li>
          Converted weight in ounces * purity * spot price of silver = price of
          the piece of silver
        </li>
        <li>
          Ex: 120 grams of sterling silver.. <br />
          120 g * (0.035274 conversion rate to oz) = 4.23288 oz <br />
          92.5% purity (sterling silver's purity percentage)/ 100 = 0.925 purity{" "}
          <br />
          4.23288 oz * 0.925 purity * $14.43/oz (current spot price of silver) =
          $56.499... ~ (rounds to $56.50)
        </li>
      </ul>
    </div>
  );
};

export default Calculations;
