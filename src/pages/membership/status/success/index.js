"use client";

import React, { useEffect, useState } from "react";
import style from "./index.module.css";
import Image from "next/image";
import success from "../../../../../public/successLogo.svg";
import pending from "../../../../../public/pendingLogo.svg";
import copyIcon from "../../../../../public/copyIcon.svg";
import { status } from "../../../../lib/paymentsData";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";

const Success = () => {
  const transactionId = "2jdjmsjdn094-msdmdm3-mdk4728";
  const [copied, setCopied] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // hide after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsPending(false);
    }, 3000);
  }, []);

  const handleGoHome = () => {
    router.push("/payments");
  };

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
          <div>{transactionId}</div>
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
