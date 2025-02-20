import "../styles/global.css";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/context/UserContext";
import { ShiftProvider } from "@/context/ShiftContext";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ShiftProvider>
          <Component {...pageProps} />
        </ShiftProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default MyApp;
