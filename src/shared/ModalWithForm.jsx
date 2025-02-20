import { motion } from "framer-motion";
const ModalWithForm = ({
  children,
  onClose,
  title,
  buttonText,
  onSubmit,
  disabled,
}) => {
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
        className="relative bg-white max-w-[400px] w-full rounded-xl px-7 py-7 md:max-w-[500px] lg:max-w-[650px]"
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          type="button"
          onClick={onClose}
          className="h-6 w-6 absolute top-4 right-4 bg-[url('/images/closebutton.svg')] bg-cover lg:top-7 lg:right-7"
        />
        <h3 className="font-['SourceSeriff'] tracking-tighter font-bold text-2xl t-[26px] text-center pb-[40px] md:text-3xl lg:text-4xl">
          {title}
        </h3>
        <form onSubmit={onSubmit}>
          {children}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={disabled}
              className={`button ${!disabled ? "" : "button-disabled"}`}
            >
              {buttonText}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ModalWithForm;
