"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import PaymentHeader from "@/component/PaymentHeader/PaymentHeader";
import LogoutPayment from "@/component/LogoutPayment/LogoutPayment";
import { useLogout } from "@/context/LogoutContext";
import withAuth from "@/hoc/withAuth";
import FullScreenLoader from "@/component/FullScreenLoader/FullScreenLoader";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import HomeComponent from "@/component/HomeComponent/HomeComponent";
import { membershipStatusName } from "../../../lib/paymentsData";
import PurchaseCompleted from "@/component/PurchaseCompleted";
import PurchasePlan from "@/component/PurchasePlan";
import SessionExpired from "@/component/SessionExpired/SessionExpired";

import FreePlanComp from "@/component/FreePlanComp";
import InvalidNetworkComp from "@/component/InvalidNetwork/InvalidNetwork";
import LifetimeFreePlan from "@/component/LifetimeFreePlan";
import { getBrowserType } from "@/lib/functions";
import BrowserNotSupported from "@/component/BrowserNotSupported/BrowserNotSupported";
import Button from 'react-bootstrap/Button'
import ToastMessage from "@/component/ToastMessage/ToastMessage";
import { useRouter } from "next/navigation";

const Payments = () => {
  const searchParams = useSearchParams();
  const { isOpen, setIsOpen } = useLogout();
  const router = useRouter()
  const [state, setState] = useState({
    isLoading: true,
    hasNetworkCode: null,
    membershipStatus: null,
    data: [],
    errorCode: null,
  });
  const [renew, setRenew] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const BROWSER_TYPE = getBrowserType();


  useEffect(() => {
    const nccode = searchParams.get("nccode");

    setState((prev) => ({ ...prev, isLoading: true }));

    const fetchData = async () => {
      try {
        if (!nccode) {
          return setState({
            isLoading: false,
            hasNetworkCode: false,
            membershipStatus: null,
            data: [],
            errorCode: null,
          });
        }

        const token = localStorage.getItem("accessToken");
        const res = await axios.post(
          "https://uftw2680orcg.elred.io/payment/getNetworkMembershipStatus",
          { networkClusterCode: nccode },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setState({
          isLoading: false,
          hasNetworkCode: nccode,
          membershipStatus:
            res?.data?.result?.[0]?.memberShipDetails?.membershipStatus,
          data: res?.data?.result?.[0],
          errorCode: null,
        });
      } catch (error) {
        console.error("API ERROR:", error?.response?.data?.errorCode);
        if (error?.response?.data?.errorCode == -1) {
          setState({
            isLoading: false,
            hasNetworkCode: true,
            membershipStatus: null,
            data: [],
            errorCode: -1,
          });
        } else if (error?.response?.data?.errorCode == 1) {
          setState({
            isLoading: false,
            hasNetworkCode: true,
            membershipStatus: null,
            data: [],
            errorCode: 1,
          });
        } else {
          setState({
            isLoading: false,
            hasNetworkCode: false,
            membershipStatus: null,
            data: [],
            errorCode: error?.response?.data?.errorCode,
          });
        }
      }
    };

    const timer = setTimeout(fetchData, 50);
    return () => clearTimeout(timer);
  }, [searchParams]);


  // useEffect(() => {
  //   const nccode = searchParams.get("nccode");
  //   const handleStorageChange = () => {
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       // Redirect to login or show error
  //       router.push(nccode ? `/membership?nccode=${nccode}` : `/membership`)
  //       // window.location.href = "/membership/login";
  //     }
  //   };
  
  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, []);

  // useEffect(() => {
  //   const nccode = searchParams.get("nccode");
  
  //   const handleStorageChange = () => {
  //     const token = localStorage.getItem("accessToken");

  //     console.log(nccode,'NNNCCODEE....')
  //     if (!token) {
  //       setTimeout(() => {
  //         router.push(nccode ? `/membership?nccode=${nccode}` : `/membership`);
  //       }, 6000); // A small delay helps prevent race condition
  //     }
  //   };
  
  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
  
      const currentNccode = new URLSearchParams(window.location.search).get("nccode");
      console.log(currentNccode, 'NNNCCODEE....');
  
      if (!token) {
        setTimeout(() => {
          router.push(currentNccode ? `/membership?nccode=${currentNccode}` : `/membership`);
        },50); // slight delay for race condition handling
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  

  if (state.isLoading || state.hasNetworkCode === null) {
    return <FullScreenLoader />;
  }


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
    <div className={styles.container_div}>
      <PaymentHeader />
      
      {!state.isLoading && state.errorCode == 116 && <InvalidNetworkComp />}
      {!state.hasNetworkCode && state.errorCode == null && <HomeComponent />}
      {state.hasNetworkCode && state.errorCode == -1 && <InvalidNetworkComp />}
      {state.hasNetworkCode && state.errorCode == 1 && <SessionExpired />}

      {state.hasNetworkCode && renew ? (
        <PurchasePlan data={state?.data} />
      ) : (
        <>
          {state.membershipStatus === membershipStatusName?.ACTIVE && (
            <PurchaseCompleted data={state?.data} setRenew={setRenew} />
          )}

          {state.membershipStatus ===
            membershipStatusName?.PAYMENT_REQUIRED && (
            <PurchasePlan data={state?.data} />
          )}

          {state.membershipStatus === membershipStatusName?.FREE_NETWORK && (
            <FreePlanComp data={state?.data} />
          )}

          {state.membershipStatus ===
            membershipStatusName?.FREE_USER_SUBSCRIPTION && (
            <LifetimeFreePlan data={state?.data} />
          )}
        </>
      )}

      <LogoutPayment show={isOpen} onHide={() => setIsOpen(false)} />
    </div>
  );
};

export default withAuth(Payments);
