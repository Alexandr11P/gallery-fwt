import { useState } from "react";
import Input from "@/shared/ui/Input/Input";
import classes from "./find.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FindIcon from "./FindIcon";
import ClearIcon from "./ClearIcon";
import useDebounce from "@/shared/lib/hooks/useDebounce";
import { find } from "@/shared/slices/filters.slice";

function Find() {
  const [findText, setFindText] = useState("");
  const theme = useAppSelector((s) => s.theme);
  const debounce = useDebounce();
  const dispatch = useAppDispatch();

  return (
    <div className={`${classes.find} ${classes[theme.isDark ? "dark" : "light"]}`}>
      <FindIcon className={`${classes.icon} ${classes.f}`} />
      <Input
        placeholder="Painting title"
        value={findText}
        onChange={(e) => {
          setFindText(e.target.value);
          debounce(() => dispatch(find(e.target.value)), 700);
        }}
      />
      {findText && (
        <button
          type="button"
          onClick={() => {
            setFindText("");
            dispatch(find(""));
          }}
        >
          <ClearIcon className={classes.icon} />
        </button>
      )}
    </div>
  );
}

export default Find;
