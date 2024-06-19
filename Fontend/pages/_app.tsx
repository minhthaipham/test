import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Header from "@/components/Header/Header";
import React from "react";
import { ThirdwebProvider } from "thirdweb/react";
export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <ThirdwebProvider>
        <SocketProvider url="http://localhost:5000">
          <AuthProvider>
            <Provider store={store}>
              <Header>
                <Component {...pageProps} />
              </Header>
              <ToastContainer />
            </Provider>
          </AuthProvider>
        </SocketProvider>
      </ThirdwebProvider>
    )
  );
}
