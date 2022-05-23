import Link from "next/link";
import styles from "./styles.module.scss";

import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

import baseUrl from "../../config/baseUrl";

import { Ring } from "@uiball/loaders";

export function CadForm() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handler(event: any) {
    event.preventDefault();
    setIsLoading(true);

    fetch(`${baseUrl}/auth/cadastro`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        nome,
        cpfCnpj,
        email,
        senha,
        tipo: "user",
      }),
    }).then((res) => {
      if (res.status == 200) {
        setIsLoading(false);
        // alert("deu bom");
      } else if (res.status == 400) {
        setIsLoading(false);
        // alert("erro");
      }
    });
  }

  return (
    <div className={`${styles.auth__form__container} container`}>
      <div className={styles.form__title}>
        <Link href={"/auth"} passHref>
          <a>
            <FiArrowLeft size={28} color="#000410" />
          </a>
        </Link>
        <h1>Cadastro</h1>
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
          placeholder="CPF"
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
  );
}
