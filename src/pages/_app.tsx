import "../styles/global.scss";
import { Header } from "../components/Header";
import { Player } from "../components/Player";
import Lottie from "react-lottie";

import styles from "../styles/app.module.scss";
import React from "react";
import Router from "next/router";
import NProgress from "nprogress";

import animationData from "../../public/animations/poad-listen.json";
import { PlayerContext } from "../contexts/PlayerContext";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  const [episodeList, setEpisodeList] = React.useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  function playPoadcast(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

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

    const listenChanges = () => {
      Router.events.on("routeChangeStart", () => {
        NProgress.start(), start();
      });
      Router.events.on("routeChangeComplete", () => {
        NProgress.done(), end();
      });
      Router.events.on("routeChangeError", () => {
        NProgress.done(), end();
      });
    };

    listenChanges();

    return () => {
      listenChanges();
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        playPoadcast,
        isPlaying,
        togglePlay,
        setPlayingState,
      }}
    >
      <div className={styles.wrapper}>
        <main>
          <Header />
          {loading ? (
            <div className={styles.animation}>
              <Lottie
                options={defaultOptions}
                height={390}
                width={390}
                isClickToPauseDisabled={true}
              />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </main>

        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
