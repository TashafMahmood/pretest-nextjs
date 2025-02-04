import Head from "next/head";
import { deleteUserURL } from "@/config";

function DeleteUSerAccount() {
  return (
    <>
     <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />

        <meta property="og:title" content={"Elred Delete Account"} key="title" />
        <meta property="og:description" content={"Elred Webview Delete Account"} />
      </Head>

      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={deleteUserURL}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export default DeleteUSerAccount;
