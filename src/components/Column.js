import styles from "../modules/Column.module.css";

function Column({ children }) {
  return <div className={styles.column}>{children}</div>;
}

export default Column;
