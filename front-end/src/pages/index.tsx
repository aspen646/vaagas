import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
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

export default Home;
