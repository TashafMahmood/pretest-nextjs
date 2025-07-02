"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Image from "next/image";
import success from "../../../../../public/successLogo.svg";
import pending from "../../../../../public/pendingLogo.svg";
import copyIcon from "../../../../../public/copyIcon.svg";
import { status } from "../../../../lib/paymentsData";
import { useRouter, useSearchParams } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import axios from "axios";
import { getBrowserType } from "@/lib/functions";
import BrowserNotSupported from "@/component/BrowserNotSupported/BrowserNotSupported";
import FullScreenLoader from "@/component/FullScreenLoader/FullScreenLoader";
import ShimmerImage from "@/component/ShimmerImage/ShimmerImage";

const Success = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const BROWSER_TYPE = getBrowserType();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(transactionData?.transactionDetails?.txnid)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // hide after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    const txnId = searchParams.get("txnid");
    const token = localStorage.getItem("accessToken");

    if (!txnId) return;

    const handleSessionExpired = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userdata");
      localStorage.removeItem("trxId");
      router.push(
        transactionData?.networkClusterDetails?.networkClusterCode
          ? `/membership?nccode=${transactionData?.networkClusterDetails?.networkClusterCode}`
          : "/membership"
      );
      // router.push("/membership");
      // setIsOpen(false);
    };

    const fetchTransactionStatus = async () => {
      try {
        const res = await axios.get(
          `https://uftw2680orcg.elred.io/payment/getFinalPaymentStatus?txnid=${txnId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = res?.data?.result?.[0];
        setTransactionData(result);

        const status = result?.transactionDetails?.status?.toLowerCase();
        setIsPending(status === "pending");

        setLoading(false); // ✅ Set loading false here
      } catch (err) {
        console.error("Failed to fetch transaction status ❌", err);
        setError("Failed to fetch transaction status");

        if (err?.response?.data?.errorCode == 1) {
          handleSessionExpired(); // this triggers redirect
          return; // ⛔ stop execution and rendering
        }

        setLoading(false); // only call this if not session expired
      }
    };

    fetchTransactionStatus();
  }, [searchParams]);

  const handleGoHome = () => {
    router.push(
      `/membership/home?nccode=${transactionData?.networkClusterDetails?.networkClusterCode}`
    );
  };

  if (
    BROWSER_TYPE !== "Google Chrome" &&
    BROWSER_TYPE !== "ios" &&
    BROWSER_TYPE !== "safari mac" &&
    BROWSER_TYPE !== "Microsoft Edge" &&
    BROWSER_TYPE !== "Mozilla Firefox" &&
    BROWSER_TYPE !== "Unknown browser"
  ) {
    return <BrowserNotSupported />;
  }

  if (loading) return <FullScreenLoader />; // or a spinner

  return (
    <>
      <div className={style.container_div}>
        <div className={style.content_div}>
          <div className={style.title}>Transaction Details</div>
          {/* <Image src={isPending ? pending : success} alt="success" /> */}
          <div className={style.ntw_info}>
            <ShimmerImage
              src={transactionData?.networkClusterDetails?.logo}
              alt="Logo"
              width={28}
              height={28}
              className={style.ntw_info_logo}
            />
            <div className={style.ntw_info_name}>
              {transactionData?.networkClusterDetails?.name}
            </div>
          </div>
          <div className={style.parent_img}>
            <div className={style.imgWrapper}>
              {!loaded && <div className={style.shimmer} />}
              <Image
                src={isPending ? pending : success}
                alt="success"
                width={100}
                height={100}
                onLoadingComplete={() => setLoaded(true)}
                className={loaded ? style.visible : style.hidden}
              />
            </div>
          </div>
          {/* <div className={style.parent_img}>
            <div className={style.imgWrapper}>
              {!loaded && <div className={style.shimmer} />}
              <Image
                src={isPending ? pending : success}
                alt="success"
                onLoadingComplete={() => setLoaded(true)}
                fill
                className={`${style.image} ${
                  loaded ? style.visible : style.hidden
                }`}
              />
            </div>
          </div> */}

          <div className={style.titleTag}>
            {isPending ? "Pending" : "Success"}
          </div>
          <div className={style.details}>
            {isPending
              ? `Your payment of Rs. ${transactionData?.transactionDetails?.amount} for the yearly plan is pending now. Please avoid making a duplicate payment. Kindly check again after some time.`
              : `Your payment of Rs. ${transactionData?.transactionDetails?.amount} for the yearly plan is processed successfully.`}
          </div>

          <div className={style.trnsId}>Transaction ID</div>
          <div className={style.trnx}>
            <div>{transactionData?.transactionDetails?.txnid}</div>
            <div style={{ position: "relative" }}>
              <Image
                src={copyIcon}
                alt="copy"
                onClick={handleCopy}
                style={{ cursor: "pointer" }}
              />
              {copied && <div className={style.copied}>Copied!</div>}
            </div>
          </div>
          {/* <div className={style.homeBtn} onClick={handleGoHome}>
            <div className={style.home}>Home</div>
          </div> */}
        </div>

        <div className={style.bottom_wrapper}>
          <div className={style.donot_close}>
            Please do not click the Browser Back Button. Click the Home button
            to navigate to Home.
          </div>
          <div className={style.home_btn} onClick={handleGoHome}>
            Home
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Success);
