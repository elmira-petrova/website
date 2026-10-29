import React from "react";
import { PageHeaderHeightContext } from "./PageHeaderHeightContext";

export const usePageHeaderHeightContext = () =>
  React.useContext(PageHeaderHeightContext);
