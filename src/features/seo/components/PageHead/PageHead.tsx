import React from "react";
import Head from "next/head";
import { DESCRIPTION, TITLE } from "../../constants";

type PageHeadProps = {
  title: string | null;
  description?: string | null;
};

export const PageHead = (props: PageHeadProps) => {
  const title = props.title ? `${props.title} | ${TITLE}` : TITLE;

  const description = props.description
    ? `${props.description} | ${DESCRIPTION}`
    : null;

  return (
    <Head>
      {title && <title key="title">{title}</title>}
      {description && (
        <meta key="description" name="description" content={description} />
      )}

      {title && <meta property="og:title" content={title} key="og-title" />}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="og-description"
        />
      )}
    </Head>
  );
};
