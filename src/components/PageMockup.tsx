import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import { fonts } from '../theme';
import { MOCKUP_TONE as TONE } from './mockupTones';

/**
 * A static wireframe of the page described by the code above.
 *
 * Deliberately plain: the point is which component owns which region, so
 * each region carries its name and nothing else. Colours match Figure 1,
 * so the same component is the same colour in both.
 */

type ToneKey = keyof typeof TONE;

/** Coloured region named by the component that renders it. */
function Region({
  label,
  tone,
  children,
  minHeight,
}: {
  label: string;
  tone: ToneKey;
  children?: ReactNode;
  minHeight?: number;
}) {
  const t = TONE[tone];
  return (
    <Box
      sx={{
        border: '2px solid',
        borderColor: t.border,
        borderRadius: 1.5,
        bgcolor: t.bg,
        minHeight,
        px: 2,
        py: 1.75,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 1.5,
      }}
    >
      <Box
        component="span"
        sx={{
          fontFamily: fonts.mono,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.02em',
          color: t.border,
        }}
      >
        {label}
      </Box>
      {children}
    </Box>
  );
}

export function PageMockup() {
  return (
    <Region label="OrderPage" tone="page">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Region label="HeaderComponent" tone="header" minHeight={62} />

        <Region label="BodyComponent" tone="body">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            <Region label="SearchBarComponent" tone="bodyChild" minHeight={58} />
            <Region label="OrderTableComponent" tone="bodyChild" minHeight={124} />
            <Region label="PaginationComponent" tone="bodyChild" minHeight={58} />
          </Box>
        </Region>

        <Region label="FooterComponent" tone="footer" minHeight={62} />
      </Box>
    </Region>
  );
}
