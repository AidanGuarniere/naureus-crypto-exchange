import { useState } from "react";
import {
  Navbar,
  Footer,
  Loader,
  Services,
  Transactions,
  Welcome,
} from "./components";
import { TransactionProvider } from "./contexts/TransactionContext.jsx";
import { ScreenProvider } from "./contexts/ScreenContext.jsx";
import "./App.css";

const App = () => {
  return (
    <ScreenProvider>
      <TransactionProvider>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        {/* <Services /> */}
        <Transactions />
        <Footer />
      </div>
      </TransactionProvider>
    </ScreenProvider>
  );
};

export default App;
