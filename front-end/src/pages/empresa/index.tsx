import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import baseUrl from "../../config/baseUrl";

import { Ring } from "@uiball/loaders";

const Empresa: NextPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function logout() {
    localStorage.clear();
    router.push("/auth?empresa=true");
  }

  useEffect(() => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    fetch(`${baseUrl}/vaga/empresa/${localStorage.getItem("id")}`, {
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
  }, []);

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
              <Link href="/configuration" passHref>
                <a>
                  <Image
                    src="/images/header/config.svg"
                    width={20}
                    height={20}
                    alt="Ícone de configuração"
                  />
                </a>
              </Link>
              <button
                type="button"
                className={`${styles.header__button} default__input`}
              >
                Criar vaga
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className={`${styles.empresa__section} section`}>
          <div className={styles.container}>
            <h1>Vagas criadas</h1>
            <div className={`${styles.grid__vagas} ${isLoading && styles.grid__loading}`}>
              {isLoading ? (
                <div className={styles.grid__loading}>
                  <Ring color="#605eff" size={48} />
                </div>
              ) : (
                data.map((data: any) => (
                  <div className={styles.grid__item} key={data.id}>
                    <div className={styles.item__wrapper}>
                      <div className={styles.item__title}>
                        <h2>{data.nome}</h2>
                        <div className={styles.item__options}>
                          <a className={styles.item__edit}>
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
                                d="m12.355 4.056 1.589 1.588-1.589-1.588Zm1.022-1.399L9.082 6.953a1.589 1.589 0 0 0-.435.811L8.25 9.75l1.986-.397c.307-.062.59-.213.811-.435l4.296-4.295a1.392 1.392 0 0 0-.451-2.267 1.39 1.39 0 0 0-1.515.301v0Z"
                              />
                              <path
                                stroke="#000410"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeOpacity=".6"
                                strokeWidth="1.5"
                                d="M14.25 11.25v2.25a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 13.5V5.25a1.5 1.5 0 0 1 1.5-1.5h2.25"
                              />
                            </svg>
                          </a>
                          <a className={styles.item__delete}>
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
                      <a className={styles.item__button}>
                        <span>Ver candidatos</span>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="#605EFF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M19 12H5m9 5 5-5m-5-5 5 5"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Empresa;
