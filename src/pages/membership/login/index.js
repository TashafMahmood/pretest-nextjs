"use client";
import React, { useState } from "react";
import style from "./index.module.css";
import PaymentHeader from "@/component/PaymentHeader/PaymentHeader";
import InputCountry from "@/component/InputCountry/InputCountry";
import OtpPage from "@/component/OtpPage/OtpPage";
import OTPloader from "@/component/OTPloader/OTPloader";
import withGuest from "@/hoc/withGuest";
import axios from "axios";

const Login = () => {
  const [number, setNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryPrefix, setCountryPrefix] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [otpPage, setOtpPage] = useState(false);


  const isDisabled = number.length < 10;

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://uftw2680orcg.elred.io/payment/sendPhoneOTP",
        {
          phoneNumber: countryPrefix + number,
          hashId: "elred",
        }
      );
      localStorage.setItem("trxId", res?.data?.result?.[0]?.transactionId);
      setLoading(false);
      setOtpPage(true);
      console.log(res?.data?.result?.[0]?.transactionId, "response");
    } catch (error) {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      const res = await axios.post(
        "https://uftw2680orcg.elred.io/payment/sendPhoneOTP",
        {
          phoneNumber: countryPrefix + number,
          hashId: "elred",
        }
      );
      localStorage.setItem("trxId", res?.data?.result?.[0]?.transactionId);
      setLoading(false);
      setOtpPage(true);
      console.log(res?.data?.result?.[0]?.transactionId, "response");
    } catch (error) {
      setLoading(false);
    }
  }

  
  return (
    <div className={style.container_div}>
      <>
        {otpPage ? (
          <OtpPage resendOtp={signIn}/>
        ) : (
          <>
            <PaymentHeader noDisplay={true} />
            <div className={style.sign_in}>Sign In</div>
            <div className={style.sign_in_text}>
              Enter the phone number used to sign up on ElRed.
            </div>
            <div className={style.input_wrapper}>
              <div className={style.phn_title}>Phone number</div>
              <InputCountry
                number={number}
                setNumber={setNumber}
                phoneError={phoneError}
                setPhoneError={setPhoneError}
                countryPrefix={countryPrefix}
                setCountryPrefix={setCountryPrefix}
              />
            </div>
            <div className={style.button_wrapper}>
              <div
                className={`${style.signin_btn} ${
                  isDisabled ? style.disabled_btn : ""
                }`}
                onClick={signIn}
              >
                Sign In
              </div>
            </div>
          </>
        )}
      </>
      {loading && <OTPloader />}
    </div>
  );
};

export default withGuest(Login);
