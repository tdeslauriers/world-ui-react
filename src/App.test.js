import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

test("Renders application", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
