"use client";

import ReactToaster from "../partials/ReactToaster";
import { ReduxProvider } from "./ReduxProvider";
import { ThemeProvider } from "./ThemeProvider";

const Provider = ({ children }) => {
  return (
    <>
      <ReduxProvider>
        <ThemeProvider>
          {children}
          <ReactToaster />
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
};

export default Provider;
