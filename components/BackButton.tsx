import Link from "next/link";
import styles from "styles/button.module.css";

const BackButton = () => {
  return <Link href="/">
    <button className={`${styles.button} border-blue-400 text-blue-400 hover:bg-blue-400 hover:bg-opacity-20`}>Back</button>
  </Link>
};

export default BackButton;