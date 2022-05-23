import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.scss";

import { LoginForm } from "../../../components/loginForm";
import { CadForm } from "../../../components/cadForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Auth: NextPage = () => {
  const [formCadastro, setFormCadastro] = useState(false);

  const router = useRouter();

  useEffect(() => {
    router.query.cadastro ? setFormCadastro(true) : setFormCadastro(false);
  }, [router.query]);
  return (
    <>
      <Head>
        <title>Vaagas - A sua oportunidade está aqui</title>
      </Head>
      <header className={styles.header__container}>
        <div className={styles.header__content}>
          <div className={styles.header__wrapper}>
            <Image src="/logo.svg" width={142} height={30} alt="Logo Vaagas" />

            <button
              type="button"
              className={`${styles.header__empresa} default__input`}
            >
              Sou uma empresa
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.auth__section}>
          <div className={styles.auth__container}>
            <div className={styles.auth__content}>
              {
                !formCadastro ?
                <LoginForm />
                :
                <CadForm/>
              }
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Auth;
