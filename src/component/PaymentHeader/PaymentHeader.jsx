"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import Image from "next/image";
import logo from "./../../../public/logo.svg";
import menu from "./../../../public/menu-grid.svg";
import close from "./../../../public/close.svg";
import male from "./../../../public/male.svg";
import logout from "./../../../public/logout.svg";
import { usePathname } from "next/navigation";
import Offcanvas from "react-bootstrap/Offcanvas";
import { menuData } from "./menudata";
import { useLogout } from "@/context/LogoutContext";

const PaymentHeader = ({ noDisplay }) => {
  const { setIsOpen } = useLogout();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutTrigger = () => {
    handleClose();
    setIsOpen(true);
  };
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
          <div className={styles.menu_top} >
            <Image src={close} alt="close-btn" className={styles.close_button} onClick={handleClose}/>
          </div>
          <Offcanvas.Body className="payment-menu">
            <div className={styles.user_profile}>
              <Image src={male} alt="user-profile" />
              <div className={styles.name_div}>
                <span className={styles.username}>Uttam Kumar</span>
                <span className={styles.name}>uttam</span>
              </div>
            </div>
            <div className={styles.menus_div}>
              {menuData?.map((data, id) => (
                <div
                  className={`${styles.menu} ${
                    pathname == data?.path ? styles.active_menu : ""
                  }`}
                  key={data.id}
                >
                  <Image
                    src={`/${data?.logo}.svg`}
                    alt={data?.logo}
                    width={36}
                    height={36}
                  />
                  <div className={styles.menu_title}>{data?.title}</div>
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
