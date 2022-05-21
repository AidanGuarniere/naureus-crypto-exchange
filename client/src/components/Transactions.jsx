import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import dummyData from "../utils/dummyData";
const TransactionCard = ({
  transaction, currentAccount
}) => {

  
  const time = transaction.timestamp.toString();

  const isUser = (address) => {
    console.log(address)
    if (address.toLowerCase() === currentAccount) {
      return "You"
    } else {
      return shortenAddress(address)
    }
  }
  return (
    <div
      className="
        bg-[#181918] m-4 flex flex-1
        md:min-w-[350px]
        md:max-w-[400px]
        sm:min-w-[170px]
        sm:max-w-[200px]
        flex-co p-3 rounded-md hover:shadow-2xl
      "
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className=" w-full mb-6 p-2 ">
          <a
            href={`https://ropsten.etherscan.io/address/${transaction.addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base ">
              From: {isUser(transaction.addressFrom)}
            </p>
          </a>

          <a
            href={`https://ropsten.etherscan.io/address/${transaction.addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base ">
              To: {isUser(transaction.addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {transaction.amount} ETH</p>
          <p className="text-white text-base"> {time}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect Your MetaMask Account to See Your Latest Transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction, i) => (
            <TransactionCard key={transaction.addressFrom+i} transaction={transaction} currentAccount={currentAccount}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
