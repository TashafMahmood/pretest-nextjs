// import React, { useState } from "react";
// import styles from "./index.module.css";
// import Image from "next/image";
// import awfisBanner from "../../../public/awfis.svg";
// import TextField from "@/component/TextField/TextField";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import PopUp from "@/component/PopUp/PopUp";
// import axios from "axios";
// import Loader from "@/component/Loader/Loader";

// const NetworkWaitlistForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     companyName: "",
//     phone: "",
//     countryCode: "",
//   });

//   const [isPhoneValid, setIsPhoneValid] = useState(false);
//   const [popup, setPopup] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity
//   const [isEmailTouched, setIsEmailTouched] = useState(false); // Track if email field has been touched

//   // Regex for email validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  
//   const onBlurHandler = (e) => {
//     const { name, value } = e.target;

//     if (name === "email") {
//       setIsEmailTouched(true); // Mark email as touched
//       setIsEmailValid(emailRegex.test(value)); // Validate email format
//     }
//   };

//   // Check if all fields are valid
//   const isFormValid =
//     Object.values(formData).every((value) => value.trim() !== "") &&
//     isPhoneValid;

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleChange = (e, value, name) => {
//     let phoneNumber = e?.replace(value?.dialCode, "").trim(); // Remove country code

//     setFormData((prev) => ({
//       ...prev,
//       countryCode: value?.dialCode,
//       phone: phoneNumber || "",
//     }));

//     if (phoneNumber?.length >= 7) {
//       setIsPhoneValid(true); // Phone number is valid if it has exactly 10 digits
//     } else {
//       setIsPhoneValid(false); // Phone number is invalid if it doesn't match the expected length
//     }

//     console.log(formData, "Updated Form Data");
//     console.log(isPhoneValid, "Phone Validity");
//   };

//   const onClearForm = () => {
//     setFormData({
//       name: "",
//       email: "",
//       companyName: "",
//       phone: "",
//       countryCode: "+91",
//     });
//     setIsPhoneValid(false);
//   };

//   const submitForm = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_API}userPortalAdminAddToNetworkRequestPost`,
//         {
//           name: formData.name,
//           email: formData.email,
//           companyName: formData.companyName,
//           countryCode: "+" + formData.countryCode,
//           phone: formData.phone,
//         }
//       );

//       if (res.status === 200) {
//         console.log("Form submitted successfully to Elred API:", res.data);

//         // Call the API route for sending Slack notification
//         const slackRes = await axios.post("/api/sendToSlack", {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           countryCode: formData.countryCode,
//           companyName: formData.companyName,
//         });

//         if (slackRes.status === 200) {
//           console.log("Message sent to Slack!");
//           setPopup(true);
//           setLoading(false);
//         } else {
//           console.error("Error sending message to Slack:", slackRes.data.error);
//           setLoading(false);
//         }

//         // Reset form
//         setFormData({
//           name: "",
//           email: "",
//           companyName: "",
//           phone: "",
//           countryCode: "91",
//         });
//         setIsPhoneValid(false);
//       }
//     } catch (error) {
//       console.error(
//         "Error submitting form:",
//         error.response?.data || error.message
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.main}>
//       <div className={styles.main_cover}>
//         <Image src={awfisBanner} alt="" id={styles.banner} />
//         <div className={styles.container_div}>
//           <div className={styles.form_title}>
//             Form Request to be a part of AWFIS Network ({" "}
//             <span className={styles.network_name}>R City Group</span> )
//           </div>
//           <div className={styles.indicator}>*Indicates required question</div>
//           <TextField
//             title={"Full name"}
//             placeholder={"Enter your full name"}
//             value={formData.name}
//             onChange={onChangeHandler}
//             name="name"
//             type={"text"}
//           />
//           <TextField
//             title={"Official Email ID"}
//             placeholder={"Enter your Email ID"}
//             value={formData.email}
//             name="email"
//             onChange={onChangeHandler}
//             type={"email"}
//             onBlur={onBlurHandler} // Add onBlur handler
//           />
//           {!isEmailValid && isEmailTouched && (
//         <div className={styles.error_message}>Invalid email address</div>
//       )}

//           <TextField
//             title={"Company / Organization Name"}
//             placeholder={"Enter your Company/Organization name"}
//             value={formData.companyName}
//             name="companyName"
//             onChange={onChangeHandler}
//             type={"text"}
//           />
//           <div className={styles.input_lable}>
//             Phone number that will receive OTP{" "}
//             <span className={styles.imp}>*</span>
//           </div>
//           <PhoneInput
//             country={"in"}
//             value={`${formData.countryCode}${formData.phone}`}
//             placeholder="Enter your Phone number"
//             name="phone"
//             onChange={(e, phone) => handleChange(e, phone, "phone")}
//           />
//           <div className={styles.clear_form}>
//             <span onClick={onClearForm} style={{ cursor: "pointer" }}>
//               Clear Form
//             </span>
//           </div>
//           <div className={styles.bottom_div}>
//             <div
//               className={`${styles.submit_btn} ${
//                 !isFormValid || loading ? styles.disabled : ""
//               }`}
//               onClick={!isFormValid || loading ? null : submitForm}
//               style={{
//                 cursor: !isFormValid || loading ? "not-allowed" : "pointer",
//                 backgroundColor:
//                   !isFormValid || loading ? "#ff7780" : "#e72d38",
//               }}
//             >
//               {loading ? <Loader /> : "Submit"}
//             </div>
//           </div>
//         </div>
//       </div>
//       {popup && <PopUp success={true} setPopup={setPopup} />}
//     </div>
//   );
// };

// export default NetworkWaitlistForm;


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

  console.log('Waiting list form deployed...')

  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      setIsEmailValid(emailRegex.test(value)); // Validate email as user types
    }
  };

  const handleChange = (e, value, name) => {
    let phoneNumber = e?.replace(value?.dialCode, "").trim(); // Remove country code

    setFormData((prev) => ({
      ...prev,
      countryCode: value?.dialCode,
      phone: phoneNumber || "",
    }));

    if (phoneNumber?.length >= 7) {
      setIsPhoneValid(true); // Phone number is valid if it has exactly 10 digits
    } else {
      setIsPhoneValid(false); // Phone number is invalid if it doesn't match the expected length
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
        // `${process.env.NEXT_PUBLIC_API}userPortalAdminAddToNetworkRequestPost`,
        `https://pretest.elred.io/userPortalAdminAddToNetworkRequestPost`,
        {
          name: formData.name,
          email: formData.email,
          companyName: formData.companyName,
          countryCode: "+" + formData.countryCode,
          phone: formData.phone,
        }
      );

      if (res.status === 200) {
        console.log("Form submitted successfully to Elred API:", res.data);

        const slackRes = await axios.post("/api/sendToSlack", {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryCode: formData.countryCode,
          companyName: formData.companyName,
        });

        if (slackRes.status === 200) {
          console.log("Message sent to Slack!");
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
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      setLoading(false);
    }
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
            <div className={styles.error_message}>Enter a valid email address</div>
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
            // country={"in"}
            onlyCountries={['us','in','bh','ca','my','fr','pl','la','gb','pt','qa','za']}
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
      {popup && <PopUp success={true} setPopup={setPopup} />}
    </div>
  );
};

export default NetworkWaitlistForm;

