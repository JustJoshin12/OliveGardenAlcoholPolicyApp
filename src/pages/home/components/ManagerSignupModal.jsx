import ModalWithForm from "@/shared/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";

const ManagerSignupModal = ({ onClose, isOpen, onSignup, onError }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSignup({
      firstName: values.firstname,
      lastName: values.lastname,
      username: values.username,
      email: values.email,
      password: values.password,
    }).then((signupSuccessful) => {
      if (!signupSuccessful) {
        onError();
      } else {
        onClose();
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const isSubmitDisabled = !isValid;

  return (
    <ModalWithForm
      onClose={onClose}
      disabled={isSubmitDisabled}
      onSubmit={handleSubmit}
      title="Manager Signup"
      buttonText="Register"
    >
      <div className="pb-6">
        <label>
          <p className="font-sourceSerif text-2xl mb-3 font-bold">First Name</p>
          <input
            className="border-black border-2 border-solid w-full rounded p-[2px] mb-[10px]"
            type="string"
            name="firstname"
            value={values.firstname || ""}
            minLength="3"
            required
            onChange={handleChange}
          />
          {errors.firstname && (
            <div className="text-red-500">{errors.firstname}</div>
          )}
        </label>
        <label>
          <p className="font-sourceSerif text-2xl mb-3 font-bold">Last Name</p>
          <input
            className="border-black border-2 border-solid w-full rounded p-[2px] mb-[10px]"
            type="string"
            name="lastname"
            value={values.lastname || ""}
            minLength="3"
            required
            onChange={handleChange}
          />
          {errors.lastname && (
            <div className="text-red-500">{errors.lastname}</div>
          )}
        </label>
        <label>
          <p className="font-sourceSerif text-2xl mb-3 font-bold">UserName</p>
          <input
            className="border-black border-2 border-solid w-full rounded p-[2px] mb-[10px]"
            type="string"
            name="username"
            value={values.username || ""}
            minLength="6"
            required
            onChange={handleChange}
          />
          {errors.username && (
            <div className="text-red-500">{errors.username}</div>
          )}
        </label>
        <label>
          <p className="font-sourceSerif text-2xl mb-3 font-bold">Email</p>
          <input
            className="border-black border-2 border-solid w-full rounded p-[2px] mb-[10px]"
            type="email"
            name="email"
            value={values.email || ""}
            minLength="6"
            required
            onChange={handleChange}
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </label>
        <label>
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

export default ManagerSignupModal;
