import { createContext, useContext, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { sendSignupData } from "@/utils/Api";
import { capitalizeFirstLetter } from "@/hooks/capitalizeFirstLetter";

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

    if (result.error || !result.ok) {
      console.error("Login error:", result.error || "Login failed");
      return false;
    }
    return true;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    setLoggedIn(false);
    setCurrentManager(null);
  };

  const signup = async ({ firstName, lastName, username, email, password }) => {
    try {
      const normalizedFirstName = capitalizeFirstLetter(firstName);
      const normalizedLastName = capitalizeFirstLetter(lastName);

      const response = await sendSignupData({
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        username,
        email,
        password,
      });

      // Automatically log the user in after a successful signup
      const loginResult = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (loginResult.error || !loginResult.ok) {
        console.error(
          "Auto login error:",
          loginResult.error || "Auto login failed"
        );
      }
      return response;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ loggedIn, currentManager, login, logout, signup }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
