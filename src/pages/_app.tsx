import "../styles/global.scss";
import { Header } from "../components/Header";
import { Player } from "../components/Player";
import Lottie from "react-lottie";

import styles from "../styles/app.module.scss";
import React from "react";
import Router from "next/router";
import NProgress from "nprogress";

import animationData from "../../public/animations/poad-listen.json";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", () => {
      NProgress.start(), start();
    });
    Router.events.on("routeChangeComplete", () => {
      NProgress.done(), end();
    });
    Router.events.on("routeChangeError", () => {
      NProgress.done(), end();
    });
    return () => {
      Router.events.off("routeChangeStart", () => {
        NProgress.start(), start();
      });
      Router.events.off("routeChangeComplete", () => {
        NProgress.done(), end();
      });
      Router.events.off("routeChangeError", () => {
        NProgress.done(), end();
      });
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        {loading ? (
          <div className={styles.animation}>
            <Lottie
              options={defaultOptions}
              height={380}
              width={380}
              isClickToPauseDisabled={true}
            />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </main>

      <Player />
    </div>
  );
}

export default MyApp;
