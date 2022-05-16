import React, { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

import dummyData from "../utils/dummyData";
const Transactions = () => {
  const { currentAccount } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4"></div>
      {/* Latest Transactions */}
      {currentAccount ? (
        <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions
        </h3>
      ) : (
        <h3 className="text-white text-3xl text-center my-2">
          Connect Your MetaMask Account to See Your Latest Transactions
        </h3>
      )}

      {/* Connect your account */}
    </div>
  );
};

export default Transactions;
