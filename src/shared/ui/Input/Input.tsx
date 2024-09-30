import { useAppSelector } from "@/app/store/hooks";
import classes from "./input.module.scss";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function Input({ className, ...props }: InputProps) {
  const theme = useAppSelector((s) => s.theme);
  const otherClassName = className ? ` ${className}` : "";
  return (
    <input className={`${classes.input} ${classes[theme.isDark ? "dark" : "light"]}${otherClassName}`} {...props} />
  );
}

export default Input;
