'use client'

import { useState, useRef } from "react";
import Image from "next/image";
import logo from "../../../public/Doar.com 1.svg";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isInstitution, setIsInstitution] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    senha: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    console.log(values)
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email: values.email,
          senha: values.senha,
          userType: isInstitution ? "instituicao" : "user",
        }
      );
      console.log(response.data);
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 h-screen bg-gradient-to-r from-darkBlue to-lightBlue flex flex-col justify-center items-center">
        <Image src={logo} alt="Logo" width={400} height={400} />
        <h1 className="text-8xl text-white font-questrial">do ar.com</h1>
      </div>
      <div className="w-1/2 h-screen bg-white flex flex-col items-center justify-evenly">
        <h1 className="text-lightBlue text-7xl font-questrial">Login</h1>
        <div className="bg-lightBlue flex flex-col items-center justify-center w-[546px] h-fit py-10 rounded-2xl">
          <Formik
            initialValues={{ email: "", senha: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 w-full flex flex-col items-center">
                <div className="pt-10">
                  <h1 className="font-questrial text-white text-xl pb-5">E-mail</h1>
                  <Field
                    type="email"
                    name="email"
                    className="bg-white w-[460px] h-[56px] rounded-full text-darkBlue text-2xl px-2 outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="relative">
                  <h1 className="font-questrial text-white text-xl pb-5">Senha</h1>
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    name="senha"
                    className="bg-white w-[460px] h-[56px] rounded-full text-darkBlue text-2xl px-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="transform text-darkBlue text-xl"
                  >
                    {passwordVisible ? "🙈" : "👁️"}
                  </button>
                  <ErrorMessage
                    name="senha"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex justify-center mt-10">
                <input
                    type="checkbox"
                    id="instituicao"
                    name="instituicao"
                    className="w-10 h-10 text-lightBlue bg-darkBlue focus:ring-white font-questrial mr-5"
                    onChange={(e) => setIsInstitution(e.target.checked)}
                  />
                  <label
                    htmlFor="instituicao"
                    className="mr-4 text-white font-questrial text-[1.65rem]"
                  >
                    Sou uma instituição
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white w-[235px] h-[56px] border-4 border-darkBlue text-darkBlue text-4xl rounded-full font-questrial"
                >
                  Entrar
                </button>
              </Form>
            )}
          </Formik>
          <Link href="/Register">
            <button className="text-white text-3xl bg-transparent font-questrial mt-10">
              Não tem uma conta? Crie aqui!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
