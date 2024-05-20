import { render, screen, fireEvent, act } from "@testing-library/react";
import LoginCard from "../../components/LoginCard";
import "@testing-library/jest-dom";

const mockHandleSubmit = jest.fn();

describe("LoginCard", () => {
  it("renders the login form", () => {
    render(<LoginCard handleSubmit={mockHandleSubmit} error={null} />);

    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("****************")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<LoginCard handleSubmit={mockHandleSubmit} error={null} />);

    await act(async () => {
      fireEvent.click(screen.getByText("Sign In"));
    });

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    render(<LoginCard handleSubmit={mockHandleSubmit} error={null} />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("@gmail.com"), {
        target: { value: "cliente@youdrive.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("****************"), {
        target: { value: "password" },
      });
      fireEvent.click(screen.getByText("Sign In"));
    });

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      email: "cliente@youdrive.com",
      password: "password",
    });
  });

  it("shows error message when error prop is set", () => {
    render(<LoginCard handleSubmit={mockHandleSubmit} error="Login error" />);

    expect(screen.getByText("Login error")).toBeInTheDocument();
  });
});
