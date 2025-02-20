import ModalWithForm from "@/shared/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";

const ManagerLoginModal = ({ onClose, isOpen, onLogin, onError,  }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onLogin({ username: values.username, password: values.password }).then(
      (loginSuccessful) => {
        if (!loginSuccessful) {
          onError();
        } else {
          onClose();
        }
      }
    );
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const isSubmitDisabled = !isValid

  return (
    <ModalWithForm
      onClose={onClose}
      disabled={isSubmitDisabled}
      onSubmit={handleSubmit}
      title="Manager Login"
      buttonText="Login"
    >
      <div className="pb-6">
        <label className="flex flex-col mb-[24px]">
          <p className="font-sourceSerif text-2xl mb-3 font-bold">UserName</p>
          <input
            className="border-black border-2 border-solid w-full rounded p-[2px] mb-[10px]"
            type="string"
            name="username"
            value={values.username || ""}
            minLength="5"
            required
            onChange={handleChange}
          />
          {errors.username && (
            <div className="text-red-500">{errors.username}</div>
          )}
        </label>
        <label className="">
          <p className="font-sourceSerif text-2xl mb-3 font-bold">Password</p>
          <input
            className="border-black border-2 border-solid w-full rounded p-[2px] mb-[10px]"
            type="password"
            name="password"
            value={values.password || ""}
            minLength="4"
            maxLength="15"
            required
            autoComplete="true"
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </label>
      </div>
    </ModalWithForm>
  );
};

export default ManagerLoginModal;
