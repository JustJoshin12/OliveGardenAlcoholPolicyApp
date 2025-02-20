import PageLayout from "@/shared/PageLayout";
import PolicyAgreementButtons from "../home/components/PolicyAgreement";
import EmployeeChart from "@/shared/EmployeeChart";
import Footer from "@/shared/Footer";
import SearchModal from "./components/SearchEmployeeModal";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getEmployeeData } from "@/utils/Api";
import SpringModal from "@/shared/PopupModal";

const SearchPage = () => {
  const { loggedIn, currentManager, logout } = useUser();
  const [activeModal, setActiveModal] = useState("");
  const [chartData, setChartData] = useState([]);

  const handleSearchModal = () => {
    setActiveModal("search");
  };

  const handleErrorModal = () => {
    setActiveModal("error");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const searchEmployeeData = (data) => {
    getEmployeeData(data)
      .then((responseData) => {
        setChartData(responseData);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
        handleErrorModal();
      });
  };

  console.log(currentManager);

  return (
    <PageLayout>
      <main>
        <PolicyAgreementButtons
          loggedIn={loggedIn}
          onSearch={handleSearchModal}
        />
        <EmployeeChart employeeChartData={chartData} />
      </main>
      <div className="flex pb-6 items-center gap-5 justify-evenly flex-row">
        <div className="flex text-xl gap-1 font-bold font-sourceSerif md:text-3xl">
          <p>Manager:</p>
          <p>{currentManager?.firstName + " " + currentManager?.lastName}</p>
        </div>

        <button className="button" onClick={logout}>
          LogOut
        </button>
      </div>
      <Footer />

      <AnimatePresence>
        {activeModal === "search" && (
          <SearchModal
            isOpen={activeModal === "search"}
            onClose={handleCloseModal}
            onSearchData={searchEmployeeData}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeModal === "error" && (
          <SpringModal
            isOpen={activeModal === "error"}
            onClose={handleCloseModal}
            message="Incorrect email and/or password"
          />
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default SearchPage;
