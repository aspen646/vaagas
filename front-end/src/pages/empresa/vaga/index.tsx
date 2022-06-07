import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";

import { useEffect, useRef, useState } from "react";

import { Ring } from "@uiball/loaders";

import styles from "./styles.module.scss";

import baseUrl from "../../../config/baseUrl";

const NovaVaga: NextPage = () => {
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [descricao, setDescricao] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const router = useRouter();

  const checkbox = useRef<HTMLInputElement>(null);
  const cidadeEstadoGroup = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkbox.current?.addEventListener("change", () => {
      checkbox.current?.checked ? handleHOInput(true) : handleHOInput(false);
    });
  });

  useEffect(() => {
    if (router.query.id) {
      handleEdit();
    }
  }, [router.pathname]);

  function handleEdit() {
    setEditMode(true);
    setCargo(router.query.nome?.toString() || "");
    setSalario(router.query.salario?.toString() || "");
    setCidade(router.query.cidade?.toString() || "");
    setEstado(router.query.estado?.toString() || "");
    setDescricao(router.query.resumo?.toString() || "");
    setRequisitos(router.query.requisitos?.toString() || "");

    if (router.query.cidade == "" && router.query.estado == "") {
      checkbox.current!.checked = true;
      handleHOInput(true);
    }
  }

  function logout() {
    localStorage.clear();
    router.push("/");
  }

  function handleHOInput(state: boolean) {
    if (state) {
      cidadeEstadoGroup.current!.style.display = "none";
      setCidade("");
      setEstado("");
    } else {
      cidadeEstadoGroup.current!.style.display = "flex";
    }
  }

  function handler(event: any) {
    event.preventDefault();
    setIsLoading(true);

    if (!editMode) {
      fetch(`${baseUrl}/vaga/`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          empresa_id: localStorage.getItem("id"),
          nome: cargo,
          salario: parseInt(salario),
          cidade,
          estado,
          resumo: descricao,
          requisitos,
        }),
      }).then((res) => {
        if (res.status == 201) {
          setIsLoading(false);
          setCargo("");
          setSalario("");
          setCidade("");
          setEstado("");
          setDescricao("");
          setRequisitos("");
          checkbox.current!.checked = false;
          alert("Vaga criada com sucesso.");
          router.back();
        } else if (res.status == 400) {
          setIsLoading(false);
          Promise.resolve(res.json()).then((resolve) => {
            alert(resolve.data);
          });
        }
      });
    } else {
      fetch(`${baseUrl}/vaga/`, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: router.query.id?.toString(),
          empresa_id: localStorage.getItem("id"),
          nome: cargo,
          salario: parseInt(salario),
          cidade,
          estado,
          resumo: descricao,
          requisitos,
        }),
      }).then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          setCargo("");
          setSalario("");
          setCidade("");
          setEstado("");
          setDescricao("");
          setRequisitos("");
          checkbox.current!.checked = false;
          alert("Vaga alterada com sucesso.");
          router.back();
        } else if (res.status == 400) {
          setIsLoading(false);
          Promise.resolve(res.json()).then((resolve) => {
            alert(resolve.data);
          });
        }
      });
    }
  }

  return (
    <>
      <header className={styles.header__container}>
        <div className={styles.header__content}>
          <div className={styles.header__wrapper}>
            <Link href="/empresa/dashboard" passHref>
              <Image
                src="/logo.svg"
                width={142}
                height={30}
                alt="Logo Vaagas"
              />
            </Link>

            <div className={styles.header__buttons}>
              <a onClick={() => logout()}>
                <Image
                  src="/images/header/logout.svg"
                  width={24}
                  height={24}
                  alt="Ícone de logout"
                />
              </a>
              <Link href="/profile" passHref>
                <a>
                  <Image
                    src="/images/header/config.svg"
                    width={20}
                    height={20}
                    alt="Ícone de configuração"
                  />
                </a>
              </Link>
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
              <h1>Criar uma vaga</h1>
            </div>
            <form onSubmit={handler} method="get">
              <div className={styles.form__group}>
                <div className={styles.form__item}>
                  <label htmlFor="cargo">Cargo</label>
                  <input
                    type="text"
                    name="cargo"
                    placeholder="Cargo"
                    className={`default__input`}
                    value={cargo}
                    onChange={(data) => setCargo(data.target.value)}
                    required
                  />
                </div>
                <div className={styles.form__item}>
                  <label htmlFor="salario">Salário</label>
                  <input
                    type="text"
                    name="salario"
                    placeholder="Salário"
                    className={`${styles.input__little} default__input`}
                    value={salario}
                    onChange={(data) => setSalario(data.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.form__group}>
                <div className={`${styles.form__item} ${styles.checkbox}`}>
                  <label htmlFor="homeOffice">Esta vaga é home office?</label>
                  <input
                    type="checkbox"
                    name="homeOffice"
                    className={styles.input__checkbox}
                    ref={checkbox}
                  />
                </div>
              </div>
              <div className={styles.form__group} ref={cidadeEstadoGroup}>
                <div className={styles.form__item}>
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    placeholder="Cidade"
                    className={`default__input`}
                    value={cidade}
                    onChange={(data) => setCidade(data.target.value)}
                  />
                </div>
                <div className={styles.form__item}>
                  <label htmlFor="estado">Estado</label>
                  <input
                    type="text"
                    name="estado"
                    placeholder="Estado"
                    className={`${styles.input__little} default__input`}
                    value={estado}
                    onChange={(data) => setEstado(data.target.value)}
                  />
                </div>
              </div>
              <label htmlFor="descricao">Descrição</label>
              <textarea
                // type="textarea"
                name="descricao"
                placeholder="Conte um pouco sobre a vaga"
                className={`default__input`}
                value={descricao}
                onChange={(data) => setDescricao(data.target.value)}
                required
              />
              <label htmlFor="requisitos">
                Requisitos (separe por vírgula)
              </label>
              <textarea
                // type="textarea"
                name="requisitos"
                placeholder="Quais serão os requisitos para essa vaga?"
                className={`default__input`}
                value={requisitos}
                onChange={(data) => setRequisitos(data.target.value)}
                required
              />
              <button
                type="submit"
                className={`${styles.form__button} default__input`}
              >
                {!isLoading ? "Salvar" : <Ring color="#000410" size={48} />}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default NovaVaga;
