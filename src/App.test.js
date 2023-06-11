import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders the QR Code Generator app correctly", () => {
  render(<App />);

  // Assert that the main heading is rendered
  const headingElement = screen.getByText(/QR CODE GENERATOR/i);
  expect(headingElement).toBeInTheDocument();

  // Assert that the initial URL value is rendered
  const urlInput = screen.getByLabelText(/URL/i);
  expect(urlInput).toHaveValue("https://fme.edu.vn");

  // Simulate changing the URL input value
  userEvent.type(urlInput, "example.com");
  expect(urlInput).toHaveValue("https://fme.edu.vnexample.com");

  // Simulate changing the brand select value
  const brandSelect = screen.getByLabelText(/Brand/i);
  userEvent.selectOptions(brandSelect, "fmeTravel");
  expect(brandSelect).toHaveValue("fmeTravel");

  // Assert that the QR code is rendered
  const qrCode = screen.getByRole("img");
  expect(qrCode).toBeInTheDocument();

  // Simulate clicking the download button
  const downloadButton = screen.getByText(/Download/i);
  userEvent.click(downloadButton);

  // Assert that the download action is triggered
  // You can use mocking or assertions specific to your download implementation

  // Add more assertions as needed for your specific component functionality
});
