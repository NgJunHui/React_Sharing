import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  Bullet,
  Bullets,
  C,
  CardText,
  ColumnLabel,
  DataTable,
  InfoCard,
  Split,
  SubHead,
  TwoUp,
} from "../components/primitives";

export function TypeScriptSection() {
  return (
    <>
      <Body>
        TypeScript is JavaScript with type annotations added. It is a superset:
        every valid JavaScript file is already valid TypeScript. You add types
        where they help, and a checker catches mistakes while you write rather
        than when a user hits them.
      </Body>

      <Split>
        <InfoCard tone="bad" tag="JavaScript" tagTone="red">
          <CardText>
            Nothing complains until this runs, and then only if that exact line
            is reached.
          </CardText>
          <div style={{ marginTop: 16 }}>
            <CodeBlock dense flush>{`function total(price, qty) {
  return price * qty;
}

total('10', 3);       // "101010"
total(10);            // NaN
total(10, 3, 7);      // silently ignored`}</CodeBlock>
          </div>
        </InfoCard>

        <InfoCard tone="good" tag="TypeScript" tagTone="green">
          <CardText>
            All three mistakes are flagged in the editor, underlined in red,
            before the file is even saved.
          </CardText>
          <div style={{ marginTop: 16 }}>
            <CodeBlock dense flush>{`function total(price: number, qty: number) {
  return price * qty;
}

total('10', 3);       // string not assignable
total(10);            // expected 2 arguments
total(10, 3, 7);      // expected 2, got 3`}</CodeBlock>
          </div>
        </InfoCard>
      </Split>


      <SubHead id="ts-interface">interface or type</SubHead>

      <Split equal>
        <InfoCard tag="interface" tagTone="neutral" tagMono>
          <CardText>
            Describes the shape of an object. Use this for props and data
            models, which is most of what you write.
          </CardText>
          <div style={{ marginTop: 16 }}>
            <CodeBlock dense flush>{`interface User {
  name: string;
  age: number;
}

const user: User = {
  name: 'John',
  age: 30,
};`}</CodeBlock>
          </div>
        </InfoCard>

        <InfoCard tag="type" tagTone="neutral" tagMono>
          <CardText>
            Names any type, not just an object. Use it when you need a fixed set
            of values, which an interface cannot express.
          </CardText>
          <div style={{ marginTop: 16 }}>
            <CodeBlock dense flush>{`type Status = 'open' | 'closed';

const a: Status = 'open';     // fine
const b: Status = 'archived'; // error`}</CodeBlock>
          </div>
        </InfoCard>
      </Split>

      <SubHead id="ts-optional">Optional fields</SubHead>
      <Body>
        A <C>?</C> after the name means the field may be missing. Everything
        without one is required, so the compiler will not let you build an
        incomplete object.
      </Body>

      <CodeBlock>{`interface Order {
  reference: string;   // required
  total: number;       // required
  note?: string;       // optional
}

// Fine. note was left out.
const a: Order = { reference: 'ORD-8821', total: 9.9 };

// Error. total is required and missing.
const b: Order = { reference: 'ORD-8822' };`}</CodeBlock>

      <Body>
        The catch is that an optional field can be <C>undefined</C>, so the
        compiler stops you reading through it without a check.
      </Body>

      <Split equal>
        <InfoCard tone="bad" tag="Not checked" tagTone="red" tagIcon="cross">
          <div style={{ marginTop: 4 }}>
            <CodeBlock dense flush>{`// Error: note may be undefined
order.note.toUpperCase();`}</CodeBlock>
          </div>
        </InfoCard>
        <InfoCard tone="good" tag="Checked" tagTone="green" tagIcon="tick">
          <div style={{ marginTop: 4 }}>
            <CodeBlock dense flush>{`// Optional chaining, or a guard
order.note?.toUpperCase();

if (order.note) {
  order.note.toUpperCase();
}`}</CodeBlock>
          </div>
        </InfoCard>
      </Split>

      <Body>
        The same applies to props. The <C>variant</C> prop on <C>IcaButton</C>{' '}
        is optional, which is exactly why the parent can leave it out and get
        the default.
      </Body>

      <SubHead id="ts-strict">Loose types versus strict types</SubHead>
      <Body>
        Annotating something as <C>string</C> technically satisfies the compiler
        while telling it almost nothing. The type is only worth having if it
        rules out the values you never want.
      </Body>

      <Split equal>
        <InfoCard tone="bad" tag="Loose" tagTone="red" tagIcon="cross">
          <CardText>
            <C>string</C> accepts anything, so typos and wrong casing compile
            fine and break later.
          </CardText>
          <div style={{ marginTop: 16 }}>
            <CodeBlock dense flush>{`interface Order {
  status: string;
}

order.status = 'open';       // fine
order.status = 'OPEN';       // also fine
order.status = 'banana';     // also fine`}</CodeBlock>
          </div>
        </InfoCard>

        <InfoCard tone="good" tag="Strict" tagTone="green" tagIcon="tick">
          <CardText>
            A union lists the only values allowed. Anything else is caught as
            you type, and autocomplete offers the three.
          </CardText>
          <div style={{ marginTop: 16 }}>
            <CodeBlock dense flush>{`type OrderStatus = 'open' | 'closed';

interface Order {
  status: OrderStatus;
}

order.status = 'open';       // fine
order.status = 'OPEN';       // error
order.status = 'banana';     // error`}</CodeBlock>
          </div>
        </InfoCard>
      </Split>

      <Bullets>
        <Bullet>
          <C>string</C> on a field with fixed values is the most common missed
          opportunity. A union takes seconds to write and removes a whole class
          of typo bug.
        </Bullet>
        <Bullet>
          <C>any</C> switches checking off for that value and everything it
          touches. If you genuinely do not know the shape, use <C>unknown</C>,
          which forces you to narrow before use.
        </Bullet>
      </Bullets>

      <SubHead id="ts-utility">Utility Types</SubHead>
      <Body>
        Built in helpers that derive one type from another. Write the model
        once, then shape it per use case. Change the model and everything
        derived from it updates with it.
      </Body>

      <DataTable
        columns="0.85fr 1fr 1.3fr"
        head={['Utility', 'Effect', 'Typical use']}
        rows={[
          [<C>Pick&lt;T, K&gt;</C>, 'Keeps only the named fields', 'List rows, summary views'],
          [<C>Omit&lt;T, K&gt;</C>, 'Keeps everything except those named', 'Create payloads without server fields'],
          [<C>Required&lt;T&gt;</C>, 'All fields mandatory', 'After validation or defaulting'],
          [<C>Partial&lt;T&gt;</C>, 'All fields optional', 'Update payloads, default merging'],
        ]}
      />

      <CodeBlock>{`interface Order {
  id: string;
  reference: string;
  status: OrderStatus;
  total: number;
  customerId?: string;
}

// Hand-pick a few values from Order
type OrderRowFields = Pick<Order, 'id' | 'reference' | 'status'>;

// Remove a few values from Order
type OrderCreateRequest = Omit<Order, 'id'>;

// Every field mandatory
type ValidatedOrder = Required<Order>;

// Every field optional
type OrderPatchRequest = Partial<Order>;`}</CodeBlock>

      <SubHead>Java vs React</SubHead>
      <Body>
        The syntax differs but the idea is the same. Types go on the parameters
        and the return, and the compiler checks the calls before anything runs.
      </Body>

      <TwoUp
        equal
        left={
          <>
            <ColumnLabel>Backend (Java)</ColumnLabel>
            <CodeBlock dense flush>{`// --- The set of allowed statuses ---

public enum OrderStatus {
  OPEN, CLOSED, CANCELLED
}

// --- The shape of an order ---

public class Order {
  private final String reference;
  private final int quantity;
  private final double price;
  private final OrderStatus status;


  // --- Constructor ---

  public Order(String reference, int quantity,
               double price, OrderStatus status) {
    this.reference = reference;
    this.quantity  = quantity;
    this.price     = price;
    this.status    = status;
  }

  // --- Getters ---

  public String getReference()   { return reference; }
  public int getQuantity()       { return quantity; }
  public double getPrice()       { return price; }
  public OrderStatus getStatus() { return status; }
}

// --- Functions that work on orders ---

public class OrderService {

  public double total(Order order) {
    return order.getQuantity() * order.getPrice();
  }

  public List<Order> openOnly(List<Order> orders) {
    return orders.stream()
      .filter(o -> o.getStatus() == OrderStatus.OPEN)
      .collect(Collectors.toList());
  }
}

// --- Mock data ---

List<Order> orders = List.of(
  new Order("ORD-8821", 2, 9.90,  OrderStatus.OPEN),
  new Order("ORD-8822", 1, 24.50, OrderStatus.CLOSED),
  new Order("ORD-8823", 5, 3.75,  OrderStatus.OPEN),
  new Order("ORD-8824", 3, 12.00, OrderStatus.CANCELLED)
);

// --- Using it ---

OrderService service = new OrderService();

service.total(orders.get(0));   // 19.80
service.openOnly(orders);       // [ORD-8821, ORD-8823]`}</CodeBlock>
          </>
        }
        right={
          <>
            <ColumnLabel>Frontend (TypeScript)</ColumnLabel>
            <CodeBlock dense flush>{`// --- The set of allowed statuses ---

type OrderStatus = 'OPEN' | 'CLOSED' | 'CANCELLED';



// --- The shape of an order ---

interface Order {
  reference: string;
  quantity: number;
  price: number;
  status: OrderStatus;
}

// --- Constructor ---

// None needed. An object literal is the object.







// --- Getters ---

// None needed. Read the fields directly: order.price





// --- Functions that work on orders ---

function total(order: Order): number {
  return order.quantity * order.price;
}

function openOnly(orders: Order[]): Order[] {
  return orders.filter((o) => o.status === 'OPEN');
}






// --- Mock data ---

const orders: Order[] = [
  { reference: 'ORD-8821', quantity: 2, price: 9.90,  status: 'OPEN' },
  { reference: 'ORD-8822', quantity: 1, price: 24.50, status: 'CLOSED' },
  { reference: 'ORD-8823', quantity: 5, price: 3.75,  status: 'OPEN' },
  { reference: 'ORD-8824', quantity: 3, price: 12.00, status: 'CANCELLED' },
];

// --- Using it ---

total(orders[0]);   // 19.80
openOnly(orders);   // [ORD-8821, ORD-8823]

`}</CodeBlock>
          </>
        }
      />

    </>
  );
}
