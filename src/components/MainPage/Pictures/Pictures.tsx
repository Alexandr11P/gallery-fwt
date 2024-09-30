import { useState } from "react";
import { useGetPaintingsQuery } from "@/shared/api/getPaintings";
import classes from "./pictures.module.scss";
import cls from "./notFound.module.scss";
import API_URL from "@/shared/api/config/apiUrl";
import { useAppSelector } from "@/app/store/hooks";
import arrow from "./images/arrow.svg";
import { useGetAuthorsQuery } from "@/shared/api/getAuthors";
import { useGetLocationsQuery } from "@/shared/api/getLocations";
import Pagination from "../Pagination/Pagination";
import errorImage from "./images/error.png";

function Pictures() {
  const getPaintingsConfig = useAppSelector((s) => s.filters);
  const { data, error } = useGetPaintingsQuery(getPaintingsConfig);
  const { data: authors } = useGetAuthorsQuery("");
  const { data: locations } = useGetLocationsQuery("");
  const theme = useAppSelector((s) => s.theme);
  const [errorImg, setErrorImg] = useState<string[]>([]);

  if (!error && !data?.paintings[0] && getPaintingsConfig.text) {
    return (
      <div className={cls.not_found}>
        <p className={cls[theme.isDark ? "dark" : "light"]}>
          No matches for <span>{getPaintingsConfig.text}</span>
        </p>
        <p>Please try again with a different spelling or keywords.</p>
      </div>
    );
  }
  if (error) {
    return <p style={{ color: "red" }}>Ошибка: {JSON.stringify(error)}</p>;
  }
  return (
    <>
      <div className={`${classes.main} ${classes[theme.isDark ? "dark" : "light"]}`}>
        {data?.paintings.map((e) => (
          <div className={classes.pic} key={e.id}>
            <img
              className={classes.img}
              src={errorImg.includes(e.name) ? errorImage : `${API_URL}${e.imageUrl}`}
              alt={`pic${e.id}`}
              onError={() => {
                setErrorImg((s) => s.concat(e.name));
              }}
            />
            <div className={classes.bg_info}>
              <div className={`${classes.info} ${classes.info_not_hov}`}>
                <span>{e.name}</span>
                <span>{e.created}</span>
              </div>
              <div className={`${classes.info} ${classes.info_hov}`}>
                <span>{authors?.find((author) => author.id === e.authorId)?.name}</span>
                <span>{locations?.find((location) => location.id === e.locationId)?.location}</span>
              </div>
              <div className={classes.arrow_box}>
                <img src={arrow} alt="arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </>
  );
}

export default Pictures;
