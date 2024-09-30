import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import paginationList from "./lib/paginationList";
import classes from "./pagination.module.scss";
import { setPage } from "@/shared/slices/filters.slice";
import { useGetPaintingsQuery } from "@/shared/api/getPaintings";
import Arrow from "./Arrow";

function Pagination() {
  const getPaintingsConfig = useAppSelector((s) => s.filters);
  const theme = useAppSelector((s) => s.theme);
  const { data } = useGetPaintingsQuery(getPaintingsConfig);
  const dispatch = useAppDispatch();
  const { page } = getPaintingsConfig;
  function setPageNumber(i: number) {
    dispatch(setPage(i));
  }

  return (
    <div className={`${classes.pagination} ${classes[theme.isDark ? "dark" : "light"]}`}>
      <ul className={classes.list}>
        <li className={classes.back}>
          <button
            className={classes.btn}
            type="button"
            disabled={page === 1}
            onClick={() => {
              dispatch(setPage(page - 1));
            }}
          >
            <Arrow className={classes.arrow} />
          </button>
        </li>
        {paginationList(classes.active, classes.li, data?.numOfPages || 0, page, setPageNumber)}
        <li className={classes.next}>
          <button
            className={classes.btn}
            disabled={page === data?.numOfPages}
            type="button"
            onClick={() => {
              dispatch(setPage(page + 1));
            }}
          >
            <Arrow className={classes.arrow} />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
