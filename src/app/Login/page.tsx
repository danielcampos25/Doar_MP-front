// EU02: "Eu como usuário quero fazer login com meus dados"
// EU12: "Eu como instituição quero fazer login com meus dados"

"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/Doar.com 1.svg";
import pfp from "../../../public/pfp.svg";
import hide from "../../../public/hide.png";
import show from "../../../public/show.png";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";

/**
 * Componente de página de Login.
 *
 * @component
 */
export default function Login() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isInstitution, setIsInstitution] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  /**
   * Manipula a mudança da imagem de perfil.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança do input.
   * @returns {void}
   *
   * @pre Um arquivo de imagem deve ser selecionado pelo usuário.
   * @post Atualiza o estado com a nova URL da imagem selecionada.
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  /**
   * Função para abrir o seletor de arquivos ao clicar na imagem de perfil.
   *
   * @returns {void}
   *
   * @pre O input de arquivo deve estar disponível no DOM.
   * @post Abre o seletor de arquivos.
   */
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Alterna a visibilidade da senha.
   *
   * @returns {void}
   *
   * @post Alterna o estado de visibilidade da senha entre visível e oculto.
   */
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  /**
   * Esquema de validação para o formulário de login.
   *
   * @constant
   */
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    senha: Yup.string().required("Required"),
  });

  /**
   * Função para processar o envio do formulário de login.
   *
   * @async
   * @param {object} values - Os valores do formulário.
   * @returns {Promise<void>}
   *
   * @pre O usuário deve fornecer um email e senha válidos.
   * @post Se o login for bem-sucedido, o token é armazenado no localStorage e o usuário é redirecionado.
   */
  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email: values.email,
        senha: values.senha,
        userType: values.userType,
      });

      const token = response.data.access_token;

      localStorage.setItem("token", token);
      console.log(response.data);
      alert("Login successful!");
      router.push("/Feed");
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
        <div className="bg-lightBlue flex flex-col items-center justify-evenly w-[546px] h-[770px] rounded-2xl">
          <div>
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                className="w-[200px] h-[200px] rounded-full object-cover"
              />
            ) : (
              <Image src={pfp} alt="pfp" width={200} height={200} />
            )}
          </div>

          <Formik
            initialValues={{ email: "", senha: "", userType: "user" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6 w-full flex flex-col items-center">
                <div>
                  <h1 className="font-questrial text-white text-xl">E-mail</h1>
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
                  <h1 className="font-questrial text-white text-xl">Senha</h1>
                  <Field
                    type={passwordVisible ? "text" : "password"}
                    name="senha"
                    className="bg-white w-[460px] h-[56px] rounded-full text-darkBlue text-2xl px-2 outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-[50%] transform text-darkBlue text-xl"
                  >
                    {passwordVisible ? (
                      <Image
                        src={hide}
                        alt="Hide password"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image
                        src={show}
                        alt="Show password"
                        width={24}
                        height={24}
                      />
                    )}
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
                    onChange={(e) =>
                      setFieldValue(
                        "userType",
                        e.target.checked ? "instituicao" : "user"
                      )
                    }
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
            <button className="text-white text-3xl bg-transparent font-questrial">
              Não tem uma conta? Crie aqui!
            </button>
          </Link>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
