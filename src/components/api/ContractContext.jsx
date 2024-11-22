import React, { createContext, useState, useContext, useEffect } from "react";
import createInitialItemLog from "../Member/Contract/InitialItemLog";
import { AuthContext } from "./AuthContext";
import { useLocation } from "react-router-dom";

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { itemInfo } = location.state || {};

  console.log("Incontext user", user);
  console.log("Incontext asdfe", itemInfo);

  const [itemLog, setItemLog] = useState([]);

  useEffect(() => {
    if (user && itemInfo) {
      const agentInfo = {
        agentAddress: user?.agentAddress || "",
        agentName: user?.agentName || "",
        agentPhone: user?.agentPhone || "",
        registerID: user?.registerID || "",
        officeName: user?.officeName || "",
        registerDate: user?.registerDate || "",
      };

      const item = {
        area: itemInfo?.area || "",
        availableData: itemInfo?.availableData || "",
        bathroom: itemInfo?.bathroom || "",
        body: itemInfo?.body || "",
        buildingAddress: itemInfo?.buildingAddress || "",
        buildingType: itemInfo?.buildingType || "",
        floorInfo: itemInfo?.floorInfo || "",
        hosu: itemInfo?.hosu || "",
        image: itemInfo?.image || "",
        itemID: itemInfo?.itemID || "",
        itemType: itemInfo?.itemType || "",
        manageFee: itemInfo?.manageFee || "",
        member: itemInfo?.member || "",
        memberNumber: itemInfo?.memberNumber || "",
        memberOffice: itemInfo?.memberOffice || "",
        memberRegister: itemInfo?.memberRegister || "",
        owner: itemInfo?.owner || "",
        parking: itemInfo?.parking || "",
        priceMonthly: itemInfo?.priceMonthly || "",
        priceRental: itemInfo?.priceRental || "",
        roomCount: itemInfo?.roomCount || "",
        status: itemInfo?.status || "",
        tokenID: itemInfo?.tokenID || "",
        _id: itemInfo?._id || "",
      };

      const initialItemLog = createInitialItemLog(agentInfo, item);
      console.log("Generated initialItemLog:", initialItemLog);
      setItemLog(initialItemLog);
    }
  }, [user, itemInfo]);

  return (
    <ContractContext.Provider value={{ itemLog, setItemLog }}>
      {children}
    </ContractContext.Provider>
  );
};
