import React from "react";
import styles from "./index.module.css";

const TextField = ({title, placeholder,name, onChange, value, type}) => {
  return (
    <div className={styles.input_div}>
      <div className={styles.input_lable}>
        {title} <span className={styles.imp}>*</span>
      </div>
      <input
        className={styles.input_field}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        name={name}
        value={value}
        type={type}
      />
    </div>
  );
};

export default TextField;
