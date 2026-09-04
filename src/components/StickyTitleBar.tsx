import { Box, Typography } from '@mui/material';
import { fonts, navy, SIDEBAR_DIVIDER, SIDEBAR_WIDTH } from '../theme';
import type { SectionMeta } from '../sections/registry';

/** Chevron between breadcrumb steps. */
function Separator() {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden
      sx={{ width: 15, height: 15, flexShrink: 0, color: navy[200] }}
    >
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
}

/**
 * Drops in from the top once the reader scrolls past a section title, as a
 * breadcrumb of group, section and current sub heading.
 *
 * Stays mounted and slides out of view when there is nothing to show, so
 * the transition runs in both directions.
 */
export function StickyTitleBar({
  section,
  subLabel,
}: {
  section: SectionMeta | null;
  /** Sub heading being read, when the section has them. */
  subLabel: string | null;
}) {
  const shown = section !== null;

  return (
    <Box
      component="nav"
      aria-label="Breadcrumb"
      aria-hidden={!shown}
      sx={{
        position: 'fixed',
        top: 0,
        left: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
        right: 0,
        zIndex: 15,
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        minHeight: 72,
        px: { xs: 2.5, md: 3.75 },
        py: 1.75,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: SIDEBAR_DIVIDER,

        // Slide and fade together so it reads as one motion.
        transform: shown ? 'translateY(0)' : 'translateY(-100%)',
        opacity: shown ? 1 : 0,
        transition:
          'transform 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease',

        // Honour the reader's motion preference: appear without sliding.
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          transform: 'none',
          visibility: shown ? 'visible' : 'hidden',
        },
      }}
    >
      {/* Group. Dropped on narrow screens so the section keeps the room. */}
      <Box
        component="span"
        sx={{
          display: { xs: 'none', sm: 'block' },
          flexShrink: 0,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          color: navy[300],
        }}
      >
        {section?.group}
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Separator />
      </Box>

      {/* Section. The anchor of the trail, so it never truncates first. */}
      <Box
        component="a"
        href={section ? `#${section.id}` : undefined}
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 1,
          flexShrink: 0,
          textDecoration: 'none',
          '&:hover': { '& .crumb-title': { color: navy[600] } },
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: fonts.mono,
            fontSize: 14,
            fontWeight: 700,
            color: navy[300],
          }}
        >
          {section?.num}
        </Box>
        <Typography
          className="crumb-title"
          component="span"
          sx={{
            fontSize: { xs: 18, md: 22 },
            fontWeight: 600,
            color: navy[800],
            letterSpacing: '-0.024em',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            transition: 'color 150ms ease',
          }}
        >
          {section?.title}
        </Typography>
      </Box>

      {/* Sub heading, only while one is being read. */}
      {subLabel && (
        <>
          <Separator />
          <Typography
            component="span"
            sx={{
              fontSize: { xs: 14, md: 16 },
              fontWeight: 500,
              color: '#7d829c',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {subLabel}
          </Typography>
        </>
      )}
    </Box>
  );
}
