
import { render, waitFor, screen } from "@testing-library/react";
import ProfileInfo from "../../components/ProfileInfo";
import { getProfile, getToken } from "../../auth/authService";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("../../auth/authService", () => ({
  getProfile: jest.fn(),
  getToken: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ProfileInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading when profile is not fetched yet", async () => {
    render(<ProfileInfo />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("renders error message when fetching profile fails", async () => {
    (getProfile as jest.Mock).mockRejectedValueOnce(new Error("Error fetching profile"));
    render(<ProfileInfo />);
    await waitFor(() =>
      expect(screen.getByText("Erro ao carregar o perfil")).toBeInTheDocument()
    );
  });

  it("redirects to login page if user is not authenticated", async () => {
    (getToken as jest.Mock).mockReturnValueOnce(null);
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValueOnce(navigateMock);
    render(<ProfileInfo />);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("renders profile information when fetched successfully", async () => {
    const mockProfile = {
      name: "Cliente",
      email: "cliente@youdrive.com",
      avatar: { high: "profile.jpg" },
    };
    (getProfile as jest.Mock).mockResolvedValueOnce(mockProfile);
    render(<ProfileInfo />);
    await waitFor(() => {
      expect(screen.getByText("Cliente")).toBeInTheDocument();
      expect(screen.getByText("cliente@youdrive.com")).toBeInTheDocument();
    });
  });
});
