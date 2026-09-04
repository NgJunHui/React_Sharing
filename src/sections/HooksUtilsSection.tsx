import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  BulletTitle,
  C,
  ColumnLabel,
  TwoUp,
} from "../components/primitives";

export function HooksUtilsSection() {
  return (
    <>
      <BulletTitle>Hooks</BulletTitle>
      <Body>
        Hooks are functions that tap into React's rendering machinery. They can
        hold state between renders, run side effects, subscribe to external
        things, and read context. That power comes with constraints: the name
        must start with <C>use</C>. For example <C>useState</C>,{' '}
        <C>useEffect</C>, <C>useContext</C>.
      </Body>

      <BulletTitle>Utility functions</BulletTitle>
      <Body>
        Utils are plain functions. They take input, return output, and know
        nothing about React.
      </Body>

      <TwoUp
        equal
        left={
          <>
            <ColumnLabel>Utility function</ColumnLabel>
            <CodeBlock dense flush>{`// utils/formatCurrency.ts
export function formatCurrency(
  amount: number,
  currency: string,
) {
  return \`\${currency} \${amount.toFixed(2)}\`;
}

// Called from anywhere.
formatCurrency(42.5, 'SGD');`}</CodeBlock>
          </>
        }
        right={
          <>
            <ColumnLabel>Hook</ColumnLabel>
            <CodeBlock dense flush>{`// hooks/useCounter.ts
export function useCounter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return { count, increment };
}`}</CodeBlock>
          </>
        }
      />
    </>
  );
}
