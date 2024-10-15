import { useState } from "react";
import classes from "./filters.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setIsOpenFilter } from "@/shared/slices/filtersPanel.slice";
import CloseIcon from "./CloseIcon";
import Button from "@/shared/ui/Button/Button";
import { setFilters } from "@/shared/slices/filters.slice";
import List from "./List/List";

function Filters() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [artist, setArtist] = useState("");
  const [location, setLocation] = useState("");
  const [artId, setArtId] = useState<number | undefined>(undefined);
  const [locId, setLocId] = useState<number | undefined>(undefined);

  const isDark = useAppSelector((s) => s.theme.isDark);
  const isOpen = useAppSelector((s) => s.filtersPanel.isOpen);

  const dispatch = useAppDispatch();

  function clear() {
    if (artist) setArtist("");
    if (location) setLocation("");
    if (from) setFrom("");
    if (to) setTo("");
    if (artId) setArtId(undefined);
    if (locId) setLocId(undefined);
  }

  function toFilter() {
    dispatch(setFilters({ from: +from || undefined, to: +to || undefined, locationId: locId, authorId: artId }));
  }

  return (
    <>
      {isOpen && (
        <button
          className={classes.back}
          type="button"
          onClick={() => {
            dispatch(setIsOpenFilter(false));
          }}
        >
          {" "}
        </button>
      )}

      <div
        className={`${classes.main} ${classes[isDark ? "dark" : "light"]}`}
        style={{ transform: `translateX(${isOpen ? 0 : 100}%)` }}
      >
        <button
          className={classes.close}
          type="button"
          onClick={() => {
            dispatch(setIsOpenFilter(false));
          }}
        >
          <CloseIcon className={classes.icon} />
        </button>
        <List
          isDark={isDark}
          artist={artist}
          setArtist={setArtist}
          setArtId={setArtId}
          location={location}
          setLocation={setLocation}
          setLocId={setLocId}
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
        />
        <div className={classes.btn_block}>
          <Button onClick={() => toFilter()}>Show the results</Button>
          <Button onClick={() => clear()}>Clear</Button>
        </div>
      </div>
    </>
  );
}

export default Filters;
