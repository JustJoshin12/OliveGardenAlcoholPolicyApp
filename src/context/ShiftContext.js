// ShiftContext.js
import { createContext, useContext, useEffect, useState } from "react";

const ShiftContext = createContext();

export const ShiftProvider = ({ children }) => {
  const [shift, setShift] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    setShift(currentHour >= 16 ? "Dinner" : "Lunch");
  }, []);

  return (
    <ShiftContext.Provider value={shift}>
      {children}
    </ShiftContext.Provider>
  );
};

export const useShift = () => useContext(ShiftContext);
