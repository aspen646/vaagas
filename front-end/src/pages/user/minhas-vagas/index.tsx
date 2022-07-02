import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import Modal from "react-modal";

import baseUrl from "../../../config/baseUrl";

import { Ring } from "@uiball/loaders";

import { FiArrowLeft } from "react-icons/fi";

const Empresa: NextPage = () => {
  const [data, setData] = useState([]);
  const [dataFavorito, setDataFavorito] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(-1);
  const router = useRouter();

  function logout() {
    localStorage.clear();
    router.push("/");
  }

  function deleteData(vaga_id: number) {
    setIsLoading(true);

    fetch(`${baseUrl}/action/candidatar`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("id"),
        vaga_id,
        status: 1,
      }),
    }).then((res) => {
      if (res.status == 200) {
        setIsLoading(false);
        Promise.resolve(res.json())
          .then((resolve) => {
            alert("Você cancelou a sua candidatura a esta vaga.");
          })
          .then(() => {
            loadData();
          });
      } else if (res.status == 400) {
        setIsLoading(false);
        Promise.resolve(res.json()).then((resolve) => {
          alert(resolve.data);
        });
      }
    });
  }

  function deleteFavorito(vaga_id: number) {
    setIsLoading(true);

    fetch(`${baseUrl}/action/favoritar`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("id"),
        vaga_id,
        status: 1,
      }),
    }).then((res) => {
      if (res.status == 200) {
        setIsLoading(false);
        Promise.resolve(res.json())
          .then((resolve) => {
            alert("Você desfavoritou esta vaga.");
          })
          .then(() => {
            loadDataFavorito();
          });
      } else if (res.status == 400) {
        setIsLoading(false);
        Promise.resolve(res.json()).then((resolve) => {
          alert(resolve.data);
        });
      }
    });
  }

  function loadData() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    fetch(`${baseUrl}/vaga/aplicadas/${localStorage.getItem("id")}`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res.status == 200) {
        Promise.resolve(res.json()).then((resolve) => {
          setData(resolve.data);
          setIsLoading(false);
        });
      } else if (res.status == 400) {
        Promise.resolve(res.json()).then((resolve) => {
          setIsLoading(false);
          alert(resolve.data);
        });
      }
      setIsLoading(false);
    });
  }

  function loadDataFavorito() {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    fetch(`${baseUrl}/vaga/favoritos/${localStorage.getItem("id")}`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res.status == 200) {
        Promise.resolve(res.json()).then((resolve) => {
          setDataFavorito(resolve.data);
          setIsLoading(false);
        });
      } else if (res.status == 400) {
        Promise.resolve(res.json()).then((resolve) => {
          setIsLoading(false);
          alert(resolve.data);
        });
      }
      setIsLoading(false);
    });
  }

  useEffect(() => {
    Modal.setAppElement("#__next");

    loadData();
    loadDataFavorito();
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

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
                  router.push("/profile", "/empresa/profile");
                }}
              >
                <Image
                  src="/images/header/config.svg"
                  width={20}
                  height={20}
                  alt="Ícone de configuração"
                />
              </a>
              {/* </Link> */}
              {/* <Link href="/empresa/vaga" passHref>
                <button
                  type="button"
                  className={`${styles.header__button} default__input`}
                >
                  Criar vaga
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className={`${styles.empresa__section} section`}>
          <Link href="/user/dashboard" passHref>
            <a>
              <FiArrowLeft size={28} color="#000410" />
            </a>
          </Link>
          <div className={styles.container}>
            <div
              className={`${styles.vagas__content} ${styles.vagas__candidatadas}`}
            >
              <h1>Vagas candidatadas</h1>
              <div
                className={`${styles.grid__vagas} ${
                  isLoading && styles.grid__loading
                }`}
              >
                {isLoading ? (
                  <div className={styles.grid__loading}>
                    <Ring color="#605eff" size={48} />
                  </div>
                ) : (
                  data.map((data: any) => (
                    <div className={styles.grid__item} key={data.vaga_id}>
                      <div className={styles.item__wrapper}>
                        <div className={styles.item__title}>
                          <h2>{data.nome}</h2>
                          <div className={styles.item__options}>
                            <a
                              className={styles.item__delete}
                              onClick={() => {
                                deleteData(data.vaga_id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="#000410"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeOpacity=".6"
                                  strokeWidth="1.5"
                                  d="M10.5 8.25V12M3 4.5h12l-1.185 10.665a1.5 1.5 0 0 1-1.491 1.335H5.676a1.5 1.5 0 0 1-1.491-1.335L3 4.5Zm2.509-2.14a1.5 1.5 0 0 1 1.356-.86h4.27a1.5 1.5 0 0 1 1.357.86L13.5 4.5h-9l1.009-2.14v0ZM1.5 4.5h15-15Zm6 3.75V12 8.25Z"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                        <span className={styles.item__tipo}>
                          {data.cidade == "" && data.estado == ""
                            ? "Remoto"
                            : `${data.cidade}, ${data.estado}`}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div
              className={`${styles.vagas__content} ${styles.vagas__favoritadas}`}
            >
              <h1>Vagas favoritadas</h1>
              <div
                className={`${styles.grid__vagas} ${
                  isLoading && styles.grid__loading
                }`}
              >
                {isLoading ? (
                  <div className={styles.grid__loading}>
                    <Ring color="#605eff" size={48} />
                  </div>
                ) : (
                  dataFavorito.map((data: any) => (
                    <div className={styles.grid__item} key={data.id}>
                      <div className={styles.item__wrapper}>
                        <div className={styles.item__title}>
                          <h2>{data.nome}</h2>
                          <div className={styles.item__options}>
                            <a
                              className={styles.item__delete}
                              onClick={() => {
                                deleteFavorito(data.vaga_id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="#000410"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeOpacity=".6"
                                  strokeWidth="1.5"
                                  d="M10.5 8.25V12M3 4.5h12l-1.185 10.665a1.5 1.5 0 0 1-1.491 1.335H5.676a1.5 1.5 0 0 1-1.491-1.335L3 4.5Zm2.509-2.14a1.5 1.5 0 0 1 1.356-.86h4.27a1.5 1.5 0 0 1 1.357.86L13.5 4.5h-9l1.009-2.14v0ZM1.5 4.5h15-15Zm6 3.75V12 8.25Z"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                        <span className={styles.item__tipo}>
                          {data.cidade == "" && data.estado == ""
                            ? "Remoto"
                            : `${data.cidade}, ${data.estado}`}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Empresa;
