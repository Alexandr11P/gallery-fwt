import { useState } from "react";
import classes from "./filters.module.scss";
import PlusMinusIcon from "./PlusMinusIcon";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setIsOpenFilter } from "@/shared/slices/filtersPanel.slice";
import Select from "@/shared/ui/Select/Select";
import { useGetAuthorsQuery } from "@/shared/api/getAuthors";
import { useGetLocationsQuery } from "@/shared/api/getLocations";
import Input from "@/shared/ui/Input/Input";
import CloseIcon from "./CloseIcon";
import Button from "@/shared/ui/Button/Button";
import { setFilters } from "@/shared/slices/filters.slice";

function Filters() {
  const { data: dataAuthor } = useGetAuthorsQuery("");
  const { data: dataLocation } = useGetLocationsQuery("");

  const [isOpenArtist, setIsOpenArtist] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenYears, setIsOpenYears] = useState(false);
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

        <ul className={classes.list}>
          <li>
            <button
              type="button"
              onClick={() => {
                setIsOpenArtist((s) => !s);
              }}
            >
              <span>Artist</span>
              <PlusMinusIcon className={classes.icon} isOpen={isOpenArtist} />
            </button>

            <Select
              pholder="Select the artist"
              array={dataAuthor || []}
              className={isOpenArtist ? "" : classes.hiden}
              inputValue={artist}
              setInputValue={setArtist}
              setId={(id) => setArtId(id)}
            />
          </li>

          <li>
            <button
              type="button"
              onClick={() => {
                setIsOpenLocation((s) => !s);
              }}
            >
              <span>Location</span>
              <PlusMinusIcon className={classes.icon} isOpen={isOpenLocation} />
            </button>

            <Select
              pholder="Select the location"
              array={dataLocation?.map((e) => ({ name: e.location, id: e.id })) || []}
              className={isOpenLocation ? "" : classes.hiden}
              inputValue={location}
              setInputValue={setLocation}
              setId={(id) => setLocId(id)}
            />
          </li>

          <li>
            <button
              type="button"
              onClick={() => {
                setIsOpenYears((s) => !s);
              }}
            >
              <span>Years</span>
              <PlusMinusIcon className={classes.icon} isOpen={isOpenYears} />
            </button>

            <div className={`${classes.years} ${isOpenYears ? "" : classes.hiden}`}>
              <Input
                placeholder="From"
                value={from}
                onChange={(e) => {
                  if (Number(e.target.value) || e.target.value === "") setFrom(e.target.value);
                }}
              />
              <div className={classes.dash}> </div>
              <Input
                placeholder="To"
                value={to}
                onChange={(e) => {
                  if (Number(e.target.value) || e.target.value === "") setTo(e.target.value);
                }}
              />
            </div>
          </li>
        </ul>

        <div className={classes.btn_block}>
          <Button onClick={() => toFilter()}>Show the results</Button>
          <Button onClick={() => clear()}>Clear</Button>
        </div>
      </div>
    </>
  );
}

export default Filters;
