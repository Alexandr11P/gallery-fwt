import { useAppSelector } from "@/app/store/hooks";
import classes from "./button.module.scss";

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

function Button({ className, children, ...props }: ButtonProps) {
  const theme = useAppSelector((s) => s.theme);
  const otherClassName = className ? ` ${className}` : "";

  return (
    <button
      type="button"
      className={`${classes.btn} ${classes[theme.isDark ? "dark" : "light"]}${otherClassName}`}
      {...props}
    >
      {typeof children === "string" ? children.toUpperCase() : children}
    </button>
  );
}

export default Button;
