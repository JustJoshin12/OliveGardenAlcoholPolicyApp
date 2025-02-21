import { useState } from "react";
import { motion } from "framer-motion";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";

const SecretPasscodeModal = ({ onClose, onSuccess, onError }) => {
  // Use the form validation hook with an initial passcode value
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      passcode: "",
    });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPasscode = process.env.NEXT_PUBLIC_SECRET_PASSCODE;
    if (values.passcode === correctPasscode) {
      resetForm();
      onSuccess();
    } else {
      resetForm();
      onError();
    }
  };

  const isSubmitDisabled = !isValid;

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
          Enter Passcode
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="password"
            name="passcode"
            value={values.passcode || ""}
            onChange={handleChange}
            className="border border-gray-400 rounded p-2 mb-4 w-full max-w-xs"
            placeholder="Enter passcode"
            required
          />
          <button
            type="submit"
            className={`button ${!isSubmitDisabled ? "" : "button-disabled"}`}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SecretPasscodeModal;
