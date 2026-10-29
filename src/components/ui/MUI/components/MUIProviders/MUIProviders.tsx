import React from "react";
import { AppCacheProvider } from "@mui/material-nextjs/v16-pagesRouter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { EmotionCache } from "@emotion/utils";

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
});

type MUIProvidersProps = React.PropsWithChildren<{
  emotionCache: EmotionCache | undefined;
}>;

export const MUIProviders = (props: MUIProvidersProps) => {
  return (
    <AppCacheProvider emotionCache={props.emotionCache}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppCacheProvider>
  );
};
