import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";


import { Ring } from "@uiball/loaders";

import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

const Profile: NextPage = () => {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [empresaMode, setEmpresaMode] = useState(false);

  const router = useRouter();

  function logout() {
    localStorage.clear();
    router.push("/");
  }

  function handler() {}

  return (
    <>
      <header className={styles.header__container}>
        <div className={styles.header__content}>
          <div className={styles.header__wrapper}>
            <Image src="/logo.svg" width={142} height={30} alt="Logo Vaagas" />

            <div className={styles.header__buttons}>
              <a onClick={() => logout()}>
                <Image
                  src="/images/header/logout.svg"
                  width={24}
                  height={24}
                  alt="Ícone de logout"
                />
              </a>

              {/* <Link href="/profile" passHref> */}
              <a
                onClick={() => {
                  router.push("/profile", "/user/profile");
                }}
              >
                <Image
                  src="/images/header/config.svg"
                  width={20}
                  height={20}
                  alt="Ícone de configuração"
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className={`${styles.form__section} section`}>
          <div className={styles.form__container}>
            <div className={styles.form__title}>
              <Link href="/empresa/dashboard" passHref>
                <a>
                  <FiArrowLeft size={28} color="#000410" />
                </a>
              </Link>
              <h1>Editar dados</h1>
            </div>
            <form onSubmit={handler} method="post">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                className={`default__input`}
                value={nome}
                onChange={(data) => setNome(data.target.value)}
                required
              />
              <input
                type="text"
                name="cpfCnpj"
                placeholder={empresaMode ? "CNPJ" : "CPF"}
                className={`default__input`}
                value={cpfCnpj}
                onChange={(data) => setCpfCnpj(data.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`default__input`}
                value={email}
                onChange={(data) => setEmail(data.target.value)}
                required
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                className={`default__input`}
                value={senha}
                onChange={(data) => setSenha(data.target.value)}
                required
              />
              <button
                type="submit"
                className={`${styles.form__button} default__input`}
              >
                {!isLoading ? "Cadastrar" : <Ring color="#000410" size={48} />}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
