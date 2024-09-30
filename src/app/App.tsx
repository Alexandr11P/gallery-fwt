import { Provider } from "react-redux";
import "./global.scss";
import { store } from "./store";
import MainPage from "@/components/MainPage/MainPage";

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;
