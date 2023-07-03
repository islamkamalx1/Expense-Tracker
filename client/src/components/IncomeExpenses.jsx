import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import {numberWithCommas} from "../utils/format"


const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const income = transactions
    .map((transaction) => transaction.amount)
    .filter((item) => item > 0)
    .reduce((acc, curr) => (acc += curr), 0)
    .toFixed(2);

  const expense = transactions
    .map((transaction) => transaction.amount)
    .filter((item) => item < 0)
    .reduce((acc, curr) => (acc += curr), 0 * -1)
    .toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h1>Income</h1>
        <p className="money plus">+${numberWithCommas(income)}</p>
      </div>
      <div>
        <h1>Expense</h1>
        <p className="money minus">-${numberWithCommas(expense)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
