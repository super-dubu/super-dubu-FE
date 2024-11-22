import React, { createContext } from 'react'
export const ContractContext = createContext();

export const ContractProvider = ({ children }) => { 

    

  return (
   <ContractContext.Provider>
     {children}
   </ContractContext.Provider>
  )
}
