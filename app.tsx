import { createSignal } from "solid-js";

export function App() {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <div>the count is {count()}</div>
      <button onClick={() => setCount(count() + 1)}>increment</button>
    </div>
  );
}
