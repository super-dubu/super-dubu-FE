import React from 'react'

export const ContractProvider = ({ children }) => { 

    
  return (
   <ContractContext.Provider>
     {children}
   </ContractContext.Provider>
  )
}
