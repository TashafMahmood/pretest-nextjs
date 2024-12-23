import React, { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import awfisBanner from "../../../public/awfis.svg";
import TextField from "@/component/TextField/TextField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PopUp from "@/component/PopUp/PopUp";
import axios from "axios";
import Loader from "@/component/Loader/Loader";

const NetworkWaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phone: "",
    countryCode: "+91",
  });

  console.log("Waiting list form deployed... 23 Dec 2024");

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false)

  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity

  const emailRegex = /^[^\s@]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

  // Check if all fields are valid
  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    isPhoneValid &&
    isEmailValid;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setIsEmailValid(emailRegex.test(value)); 
    }
  };

  const handleChange = (e, value, name) => {
    let phoneNumber = e?.replace(value?.dialCode, "").trim(); 

    setFormData((prev) => ({
      ...prev,
      countryCode: value?.dialCode,
      phone: phoneNumber || "",
    }));

    if (phoneNumber?.length >= 7) {
      setIsPhoneValid(true); 
    } else {
      setIsPhoneValid(false); 
    }
  };

  const onClearForm = () => {
    setFormData({
      name: "",
      email: "",
      companyName: "",
      phone: "",
      countryCode: "+91",
    });
    setIsPhoneValid(false);
    setIsEmailValid(true);
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}userPortalAdminAddToNetworkRequestPost`,
        {
          name: formData.name,
          email: formData.email,
          companyName: formData.companyName,
          countryCode: "+" + formData.countryCode,
          phone: formData.phone,
        }
      );

      if (res.status === 200) {
        const slackRes = await axios.post("/api/sendToSlack", {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
          companyName: formData.companyName,
        });

        if (slackRes.status === 200) {
          setSuccess(true);
          setPopup(true);
          setLoading(false);
        } else {
          console.error("Error sending message to Slack:", slackRes.data.error);
          setLoading(false);
        }

        setFormData({
          name: "",
          email: "",
          companyName: "",
          phone: "",
          countryCode: "91",
        });
        setIsPhoneValid(false);
        setIsEmailValid(true);
      }
    } catch (error) {
      if (error?.response?.data?.errorCode === 111) {
        setWarning(true);
        setPopup(true); 
      }else{
        setError(true);
        setPopup(true)
      }
      
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopup(false);
    setSuccess(false);
    setWarning(false);
    setError(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.main_cover}>
        <Image src={awfisBanner} alt="" id={styles.banner} />
        <div className={styles.container_div}>
          <div className={styles.form_title}>
            Form Request to be a part of AWFIS Network ({" "}
            <span className={styles.network_name}>R City Group</span> )
          </div>
          <div className={styles.indicator}>*Indicates required question</div>
          <TextField
            title={"Full name"}
            placeholder={"Enter your full name"}
            value={formData.name}
            onChange={onChangeHandler}
            name="name"
            type={"text"}
          />
          <TextField
            title={"Official Email ID"}
            placeholder={"Enter your Email ID"}
            value={formData.email}
            name="email"
            onChange={onChangeHandler}
            type={"email"}
          />
          {/* Show error message dynamically as user types */}
          {!isEmailValid && (
            <div className={styles.error_message}>
              Enter a valid email address
            </div>
          )}
          <TextField
            title={"Company / Organization Name"}
            placeholder={"Enter your Company/Organization name"}
            value={formData.companyName}
            name="companyName"
            onChange={onChangeHandler}
            type={"text"}
          />
          <div className={styles.input_lable}>
            Phone number that will receive OTP{" "}
            <span className={styles.imp}>*</span>
          </div>
          <PhoneInput
            onlyCountries={[
              "us",
              "in",
              "bh",
              "ca",
              "my",
              "fr",
              "pl",
              "la",
              "gb",
              "pt",
              "qa",
              "za",
            ]}
            preferredCountries={["in"]}
            value={`${formData.countryCode}${formData.phone}`}
            placeholder="Enter your Phone number"
            name="phone"
            onChange={(e, phone) => handleChange(e, phone, "phone")}
          />
          <div className={styles.clear_form}>
            <span onClick={onClearForm} style={{ cursor: "pointer" }}>
              Clear Form
            </span>
          </div>
          <div className={styles.bottom_div}>
            <div
              className={`${styles.submit_btn} ${
                !isFormValid || loading ? styles.disabled : ""
              }`}
              onClick={!isFormValid || loading ? null : submitForm}
              style={{
                cursor: !isFormValid || loading ? "not-allowed" : "pointer",
                backgroundColor:
                  !isFormValid || loading ? "#ff7780" : "#e72d38",
              }}
            >
              {loading ? <Loader /> : "Submit"}
            </div>
          </div>
        </div>
      </div>
      {popup && success && <PopUp success={true} setPopup={closePopup} />}
      {popup && warning && <PopUp warning={true} setPopup={closePopup} />}
      {popup && error && <PopUp error={true} setPopup={closePopup} />}
      {console.log(warning, "warning..")}
    </div>
  );
};

export default NetworkWaitlistForm;
