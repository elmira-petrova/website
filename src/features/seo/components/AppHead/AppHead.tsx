import React from "react";
import Head from "next/head";
import { Colors } from "../../../../constants/colors";
import { Images } from "../../../../components/Images/Images";
import { useRouter } from "../../../navigation/hooks/useRouter/useRouter";
import { Routes } from "../../../navigation/constants";
import { Config } from "../../../../constants/config";
import { DESCRIPTION, TITLE } from "../../constants";

const keywords = "";

export const AppHead = React.memo(() => {
  const router = useRouter();

  const isCurrentRouteForIndexingRobots = React.useMemo(() => {
    if (!router.isReady) return false;

    return Object.values<string>({
      ...Routes.PublicRoutes,
    }).includes(router.pathname);
  }, [router.isReady, router.pathname]);

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="color-scheme" content="only light" />
      <meta name="theme-color" content={Colors.BG} />

      <title key="title">{TITLE}</title>
      <meta key="description" name="description" content={DESCRIPTION} />

      <link rel="icon" href={Images.favicon.src} type="image/svg+xml" />

      <meta property="og:title" content={TITLE} key="og-title" />
      <meta
        property="og:description"
        content={DESCRIPTION}
        key="og-description"
      />
      <meta property="og:image" content="/logo192.png" key="og-image" />

      <meta name="keywords" content={keywords} />

      {!isCurrentRouteForIndexingRobots && (
        <meta key="robots" name="robots" content="noindex" />
      )}

      <meta
        name="app-revision"
        key="app-revision"
        content={Config.app.revision}
      />
    </Head>
  );
});
AppHead.displayName = "AppHead";
