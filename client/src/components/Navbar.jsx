import React, { useContext, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { ScreenContext } from "../contexts/ScreenContext";
import { TransactionContext } from "../contexts/TransactionContext";


import logo from "../../images/naureus-logo-1.png";

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { connectWallet, disconnectWallet, currentAccount } =
  useContext(TransactionContext);
  const { screen } = useContext(ScreenContext);

  return (
    <nav className="w-full flex justify-between items-center pr-8  py-4 md:px-6 md:py-4">
      <div className="= flex-initial justify-center items-center  md:mr-32">
        <img
          src={logo}
          alt="demo logo"
          className="w-38 h-24 md:w-42 md:h-28 cursor-pointer"
        />
      </div>
      <ul className="text-white md:absolute  list-none  text-xl  right-10 top-10">
        {currentAccount ? (
          <li
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            onClick={() => disconnectWallet()}
          >
            Log Out
          </li>
        ) : (
          <li
            className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
            onClick={() => connectWallet()}
          >
            Login
          </li>
        )}
      </ul>
      <div className="flex relative">
        <HiMenuAlt4
          className="text-white md:hidden cursor-pointer"
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu ? (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[73vw] h-screen shadow-2xl md:hidden list-none
        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                className="text-white md:hidden cursor-pointer"
                onClick={() => setToggleMenu(false)}
              />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="my-2 text-lg"
                />
              )
            )}
            <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
              Login
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
