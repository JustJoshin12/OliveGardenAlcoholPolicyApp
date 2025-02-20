import { useRouter } from "next/router";
import HomePage from "./home";
import SearchPage from "./searchpage";
import { useUser } from "@/context/UserContext";

const RootPage = () => {
  const { loggedIn, currentUser, login, logout } = useUser();

  return (
    <div>
      {loggedIn ? (
        <SearchPage
          loggedIn={loggedIn}
          logout={logout}
          currentManager={currentUser}
        />
      ) : (
        <HomePage loggedIn={loggedIn} login={login} />
      )}
    </div>
  );
};

export default RootPage;
