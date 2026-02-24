import Head from "next/head";
import NotFound from "@/component/notFound";
import { baseURL } from "@/config";

function ShareEvent({ data, eventId }) {
  if (!data) return <NotFound />;

  // console.log('--------------', data, '-----------')
  return (
    <>
      <Head>
        <title>{data.eventName}</title>

        <meta property="og:type" content="website" />
        <meta property="og:title" content={data?.eventName} />
        <meta property="og:description" content={data?.eventDescription} />
        <meta property="og:image" content={data?.eventScreenshotImage} />
        <meta
          property="og:url"
          content={`${process.env.REACT_WEBVIEW_URL}event-details?eventId=${eventId}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data?.eventName} />
        <meta name="twitter:description" content={data?.eventDescription} />
        <meta name="twitter:image" content={data?.eventScreenshotImage} />
      </Head>

      {/* Optional redirect */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(function(){
              window.location.href = "/event-details?eventId=${eventId}";
            }, 1000);
          `,
        }}
      />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const eventId = query?.eventId ?? "";

  if (!eventId) {
    return { props: { data: null, eventId: null } };
  }

  try {
    const response = await fetch(
      `${baseURL}smartOffice/WebViewgetEventDetails?eventId=${eventId}`
    );
    const json = await response.json();
    const data = json?.result?.[0] || null;

    console.log(data,'--->')
    return { props: { data, eventId } };
  } catch {
    return { props: { data: null, eventId } };
  }
}

export default ShareEvent;