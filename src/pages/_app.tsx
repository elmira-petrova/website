import React from "react";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/lato";
import "@fontsource/konkhmer-sleokchher";
import "../utils/styles/styles";
import "../styles/index.scss";
import { AppProps, getLayoutFallback } from "../utils/next/next";
import { MUIProviders } from "../components/ui/MUI/components/MUIProviders/MUIProviders";
import { AppErrorBoundary } from "../components/errors/AppErrorBoundary/AppErrorBoundary";
import { ChunkLoadErrorBoundary } from "../components/errors/ChunkLoadErrorBoundary/ChunkLoadErrorBoundary";
import { ThrowOnError } from "../components/errors/ThrowOnError/ThrowOnError";
import { MainContentErrorBoundary } from "../components/errors/MainContentErrorBoundary/MainContentErrorBoundary";
import { PathPatternProvider } from "../features/navigation/components/PathPatternProvider/PathPatternProvider";
import { SmoothScroll } from "../features/navigation/components/SmoothScroll/SmoothScroll";
import { AppHead } from "../features/seo/components/AppHead/AppHead";
import { WindowSizeContextProvider } from "../utils/hooks/useWindowSize/WindowSizeContextProvider";
import { AppNavigationProgressIndicator } from "../features/navigation/components/AppNavigationProgressIndicator/AppNavigationProgressIndicator";
import { PageHeaderHeightContextProvider } from "../layouts/PageLayout/components/PageHeader/context/PageHeaderHeightContextProvider";

type CommonAppProps = React.PropsWithChildren;
export const CommonApp = (props: CommonAppProps) => {
  const { children } = props;

  return (
    <PathPatternProvider>
      <AppHead />

      <WindowSizeContextProvider>
        <SmoothScroll>
          <PageHeaderHeightContextProvider>
            {children}
          </PageHeaderHeightContextProvider>
        </SmoothScroll>
        <AppNavigationProgressIndicator />
      </WindowSizeContextProvider>
    </PathPatternProvider>
  );
};

export default function App(props: AppProps) {
  const Component = props.Component;

  const getLayout = Component.getLayout ?? getLayoutFallback;

  const { ...restPageProps } = props.pageProps;

  return (
    <AppErrorBoundary>
      <ChunkLoadErrorBoundary fallbackRender={ThrowOnError}>
        <MUIProviders emotionCache={props.emotionCache}>
          <CommonApp>
            {getLayout(
              <MainContentErrorBoundary>
                <Component {...restPageProps} />
              </MainContentErrorBoundary>,
            )}
          </CommonApp>
        </MUIProviders>
      </ChunkLoadErrorBoundary>
    </AppErrorBoundary>
  );
}
