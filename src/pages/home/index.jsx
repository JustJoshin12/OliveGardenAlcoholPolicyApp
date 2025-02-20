import PageLayout from "@/shared/PageLayout";
import EmployeeChart from "@/shared/EmployeeChart";
import PolicyAgreementButtons from "./components/PolicyAgreement";
import Footer from "@/shared/Footer";
import PolicyModal from "@/pages/home/components/PolicyModal";
import AgreementModal from "@/pages/home/components/AgreementModal";
import ManagerLoginModal from "./components/ManagerLoginModal";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useShift } from "@/context/ShiftContext";
import { capitalizeFirstLetter } from "@/hooks/capitalizeFirstLetter";
import { sendEmployeeData, getEmployeeData } from "@/utils/Api";
import SpringModal from "@/shared/PopupModal";

const HomePage = () => {
  const shift = useShift();
  const { loggedIn, login } = useUser();
  const [employeeChartData, setEmployeeChartData] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [timeStamp, setTimeStamp] = useState(0);

  const handleErrorModal = () => {
    setActiveModal("error");
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };
  const handlePolicyModal = () => {
    setActiveModal("policy");
  };
  const handleReadPolicy = () => {
    setActiveModal("agreement");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const addEmployeeData = (data) => {
    const normalizedData = {
      ...data,
      firstName: capitalizeFirstLetter(data.firstName),
      lastName: capitalizeFirstLetter(data.lastName),
    };

    sendEmployeeData(normalizedData)
      .then((responseData) => {
        setEmployeeChartData([responseData, ...employeeChartData]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
        handleCloseModal();
        handleErrorModal();
      });
  };

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    setTimeStamp(formattedDate);
  }, []);

  useEffect(() => {
    getEmployeeData({ shift, timeStamp })
      .then((data) => {
        setEmployeeChartData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [shift, timeStamp]);

  return (
    <PageLayout>
      <>
        <main className="h-full w-full pb-12">
          <PolicyAgreementButtons
            loggedIn={loggedIn}
            onPolicy={handlePolicyModal}
          />
          <EmployeeChart employeeChartData={employeeChartData} />
        </main>

        <div className="flex items-center justify-center gap-5 md:justify-end">
          <p className="text-xl font-sourceSerif font-semibold md:text-2xl xl:text-3xl">
          Access Manager Portal
          </p>
          <button className="button" onClick={handleLoginModal}>
            Login
          </button>
        </div>

        <Footer />

        <AnimatePresence>
          {activeModal === "policy" && (
            <PolicyModal
              onClose={handleCloseModal}
              onAgreement={handleReadPolicy}
            />
          )}
          {activeModal === "agreement" && (
            <AgreementModal
              onClose={handleCloseModal}
              onAddData={addEmployeeData}
              isOpen={activeModal === "agreement"}
              shiftTime={shift}
              timeStamp={timeStamp}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeModal === "login" && (
            <ManagerLoginModal
              onClose={handleCloseModal}
              onLogin={login}
              onError={handleErrorModal}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeModal === "error" && (
            <SpringModal
              onClose={handleCloseModal}
              message="Incorrect username or password"
            />
          )}
        </AnimatePresence>
      </>
    </PageLayout>
  );
};

export default HomePage;
