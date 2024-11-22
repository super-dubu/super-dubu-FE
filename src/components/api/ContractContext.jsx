import React, { createContext, useState } from 'react'
export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    const [buildingInfo, setBuildingInfo] = useState(null);

    const updateBuildingInfo = (data) => {
        setBuildingInfo(data);
      };
    
  return (
   <ContractContext.Provider value={{ buildingInfo, updateBuildingInfo }}>
     {children}
   </ContractContext.Provider>
  )
}
