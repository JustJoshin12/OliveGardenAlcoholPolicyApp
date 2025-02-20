import { useState } from "react";
import { motion } from "framer-motion";

const PolicyModal = ({ onClose, onAgreement }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => setIsChecked(!isChecked);
  const animation = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 30, mass: 1 },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: { type: "spring", stiffness: 400, damping: 30, mass: 1 },
    },
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-black/70">
      <motion.div
        className="relative bg-white max-w-[650px] w-full rounded-lg px-7 pt-7 pb-9 z-10"
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          className="h-6 w-6 absolute top-7 right-7 bg-[url('/images/closebutton.svg')] bg-cover"
          onClick={onClose}
        />
        <h2 className="font-sourceSerif font-bold text-2xl text-center mt-6 mb-4 md:text-3xl xl:text-4xl">
          Enhanced Age Verification
        </h2>
        <p className="font-sourceSerif text-base tracking-tighter font-semibold text-center border-2 border-black bg-slate-300 p-4 sm:text-xl md:text-2xl xl:text-3xl md:p-12">
          I will check the ID of Each Guest who orders Alcohol and Appears to be
          under the age of 40. I will verify age using the age verification
          process - Either Ziosk, Scan at the Bar or Dash POS and outlined by
          the managers. I will not serve Alcohol to any guest who is under the
          age of 21. Failure to comply with this policy will result in
          termination of employment.
        </p>
        <div className="mt-[25px] flex justify-between">
          <button
            className={`button ${isChecked ? "" : "button-disabled"}`}
            type="button"
            disabled={!isChecked}
            onClick={onAgreement}
          >
            Agree
          </button>
          <div className="flex items-center">
            <input
              id="policy-checkbox"
              className="w-6 h-6 hover:cursor-pointer"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="policy-checkbox"
              className="font-sourceSerif tracking-tighter text-sm md:text-xl font-bold pl-[5px]"
            >
              I have read the policy above
            </label>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PolicyModal;
