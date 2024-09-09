"use client";

import { useState } from "react";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterSchema = Yup.object().shape({
  nomeCompleto: Yup.string().required("Nome Completo é obrigatório"),
  endereco: Yup.string().required("Endereço é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha é obrigatória"),
  instituicao: Yup.boolean(),
});

export default function Register() {
  const [formError, setFormError] = useState("");
  const [profileImage, setProfileImage] = useState("/profilepic.svg");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setFormError("");
    console.log(values);
    try {
      const endpoint = values.instituicao
        ? "http://localhost:3001/instituicao" // Endpoint to create an institution
        : "http://localhost:3001/users"; // Endpoint to create a user

      const payload = values.instituicao
        ? { // Payload for creating an institution
            nome: values.nomeCompleto,
            email: values.email,
            senha: values.senha,
            endereco: values.endereco,
            fotoPerfil: profileImage,
          }
        : { // Payload for creating a user
            nome: values.nomeCompleto,
            email: values.email,
            senha: values.senha,
            endereco: values.endereco,
            fotoPerfil: profileImage,
          };

      const response = await axios.post(endpoint, payload);
      console.log(`${values.instituicao ? "Institution" : "User"} created successfully:`, response.data);
    } catch (error: any) {
      setFormError(error.response?.data?.message || `Erro ao criar ${values.instituicao ? "instituição" : "usuário"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-lightBlue to-darkBlue h-screen w-screen flex">
      <div className="h-screen w-1/2 bg-white flex items-center flex-col">
        <h1 className="text-lightBlue font-questrial text-8xl pt-7">Cadastro</h1>
        <div className="bg-lightBlue h-4/5 w-4/6 mt-5 rounded-2xl flex items-center flex-col overflow-hidden">
          <div className="relative w-32 h-32 mt-5 rounded-full overflow-hidden">
            <label
              htmlFor="file-upload"
              className="rounded-full top-2 right-2 cursor-pointer"
            >
              <Image
                src={profileImage}
                alt="Profile Image"
                objectFit="cover"
                height={140}
                width={140}
              />
            </label>
          </div>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
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
                    className="w-full h-12 rounded-full px-4 text-xl mt-3 font-questrial text-darkBlue outline-darkBlue"
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
                    className="w-full h-12 rounded-full px-4 text-xl mt-3 font-questrial text-darkBlue outline-darkBlue"
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
                    className="w-full h-12 rounded-full px-4 text-xl mt-3 font-questrial text-darkBlue outline-darkBlue"
                    type="email"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="relative flex justify-center w-full h-[15%] px-12 flex-col">
                  <label className="text-white font-questrial text-2xl">
                    Senha
                  </label>
                  <div className="relative w-full mt-3">
                    <Field
                      className="w-full h-12 rounded-full px-4 text-xl font-questrial text-darkBlue outline-darkBlue"
                      type={passwordVisible ? "text" : "password"}
                      name="senha"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-darkBlue text-xl"
                    >
                      {passwordVisible ? (
                        <Image
                          src="/hide.png"
                          alt="Hide password"
                          width={24}
                          height={24}
                        />
                      ) : (
                        <Image
                          src="/show.png"
                          alt="Show password"
                          width={24}
                          height={24}
                        />
                      )}
                    </button>
                  </div>
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
        <h1 className="text-white font-questrial text-9xl ml-52 mt-16">
          do ar.com
        </h1>
      </div>
    </div>
  );
}
