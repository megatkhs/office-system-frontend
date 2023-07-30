import clsx from "clsx";
import styles from "./Spinner.module.css";
export type SpinnerProps = {
  className?: string;
};

export const Spinner = (props: SpinnerProps) => {
  const { className } = props;

  return <span className={clsx(styles.module, className)} />;
};
