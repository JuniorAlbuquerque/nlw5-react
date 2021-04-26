import { useEffect, useState } from "react";
import Link from "next/link";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import Router from "next/router";

import styles from "./styles.module.scss";

export function Header() {
  const [redirect, setRedirect] = useState(false);

  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  const handleRedirect = () => {
    if (Router.pathname !== "/") {
      setRedirect(true);
    } else {
      setRedirect(false);
    }
  };

  useEffect(() => {
    setRedirect(Router.pathname !== "/");
  });

  return (
    <header className={styles.headerContainer}>
      {redirect ? (
        <Link href="/">
          <img src="/logo.svg" alt="Poadcastr" onClick={handleRedirect} />
        </Link>
      ) : (
        <img src="/logo.svg" alt="Poadcastr" onClick={handleRedirect} />
      )}

      <p>O melhor para você ouvir sempre</p>

      <span>{currentDate}</span>
    </header>
  );
}
