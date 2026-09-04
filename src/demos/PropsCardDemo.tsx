import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { navy } from '../theme';

/* ---------------------------------------------------------------- child */

/**
 * Owns the presentation. Receives a label and a number through props and
 * holds no state of its own.
 */
function CountCard({ label, count }: { label: string; count: number }) {
  return (
    <Box
      sx={{
        px: 3,
        py: 2.75,
        maxWidth: 240,
        borderRadius: 2,
        bgcolor: navy[25],
        border: '1px solid',
        borderColor: navy[100],
      }}
    >
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: navy[400],
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 46,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          // Stops the number jumping width as it changes.
          fontVariantNumeric: 'tabular-nums',
          color: navy[800],
        }}
      >
        {count}
      </Typography>
    </Box>
  );
}

/* --------------------------------------------------------------- parent */

export function PropsCardDemo() {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }

  function handleSubtract() {
    setCount(count - 1);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <Stack spacing={2.5} sx={{ alignItems: 'flex-start' }}>
      {/* The parent owns count and hands it down as a prop. */}
      <CountCard label="Total items" count={count} />

      <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="outlined" onClick={handleSubtract}>
          Subtract
        </Button>
        <Button variant="text" onClick={handleReset} disabled={count === 0}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}
