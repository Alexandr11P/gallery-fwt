import { useState } from "react";
import Select from "@/shared/ui/Select/Select";
import PlusMinusIcon from "./PlusMinusIcon";
import Input from "@/shared/ui/Input/Input";
import classes from "./list.module.scss";
import { useGetAuthorsQuery } from "@/shared/api/getAuthors";
import { useGetLocationsQuery } from "@/shared/api/getLocations";

type RDS<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  isDark: boolean;
  artist: string;
  setArtist: RDS<string>;
  setArtId: RDS<number | undefined>;
  location: string;
  setLocation: RDS<string>;
  setLocId: RDS<number | undefined>;
  from: string;
  setFrom: RDS<string>;
  to: string;
  setTo: RDS<string>;
};

function List({
  isDark,
  artist,
  setArtist,
  setArtId,
  location,
  setLocation,
  setLocId,
  from,
  setFrom,
  to,
  setTo,
}: Props) {
  const { data: dataAuthor } = useGetAuthorsQuery("");
  const { data: dataLocation } = useGetLocationsQuery("");

  const [isOpenArtist, setIsOpenArtist] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);
  const [isOpenYears, setIsOpenYears] = useState(false);

  return (
    <ul className={`${classes.list} ${classes[isDark ? "dark" : "light"]}`}>
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
  );
}

export default List;
