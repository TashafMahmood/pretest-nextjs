// context/UserContext.js
import { createContext, useContext, useState } from "react";

const LogoutContext = createContext();

export const LogoutProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LogoutContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </LogoutContext.Provider>
  );
};

export const useLogout = () => useContext(LogoutContext);
