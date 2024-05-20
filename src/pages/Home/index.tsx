import React, { useState, useEffect } from "react";
import { login, saveToken } from "../../auth/authService";
import LoginCard from "../../components/LoginCard";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../auth/authService";

const Home: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (getToken() !== null) {
      navigate("/user");
    }
  }, []);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError(null);

    try {
      const response = await login(values.email, values.password);
      console.log("Login bem-sucedido:", response);
      saveToken(response.tokens.access);
      navigate("/user");
    } catch (error) {
      setError("Erro ao fazer login! Verifique suas credenciais.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-200">
      <LoginCard handleSubmit={handleSubmit} error={error} />
    </div>
  );
};

export default Home;
