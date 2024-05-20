import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import biglogo from "../../assets/biglogo.png";

interface LoginCardProps {
  handleSubmit: (values: { email: string; password: string }) => void;
  error: string | null;
}

const LoginCard: React.FC<LoginCardProps> = ({ handleSubmit, error }) => {
  // Definir esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="bg-white mx-auto max-w-md py-8 px-7 shadow rounded-2xl">
      {error && <p className="text-red-500">{error}</p>}
      <div className="mx-4 mb-7 h-28">
        <img src={biglogo} alt="logo" />
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-5">
              <label className="font-sans text-lg">E-mail</label>
              <Field
                type="email"
                name="email"
                placeholder="@gmail.com"
                className="w-full p-4 bg-slate-200 rounded-lg mt-2 font-light"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-8">
              <label className="font-sans text-lg">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="****************"
                className="w-full p-4 bg-slate-200 rounded-lg mt-2 font-light"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-950 p-3 text-white text-lg rounded-lg font-sans"
              >
                Sign In
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginCard;
