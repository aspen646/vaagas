import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.scss";

const Auth: NextPage = () => {
  return (
    <>
      <Head>
        <title>Vaagas - A sua oportunidade está aqui</title>
      </Head>

      <main>
        <section className={styles.auth__section}>
        </section>
      </main>
    </>
  );
};

export default Auth;
