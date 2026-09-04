import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  Bullet,
  Bullets,
  BulletTitle,
  C,
  Demo,
} from "../components/primitives";
import { StateCounterDemo } from "../demos/StateCounterDemo";

export function StateSection() {
  return (
    <>
      <Body>
        State is any value a component owns that can change while the app is
        running. <C>useState</C> is the hook that holds one such value and tells
        React to re-render when it changes.
      </Body>

      <CodeBlock>{`const [count, setCount] = useState(0);`}</CodeBlock>

      <BulletTitle>How that line works</BulletTitle>
      <Bullets>
        <Bullet>
          <C>useState(0)</C> returns an array of two things, and the square
          brackets pull them out into two variables. The <C>0</C> is the starting
          value, used only on the first render.
        </Bullet>
        <Bullet>
          <C>count</C> is the current value. It is read only. Assigning to it
          directly does nothing, because React would never know it changed.
        </Bullet>
        <Bullet>
          <C>setCount</C> is the setter. Calling it tells React the value has
          changed and this component needs to re-render.
        </Bullet>
        <Bullet>
          On that next render, <C>useState</C> hands back the new value instead
          of the starting one. The variable is not mutated, the function simply
          runs again with a different value.
        </Bullet>
        <Bullet>
          The names are yours to choose. <C>[count, setCount]</C> is the
          convention, but <C>[age, setAge]</C> works the same way.
        </Bullet>
      </Bullets>

      <Body>
        Put together in a component, with the handlers kept above the return.
      </Body>

      <CodeBlock>{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Handlers live here, above the return, as ordinary functions.
  function handleAdd() {
    setCount(count + 1);
  }

  function handleSubtract() {
    setCount(count - 1);
  }

  function handleReset() {
    setCount(0);
  }

  // Pass the function by name. No parentheses, or it runs on render.
  return (
    <div>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleSubtract}>Subtract</button>
      <button onClick={handleReset} disabled={count === 0}>
        Reset
      </button>

      <p>{count}</p>
    </div>
  );
}`}</CodeBlock>

      <Body>
        Below is that exact component running. Click the buttons and the number
        updates, because each handler calls <C>setCount</C> and React re-renders
        with the new value.
      </Body>

      <Demo>
        <StateCounterDemo />
      </Demo>
    </>
  );
}
