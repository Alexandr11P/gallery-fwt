import { useMemo, useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import classes from "./select.module.scss";
import Input from "../Input/Input";
import Icon from "./Icon";

function Select({
  className,
  pholder,
  array,
  inputValue,
  setInputValue,
  setId,
}: {
  className: string | undefined;
  pholder: string;
  array: { id: number; name: string }[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setId: (id: number | undefined) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectedOption, setIsSelectedOption] = useState(false);
  const theme = useAppSelector((s) => s.theme);

  const filtredArray = useMemo(
    () => array.filter((e) => e.name.toLowerCase().includes(inputValue.toLowerCase())),
    [inputValue, array],
  );

  return (
    <div
      className={`${classes[isOpen ? "open" : "close"]} ${classes[theme.isDark ? "dark" : "light"]} ${className || ""}`}
    >
      <div className={classes.input_box}>
        <Input
          className={classes.input}
          placeholder={pholder}
          onFocus={() => {
            setIsSelectedOption(false);
            setIsOpen(true);
            setInputValue("");
            setId(undefined);
          }}
          value={inputValue}
          onBlur={() => {
            if (!isSelectedOption) {
              setInputValue("");
            }
            setIsOpen(false);
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Icon className={classes.icon} />
      </div>
      <div className={classes.options}>
        {filtredArray[0] ? (
          filtredArray.map((e) => (
            <button
              type="button"
              className={classes.option}
              key={e.id}
              onMouseDown={() => {
                setIsSelectedOption(true);
                setId(e.id);
                setInputValue(e.name);
              }}
            >
              {e.name}
            </button>
          ))
        ) : (
          <div className={classes.not_found}>There are no matching results for your query.</div>
        )}
      </div>
    </div>
  );
}

export default Select;
