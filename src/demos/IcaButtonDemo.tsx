import { Button, Stack } from '@mui/material';

/**
 * Dummy buttons matching the two IcaButton variants from common-ui.
 * Styling only: primary maps to MUI contained, secondary to outlined.
 * Values taken from theme.palette.complimentary.blue.
 */
const BLUE = {
  100: '#326295',
  80: '#4879A7',
  60: '#7CA8D7',
} as const;

const base = {
  textTransform: 'initial',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 22 / 16,
  padding: '12px 40px',
  borderRadius: '8px',
} as const;

const primary = {
  ...base,
  bgcolor: BLUE[100],
  color: '#fff',
  '&:hover': { bgcolor: BLUE[60] },
  '&:active': { bgcolor: BLUE[80] },
};

const secondary = {
  ...base,
  borderWidth: '2px',
  borderColor: BLUE[100],
  bgcolor: '#fff',
  color: BLUE[100],
  '&:hover': {
    borderWidth: '2px',
    borderColor: BLUE[60],
    color: BLUE[80],
    bgcolor: '#fff',
  },
  '&:active': {
    borderWidth: '2px',
    borderColor: BLUE[80],
    color: BLUE[80],
  },
};

export function IcaButtonDemo() {
  return (
    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
      <Button disableElevation disableRipple variant="contained" sx={primary}>
        Add
      </Button>
      <Button disableElevation disableRipple variant="outlined" sx={secondary}>
        Subtract
      </Button>
    </Stack>
  );
}
