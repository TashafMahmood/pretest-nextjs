"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Image from "next/image";
import failed from "../../../../../public/failedLogo.svg";
import copyIcon from "../../../../../public/copyIcon.svg";
import { useRouter, useSearchParams } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import axios from "axios";
import { getBrowserType } from "@/lib/functions";
import BrowserNotSupported from "@/component/BrowserNotSupported/BrowserNotSupported";

const Failed = () => {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState("");

  const BROWSER_TYPE = getBrowserType();

  useEffect(() => {
    const txnId = searchParams.get("txnid");
    const token = localStorage.getItem("accessToken");

    if (!txnId) return;

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

        setTransactionData(res?.data?.result?.[0]);
      } catch (err) {
        console.error("Failed to fetch transaction status ❌", err);
        setError("Failed to fetch transaction status");
      }
    };

    fetchTransactionStatus(); // 🔁 call it immediately
  }, [searchParams]);

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

  return (
    <div className={style.container_div}>
      <div className={style.title}>Transaction Details</div>
      <div className={style.content_div}>
        <Image src={failed} alt="failed" />
        <div className={style.titleTag}>Failed</div>
        <div className={style.details}>
          Your payment of Rs. {transactionData?.transactionDetails?.amount} for the yearly plan is failed. Please try again.
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
        <div className={style.homeBtn} onClick={handleGoHome}>
          <div className={style.home}>Home</div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Failed);
