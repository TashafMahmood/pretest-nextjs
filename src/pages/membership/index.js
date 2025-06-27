"use client";
import React, { useState } from "react";
import style from "./index.module.css";
import PaymentHeader from "@/component/PaymentHeader/PaymentHeader";
import OtpPage from "@/component/OtpPage/OtpPage";
import OTPloader from "@/component/OTPloader/OTPloader";
import withGuest from "@/hoc/withGuest";
import axios from "axios";
import ToastMessage from "@/component/ToastMessage/ToastMessage";
import { Spinner } from "react-bootstrap";
import { getBrowserType } from "@/lib/functions";
import BrowserNotSupported from "@/component/BrowserNotSupported/BrowserNotSupported";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [trnID, setTrnID] = useState("");
  const [toastError, setToastError] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [invalidError, setInvalidError] = useState("");

  const BROWSER_TYPE = getBrowserType();

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setInvalidError(false);
  
    if (value.length === 0) {
      setEmailError(""); // Clear error if input is empty
    } else if (!regex.test(value)) {
      setEmailError("Invalid Email id");
    } else {
      setEmailError(""); // Clear error for valid input
    }
  };
  
  const maskEmail = (email) => {
    if (!email || !email.includes("@")) return email;

    const [name, domain] = email.toLowerCase().trim().split("@");

    if (!name || !domain) return email;

    let visible = "";
    let masked = "";

    const len = name.length;

    if (len === 1) {
      visible = "";
      masked = "*";
    } else if (len === 2) {
      visible = name.slice(0, 1);
      masked = "*";
    } else if (len === 3) {
      visible = name.slice(0, 1);
      masked = "*".repeat(2);
    } else if (len === 4) {
      visible = name.slice(0, 2);
      masked = "*".repeat(2);
    } else {
      visible = name.slice(0, 3);
      masked = "*".repeat(len - 3);
    }

    return `${visible}${masked}@${domain}`;
  };

  const isDisabled = email.length === 0 || emailError !== "";

  const signIn = async () => {
    if (isDisabled) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "https://uftw2680orcg.elred.io/payment/sendEmailOTP",
        {
          email: email.toLowerCase().trim(),
        }
      );
      const transactionId = res?.data?.result?.[0]?.transactionId;
      setTrnID(transactionId);
      setLoading(false);
      setOtpPage(true);
    } catch (error) {
      if (error?.response?.data?.errorCode == 11) {
        setInvalidError(true);
      } else if (error?.response?.data?.errorCode == -1) {
        setToastErrorMessage("Something went wrong");
        setToastError(true);
        setTimeout(() => {
          setToastError(false);
          setToastErrorMessage(""); // Optional: clear message
        }, 3000);
      } else if (error?.response?.data?.errorCode == 113) {
        setToastErrorMessage(error?.response?.data?.message);
        setToastError(true);
        setTimeout(() => {
          setToastError(false);
          setToastErrorMessage(""); // Optional: clear message
        }, 3000);
      } else if (error?.response?.data?.errorCode == 115) {
        setToastErrorMessage(error?.response?.data?.message);
        setToastError(true);
        setTimeout(() => {
          setToastError(false);
          setToastErrorMessage(""); // Optional: clear message
        }, 3000);
      } else if (error?.response?.data?.errorCode == 104) {
        setToastErrorMessage(error?.response?.data?.message);
        setToastError(true);
        setTimeout(() => {
          setToastError(false);
          setToastErrorMessage(""); // Optional: clear message
        }, 3000);
      }
      console.log(error, "error");
      setLoading(false);
    }
  };

  const closeToast = () => {
    setToastError(false);
    setToastErrorMessage("");
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
      <>
        {otpPage ? (
          <OtpPage
            resendOtp={signIn}
            email={email.toLowerCase()}
            maskedEmail={maskEmail(email).toLowerCase()}
            transactionId={trnID}
            countryPrefix="" // not used if you're validating email
          />
        ) : (
          <>
            <PaymentHeader noDisplay={true} />
            <div className={style.sign_in}>Sign In</div>
            <div className={style.sign_in_text}>
              Enter your Email id used to sign up on el RED.
            </div>
            <div className={style.input_wrapper}>
              <div className={style.phn_title}>Email id</div>
              <input
                className={`${style.email_input} ${
                  emailError
                    ? style.invalid_input
                    : email
                    ? style.valid_input
                    : ""
                }`}
                placeholder="Your Email id"
                value={email}
                onChange={(e) => {
                  const lowercaseEmail = e.target.value.toLowerCase();
                  setEmail(lowercaseEmail);
                  validateEmail(lowercaseEmail);
                }}
                type="email"
              />
              {emailError && (
                <div className={style.error_text}>{emailError}</div>
              )}
              {invalidError && (
                <div className={style.error_text}>
                  The email is not used to create an account via the el RED App
                </div>
              )}
            </div>
            <div className={style.button_wrapper}>
              <div
                className={`${style.signin_btn} ${
                  isDisabled || loading ? style.disabled_btn : ""
                }`}
                onClick={!isDisabled && !loading ? signIn : undefined}
              >
                {loading ? (
                  <Spinner
                    animation="border"
                    className={style.submit_button_spinner}
                  />
                ) : (
                  "Sign In"
                )}
              </div>
            </div>
          </>
        )}
      </>
      {loading && <OTPloader />}
      {toastError && (
        <ToastMessage close={closeToast} message={toastErrorMessage} />
      )}
    </div>
  );
};

export default withGuest(Login);
