import { useState, useCallback } from "react";

export function useFormAndValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value, validationMessage } = event.target;

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));

    const form = event.target.closest("form");
    if (form) {
      setIsValid(form.checkValidity());
    }
  }, []);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
