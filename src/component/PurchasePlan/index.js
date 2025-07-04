"use client";
import React, { useEffect, useState, useRef } from "react";
import style from "./index.module.css";
import Image from "next/image";
import verifyBadge from "../../../public/verifyWhiteBadge.svg";
import axios from "axios";
import { membershipData } from "@/constants/membershipData";
import { Spinner } from "react-bootstrap";

const PurchasePlan = ({ data }) => {
  const { memberShipDetails, networkClusterDetails, subscriptionDetails } =
    data;

  const [payuFormData, setPayuFormData] = useState(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true)
    const token = localStorage.getItem("accessToken");

    const makePayment = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await axios.post(
          "https://uftw2680orcg.elred.io/payment/makePaymentRequest",
          {
            networkClusterCode: networkClusterDetails?.networkClusterCode,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = res?.data?.result?.[0];
        if (result?.txnid) {
          localStorage.setItem("transactionId", result.txnid);
        }

        setPayuFormData(result);
      } catch (error) {
        console.log(error, "ERROR IN MAKE PAYMENT");
      }
    };

    if (networkClusterDetails?.networkClusterCode) {
      makePayment();
    }
  }, [networkClusterDetails?.networkClusterCode]);

  // const handlePayNow = () => {
  //   if (!payuFormData) {
  //     alert("Please wait while we prepare your payment.");
  //     return;
  //   }

  //   if (formRef.current) {
  //     formRef.current.submit();
  //   }
  // };

  const handlePayNow = () => {
    if (!payuFormData) {
      alert("Please wait while we prepare your payment.");
      return;
    }
  
    setLoading(true); // Show loader before redirect
  
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.submit(); // Submit PayU form after a tick
      }
    }, 100); // Small delay to ensure re-render happens
  };
  

  return (
    <>
      <div className={style.inner_div}>
        <div className={style.plan_container}>
          {networkClusterDetails?.logo && (
            <Image
              src={networkClusterDetails.logo}
              alt="network-logo"
              height={66}
              width={66}
              className={style.nw_logo}
            />
          )}
          <div className={style.network_name}>
            {networkClusterDetails?.name}
          </div>
          <div className={style.network_type}>
            <div className={style.name}>Premium Network</div>
          </div>
          <div className={style.network_membership}>Membership Fee</div>
          <div className={style.network_amount}>
            ₹
            <span className={style.numbers}>
              {subscriptionDetails?.membershipCost}
            </span>
            /Year
          </div>
        </div>

        <div className={style.benefits}>Membership Benefits</div>
        <div className={style.benefit}>
          <Image
            src={verifyBadge}
            alt="verified"
            className={style.verified_icon}
          />
          <div>
            <div className={style.b_title}>
              Access {networkClusterDetails?.numberOfGroups}+ Active Groups
            </div>
            <div className={style.b_desc}>
              Collaborate instantly with professionals across domains.
            </div>
          </div>
        </div>
        <div className={style.benefit}>
          <Image
            src={verifyBadge}
            alt="verified"
            className={style.verified_icon}
          />
          <div>
            <div className={style.b_title}>
              Connect with {networkClusterDetails?.numberOfMembers}+ Members
            </div>
            <div className={style.b_desc}>
              Discover opportunities, mentorship, and partnerships.
            </div>
          </div>
        </div>
        {membershipData?.map((item, id) => (
          <div className={style.benefit} key={id}>
            <Image
              src={verifyBadge}
              alt="verified"
              className={style.verified_icon}
            />
            <div>
              <div className={style.b_title}>{item?.title}</div>
              <div className={style.b_desc}>{item?.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={style.stickyBtnWrapper}>
        {/* <button className={style.stickyBtn} onClick={handlePayNow}>
          {loading ? (
            <Spinner
              animation="border"
              className={style.submit_button_spinner}
            />
          ) : (
            `Pay ₹${subscriptionDetails?.membershipCost} to Continue`
          )}
        </button> */}
        <button
          className={loading ? style.stickyBtnLoading : style.stickyBtn}
          onClick={handlePayNow}
          // disabled={loading}
        >
          {loading ? (
            <Spinner
              animation="border"
              className={style.submit_button_spinner}
            />
          ) : (
            `Pay ₹${subscriptionDetails?.membershipCost} to Continue`
          )}
        </button>
      </div>

      {/* Hidden PayU Form */}
      {payuFormData && (
        <form
          ref={formRef}
          action="https://secure.payu.in/_payment"
          method="post"
          style={{ display: "none" }}
        >
          {/* {console.log(payuFormData,'payuformdata...')} */}
          <input
            type="hidden"
            name="key"
            value={payuFormData?.transactionDetails?.key}
          />
          <input
            type="hidden"
            name="txnid"
            value={payuFormData?.transactionDetails?.txnid}
          />
          <input
            type="hidden"
            name="amount"
            value={payuFormData?.transactionDetails?.amount}
          />
          <input
            type="hidden"
            name="productinfo"
            value={payuFormData?.transactionDetails?.productinfo}
          />
          <input
            type="hidden"
            name="firstname"
            value={payuFormData?.transactionDetails?.firstname}
          />
          <input
            type="hidden"
            name="lastname"
            value={payuFormData?.transactionDetails?.lastname || ""}
          />
          <input
            type="hidden"
            name="email"
            value={payuFormData?.transactionDetails?.email}
          />
          <input
            type="hidden"
            name="phone"
            value={payuFormData?.transactionDetails?.phone}
          />
          <input
            type="hidden"
            name="surl"
            value={payuFormData?.transactionDetails?.surl}
          />
          {/* <input type="hidden" name="surl" value={"http://localhost:3000/membership/status/success"} /> */}
          <input
            type="hidden"
            name="furl"
            value={payuFormData?.transactionDetails?.furl}
          />
          {/* <input type="hidden" name="furl" value={`http://localhost:3000/membership/status/failed?txnid=${payuFormData?.transactionDetails?.txnid}`} /> */}
          <input
            type="hidden"
            name="hash"
            value={payuFormData?.transactionDetails?.hash}
          />
          <input
            type="hidden"
            name="udf1"
            value={payuFormData?.transactionDetails?.udf1 || ""}
          />
          <input
            type="hidden"
            name="udf2"
            value={payuFormData?.transactionDetails?.udf2 || ""}
          />
          <input
            type="hidden"
            name="drop_category"
            value={payuFormData?.transactionDetails?.drop_category || ""}
          />
        </form>
      )}
    </>
  );
};

export default PurchasePlan;
