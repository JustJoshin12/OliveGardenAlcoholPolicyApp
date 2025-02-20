// jest.setup.js
import React from "react"; // Required for JSX in mocks
import "@testing-library/jest-dom";
import "whatwg-fetch"; // Polyfill for fetch

// Mock next-auth so that SessionProvider and useSession work without actual authentication
jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }) => <>{children}</>,
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock API functions to avoid real network calls during tests
jest.mock("@/utils/Api", () => ({
  sendLoginData: jest.fn(() => Promise.resolve({})),
  getEmployeeData: jest.fn(() => Promise.resolve([])),
  // ...other API functions can be added here as needed
}));

// Mock ShiftContext: provide both ShiftProvider and a dummy useShift hook
jest.mock("@/context/ShiftContext", () => ({
  ShiftProvider: ({ children }) => <>{children}</>,
  useShift: jest.fn(() => "Lunch"),
}));

// Polyfill for canvas getContext to satisfy components using a canvas (like SignatureCanvas)
// Now including a scale function to avoid errors from signature libraries.
// In jest.setup.js
HTMLCanvasElement.prototype.getContext = () => ({
  clearRect: jest.fn(),
  getImageData: jest.fn(),
  putImageData: jest.fn(),
  createImageData: jest.fn(),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillRect: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(), // ensure this exists
});
