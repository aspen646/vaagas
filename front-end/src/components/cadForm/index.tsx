import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

import { FiArrowLeft } from "react-icons/fi";

export function CadForm() {
  return (
    <div className={`${styles.auth__form__container} container`}>
      <div className={styles.form__title}>
        <Link href={"/auth/user"} passHref>
          <a>
            <FiArrowLeft size={28} color="#000410" />
          </a>
        </Link>
        <h1>Cadastro</h1>
      </div>
      <form action="" method="post">
        <input
          type="text"
          name="nome"
          id=""
          placeholder="Nome"
          className={`default__input`}
          required
        />
        <input
          type="text"
          name="cpfCnpj"
          id=""
          placeholder="CPF"
          className={`default__input`}
          required
        />
        <input
          type="email"
          name="email"
          id=""
          placeholder="Email"
          className={`default__input`}
          required
        />
        <input
          type="password"
          name="senha"
          id=""
          placeholder="Senha"
          className={`default__input`}
          required
        />
        <input type="hidden" name="tipo" value="user" />
        <button
          type="submit"
          id=""
          className={`${styles.form__button} default__input`}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
