import { useEffect, useRef, useState } from "react";
import ModalWithForm from "@/shared/ModalWithForm";
import { useFormAndValidation } from "@/hooks/useFormAndValidation";
import SignatureCanvas from "react-signature-canvas";

const AgreementModal = ({
  shiftTime,
  timeStamp,
  isOpen,
  onClose,
  onAddData,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const sigCanvasRef = useRef(null);

  const [hasSignature, setHasSignature] = useState(false);

  const handleClear = () => {
    sigCanvasRef.current.clear();
    setHasSignature(false);
  };

  const checkSignature = () => {
    if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
      setHasSignature(true);
    } else {
      setHasSignature(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || (sigCanvasRef.current && sigCanvasRef.current.isEmpty()))
      return;
    const imageData = sigCanvasRef.current.toDataURL();
    onAddData({
      firstName: values.firstName,
      lastName: values.lastName,
      signature: imageData,
      shiftTime,
      timeStamp,
    });
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
      if (sigCanvasRef.current) {
        sigCanvasRef.current.clear();
        setHasSignature(false);
      }
    }
  }, [isOpen, resetForm]);

  const isSubmitDisabled = !isValid || !hasSignature;

  return (
    <ModalWithForm
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Policy Agreement Signature"
      buttonText="Submit"
      disabled={isSubmitDisabled}
    >
      <div>
        <label>
          <p className=" text-xl font-['SourceSerif'] mb-[10px] font-[700] md:text-2xl">
            First Name
          </p>
          <input
            className="border-black border-2 border-solid w-full rounded p-[5px] mb-[10px]"
            type="text"
            name="firstName"
            minLength="4"
            maxLength="10"
            placeholder="first"
            required
            value={values.firstName || ""}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName}</span>
          )}
        </label>
        <label>
          <p className=" text-xl font-['SourceSerif'] mb-[10px] font-[700] md:text-2xl">
            Last Name
          </p>
          <input
            className="border-black border-2 border-solid w-full rounded p-[5px] mb-[10px]"
            type="text"
            name="lastName"
            minLength="4"
            maxLength="10"
            placeholder="last"
            required
            value={values.lastName || ""}
            onChange={handleChange}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName}</span>
          )}
        </label>
        <div className="mt-[10px] mb-[20px] ">
          <p className="text-xl font-sourceSerif font-bold mb-[15px] md:text-2xl">
            Signature
          </p>
          <div className="w-[100%] h-[150px] border-solid border-2 border-black md:h-[200px]">
            <SignatureCanvas
              ref={sigCanvasRef}
              penColor="black"
              canvasProps={{ className: "w-full h-full" }}
              onEnd={checkSignature}
            />
          </div>
          <span></span>
          <div className="flex justify-between pt-5">
            <button className="button" onClick={handleClear} type="button">
              Clear
            </button>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AgreementModal;
