import React, { createContext, useState, useContext, useEffect } from "react";
import createInitialItemLog from "../Member/Contract/InitialItemLog";
import { AuthContext } from "./AuthContext";

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [itemLog, setItemLog] = useState([]);

  useEffect(() => {
    if (user) {
      const agentInfo = {
        agentAddress: user.agentAddress || "",
        agentName: user.agentName || "",
        agentPhone: user.agentPhone || "",
        registerID: user.registerID || "",
        officeName: user.officeName || "",
        registerDate: user.registerDate || "",
      };

      const initialItemLog = createInitialItemLog(agentInfo);
      setItemLog(initialItemLog);
    }
  }, [user]);

  return (
    <ContractContext.Provider value={{ itemLog, setItemLog }}>
      {children}
    </ContractContext.Provider>
  );
};