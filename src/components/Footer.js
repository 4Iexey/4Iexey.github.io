import "react";
import  styles from "../styles/footer.module.css";
import FooterDecoration from "./FooterDecoration";

function Footer() {
  return (
    <div className={styles["footer-container"]}>
      <FooterDecoration />
      <div className={styles.footer}>
        Footer
      </div>
    </div>
  );
}

export default Footer;