import { useEffect, useState } from "react";
import _ from "lodash";
import styles from "./OtpPage.module.scss";
import OTPInput from "react-otp-input";
import axios from "axios";
import toast from "react-simple-toasts";
import { useCountdownTimer } from "@/Hooks/useCountDownTimer";
import TitleText from "../TitleText/TitleText";
import { useRouter, useSearchParams } from "next/navigation";
import { formatPhoneNumber } from "@/lib/functions";
import ToastMessage from "../ToastMessage/ToastMessage";
import PaymentHeader from "../PaymentHeader/PaymentHeader";

const OtpPage = ({
  // number,
  reason,
  transactionId,
  resendOtp,
  setExisted,
  setDate,
  countryPrefix,
  email,
  maskedEmail,
}) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [otp, setOtp] = useState("");
  const [incorrectOtp, setIncorrectOtp] = useState(false);
  const [expiredOtp, setExpiredOtp] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const { timer, formatTime, resetTimer } = useCountdownTimer(60, startTimer);
  const [submittingOverlay, setSubmittingOverlay] = useState(false);
  const buttonDisabled = otp.length < 6;
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openToast, setOpenToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const nccode = searchParams.get("nccode");

  useEffect(() => {
    setStartTimer(true);
  }, []);

  const submitRequest = async () => {
    const data = {
      email,
      providedOTP: otp,
    };
    try {
      const res = await axios.post(
        `https://uftw2680orcg.elred.io/payment/verifyEmailOTP`,
        data
      );
      localStorage.setItem("accessToken", res?.data?.result?.[0]?.accessToken);
      localStorage.setItem("userdata", JSON.stringify(res?.data?.result?.[0]));

      if (nccode) {
        router.push(`/membership/home?nccode=${nccode}`);
      } else {
        router.push(`/membership/home`);
      }
    } catch (error) {
      if (error?.response?.data?.errorCode == -1) {
        setOtp("");
        setIncorrectOtp(true);
      } else if (error?.response?.data?.errorCode === 115) {
        setErrorMsg(error?.response?.data?.message);
        setOpenToast(true);
        setTimeout(() => {
          setOpenToast(false);
          setErrorMsg("");
        }, 3000);
      } else {
        console.log(error);
      }
    } finally {
      setSubmittingOverlay(false);
    }
  };

  let disabled = otp.length < 6;
  const handleChangeOTP = (value) => {
    const updatedOTP = value?.replace(/\D/g, "");
    if (updatedOTP) {
      setIncorrectOtp(false);
      setExpiredOtp(false);
    }
    setOtp(updatedOTP);
  };

  const focusOut = _.debounce(() => {
    document.activeElement.blur();
  }, 100);

  useEffect(() => {
    if (otp?.toString()?.length === 6 && window?.screen?.width <= 420)
      focusOut();
  }, [otp]);

  const closeToast = () => {
    setOpenToast(false);
    setErrorMsg("");
  };

  return (
    <>
      <PaymentHeader noDisplay />
      <div className={styles.mainPage}>
        <div className={styles.mainPageContent}>
          <TitleText title={"OTP Verification"} />
          <div className={styles.mainPageDesc}>
            We have sent OTP to your registered Email id{" "}
            <span>{maskedEmail}</span>
          </div>

          <div className={styles.otpInputLabel}>OTP</div>
          <div className={styles.otpInputWrapperDiv}>
            <OTPInput
              value={otp}
              onChange={handleChangeOTP}
              isInputNum
              numInputs={6}
              pattern="[0-9]*"
              inputType="number"
              renderInput={(props) => (
                <input
                  {...props}
                  className={
                    incorrectOtp || expiredOtp
                      ? `${styles.customInputOne} ${styles.borderError}`
                      : styles.customInputOne
                  }
                  type="text"
                  inputMode="decimal"
                  style={{
                    background: "#363638",
                    color: "white",
                    textAlign: "center",
                  }}
                />
              )}
            />
            {incorrectOtp && (
              <div className={styles.incorrectOtpError}>
                Invalid OTP entered
              </div>
            )}
            {expiredOtp && (
              <div className={styles.incorrectOtpError}>OTP expired</div>
            )}
          </div>

          {timer > 0 && startTimer ? (
            <div className={styles.otpTimeRemaining}>
              Time Remaining: {formatTime(timer)}
            </div>
          ) : (
            <div className={styles.resendOtpLinkContainer}>
              <span
                className={styles.resendOtpLinkTxt}
                onClick={() => {
                  resendOtp();
                  resetTimer();
                  setIncorrectOtp(false);
                  setOtp("");
                  setExpiredOtp(false);
                }}
              >
                Resend OTP
              </span>
            </div>
          )}
        </div>

        <div className={styles.bottom_wrapper}>
          <div className={styles.instruction}>
            <span className={styles.note}>Note</span> - Please check the OTP
            entered. ( you will have to wait for the timer to complete to
            request for a new OTP)
          </div>
          <div
            className={`${styles.verify_btn} ${
              disabled ? styles.disabled_btn : ""
            }`}
            onClick={!disabled ? submitRequest : undefined}
          >
            Verify
          </div>
        </div>
        {openToast && <ToastMessage close={closeToast} message={errorMsg} />}
      </div>
    </>
  );
};

export default OtpPage;
