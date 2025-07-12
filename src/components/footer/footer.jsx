import React from "react";
import { useLocation } from "react-router-dom";

import logo from "../../images/icons/wishpool.svg";

import styles from "./footer.module.css";

export const Footer = ({ extraClass = "" }) => {
  const location = useLocation();

  const footerClassList = `${styles.footer} ${
    (location.pathname === "/signin" ||
      location.pathname === "/signup" ||
      location.pathname === "/recovery") &&
    styles.hidden
  } ${extraClass}`;

  return (
    <footer className={footerClassList}>
      <div className={styles.content}>
        <img src={logo} alt="Logo." style={{width:"160px", height:"auto"}}/>
        <p
          className={`text text_type_footer text_color_primary ${styles.text}`}
        >{`${"\u{00A9}"}${new Date().getFullYear()},  WishPool`}</p>
      </div>
    </footer>
  );
};
