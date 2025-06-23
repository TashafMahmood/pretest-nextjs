import React, { useEffect, useState } from "react";
import style from "./plan.module.css";
import PaymentHeader from "@/component/PaymentHeader/PaymentHeader";
import PurchaseCompleted from "@/component/PurchaseCompleted";
import PurchasePending from "@/component/PurchasePending";
import { useLogout } from "@/context/LogoutContext";
import LogoutPayment from "@/component/LogoutPayment/LogoutPayment";
import withAuth from "@/hoc/withAuth";
import PurchasePlan from "@/component/PurchasePlan";

const Plan = () => {
  const [pending, setPending] = useState(false);
  const { isOpen } = useLogout();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setPending(false);
  //   }, 3000);
  // }, []);

  return (
    <>
      <div className={style.container_div}>
        <PaymentHeader />
        {pending ? <PurchasePlan /> : <PurchaseCompleted />}
        {isOpen && <LogoutPayment />}
      </div>
    </>
  );
};

export default withAuth(Plan);
