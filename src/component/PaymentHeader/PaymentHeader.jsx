"use client";

import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import logo from "./../../../public/logo.svg";
import menu from "./../../../public/menu-grid.svg";
import close from "./../../../public/close.svg";
import logout from "./../../../public/logout.svg";
import { usePathname } from "next/navigation";
import Offcanvas from "react-bootstrap/Offcanvas";
import { menuData } from "./menudata";
import { useLogout } from "@/context/LogoutContext";
import avatar from '../../../public/userprofile.svg'
import ImageWithLoaderAndFallback from "../ImageWithLoaderAndFallback/ImageWithLoaderAndFallback";


const PaymentHeader = ({ noDisplay }) => {
  const { setIsOpen } = useLogout();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user) {
      setUserData(user);
    }
  }, []);

  const logoutTrigger = () => {
    handleClose();
    setIsOpen(true);
  };


  const dp = "https://assets-pretest.elred.io/displayPictures/685b915eb256fac03f266608/1750850914695.jpg"
  return (
    <>
      <div className={styles.header_wrapper}>
        <Image src={logo} alt="Logo" />
        {!noDisplay && (
          <div role="button" onClick={handleShow} style={{ cursor: "pointer" }}>
            <Image src={menu} alt="Menu" />
          </div>
        )}
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="half-width"
      >
        <div className={styles.menu_top}>
          <Image
            src={close}
            alt="close-btn"
            className={styles.close_button}
            onClick={handleClose}
          />
        </div>
        <Offcanvas.Body className="payment-menu">
          <div className={styles.user_profile}>
            <ImageWithLoaderAndFallback
              src={userData?.dpURL}
              alt="User profile"
              width={40}
              height={40}
              className={styles.dpImg}
              fallback={avatar}
            />

            <div className={styles.name_div}>
              <div className={styles.username}>
                {" "}
                {userData?.firstname} {userData?.lastname}
              </div>
              <div className={styles.name}>{userData?.userName}</div>
            </div>
          </div>
          <div className={styles.menus_div}>
            {menuData?.map((data, id) => (
              <div
                className={`${styles.menu} ${
                  pathname == data?.path ? styles.active_menu : ""
                }`}
                key={data.id}
                onClick={pathname == data?.path ? handleClose : null}
              >
                <Image
                  src={`/${data?.logo}.svg`}
                  alt={data?.logo}
                  width={36}
                  height={36}
                  className={data?.disabled && styles.disabled_img}
                />
                <div
                  className={
                    data?.disabled
                      ? styles.disabled_menu_title
                      : styles.menu_title
                  }
                >
                  {data?.title}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.logout_div}>
            <div className={styles.border_line}></div>
            <div className={styles.logout_menu} onClick={logoutTrigger}>
              <Image src={logout} alt={"logout"} width={36} height={36} />
              <div className={styles.logout_title}>Logout</div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PaymentHeader;
