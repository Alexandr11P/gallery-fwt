import classes from "./layout.module.scss";
import logoLight from "./images/logo_light.svg";
import logoDark from "./images/logo_dark.svg";
import onDark from "./images/on_dark.svg";
import onLight from "./images/on_light.svg";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { turnTheme } from "../../shared/slices/theme.slice";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isDark = useAppSelector((s) => s.theme.isDark);
  const dispatch = useAppDispatch();

  return (
    <div className={`${classes.main} ${classes[isDark ? "dark" : "light"]}`}>
      <div className={classes.header}>
        <img className={classes.logo} src={isDark ? logoDark : logoLight} alt="logo" />
        <button type="button" onClick={() => dispatch(turnTheme())}>
          <img src={isDark ? onLight : onDark} alt="btn_theme" />
        </button>
      </div>
      {children}
    </div>
  );
}

export default Layout;
