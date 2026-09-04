import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import type { SectionMeta } from '../sections/registry';

export function Section({
  meta,
  children,
}: {
  meta: SectionMeta;
  children: ReactNode;
}) {
  return (
    <Box
      component="section"
      id={meta.id}
      sx={{
        maxWidth: 1080,
        mx: 'auto',
        px: { xs: 2.5, md: 3.75 },
        py: { xs: 5.5, md: 8 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        // Watched by usePassedTitle to drive the sticky bar.
        id={`${meta.id}-title`}
        sx={{
          mb: 4,
          fontSize: 'clamp(30px, 4.2vw, 46px)',
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          scrollMarginTop: 88,
        }}
      >
        {meta.num}. {meta.title}
      </Typography>
      {children}
    </Box>
  );
}
