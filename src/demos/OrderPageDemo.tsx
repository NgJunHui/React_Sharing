import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { navy } from '../theme';

/* ---------------------------------------------------------------- types */

interface Order {
  id: string;
  reference: string;
  priceInCents: number;
}

/* ------------------------------------------------------------ utilities */

function formatCentsToDollars(cents: number) {
  return `SGD ${(cents / 100).toFixed(2)}`;
}

/* ------------------------------------------------------------ mock data */

const ORDERS: Order[] = [
  { id: '1', reference: 'ORD-8821', priceInCents: 990 },
  { id: '2', reference: 'ORD-8822', priceInCents: 2450 },
  { id: '3', reference: 'ORD-8823', priceInCents: 375 },
];

/* ---------------------------------------------------------------- child */

/** Receives one order and its position. Owns nothing. */
function OrderRow({
  order,
  position,
}: {
  order: Order;
  position: number;
}) {
  return (
    <Box
      component="li"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.25,
        fontSize: 13.5,
        color: navy[800],
        borderBottom: '1px solid',
        borderColor: navy[50],
        '&:last-of-type': { borderBottom: 'none' },
      }}
    >
      <Box
        component="span"
        sx={{
          flexShrink: 0,
          width: 20,
          height: 20,
          borderRadius: '50%',
          bgcolor: navy[100],
          color: navy[700],
          fontSize: 11,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {position}
      </Box>
      <Box component="span" sx={{ flex: 1 }}>
        {order.reference}
      </Box>
      <Box component="span">
        {formatCentsToDollars(order.priceInCents)}
      </Box>
    </Box>
  );
}

/* ----------------------------------------------------------------- page */

export function OrderPageDemo() {
  const [showTotal, setShowTotal] = useState(false);

  // Derived during render, never stored.
  const totalInCents = ORDERS.reduce((sum, o) => sum + o.priceInCents, 0);

  function handleToggle() {
    setShowTotal(!showTotal);
  }

  return (
    <Stack spacing={2.5} sx={{ alignItems: 'flex-start', maxWidth: 380 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: 20,
          fontWeight: 600,
          color: navy[800],
          letterSpacing: '-0.015em',
        }}
      >
        Orders
      </Typography>

      {/* One row per order, each with a key */}
      <Box
        component="ul"
        sx={{
          width: '100%',
          m: 0,
          p: 0,
          listStyle: 'none',
          border: '1px solid',
          borderColor: navy[100],
          borderRadius: 1.5,
          bgcolor: '#fff',
        }}
      >
        {ORDERS.map((order, index) => (
          <OrderRow key={order.id} order={order} position={index + 1} />
        ))}
      </Box>

      <Button variant="contained" onClick={handleToggle}>
        {showTotal ? 'Hide total' : 'Show total'}
      </Button>

      {showTotal && (
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            // Keeps the digits from shifting as the total changes.
            fontVariantNumeric: 'tabular-nums',
            color: navy[800],
          }}
        >
          Total: {formatCentsToDollars(totalInCents)}
        </Typography>
      )}
    </Stack>
  );
}
