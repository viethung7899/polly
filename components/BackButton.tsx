import Link from "next/link";
import styles from "styles/button.module.css";

const BackButton = () => {
  return <Link href="/">
    <button className={`${styles.button} border-2 border-blue-600 text-blue-600 hover:bg-blue-200`}>Back</button>
  </Link>
};

export default BackButton;