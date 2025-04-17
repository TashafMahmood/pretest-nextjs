// import { baseURL, webviewURL } from "@/config";
// import Head from "next/head";

// import NotFound from "@/component/notFound";

// function ShareCard(props) {
//   const { data, userCode } = props;

//   if (!userCode) {
//     return <NotFound />;
//   }
//   return (
//     <>
//       <Head>
//         <meta property="og:image:type" content="image/png" />
//         <meta property="og:image:width" content="300" />
//         <meta property="og:image:height" content="300" />
//         <meta
//           property="og:image"
//           content={data?.cardImageURL ?? ""}
//           key="image"
//         />
//         <meta property="og:title" content={data?.cardTitle ?? ""} key="title" />
//         <meta property="og:description" content={data?.description ?? ""} />
//       </Head>
//       <div className="d-flex align-item-center justify-content-center height-100">
//         <iframe
//           allow="web-share"
//           src={`${webviewURL}share-card?userCode=${userCode}`}
//           className="iframe-cont"
//           title="W3Schools Free Online Web Tutorials"
//         ></iframe>
//       </div>
//     </>
//   );
// }

// export async function getServerSideProps({ res, query }) {
//   res.setHeader("Cache-Control", "no-store");
//   const userCode = query?.userCode ?? "";

//   const response = await fetch(
//     `${baseURL}noSessionPreviewCardScreenshot?userCode=${userCode}`,
//     {
//       cache: "no-cache",
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await response.json();
//   const result = data?.result && data?.result?.length && data?.result[0];

//   return {
//     props: { data: result ?? {}, userCode: userCode }, // will be passed to the page component as props
//   };
// }
// export default ShareCard;

import { useEffect } from "react";
import {
  baseURL,
  webviewURL,
  appDefaultHeader,
  appHeaderKey1,
  appHeaderKey2,
} from "@/config";
import Head from "next/head";
import NotFound from "@/component/notFound";

function ShareCard(props) {
  const { data, userCode, networkCode } = props;

  const truncateWithEllipses = (text) => {
    if (!text) return "";

    let title = text?.split(" ");
    let indexWithApostropheS = title.findIndex((word) => word.includes("'s"));
    let cardName = title
      .slice(2, indexWithApostropheS + 1)
      .join(" ")
      ?.replace(/'s/g, "");
    if (cardName?.length <= 10) return text;
    else {
      cardName = cardName?.slice(0, 10) + "...'s";
      title =
        title?.slice(0, 2)?.join(" ") +
        " " +
        cardName +
        " " +
        title?.slice(-4).join(" ");
      return title;
    }
  };

  useEffect(() => {
    window?.addEventListener("message", (event) => {
      if (event?.data?.message === "openDialPad") {
        const { phoneNumber } = event?.data;
        window?.open(`tel:${phoneNumber}`, "_self");
      }
    });
  }, []);

  if (!userCode && !networkCode) {
    return <NotFound />;
  }

  // function formatDescription(description) {
  //   if (!description) {
  //     return "";
  //   }

  //   // Extract the part after "Title: " if it exists
  //   const prefix = "Title: ";
  //   if (description.startsWith(prefix)) {
  //     const title = description.slice(prefix.length).trim(); // Extract the title part

  //     // Apply transformation based on length
  //     const formattedTitle =
  //       title.length <= 3
  //         ? title.toUpperCase() // Uppercase if length <= 3
  //         : title
  //             .split(" ")
  //             .map(
  //               (word) =>
  //                 word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //             )
  //             .join(" "); // Title case for longer titles

  //     return `${prefix}${formattedTitle}`; // Add the "Title: " prefix back
  //   }

  //   return description; // Return as is if no "Title: " prefix exists
  // }


  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image"
          content={data?.cardImageURL ?? ""}
          key="image"
        />
        <meta
          property="og:title"
          content={truncateWithEllipses(data?.cardTitle ?? "")}
          key="title"
        />
        {/* <meta property="og:description" content={data?.description ?? ""} /> */}
        <meta
          property="og:description"
          content={data?.description ?? ""}
          key="description"
        />
        {/* <meta
          property="og:description"
          content={formatDescription(data?.description)}
        /> */}
      </Head>
      <div className="d-flex align-item-center justify-content-center height-100">
        <iframe
          allow="web-share"
          src={
            userCode
              ? `${webviewURL}share-card?userCode=${userCode}`
              : `${webviewURL}network-share-card?networkCode=${networkCode}`
          }
          className="iframe-cont"
          title=""
        ></iframe>
      </div>
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", "no-store");
  const userCode = query?.userCode ?? "";
  const networkCode = query?.networkCode ?? "";

  let url = `${baseURL}`;
  if (userCode) {
    url += `noSessionPreviewCardScreenshot?userCode=${userCode}`;
  }

  if (networkCode) {
    url += `webviewGetNetworkScreenshot?networkCode=${networkCode}`;
  }

  const response = await fetch(url, {
    cache: "no-cache",
    method: userCode ? "POST" : "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      appDefaultHeader: Math.random() > 0.5 ? appHeaderKey1 : appHeaderKey2,
    },
  });

  const data = await response.json();
  const result = data?.result && data?.result?.length && data?.result[0];

  return {
    props: { data: result ?? {}, userCode: userCode, networkCode: networkCode }, // will be passed to the page component as props
  };
}
export default ShareCard;
