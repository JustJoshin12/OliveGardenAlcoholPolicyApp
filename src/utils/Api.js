import { signIn } from "next-auth/react";
const APIEndPoint = "/api";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getEmployeeData = ({ shift, timeStamp }) => {
  return fetch(`${APIEndPoint}/signatureList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shift: shift,
      timestamp: timeStamp,
    }),
  }).then((res) => checkResponse(res));
};

export const sendEmployeeData = ({
  firstName,
  lastName,
  signature,
  shiftTime,
  timeStamp,
}) => {
  return fetch(`${APIEndPoint}/agreements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      signature: signature,
      shift: shiftTime,
      timeStamp: timeStamp,
    }),
  }).then((res) => checkResponse(res));
};

export const sendSignupData = ({ firstName, lastName, username, email, password }) => {
  return fetch(`/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  }).then((res) => checkResponse(res));
};