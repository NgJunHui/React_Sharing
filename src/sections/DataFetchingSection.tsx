import { CodeBlock } from '../components/CodeBlock';
import { Body, C, Lede } from '../components/primitives';

export function DataFetchingSection() {
  return (
    <>
      <Lede>
        Almost every page needs data from the server. Fetching is a side effect:
        it reaches outside React, it takes time, and it can fail.{' '}
        <C>useEffect</C> is the hook that runs that kind of work after a render.
      </Lede>

      <Body>
        First the request itself, as a plain function in its own file. It knows
        nothing about React, so it can be reused and tested on its own.
      </Body>

      <CodeBlock>{`// api/getOrders.ts

export async function getOrders() {
  const res = await fetch('/api/orders');
  if (!res.ok) throw new Error('Could not load orders');
  return res.json();
}`}</CodeBlock>

      <Body>
        Then the component calls it. The effect is down to three lines, because
        it only decides when to fetch, not how.
      </Body>

      <CodeBlock>{`// features/orders/pages/OrderListPage.tsx

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <ul>
      {orders.map((o) => (
        <li key={o.reference}>
          {o.reference} — {o.quantity} × \${o.price}
        </li>
      ))}
    </ul>
  );
}`}</CodeBlock>

      <Body>
        Defining it outside the component is what makes this work. A function
        declared inside the body is a new function on every render, so adding it
        to the dependency array would restart the effect forever. Kept outside,
        it is created once and the effect stays honest with an empty array.
      </Body>
    </>
  );
}
