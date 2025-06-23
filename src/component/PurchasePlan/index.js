// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import style from "./index.module.css";
// import Image from "next/image";
// import verifyBadge from "../../../public/verifyWhiteBadge.svg";
// import { membershipData } from "@/pages/membership/plan/membershipData";
// import axios from "axios";

// const PurchasePlan = ({ data }) => {
//   const { memberShipDetails, networkClusterDetails, subscriptionDetails } =
//     data;

//   const [payuFormData, setPayuFormData] = useState(null);
//   const formRef = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     const makePayment = async () => {
//       try {
//         const res = await axios.post(
//           "https://uftw2680orcg.elred.io/payment/makePaymentRequest",
//           {
//             networkClusterCode: networkClusterDetails?.networkClusterCode,
//             // plan: "yearly", // if required
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const result = res?.data?.result?.[0];
//         console.log(result, "RESPONSE FROM MAKE PAYMENT....");

//         if (result?.txnid) {
//           localStorage.setItem("transactionId", result.txnid);
//         }

//         setPayuFormData(result);

//         // Submit the form after setting state (with slight delay or directly)
//         setTimeout(() => {
//           if (formRef.current) {
//             formRef.current.submit();
//           }
//         }, 300); // slight delay to ensure state is set
//       } catch (error) {
//         console.log(error, "ERROR");
//       }
//     };

//     if (networkClusterDetails?.networkClusterCode) {
//       makePayment();
//     }
//   }, [networkClusterDetails?.networkClusterCode]);

//   const handlePayNow = () => {
//     if (formRef.current) {
//       formRef.current.submit();
//     }
//   };

//   return (
//     <>
//       <div className={style.inner_div}>
//         <div className={style.plan_container}>
//           {networkClusterDetails?.logo && (
//             <Image
//               src={networkClusterDetails.logo}
//               alt="network-logo"
//               height={66}
//               width={66}
//               className={style.nw_logo}
//             />
//           )}
//           <div className={style.network_name}>
//             {networkClusterDetails?.name}
//           </div>
//           <div className={style.network_type}>Premium Network</div>
//           <div className={style.network_membership}>Membership Fee</div>
//           <div className={style.network_amount}>
//             ₹
//             <span className={style.numbers}>
//               {subscriptionDetails?.membershipCost}
//             </span>
//             /Yr
//           </div>
//         </div>

//         <div className={style.benefits}>Membership Benefits</div>
//         {membershipData?.map((item, id) => (
//           <div className={style.benefit} key={id}>
//             <Image src={verifyBadge} alt="verified" />
//             <div>
//               <div className={style.b_title}>{item?.title}</div>
//               <div className={style.b_desc}>{item?.desc}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className={style.stickyBtnWrapper}>
//         <button className={style.stickyBtn} onClick={handlePayNow}>
//           Pay ₹{subscriptionDetails?.membershipCost} & Join Now
//         </button>
//       </div>

//       {/* Hidden PayU Form */}
//       {payuFormData && (
//         <form
//           ref={formRef}
//           action="https://test.payu.in/_payment"
//           method="post"
//           style={{ display: "none" }}
//         >
//           <input type="hidden" name="key" value={payuFormData.key} />
//           <input type="hidden" name="txnid" value={payuFormData.txnid} />
//           <input type="hidden" name="amount" value={payuFormData.amount} />
//           <input
//             type="hidden"
//             name="productinfo"
//             value={payuFormData.productinfo}
//           />
//           <input
//             type="hidden"
//             name="firstname"
//             value={payuFormData.firstname}
//           />
//           <input
//             type="hidden"
//             name="lastname"
//             value={payuFormData.lastname || ""}
//           />
//           <input type="hidden" name="email" value={payuFormData.email} />
//           <input type="hidden" name="phone" value={payuFormData.phone} />
//           <input type="hidden" name="surl" value={payuFormData.surl} />
//           <input type="hidden" name="furl" value={payuFormData.furl} />
//           <input type="hidden" name="hash" value={payuFormData.hash} />
//           <input type="hidden" name="udf1" value={payuFormData.udf1 || ""} />
//           <input type="hidden" name="udf2" value={payuFormData.udf2 || ""} />
//         </form>
//       )}
//     </>
//   );
// };

// export default PurchasePlan;

"use client";
import React, { useEffect, useState, useRef } from "react";
import style from "./index.module.css";
import Image from "next/image";
import verifyBadge from "../../../public/verifyWhiteBadge.svg";
import { membershipData } from "@/pages/membership/plan/membershipData";
import axios from "axios";

const PurchasePlan = ({ data }) => {
  const { memberShipDetails, networkClusterDetails, subscriptionDetails } = data;

  const [payuFormData, setPayuFormData] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const makePayment = async () => {
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
        console.log(result, "RESPONSE FROM MAKE PAYMENT");

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

  const handlePayNow = () => {
    if (!payuFormData) {
      alert("Please wait while we prepare your payment.");
      return;
    }

    if (formRef.current) {
      formRef.current.submit();
    }
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
          <div className={style.network_type}>Premium Network</div>
          <div className={style.network_membership}>Membership Fee</div>
          <div className={style.network_amount}>
            ₹
            <span className={style.numbers}>
              {subscriptionDetails?.membershipCost}
            </span>
            /Yr
          </div>
        </div>

        <div className={style.benefits}>Membership Benefits</div>
        {membershipData?.map((item, id) => (
          <div className={style.benefit} key={id}>
            <Image src={verifyBadge} alt="verified" />
            <div>
              <div className={style.b_title}>{item?.title}</div>
              <div className={style.b_desc}>{item?.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={style.stickyBtnWrapper}>
        <button className={style.stickyBtn} onClick={handlePayNow}>
          Pay ₹{subscriptionDetails?.membershipCost} & Join Now
        </button>
      </div>

      {/* Hidden PayU Form */}
      {payuFormData && (
        <form
          ref={formRef}
          action="https://test.payu.in/_payment"
          method="post"
          style={{ display: "none" }}
        >
          {/* {console.log(payuFormData,'payuformdata...')} */}
          <input type="hidden" name="key" value={payuFormData?.transactionDetails?.key} />
          <input type="hidden" name="txnid" value={payuFormData?.transactionDetails?.txnid} />
          <input type="hidden" name="amount" value={payuFormData?.transactionDetails?.amount} />
          <input type="hidden" name="productinfo" value={payuFormData?.transactionDetails?.productinfo} />
          <input type="hidden" name="firstname" value={payuFormData?.transactionDetails?.firstname} />
          <input type="hidden" name="lastname" value={payuFormData?.transactionDetails?.lastname || ""} />
          <input type="hidden" name="email" value={payuFormData?.transactionDetails?.email} />
          <input type="hidden" name="phone" value={payuFormData?.transactionDetails?.phone} />
          <input type="hidden" name="surl" value={payuFormData?.transactionDetails?.surl} />
          {/* <input type="hidden" name="surl" value={"http://localhost:3000/membership/status/success"} /> */}
          <input type="hidden" name="furl" value={payuFormData?.transactionDetails?.furl} />
          {/* <input type="hidden" name="furl" value={"http://localhost:3000/membership/status/failed"} /> */}
          <input type="hidden" name="hash" value={payuFormData?.transactionDetails?.hash} />
          <input type="hidden" name="udf1" value={payuFormData?.transactionDetails?.udf1 || ""} />
          <input type="hidden" name="udf2" value={payuFormData?.transactionDetails?.udf2 || ""} />
        </form>
      )}
    </>
  );
};

export default PurchasePlan;
