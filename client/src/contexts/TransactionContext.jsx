import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext({});

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const [loading, setLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  //   useEffect(() => {
  //     console.log(formData)

  //   }, [formData])

  // update formData based off of form input name
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const checkWalletConnection = async () => {
    if (!ethereum) return alert("please install metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        //getAllTransactions();
      } else {
        console.log("no accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object in window");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object in window");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const { addressTo, amount, keyword, message } = formData;


      const transactionContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount)

      await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
              from: currentAccount,
              to: addressTo,
              gas:"0x5208", // 2100 GWEI 
              value: parsedAmount._hex, // 0.00001 ether
          }]
      })


      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setLoading(true);
      console.log(`Loading ${transactionHash.hash}`)
      await transactionHash.wait();
      setLoading(false)
      console.log(`Success ${transactionHash.hash}`)

      const transactionCountNumber = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCountNumber.toNumber());
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object in window");
    }
  };
  useEffect(() => {
    checkWalletConnection();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        handleChange,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const { ethereum } = window;
