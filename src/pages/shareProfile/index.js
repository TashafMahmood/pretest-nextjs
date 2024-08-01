import { baseURL, webviewURL } from "@/config";
import Head from "next/head";
import NotFound from "@/component/notFound";

function ShareProfile(props) {
  const { data, userCode } = props;

  if (!userCode) {
    return <NotFound />;
  }
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content={data?.profileTitle ?? ""}
          key="title"
        />
        <meta
          property="og:description"
          content={data?.description ?? ""}
          key="description"
        />
        <meta
          property="og:image"
          content={data?.cardImageURL ?? "/"}
          key="image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={`${webviewURL}?userCode=${userCode}`}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const userCode = query.userCode ?? "";

  const response = await fetch(
    `${baseURL}noSessionPreviewCardScreenshot?userCode=${userCode}`,
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const result = data?.result && data?.result?.length && data?.result[0];

  return {
    props: { data: result, userCode: userCode }, // will be passed to the page component as props
  };
}
export default ShareProfile;
