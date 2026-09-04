import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  C,
  CardText,
  Demo,
  InfoCard,
  Split,
} from "../components/primitives";
import { IcaButtonDemo } from "../demos/IcaButtonDemo";

export function ReuseSection() {
  return (
    <>
      <Body>
        Now that props are on the table, look back at the three buttons in the
        counter. They are nearly identical, differing only in their label and
        what they do. Rather than repeat the markup, define the button once and
        let each usage pass in the difference as props.
      </Body>

      <Split>
        <InfoCard tone="bad" tag="Repeated" tagTone="red" tagIcon="cross">
          <CardText>
            The same <C>sx</C> block copied onto every button. Change the radius
            or the weight and you edit each one, or miss one.
          </CardText>
          <div style={{ marginTop: 16 }}>
            <CodeBlock dense flush>{`<Button
  variant="contained"
  sx={{ borderRadius: '8px', fontWeight: 700 }}
  onClick={handleAdd}
>
  Add
</Button>
<Button
  variant="outlined"
  sx={{ borderRadius: '8px', fontWeight: 700 }}
  onClick={handleSubtract}
>
  Subtract
</Button>`}</CodeBlock>
          </div>
        </InfoCard>

        <InfoCard tone="good" tag="Common component" tagTone="green" tagIcon="tick">
          <CardText>
            Defined once, used everywhere. Every instance stays consistent, and
            a change lands in all of them at the same time.
          </CardText>
          <div style={{ marginTop: 16 }}>
            <CodeBlock dense flush>{`type Variant = 'primary' | 'secondary';

function IcaButton({ variant = 'primary', children, ...rest }) {
  return (
    <Button
      variant={variant === 'primary' ? 'contained' : 'outlined'}
      {...rest}
    >
      {children}
    </Button>
  );
}

<IcaButton variant="primary"   onClick={handleAdd}>Add</IcaButton>
<IcaButton variant="secondary" onClick={handleSubtract}>Subtract</IcaButton>`}</CodeBlock>
          </div>
        </InfoCard>
      </Split>

      <Body>
        The <C>variant</C> prop lets one component cover both looks. Two
        instances below, one primary and one secondary, from the same
        definition.
      </Body>

      <Demo>
        <IcaButtonDemo />
      </Demo>
    </>
  );
}
