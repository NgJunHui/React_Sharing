import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  BulletTitle,
  C,
  ColumnLabel,
  TwoUp,
} from "../components/primitives";

export function JsxSection() {
  return (
    <>
      <Body>
        JSX is a syntax extension for JavaScript that lets you write markup
        inside your JavaScript files. It looks like HTML, but it is not. It is
        syntax that a build tool such as Babel, SWC, or esbuild compiles into
        regular function calls before the browser ever sees it.
      </Body>

      <TwoUp
        equal
        left={
          <>
            <ColumnLabel>What you write</ColumnLabel>
            <CodeBlock dense flush>{`const greeting = (
  <h1 className="title">Hello, world</h1>
);`}</CodeBlock>
          </>
        }
        right={
          <>
            <ColumnLabel>What it compiles to</ColumnLabel>
            <CodeBlock dense flush>{`const greeting = jsx('h1', {
  className: 'title',
  children: 'Hello, world',
});`}</CodeBlock>
          </>
        }
      />

      <Body>
        Because the result is an ordinary function call, JSX is just an
        expression. You can assign it to a variable, return it from a function,
        or put it in an array.
      </Body>

      <BulletTitle>Conditionals</BulletTitle>
      <Body>
        Showing one thing or another is something you would normally write with
        an <C>if</C>. Inside JSX you use a ternary instead, because the braces
        need something that evaluates to a value.
      </Body>

      <TwoUp
        equal
        left={
          <>
            <ColumnLabel>Old school if</ColumnLabel>
            <CodeBlock dense flush>{`let status;

if (isLoggedIn) {
  status = renderDashboard(user);
} else {
  status = renderLoginForm();
}

container.appendChild(status);`}</CodeBlock>
          </>
        }
        right={
          <>
            <ColumnLabel>JSX ternary</ColumnLabel>
            <CodeBlock dense flush>{`const status = (
  <div>
    {isLoggedIn
      ? <Dashboard user={user} />
      : <LoginForm />}
  </div>
);`}</CodeBlock>
          </>
        }
      />

    </>
  );
}
