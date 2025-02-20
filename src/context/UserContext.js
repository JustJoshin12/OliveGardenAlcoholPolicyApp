// context/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentManager, setCurrentManager] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setLoggedIn(true);
      setCurrentManager(session.user);
    } else {
      setLoggedIn(false);
      setCurrentManager(null);
    }
  }, [session, status]);

  const login = async ({ username, password }) => {
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    
    if (result) {
      console.error("Login error:", result.error || "Login failed");
      return;
    }
    return true;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    setLoggedIn(false);
    setCurrentManager(null);
  };

  return (
    <UserContext.Provider value={{ loggedIn, currentManager, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
