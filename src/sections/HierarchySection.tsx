import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  Bullet,
  Bullets,
  BulletTitle,
  C,
  Figure,
} from "../components/primitives";
import { DBox, DLine, DText, Svg } from "../components/diagram";
import { PageMockup } from "../components/PageMockup";
import { MOCKUP_TONE as T } from "../components/mockupTones";

export function HierarchySection() {
  return (
    <>
      <Body>
        React uses a <strong>component based architecture</strong>. You build a
        UI from small, independent pieces, each one owning its own structure and
        behaviour, and then compose them into screens.
      </Body>

      <BulletTitle>Components</BulletTitle>
      <Bullets>
        <Bullet>A component is a function that takes props and returns UI</Bullet>
        <Bullet>
          Written in JSX, which looks like HTML but is JavaScript
        </Bullet>
        <Bullet>
          Naming convention is PascalCase: <C>UserCard</C>, not <C>userCard</C>
        </Bullet>
      </Bullets>

      <Figure caption="Figure 1. Components nest. Depth in the tree is depth on the screen.">
        <Svg viewBox="0 0 880 282" label="A page broken down into nested components">
          {/* Level 1. Colours match the mockup in Figure 2. */}
          <DBox x={340} y={14} w={200} h={46} r={8} fill={T.page.chipBg} stroke={T.page.border} />
          <DText x={440} y={42} size={14} fill="#ffffff">OrderPage</DText>

          {/* Trunk down to the level 2 bus */}
          <DLine d="M440 60 L440 82" arrow />
          <DLine d="M433 74 L440 84 L447 74" arrow />
          <DLine d="M160 96 L720 96 M160 96 L160 120 M440 96 L440 120 M720 96 L720 120" />
          <DLine d="M440 84 L440 96" />

          {/* Level 2 */}
          <DBox x={60} y={120} w={200} h={44} fill={T.header.bg} stroke={T.header.border} />
          <DText x={160} y={147} size={12.5} fill={T.header.border}>HeaderComponent</DText>

          <DBox x={340} y={120} w={200} h={44} fill={T.body.bg} stroke={T.body.border} />
          <DText x={440} y={147} size={12.5} fill={T.body.border}>BodyComponent</DText>

          <DBox x={620} y={120} w={200} h={44} fill={T.footer.bg} stroke={T.footer.border} />
          <DText x={720} y={147} size={12.5} fill={T.footer.border}>FooterComponent</DText>

          {/* Trunk down from BodyComponent to the level 3 bus */}
          <DLine d="M440 164 L440 186" arrow />
          <DLine d="M433 178 L440 188 L447 178" arrow />
          <DLine d="M200 200 L680 200 M200 200 L200 224 M440 200 L440 224 M680 200 L680 224" />
          <DLine d="M440 188 L440 200" />

          {/* Level 3. Siblings at the same depth share one colour. */}
          <DBox x={90} y={224} w={220} h={44} fill={T.bodyChild.bg} stroke={T.bodyChild.border} />
          <DText x={200} y={251} size={12.5} fill={T.bodyChild.border}>SearchBarComponent</DText>

          <DBox x={330} y={224} w={220} h={44} fill={T.bodyChild.bg} stroke={T.bodyChild.border} />
          <DText x={440} y={251} size={12.5} fill={T.bodyChild.border}>OrderTableComponent</DText>

          <DBox x={570} y={224} w={220} h={44} fill={T.bodyChild.bg} stroke={T.bodyChild.border} />
          <DText x={680} y={251} size={12.5} fill={T.bodyChild.border}>PaginationComponent</DText>

        </Svg>
      </Figure>

      <Body>
        In code, each level of that tree is its own file. The page returns its
        three children and nothing more.
      </Body>

      <CodeBlock>{`function OrderPage() {
  return (
    <div>
      <HeaderComponent />
      <BodyComponent />
      <FooterComponent />
    </div>
  );
}`}</CodeBlock>

      <Body>
        Three tags, and one of them is <C>BodyComponent</C>. Open that file and
        you find the same pattern again: a component that returns a few more
        components.
      </Body>

      <CodeBlock>{`function BodyComponent() {
  return (
    <div>
      <SearchBarComponent />
      <OrderTableComponent />
      <PaginationComponent />
    </div>
  );
}`}</CodeBlock>

      <Body>
        Read either file top to bottom and you know what it contains without
        opening anything else. Each tag is a component, and each one can be
        worked on, tested, and reused on its own.
      </Body>

      <Figure caption="Figure 2. The same tree on screen. Each outlined region is one component.">
        <PageMockup />
      </Figure>
    </>
  );
}
