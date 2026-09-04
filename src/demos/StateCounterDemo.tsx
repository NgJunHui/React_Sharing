import { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { navy } from '../theme';

/**
 * The counter from the code snippet above, running for real.
 * Handlers are declared above the return, exactly as shown there.
 */
export function StateCounterDemo() {
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
      <Box
        sx={{
          fontSize: 44,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          // Stops the number jumping width as it counts.
          fontVariantNumeric: 'tabular-nums',
          color: navy[800],
        }}
      >
        {count}
      </Box>

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
