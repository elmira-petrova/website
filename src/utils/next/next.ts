import React from "react";
import { GetServerSideProps, NextPage } from "next";
import type { AppProps as NextAppProps } from "next/app";
import { GetServerSidePropsContext, GetStaticProps } from "next/types";
import { EmotionCache } from "@emotion/utils";

export type PageProps = object;

export type AppProps = NextAppProps<PageProps> & {
  Component: PageWithLayout;
  emotionCache: EmotionCache | undefined;
};

export type GetStaticPropsType = GetStaticProps<PageProps>;
export type GetServerSidePropsType = GetServerSideProps<PageProps>;

type GetLayout = (page: React.ReactElement) => React.ReactNode;

export const getLayoutFallback: GetLayout = (page) => page;

export type PageWithLayout<P = PageProps, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayout;
};

export const checkIsClientSideDataFetching = (
  context: GetServerSidePropsContext,
) => context.req.url?.startsWith("/_next");
