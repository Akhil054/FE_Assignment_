import React, { createContext, useState } from 'react';

export const InvestmentContext = createContext();

export const InvestmentProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);

  const addInvestment = (investment) => {
    setInvestments(prevInvestments => [
      ...prevInvestments,
      { ...investment, id: Date.now().toString() } // Add a unique ID
    ]);
  };

  
  const removeInvestment = (investmentId) => {
    setInvestments(prevInvestments =>
      prevInvestments.filter(investment => investment.id !== investmentId)
    );
  };

  return (
    <InvestmentContext.Provider value={{ investments, addInvestment, removeInvestment }}>
      {children}
    </InvestmentContext.Provider>
  );
};