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


const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [trnID, setTrnID] = useState("");
  const [toastError, setToastError] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [invalidError, setInvalidError] = useState("");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setInvalidError(false);
    if (!regex.test(value)) {
      setEmailError("Invalid Email id");
    } else {
      setEmailError("");
    }
  };

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    if (!name || !domain) return email;

    const visibleChars = name.slice(0, 3);
    const masked = "*".repeat(name.length - 3);
    return `${visibleChars}${masked}@${domain}`;
  };

  const isDisabled = email.length === 0 || emailError !== "";

  const signIn = async () => {
    if (isDisabled) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "https://uftw2680orcg.elred.io/payment/sendEmailOTP",
        {
          email,
        }
      );
      const transactionId = res?.data?.result?.[0]?.transactionId;
      setTrnID(transactionId);
      localStorage.setItem("trxId", transactionId);
      setLoading(false);
      setOtpPage(true);
      console.log(transactionId, "response");
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

  return (
    <div className={style.container_div}>
      <>
        {otpPage ? (
          <OtpPage
            resendOtp={signIn}
            email={email}
            maskedEmail={maskEmail(email)}
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
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
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
              {/* <div
                className={`${style.signin_btn} ${
                  isDisabled ? style.disabled_btn : ""
                }`}
                onClick={signIn}
              >
                Sign In
              </div> */}
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
