import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./app/store";

import AppRouter from "./router/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer />
    </Provider>
  );
}

export default App;
