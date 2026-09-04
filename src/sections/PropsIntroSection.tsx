import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  C,
  ColumnLabel,
  Demo,
  Figure,
  TwoUp,
} from "../components/primitives";
import { DBox, DLine, DText, Svg } from "../components/diagram";
import { PropsCardDemo } from "../demos/PropsCardDemo";

export function PropsIntroSection() {
  return (
    <>
      <Body>
        Props are passed to components in the same way attributes are added to
        HTML elements. The parent decides the values, the child receives them and
        cannot change them.
      </Body>

      <Body>
        Take the counter from the last section. Instead of printing the number in
        a bare <C>{'<p>'}</C>, move the display into its own{' '}
        <C>CountCard</C> component and pass the count in.
      </Body>

      <TwoUp
        equal
        left={
          <>
            <ColumnLabel>Send props (Parent)</ColumnLabel>
            <CodeBlock dense flush>{`function Counter() {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }

  return (
    <div>
      <CountCard label="Total items" count={count} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}`}</CodeBlock>
          </>
        }
        right={
          <>
            <ColumnLabel>Receive props (Child)</ColumnLabel>
            <CodeBlock dense flush>{`function CountCard({ label, count }) {
  return (
    <div className="card">
      <span className="card__label">
        {label}
      </span>
      <strong className="card__value">
        {count}
      </strong>
    </div>
  );
}`}</CodeBlock>
          </>
        }
      />

      <Body>
        The state still lives in <C>Counter</C>. All <C>CountCard</C> does is
        take a label and a number and make them look good. It has no{' '}
        <C>useState</C>, no handlers, and no idea a button exists.
      </Body>

      <Body>
        Click the buttons. The card is a separate component receiving a prop, not
        part of the counter.
      </Body>

      <Demo>
        <PropsCardDemo />
      </Demo>

      <Figure caption="Figure 3. The parent owns the state and passes it down as props.">
        <Svg viewBox="0 0 880 300" label="Count passed from parent to a card component">
          {/* Parent */}
          <DText x={440} y={20} size={12.5} tone="muted">Parent</DText>
          <DLine d="M410 26 L470 26" />

          <DBox x={330} y={40} w={220} h={44} tone="primary" r={8} />
          <DText x={440} y={68} size={13} tone="inverse">Counter</DText>

          {/* owns: count, called out from the right */}
          <DText x={600} y={57} size={11.5} tone="muted" anchor="start">owns the</DText>
          <DText x={600} y={72} size={11.5} tone="muted" anchor="start">count state</DText>
          <path
            d="M594 62 C 578 62, 570 62, 558 62"
            fill="none"
            stroke="#8b92b8"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <path
            d="M565 57 L556 62 L565 67"
            fill="none"
            stroke="#8b92b8"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Fan out to the two prop chips */}
          <DLine d="M440 84 L440 104 M270 104 L610 104 M270 104 L270 124 M610 104 L610 124" />

          <rect x={170} y={124} width={200} height={24} rx={4} fill="#e5effa" stroke="#cfe0f2" />
          <DText x={270} y={141} size={10.5} tone="mono">label="Total items"</DText>
          <rect x={510} y={124} width={200} height={24} rx={4} fill="#e5effa" stroke="#cfe0f2" />
          <DText x={610} y={141} size={10.5} tone="mono">count={'{count}'}</DText>

          <DLine d="M270 148 L270 168 M610 148 L610 168 M270 168 L610 168" />
          <DLine d="M440 168 L440 210" arrow />
          <DLine d="M433 202 L440 212 L447 202" arrow />

          {/* Sends props, on a curve running down to the child */}
          <DText x={556} y={188} size={11.5} tone="muted" anchor="start" italic>
            sends props down
          </DText>
          <path
            d="M552 196 C 508 202, 470 200, 452 208"
            fill="none"
            stroke="#8b92b8"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
          <path
            d="M462 202 L450 209 L461 214"
            fill="none"
            stroke="#8b92b8"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Child */}
          <DText x={440} y={238} size={12.5} tone="muted">Child</DText>
          <DLine d="M416 244 L464 244" />

          <DBox x={330} y={258} w={220} h={36} tone="soft" />
          <DText x={440} y={281} size={12}>CountCard</DText>
        </Svg>
      </Figure>
    </>
  );
}
