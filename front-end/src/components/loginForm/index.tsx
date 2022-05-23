import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";

import baseUrl from "../../config/baseUrl";

import { Ring } from "@uiball/loaders";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handler(event: any) {
    event.preventDefault();
    setIsLoading(true);

    fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        senha,
        tipo: "user",
      }),
    }).then((res) => {
      if (res.status == 200) {
        setIsLoading(false);
        Promise.resolve(res.json()).then((resolve) => {
          console.log(resolve.data);
        });
      } else if (res.status == 400) {
        setIsLoading(false);
        Promise.resolve(res.json()).then((resolve) => {
          alert(resolve.data);
        });
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
        <button
          type="submit"
          className={`${styles.form__button} default__input`}
        >
          {!isLoading ? "Entrar" : <Ring color="#000410" size={48} />}
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
