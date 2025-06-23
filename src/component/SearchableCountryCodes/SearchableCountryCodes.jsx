import styles from "./searchable-country-codes.module.scss";
import { useEffect, useRef, useState } from "react";
import searchIcon from "../../../public/searchIcon.svg";
import DownIcon from "../../../public/red-down-icon.svg";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import CountryDropdownListItem from "./CountryDropdownListItem/CountryDropdownListItem";
import { Spinner } from "react-bootstrap";
import crossIcon from "../../../public/cross-png-4x.png";
import Image from 'next/image';

const SearchableCountryCodes = ({
  countryCodesData,
  setNumber,
  setPhoneError,
  selectedCountry,
  setSelectedCountry,
  setCountryPrefix,
  validatePhoneNumber,
  number,
}) => {
  const [showList, setShowList] = useState(false);
  const [countryCodeList, setCountryCodeList] = useState(countryCodesData);
  const [searchVal, setSearchVal] = useState("");
  const [searchIconLoader, setSearchIconLoader] = useState(true);
  const inputRef = useRef();
  const dropdownRef = useRef();

  const handlClose = () => {
    setShowList(false);
  };

  useOnClickOutside(dropdownRef, handlClose);

  const selectCodeFromList = (country) => {
    const newNumber = number?.slice(0, country?.maxDigits);
    setNumber(newNumber);
    setSelectedCountry(country);
    setCountryPrefix(country?.countryCode);
    setShowList(false);
    setPhoneError(false);
    validatePhoneNumber(newNumber, country?.maxDigits);
  };

  useEffect(() => {
    setSearchVal("");
    setCountryCodeList(countryCodesData);
  }, [showList]); // eslint-disable-line

  const handleDropdownSearch = (e) => {
    const searchInput = e.target.value?.trimStart();
    if (/^\+?[a-zA-Z0-9 ]*$/.test(searchInput)) {
      setSearchVal(searchInput);
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!searchVal) return setCountryCodeList(countryCodesData);
    const filteredList1 = countryCodesData
      ?.filter((item) => item.countryCode.includes(searchVal))
      .sort((a, b) => {
        const aStartsWith = a.countryCode
          .replace("+", "")
          .startsWith(searchVal);
        const bStartsWith = b.countryCode
          .replace("+", "")
          .startsWith(searchVal);
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        const aNumericValue = parseInt(a.countryCode.replace("+", ""), 10);
        const bNumericValue = parseInt(b.countryCode.replace("+", ""), 10);
        return aNumericValue - bNumericValue;
      });
    const filteredList2 = countryCodesData
      ?.filter((item) =>
        item.countryName.toLowerCase().includes(searchVal.toLowerCase())
      )
      .sort((a, b) => {
        const aStartsWith = a.countryName
          .toLowerCase()
          .startsWith(searchVal.toLowerCase());
        const bStartsWith = b.countryName
          .toLowerCase()
          .startsWith(searchVal.toLowerCase());
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return 0;
      });
    const newList = [...new Set([...filteredList1, ...filteredList2])];
    setCountryCodeList(newList);
  }, [searchVal]); //eslint-disable-line

  useEffect(() => {
    setSearchIconLoader(true);
  }, [showList]);

  // useEffect(() => {
  //     if (showList) inputRef?.current?.focus();
  // }, [showList]);

  return (
    <div
      ref={dropdownRef}
      className={styles.searchableCountryCodesMainContainer}
    >
      <div
        className={styles.searchableCountryCodesTopField}
        onClick={() => setShowList(!showList)}
      >
        <span className={styles.codesTopFieldText}>
          {selectedCountry?.countryCode}
        </span>
        <Image
          src={DownIcon}
          alt=""
          className={
            showList
              ? `${styles.searchableCountryCodesDownIcon} ${styles.searchableCountryCodesDownIconRotate}`
              : styles.searchableCountryCodesDownIcon
          }
        />
      </div>

      {showList && (
        <div className={styles.searchableCountryCodesDropdown}>
          <div className={styles.searchableCountryCodesSearchContainer}>
            <div className={styles.searchableCountryCodesSearchIconContainer}>
              <Spinner
                variant="danger"
                className={
                  searchIconLoader
                    ? styles.searchableCountryCodesSearchIconLoader
                    : "d-none"
                }
              />
              <Image
                src={searchIcon}
                alt=""
                className={
                  searchIconLoader
                    ? "d-none"
                    : styles.searchableCountryCodesSearchIcon
                }
                onLoad={() => setSearchIconLoader(false)}
              />
            </div>
            <input
              type="text"
              value={searchVal}
              onChange={(e) => handleDropdownSearch(e)}
              ref={inputRef}
              placeholder="Search by country code / name"
              className={styles.searchableCountryCodesSearchInput}
            />
            {searchVal && (
              <Image
                src={crossIcon}
                alt=""
                className={styles.searchableCountryCodesClearIcon}
                onClick={() => setSearchVal("")}
              />
            )}
          </div>

            {/* <Image src={DownIcon} alt=""/> */}
          <div
            className={
              countryCodeList?.length !== 0
                ? styles.countryCodesListContainer
                : `${styles.countryCodesListContainer} ${styles.overflowHidden}`
            }
          >
            {countryCodeList?.length !== 0 ? (
              countryCodeList.map((item, index) => (
                <CountryDropdownListItem
                  key={item?.id}
                  item={item}
                  index={index}
                  selectedCountry={selectedCountry}
                  selectCodeFromList={selectCodeFromList}
                />
              ))
            ) : (
              <div className={styles.countryCodesListNoResult}>
                No result found!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableCountryCodes;
