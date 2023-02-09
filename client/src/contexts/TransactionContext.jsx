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
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const transactionContract = getEthereumContract();

      const availableTransacitons =
        await transactionContract.getAllTransactions();
      console.log(availableTransacitons[0].timestamp.toNumber() * 1000);
      const structuredTransactions = availableTransacitons.map(
        (transaction) => ({
          addressFrom: transaction.sender,
          addressTo: transaction[1],
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );
      console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const transactionContract = getEthereumContract();
      const availableTransacitons =
        await transactionContract.getUserTransactions();
      console.log(availableTransacitons);
      const structuredTransactions = availableTransacitons.map(
        (transaction) => ({
          addressFrom: transaction.sender,
          addressTo: transaction[1],
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );
      console.log(structuredTransactions);
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };
  // update formData based off of form input name
  const handleChange = (e, name) => {
    if (name === "amount") {
      if (e.target.value.length <= 12) {
        // allow a number up to 999.99999999
        const amountRegex = new RegExp("^([0-9]+.?[0-9]*|.[0-9]+)$");

        if (amountRegex.test(e.target.value) === true) {
          console.log(amountRegex.test(e.target.value));
          setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value.replace(/-/g, ""),
          }));
          // const isNegative = Math.sign(parseFloat(e.target.value));
          // if (isNegative === 1 || isNegative === 0) {
          //   setFormData((prevState) => ({
          //     ...prevState,
          //     [name]: e.target.value,
          //   }));
        } else if (e.target.value.length === 0) {
          console.log(0);
          setFormData((prevState) => ({ ...prevState, [name]: "" }));
        } else {
          console.log("hypen");
          setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value.replace(/-/g, ""),
          }));
        }
      } else {
        console.log("overlength");
        setFormData((prevState) => ({
          ...prevState,
          [name]: prevState.amount,
        }));
      }
      // } else {
      //   setFormData((prevState) => ({
      //     ...prevState,
      //     [name]: prevState.amount,
      //   }));
      // }
    } else {
      console.log("other");
      setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
  };
  const checkWalletConnection = async () => {
    if (!ethereum) return alert("please install metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // getAllTransactions();
        getUserTransactions();
      } else {
        console.log("no accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object in window");
    }
  };

  const checkTransactions = async () => {
    try {
      const transactionContract = getEthereumContract();

      const transactionCountNumber =
        await transactionContract.getTransactionCount();

      //replace w api call
      window.localStorage.setItem("transactionCount", transactionCountNumber);
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

  const disconnectWallet = async () => {
    setCurrentAccount(null);
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install metamask");

      const { addressTo, amount, keyword, message } = formData;

      const transactionContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208", // 2100 GWEI
            value: parsedAmount._hex, // 0.00001 ether
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setLoading(true);
      console.log(`Loading ${transactionHash.hash}`);
      await transactionHash.wait();
      setLoading(false);
      console.log(`Success ${transactionHash.hash}`);

      const transactionCountNumber =
        await transactionContract.getTransactionCount();

      setTransactionCount(transactionCountNumber.toNumber());
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object in window");
    }
  };
  useEffect(() => {
    checkWalletConnection();
    checkTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        currentAccount,
        formData,
        sendTransaction,
        handleChange,
        transactions,
        loading,
        setLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

const { ethereum } = window;
