import Layout from "../Layout/Layout";
import Filters from "./Filters/Filters";
import FiltersIcon from "./FiltersIcon/FiltersIcon";
import Find from "./Find/Find";
import Pictures from "./Pictures/Pictures";
import classes from "./mainPage.module.scss";

function MainPage() {
  return (
    <Layout>
      <Filters />
      <div className={classes.panel}>
        <Find />
        <FiltersIcon />
      </div>
      <Pictures />
    </Layout>
  );
}

export default MainPage;
