import { A, createIntegration, Route, Router, Routes } from "@solidjs/router";
import { createSignal } from "solid-js";
import { history } from "./history";

function bindEvent(target: EventTarget, type: string, handler: EventListener) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
}
const myIntegration = (history) => {
  const integration = createIntegration(
    () => ({
      value:
        history.location.pathname +
        history.location.search +
        history.location.hash,
      state: history.state,
    }),
    ({ value, replace, scroll, state }) => {
      const x =
        history.location.pathname +
        history.location.search +
        history.location.hash;
      if (value === x) return;
      if (replace) {
        history.replace(value, state);
      } else {
        history.push(value, state);
      }
      // scrollToHash(window.location.hash.slice(1), scroll);
    },
    (notify) => bindEvent(window, "popstate", () => notify()),
    {
      go: (delta) => history.go(delta),
    }
  );

  history.listen(({ location }) => {
    integration.signal[1]({
      value: location.pathname + location.search + location.hash,
    });
  });

  return integration;
};

const Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div style={{ display: "flex", "flex-direction": "column" }}>
      counter: {count()}
      <button onClick={() => setCount(count() + 1)}>+</button>
      <button onClick={() => setCount(count() - 1)}>-</button>
      <A href="/">Home</A>
      <A href="/react-counter">react-counter</A>
    </div>
  );
};

const Home = () => {
  return (
    <div style={{ display: "flex", "flex-direction": "column" }}>
      <A href="/solid-counter">solid-counter</A>
      <A href="/react-counter">react-counter</A>
    </div>
  );
};

const Empty = () => {
  return <></>;
};

export default function SolidApp() {
  return (
    <Router source={myIntegration(history)}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/solid-counter" component={Component} />
        <Route path="*" component={Empty} />
      </Routes>
    </Router>
  );
}
