import { useState } from "react";
import {
  Link,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { history } from "./history";

export const NavigationProvider: React.FC<React.ReactNode> = ({
  children,
  history,
}) => {
  return <HistoryRouter history={history}>{children}</HistoryRouter>;
};

const Component = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      counter: {counter}
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <Link to="/">Home</Link>
      <Link to="/solid-counter">solid-counter</Link>
    </div>
  );
};

export default function ReactApp() {
  return (
    <NavigationProvider history={history}>
      <Routes>
        <Route path="/react-counter" element={<Component />} />
        <Route path="*" element={<></>} />
      </Routes>
    </NavigationProvider>
  );
}
