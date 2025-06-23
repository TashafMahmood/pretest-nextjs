import { useState } from "react";
import { countryCodesData } from "../SearchableCountryCodes/countryCodesData";
import SearchableCountryCodes from "../SearchableCountryCodes/SearchableCountryCodes";
import styles from './InputCountry.module.scss';

function InputCountry({
  number,
  setNumber,
  phoneError,
  setPhoneError,
  countryPrefix,
  setCountryPrefix,
}) {
  const [selectedCountry, setSelectedCountry] = useState(countryCodesData[1]);

  const handlePhoneNumberChange = (event) => {
    let inputNumber = event.target.value.replace(/\s/g, "");
    inputNumber = inputNumber.replace(/\D/g, "");
    inputNumber = inputNumber.slice(0, selectedCountry.maxDigits);
    setNumber(inputNumber);
    validatePhoneNumber(inputNumber, selectedCountry.maxDigits);
  };

  const validatePhoneNumber = (number, max) => {
    setPhoneError(number.length !== max || number[0] === "0");
  };

  const numberPlaceholderMapper = (selectedCountry) => {
    let zeroes = "";
    for (let i = 0; i < selectedCountry?.maxDigits; i++) {
      zeroes += "0";
    }
    return zeroes;
  };

  return (
    <div className="">
      <div className={styles.country_select}>
        <SearchableCountryCodes
          countryCodesData={countryCodesData}
          setNumber={setNumber}
          setPhoneError={setPhoneError}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          setCountryPrefix={setCountryPrefix}
          validatePhoneNumber={validatePhoneNumber}
          number={number}
        />
        <input
          type="text"
          value={number}
          onChange={handlePhoneNumberChange}
          placeholder={numberPlaceholderMapper(selectedCountry)}
          className={styles.country_select_input_field}
          inputMode="numeric"
        />
      </div>
      {phoneError && number.length > 0 && (
        <div className={styles.error_msg}>
          {number?.length === selectedCountry?.maxDigits || number[0] === "0"
            ? "Invalid phone number"
            : `Invalid phone number - enter ${selectedCountry?.maxDigits} digits`}
        </div>
      )}
    </div>
  );
}

export default InputCountry;
