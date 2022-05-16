import React, { useState, useContext, useEffect } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { ScreenContext } from "../contexts/ScreenContext";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from "./";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const [addressVisibility, setAddressVisibility] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { screen } = useContext(ScreenContext);
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { addressTo, amount, keyword, message } = formData;

    if (!addressTo || !amount || !keyword || !message) {
      console.log("problem");
    }

    console.log("success");
    sendTransaction();
  };

  const showAddress = () => {
    setAddressVisibility(!addressVisibility);
  };

  const copyAddress = (e) => {
    navigator.clipboard.writeText(e.target.textContent);
    setCopiedAddress(true);
    setTimeout(() => {
      setCopiedAddress(false);
    }, 2500);
    setAddressVisibility(!addressVisibility);
  };

  return (
    <div className="flex w-full justify-center items-center">
              {copiedAddress ? (
          <div className="fixed z-[999] text-white top-20 text-center py-2 px-7 rounded-md w-1/4 h-1/12 bg-[#2952e3]">
            <p>Address Copied to Clipboard!</p>
          </div>
        ) : (
          null
        )}
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className=" flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white  py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Naureus is a web application for buying and selling cryptocurrency
            via Solidity smart contracts. Demo use only. By Aidan Guarniere.
          </p>
          {!currentAccount ? (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          ) : (
            <div></div>
          )}

          <div className=" grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            {screen === "desktop" ? (
              <>
                {" "}
                <div className={`rounded-tl-2xl  ${commonStyles}`}>
                  Reliability
                </div>
                <div className={commonStyles}>Security</div>
                <div className={`rounded-tr-2xl  ${commonStyles}`}>
                  Ethereum
                </div>
                <div className={`rounded-bl-2xl  ${commonStyles}`}>Web 3.0</div>
                <div className={commonStyles}>Low Fees</div>
                <div className={`rounded-br-2xl  ${commonStyles}`}>
                  Blockchain
                </div>
              </>
            ) : (
              <>
                <div className={`rounded-tl-2xl  ${commonStyles}`}>
                  Reliability
                </div>
                <div className={`rounded-tr-2xl  ${commonStyles}`}>
                  Security
                </div>
                <div className={commonStyles}>Ethereum</div>
                <div className={commonStyles}>Web 3.0</div>
                <div className={`rounded-bl-2xl  ${commonStyles}`}>
                  Low Fees
                </div>
                <div className={`rounded-br-2xl  ${commonStyles}`}>
                  Blockchain
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl md:h-[216px] sm:h-20 sm:w-72 md:w-[352px]  my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <div className="cursor-pointer">
                  {!addressVisibility ? (
                    <p
                      onClick={showAddress}
                      className="text-white font-light text-sm"
                    >
                      {shortenAddress(currentAccount)}
                    </p>
                  ) : (
                    <div
                      onClick={copyAddress}
                      onMouseLeave={showAddress}
                      className="text-center "
                    ><p className="text-left py-1 text-white text-xs font-light">Click to copy address to clipboard</p>
                      <p className="text-white font-light text-sm rounded-md border-2 blue-glassmorphism ">
                        {currentAccount}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {false ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
