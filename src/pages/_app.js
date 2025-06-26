import "@/styles/globals.css";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { LogoutProvider } from "@/context/LogoutContext";
import Head from "next/head";


console.log(" deployed...");
export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LogoutProvider>
        <Component {...pageProps} />
      </LogoutProvider>
    </>
  );
}
