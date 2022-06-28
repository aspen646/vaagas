import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import Modal from "react-modal";
import moment from "moment";
import "moment/locale/pt-br";

import baseUrl from "../../../config/baseUrl";

import { Ring } from "@uiball/loaders";

import { FiX } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";

const UserDashboard: NextPage = () => {
  const [data, setData] = useState<any>([]);
  const [busca, setBusca] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectVaga, setSelectVaga] = useState(-1);

  const router = useRouter();

  function logout() {
    localStorage.clear();
    router.push("/");
  }

  function loadData(search: string) {
    if (search == "") {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      fetch(`${baseUrl}/vaga/todos/`, {
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
            if (resolve.data[0].id) {
              setSelectVaga(resolve.data[0].id);
            }
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
    } else if (search != "") {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      fetch(`${baseUrl}/vaga/todos/${search}`, {
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
  }

  function trimRequisitos(data: string) {
    let arrayHandler = data.split(",");

    return arrayHandler.map((item) => <li key={item}>{item}</li>);
  }

  function userCandidata(vaga_id: number) {
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
        status: 0,
      }),
    }).then((res) => {
      if (res.status == 200) {
        setIsLoading(false);
        Promise.resolve(res.json())
          .then((resolve) => {
            alert('Vaga favoritada com sucesso');
          });
          
      } else if (res.status == 400) {
        setIsLoading(false);
        Promise.resolve(res.json()).then((resolve) => {
          alert(resolve.data);
        });
      }
    });
  }

  function userFavorita(vaga_id: number) {
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
        status: 0,
      }),
    }).then((res) => {
      if (res.status == 200) {
        setIsLoading(false);
        Promise.resolve(res.json())
          .then((resolve) => {
            alert('Vaga favoritada com sucesso');
          });
          
      } else if (res.status == 400) {
        setIsLoading(false);
        Promise.resolve(res.json()).then((resolve) => {
          alert(resolve.data);
        });
      }
    });
  }

  useEffect(() => {
    Modal.setAppElement("#__next");

    // search.current?.addEventListener("onChange", () => {
    //   loadData("search");
    //   setIsLoading(true);
    // });

    loadData("");
  }, [router.pathname]);

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

            <div className={styles.header__input__wrapper}>
              <BiSearch size={24} color="#00041099" />
              <input
                type="text"
                name="busca"
                id=""
                // ref={search}
                value={busca}
                placeholder="Busque uma vaga"
                className={styles.heder__button__busca}
                onChange={(data) => {
                  setBusca(data.target.value);
                  loadData(data.target.value);
                }}
              />
              {busca != "" && (
                <a
                  onClick={() => {
                    setBusca("");
                    loadData("");
                  }}
                >
                  <FiX size={24} color="#00041099" />
                </a>
              )}
            </div>

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
              {/* </Link> */}
              <Link href="/user/minhas-vagas" passHref>
                <button
                  type="button"
                  className={`${styles.header__button} default__input`}
                >
                  Área do candidato
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className={`${styles.vagas__section} section`}>
          <div className={styles.vagas__container}>
            <span className={styles.descricao__container}>
              {busca == ""
                ? "Exibindo todas as vagas."
                : `Exibindo vagas de "${busca}".`}
            </span>
            <div className={styles.vagas__content}>
              <div className={styles.menu__content}>
                {data.map((vaga: any, index: number) => (
                  <div
                    className={`${styles.item__menu} ${
                      index == selectVaga && styles.active
                    }`}
                    key={vaga.id}
                    onClick={() => {
                      setSelectVaga(index);
                    }}
                  >
                    <div className={styles.item__wrapper}>
                      <div className={styles.empresa__estrela}>
                        <span className={styles.empresa}>{vaga.empresa}</span>
                      </div>
                      <h4 className={styles.vaga}>{vaga.nome}</h4>
                      <div className={styles.cidade__data}>
                        {vaga.cidade == "" && vaga.estado == "" ? (
                          <>
                            <span className={styles.cidade}>Remoto</span>
                            <span className={styles.data}>
                              {moment(vaga.data, "YYYYMMDDHHmmss").fromNow()}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className={styles.cidade}>
                              {`${vaga.cidade}, ${vaga.estado}`}
                            </span>
                            <span className={styles.data}>
                              {moment(vaga.data, "YYYYMMDDHHmmss").fromNow()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.opened__vaga__content}>
                {selectVaga != -1 && !isLoading && (
                  <div className={styles.opened__vaga__wrapper}>
                    <div className={styles.vaga__title__content}>
                      <div className={styles.title__content__text}>
                        <h2>{`${data[selectVaga].nome} - ${data[selectVaga].empresa}`}</h2>
                        <div className={styles.text__city}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="#000410"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeOpacity=".6"
                              strokeWidth="1.5"
                              d="m15 17 1-2-2.948-1.981-1.943-.124L10 14l2 3h3Z"
                              clipRule="evenodd"
                            />
                            <path
                              stroke="#000410"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeOpacity=".6"
                              strokeWidth="1.5"
                              d="M12.813 3.035a8.994 8.994 0 0 0-9.778 9.778c.372 4.279 3.872 7.779 8.151 8.151a8.993 8.993 0 0 0 9.778-9.778c-.372-4.278-3.872-7.778-8.151-8.151Z"
                              clipRule="evenodd"
                            />
                            <path
                              stroke="#000410"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeOpacity=".6"
                              strokeWidth="1.5"
                              d="M3.951 7.961 8 11l1.005-1.995L13 8l1.182-4.727"
                            />
                          </svg>

                          {/* <p>Governador Valadares - MG</p> */}
                          {data[selectVaga].cidade == "" &&
                          data[selectVaga].estado == "" ? (
                            <>
                              <p>Remoto</p>
                            </>
                          ) : (
                            <>
                              <p>
                                {`${data[selectVaga].cidade}, ${data[selectVaga].estado}`}
                              </p>
                            </>
                          )}
                        </div>
                        <p className={styles.text__salary}>
                          Salário{" "}
                          <span>{"R$ " + data[selectVaga].salario}</span>
                        </p>
                      </div>
                      <div className={styles.title__content__data}>
                        <div className={styles.data__buttons}>
                          <button
                            type="button"
                            className={styles.favoritar__button}
                            onClick={() => {
                              userFavorita(data[selectVaga].id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="#000410"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeOpacity=".8"
                                strokeWidth="1.5"
                                d="M12 17.235 6.179 20l1.209-6.12L3 9.392l6.179-.771L12 3l2.821 5.621L21 9.392l-4.388 4.488L17.821 20 12 17.235Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className={`${styles.candidatar__button} default__input`}
                            onClick={() => {
                              userCandidata(data[selectVaga].id);
                            }}
                          >
                            Candidatar
                          </button>
                        </div>
                        <span>Postado há 3 dias</span>
                      </div>
                    </div>
                    <div className={styles.vaga__body__content}>
                      <div className={styles.content__resume}>
                        <h4>Resumo da vaga</h4>
                        <p>{data[selectVaga].resumo}</p>
                      </div>
                      <div className={styles.content__requisitos}>
                        <h4>Requisitos</h4>
                        <ul>{trimRequisitos(data[selectVaga].requisitos)}</ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserDashboard;
