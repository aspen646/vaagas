import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";

import Modal from "react-modal";
import moment from "moment";
import "moment/locale/pt-br";

import baseUrl from "../../../config/baseUrl";

import { Ring } from "@uiball/loaders";

import { FiX } from "react-icons/fi";

const UserDashboard: NextPage = () => {
  const [data, setData] = useState([]);
  const [busca, setBusca] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const search = useRef<HTMLInputElement>(null);

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

  async function searchData(value: string) {
    await setBusca(value);
  }

  useEffect(() => {
    Modal.setAppElement("#__next");

    // search.current?.addEventListener("onChange", () => {
    //   loadData("search");
    //   setIsLoading(true);
    // });

    loadData("default");
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
            <input
              type="text"
              name="busca"
              id=""
              // ref={search}
              value={busca}
              onChange={(data) => {
                setBusca(data.target.value);
                loadData(data.target.value);
              }}
            />

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
              <Link href="/user/candidato" passHref>
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
                {data.map((vaga: any) => (
                  <div className={styles.item__menu} key={vaga.id}>
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
              <div className={styles.opened__vaga__content}></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserDashboard;
