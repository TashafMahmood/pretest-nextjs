import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "../searchable-country-codes.module.scss";

const CountryDropdownListItem = ({
  item,
  index,
  selectedCountry,
  selectCodeFromList,
}) => {
  const [flagIconLoader, setFlagIconLoader] = useState(true);

  return (
    <>
      {index !== 0 && <hr className={styles.countryCodesListDividerBorder} />}
      <div
        className={
          selectedCountry?.countryCode === item?.countryCode
            ? `${styles.countryCodesListItemSingle} ${styles.countryCodesListItemSingleActive}`
            : styles.countryCodesListItemSingle
        }
        onClick={() => selectCodeFromList(item)}
      >
        <div className={styles.countryCodesListItemCodeNum}>
          {item?.countryCode}
        </div>
        <Skeleton
          baseColor="#D7D7D7"
          className={
            flagIconLoader ? styles.countryCodesListItemFlag : "d-none"
          }
        />
        <img
          src={item?.countryFlagIcon?.src}
          alt=""
          className={
            flagIconLoader
              ? "d-none"
              : `${styles.countryCodesListItemFlag} ${styles.countryCodesListItemFlagBorder}`
          }
          onLoad={() => setFlagIconLoader(false)}
        />
        <div className={styles.countryCodesListItemName}>
          {item?.countryName}
        </div>
      </div>
    </>
  );
};

export default CountryDropdownListItem;
