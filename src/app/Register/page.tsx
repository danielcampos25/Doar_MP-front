'use client'
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const RegisterSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required("Nome Completo é obrigatório"),
  endereco: Yup.string().required("Endereço é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
  instituicao: Yup.boolean(),
});

export default function Register() {
  const [formError, setFormError] = useState("");

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setFormError(""); // Clear previous error messages
    console.log(values)
    try {
      const response = await axios.post("http://localhost:3001/users", {
        nome: values.nomeCompleto,
        email: values.email,
        senha: values.senha,
        fotoPerfil: null,
        endereco: values.endereco,
      });
      console.log("User created successfully:", response.data);
    } catch (error: any) {
      setFormError(error.response?.data?.message || "Erro ao criar usuário");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-lightBlue to-darkBlue h-screen w-screen flex">
      <div className=" h-screen w-1/2 bg-white flex items-center flex-col">
        <h1 className=" text-lightBlue font-questrial text-8xl pt-7">
          Cadastro
        </h1>
        <div className=" bg-lightBlue h-4/5 w-4/6 mt-5 rounded-2xl flex items-center flex-col">
          <Image
            src={"/profilepic.svg"}
            alt="profile"
            height={140}
            width={140}
            className="mt-5"
          />
          <Image
            src={"/Camera.svg"}
            alt="cam"
            height={48}
            width={48}
            className=" absolute top-64 left-[31.5rem]"
          />
          <Formik
            initialValues={{
              nomeCompleto: "",
              endereco: "",
              email: "",
              senha: "",
              instituicao: false,
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 w-full">
                {formError && (
                  <div className="text-red-500 text-center">{formError}</div>
                )}

                <div className="flex justify-start w-full h-[15%] px-12 flex-col">
                  <label className="text-white font-questrial text-2xl">
                    Nome Completo
                  </label>
                  <Field
                    className="w-full h-12 rounded-full px-4 text-xl mt-3 text-darkBlue outline-darkBlue"
                    type="text"
                    name="nomeCompleto"
                  />
                  <ErrorMessage
                    name="nomeCompleto"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex justify-center w-full h-[15%] px-12 flex-col">
                  <label className="text-white font-questrial text-2xl">
                    Endereço
                  </label>
                  <Field
                    className="w-full h-12 rounded-full px-4 text-xl mt-3 text-darkBlue outline-darkBlue"
                    type="text"
                    name="endereco"
                  />
                  <ErrorMessage
                    name="endereco"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex justify-center w-full h-[15%] px-12 flex-col">
                  <label className="text-white font-questrial text-2xl">
                    E-mail
                  </label>
                  <Field
                    className="w-full h-12 rounded-full px-4 text-xl mt-3 text-darkBlue outline-darkBlue"
                    type="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex justify-center w-full h-[15%] px-12 flex-col">
                  <label className="text-white font-questrial text-2xl">
                    Senha
                  </label>
                  <Field
                    className="w-full h-12 rounded-full px-4 text-xl mt-3 text-darkBlue outline-darkBlue"
                    type="password"
                    name="senha"
                  />
                  <ErrorMessage
                    name="senha"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="flex justify-center mt-10">
                  <label
                    htmlFor="instituicao"
                    className="mr-4 text-white font-questrial text-[1.65rem]"
                  >
                    Sou uma instituição
                  </label>
                  <Field
                    type="checkbox"
                    id="instituicao"
                    name="instituicao"
                    className="w-10 h-10 text-lightBlue bg-darkBlue rounded focus:ring-white font-questrial"
                  />
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="bg-white hover:bg-darkBlue text-lightBlue font-questrial py-2 px-6 rounded-full text-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div>
        <Image
          src={"/Doar.com 1.svg"}
          alt="logo"
          height={400}
          width={400}
          className="ml-72 mt-36"
        />
        <h1 className=" text-white font-questrial text-9xl ml-52 mt-16">
          do ar.com
        </h1>
      </div>
    </div>
  );
}
