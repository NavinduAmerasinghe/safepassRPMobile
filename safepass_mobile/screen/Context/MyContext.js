import React, { createContext, useState,useContext  } from 'react';

// Create a context
const MyContext = createContext();

// Create a context provider component
const MyContextProvider = ({ children }) => {
  const data = []; // Your initial data

  // You can define functions to modify the data here
  const addDataItem = (item) => {
    data.push(item)
  };

  return (
    <MyContext.Provider value={{ data,addDataItem  }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
  };

export { MyContext, MyContextProvider,useMyContext };
