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
import FreePlan from "@/component/FreePlan";
import FreeUserSubscription from "@/component/FreeUserSubscription";
import FreePlanComp from "@/component/FreePlanComp";

const Payments = () => {
  const searchParams = useSearchParams();
  const { isOpen } = useLogout();
  const [state, setState] = useState({
    isLoading: true,
    hasNetworkCode: null,
    membershipStatus: null,
    data: [],
    errorCode: null,
  });
  const [renew, setRenew] = useState(false);

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
        console.error("API ERROR:", error);
        setState({
          isLoading: false,
          hasNetworkCode: false,
          membershipStatus: null,
          data: [],
          errorCode: "-1",
        });
      }
    };

    const timer = setTimeout(fetchData, 50);
    return () => clearTimeout(timer);
  }, [searchParams]);

  if (state.isLoading || state.hasNetworkCode === null) {
    return <FullScreenLoader />;
  }

  if (state.errorCode === "-1") {
    return <SessionExpired />;
  }

  return (
    <div className={styles.container_div}>
      <PaymentHeader />

      {!state.hasNetworkCode && <HomeComponent />}

      {/* {state.hasNetworkCode &&
        state.membershipStatus === membershipStatusName?.ACTIVE && (
          <PurchaseCompleted data={state?.data} setRenew={setRenew} />
        )}

      {state.hasNetworkCode &&
        (state.membershipStatus === membershipStatusName?.PAYMENT_REQUIRED ||
          renew) && <PurchasePlan data={state?.data} />}

      {state.hasNetworkCode &&
        state.membershipStatus === membershipStatusName?.FREE_NETWORK && (
          <FreePlan data={state?.data} />
        )}

      {state.hasNetworkCode &&
        state.membershipStatus ===
          membershipStatusName?.FREE_USER_SUBSCRIPTION && (
          <FreeUserSubscription data={state?.data} />
        )} */}

      {state.hasNetworkCode && renew ? (
        <PurchasePlan data={state?.data} />
      ) : (
        <>
          {state.membershipStatus ===
            membershipStatusName?.ACTIVE && (
            <PurchaseCompleted data={state?.data} setRenew={setRenew} />
          )}

          {state.membershipStatus ===
            membershipStatusName?.PAYMENT_REQUIRED && (
            <PurchasePlan data={state?.data} />
          )}

          {state.membershipStatus === membershipStatusName?.FREE_NETWORK && (
            <FreePlan data={state?.data} />
          )}

          {state.membershipStatus ===
            membershipStatusName?.FREE_USER_SUBSCRIPTION && (
            <FreeUserSubscription data={state?.data} />
          )}
        </>
      )}

      {isOpen && <LogoutPayment />}
    </div>
  );
};

export default withAuth(Payments);
