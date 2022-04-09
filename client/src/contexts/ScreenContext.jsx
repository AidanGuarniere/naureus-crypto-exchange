import React, { createContext, useEffect, useState } from "react";

export const ScreenContext = createContext({});

export const ScreenProvider = (props) => {
  const [screen, setScreen] = useState("");

  const checkScreen = () => {
    const width = window.innerWidth;
    if (width > 700) {
      setScreen("desktop");
    } else {
      setScreen("mobile");
    }
  };

  useEffect(() => {
    checkScreen();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkScreen);
  });

  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      {props.children}
    </ScreenContext.Provider>
  );
};
