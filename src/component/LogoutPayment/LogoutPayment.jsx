import React, { useEffect } from "react";
import style from "./index.module.css";
import { useLogout } from "@/context/LogoutContext";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LogoutPayment = (props) => {
  const { setIsOpen } = useLogout();
  const router = useRouter();
  const searchParams = useSearchParams();

  const nccode = searchParams.get("nccode");

  const cancelNow = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userdata");
    localStorage.removeItem("trxId");
    router.push(nccode ? `/membership?nccode=${nccode}` : "/membership");
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custommodal"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body className="logout_popup">
          <div className={style.text}>
            Are you sure you want to <br /> logout?
          </div>
          <div className={style.buttons_div}>
            <div className={style.cancel_btn} onClick={cancelNow}>
              Cancel
            </div>
            <div className={style.logout_btn} onClick={handleLogout}>
              Logout
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LogoutPayment;
