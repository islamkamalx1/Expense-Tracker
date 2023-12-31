import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import {numberWithCommas} from "../utils/format"

const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const total = transactions
    .map((transaction) => transaction.amount)
    .reduce((acc, curr) => (acc += curr), 0)
    .toFixed(2);
  return (
    <>
      <h4>Your Balance</h4>
      <h1>${numberWithCommas(total)}</h1>
    </>
  );
};

export default Balance;
