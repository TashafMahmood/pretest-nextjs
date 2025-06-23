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

const Success = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [error, setError] = useState("");

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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsPending(false);
  //   }, 3000);
  // }, []);

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

        const result = res?.data?.result?.[0];
        setTransactionData(result);
        if (result?.status?.toLowerCase() === "pending") {
          setIsPending(true);
        } else {
          setIsPending(false);
        }
      } catch (err) {
        console.error("Failed to fetch transaction status ❌", err);
        setError("Failed to fetch transaction status");
      }
    };

    fetchTransactionStatus();
  }, [searchParams]);

  const handleGoHome = () => {
    router.push(
      `/membership/home?nccode=${transactionData?.networkClusterDetails?.networkClusterCode}`
    );
  };

  console.log(transactionData, "9999");
  return (
    <div className={style.container_div}>
      <div className={style.title}>Transaction Details</div>
      <div className={style.content_div}>
        <Image src={isPending ? pending : success} alt="success" />
        <div className={style.titleTag}>
          {isPending ? "Pending" : "Success"}
        </div>
        <div className={style.details}>
          {isPending ? status?.PENDING_STATUS_DESC : status.SUCCESS_STATUS_DESC}
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

export default withAuth(Success);
