import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";

import baseUrl from "../../config/baseUrl";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  function handler(event: any) {
    event.preventDefault();

    fetch(`${baseUrl}/auth`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res.status == 200) {
        alert("deu bom");
      } else if (res.status == 400) {
        alert("erro");
      }
    });
  }

  return (
    <div className={`${styles.auth__form__container} container`}>
      <div className={styles.form__title}>
        <Image
          src="/images/auth/briefcase_icon.svg"
          width={36}
          height={36}
          alt="Emoji maleta"
        />
        <h1>A sua oportunidade está aqui.</h1>
        <p>Uma comunidade com mais de 8.000 vagas disponíveis todos os dias.</p>
      </div>
      <form onSubmit={handler} method="get">
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
        <input type="hidden" name="tipo" value="user" />
        <button
          type="submit"
          className={`${styles.form__button} default__input`}
        >
          Entrar
        </button>
        <div className={styles.form__cadastro}>
          <Link
            href={{ pathname: "/auth/user", query: { cadastro: "true" } }}
            passHref
          >
            <a>
              Não tem uma conta? <span>Registre-se</span>
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}
