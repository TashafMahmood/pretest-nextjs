import NotFound from "@/component/notFound";
import { baseURL, webviewURL } from "@/config";
import Head from "next/head";

function ShareNeed(props) {
  const { data, leadId, userCode } = props;

  if (!userCode && !leadId) {
    return <NotFound />;
  }
  return (
    <>
      <Head>
        <meta property="og:title" content={data?.leadTitle ?? ""} key="title" />
        <meta
          property="og:description"
          content={data?.leadsDescription ?? ""}
          key="description"
        />
        <meta
          property="og:image"
          content={data?.leadImageURL ?? "/"}
          key="image"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={`${webviewURL}/leads/responding-leads?leadId=${leadId}&userCode=${userCode}`}
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const leadId = query?.leadId ?? "";
  const leadOwner_userCode = query?.leadOwner_userCode ?? "";

  // webViewPreviewLeadScreenshot?leadId=64d9ebac27dce30ebad0888e&userCode=63e4912479b7c5496906094d

  const response = await fetch(
    `${baseURL}webViewPreviewLeadScreenshot?leadId=${leadId}&userCode=${leadOwner_userCode}`,
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

  console.log(
    leadOwner_userCode,
    "hhhhhhh",
    `${baseURL}webViewPreviewLeadScreenshot?leadId=${leadId}&userCode=${leadOwner_userCode}`,
    data
  );
  const result = data?.result && data?.result?.length && data?.result[0];

  return {
    props: { data: result, userCode: leadOwner_userCode, leadId }, // will be passed to the page component as props
  };
}
export default ShareNeed;
