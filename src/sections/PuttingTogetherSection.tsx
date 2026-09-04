import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  Bullet,
  Bullets,
  BulletTitle,
  C,
  ColumnLabel,
  Demo,
  TwoUp,
} from "../components/primitives";
import { OrderPageDemo } from "../demos/OrderPageDemo";

export function PuttingTogetherSection() {
  return (
    <>
      <Body>
        A realistic page component. It lists orders and shows a total on demand.
        Nothing new here, just the pieces from the last seven sections working
        together.
      </Body>

      <Demo>
        <OrderPageDemo />
      </Demo>

      <Body>
        Here is all of it. Types, the utility and the child component on the
        left, the page itself on the right.
      </Body>

      <TwoUp
        equal
        left={
          <>
            <ColumnLabel>Types, utils and the child</ColumnLabel>
            <CodeBlock dense flush>{`import { useState } from 'react';

// Common component (6), already in Storybook.
import { IcaButton } from '@/components/IcaButton';

// --- Type (7) ---

interface Order {
  id: string;
  reference: string;
  priceInCents: number;
}

// --- Utility function (4) ---

function formatCentsToDollars(cents: number) {
  return \`SGD \${(cents / 100).toFixed(2)}\`;
}

// --- Mock data ---

const ORDERS: Order[] = [
  { id: '1', reference: 'ORD-8821', priceInCents: 990 },
  { id: '2', reference: 'ORD-8822', priceInCents: 2450 },
  { id: '3', reference: 'ORD-8823', priceInCents: 375 },
];

// --- Child, receives props (5) ---

interface OrderRowProps {
  order: Order;
  position: number;
}

function OrderRow({ order, position }: OrderRowProps) {
  return (
    <li>
      <span className="badge">{position}</span>
      <span>{order.reference}</span>
      <span>{formatCentsToDollars(order.priceInCents)}</span>
    </li>
  );
}`}</CodeBlock>
          </>
        }
        right={
          <>
            <ColumnLabel>The page, owns the state (3, 4.1)</ColumnLabel>
            <CodeBlock dense flush>{`export function OrderPage() {
  const [showTotal, setShowTotal] = useState(false);

  // Derived during render, never stored.
  const totalInCents = ORDERS.reduce(
    (sum, o) => sum + o.priceInCents,
    0,
  );

  function handleToggle() {
    setShowTotal(!showTotal);
  }

  return (
    <div>
      <h1>Orders</h1>

      {/* key is the id. index is only for display. */}
      <ul>
        {ORDERS.map((order, index) => (
          <OrderRow
            key={order.id}
            order={order}
            position={index + 1}
          />
        ))}
      </ul>

      <IcaButton
        label={showTotal ? 'Hide total' : 'Show total'}
        onClick={handleToggle}
      />

      {showTotal && (
        <p>Total: {formatCentsToDollars(totalInCents)}</p>
      )}
    </div>
  );
}`}</CodeBlock>
          </>
        }
      />

      <BulletTitle>What is doing what</BulletTitle>
      <Bullets>
        <Bullet>
          <strong>Types.</strong> <C>Order</C> is the shape of one record, and{' '}
          <C>OrderRowProps</C> is what the child expects. Both are checked before
          anything runs.
        </Bullet>
        <Bullet>
          <strong>Hierarchy.</strong> <C>OrderPage</C> renders three{' '}
          <C>OrderRow</C> plus one <C>IcaButton</C>. Each file is responsible for
          one thing.
        </Bullet>
        <Bullet>
          <strong>State.</strong> Only <C>showTotal</C> is state, and only the
          page owns it. <C>total</C> is calculated during render, because it can
          be worked out from data that already exists.
        </Bullet>
        <Bullet>
          <strong>Props down.</strong> The row is handed an order and its
          position. It has no state and cannot change either.
        </Bullet>
        <Bullet>
          <strong>Reuse.</strong> <C>formatCentsToDollars</C> is a utility used
          in two places. <C>IcaButton</C> comes from the shared library. Neither
          knows anything about this page.
        </Bullet>
        <Bullet>
          <strong>JSX.</strong> <C>.map()</C> for the list with a <C>key</C> on
          each item, a ternary for the button label, and <C>&&</C> to show the
          total only when it is toggled on.
        </Bullet>
        <Bullet>
          <strong>key is not index.</strong> <C>key</C> uses <C>order.id</C>{' '}
          because it must identify the record. The visible number comes from{' '}
          <C>index</C>, which is fine for display but wrong as a key.
        </Bullet>
      </Bullets>
    </>
  );
}
