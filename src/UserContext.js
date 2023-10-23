import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userdata, setUserData] = useState(null); // Initialize with null or initial user data

  return (
    <UserContext.Provider value={{ userdata, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
