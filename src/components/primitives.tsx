import type { ReactNode } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { accent, fonts, navy } from '../theme';

/* ------------------------------------------------------------------ Tag */

export type TagTone =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'neutral'
  | 'html'
  | 'css'
  | 'javascript';

const TONE: Record<TagTone, { bg: string; fg: string; border: string }> = {
  red: { bg: '#fbdcdc', fg: '#8f2226', border: '#efb4b4' },
  blue: { bg: accent.blueBg, fg: accent.blueFg, border: '#cfe0f2' },
  green: { bg: '#d3efdd', fg: '#1c6438', border: '#a8dcbc' },
  yellow: { bg: accent.yellowBg, fg: accent.yellowFg, border: '#ecdfba' },
  neutral: { bg: navy[50], fg: navy[600], border: navy[100] },

  // Keyed to each language's own brand colour. Text shades are darkened
  // from the logo hue so the label still passes contrast on a tint.
  html: { bg: '#fdece5', fg: '#a3350f', border: '#f6cdbb' },
  css: { bg: '#efe8f7', fg: '#4b2472', border: '#d8c8ea' },
  javascript: { bg: '#fbf4d0', fg: '#7a6300', border: '#ecdf9c' },
};

/** Inline glyphs, so no icon dependency is needed for two shapes. */
function TagIcon({ kind, color }: { kind: 'cross' | 'tick'; color: string }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 16 16"
      sx={{ width: 12, height: 12, flexShrink: 0, display: 'block' }}
      aria-hidden="true"
    >
      {kind === 'tick' ? (
        <path
          d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
          fill="none"
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 4 L12 12 M12 4 L4 12"
          fill="none"
          stroke={color}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      )}
    </Box>
  );
}

export function Tag({
  tone = 'neutral',
  icon,
  mono,
  children,
}: {
  tone?: TagTone;
  /** Optional glyph shown before the label. */
  icon?: 'cross' | 'tick';
  /** Render in the code font, for chips that name a keyword. */
  mono?: boolean;
  children: ReactNode;
}) {
  const c = TONE[tone];
  return (
    <Box
      component="span"
      sx={{
        alignSelf: 'flex-start',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.375,
        py: 0.5,
        mb: 1.5,
        // Square-ish when it names code, pill when it is a label.
        borderRadius: mono ? 1 : 999,
        bgcolor: c.bg,
        color: c.fg,
        border: '1px solid',
        borderColor: c.border,
        fontFamily: mono ? fonts.mono : undefined,
        fontSize: mono ? 12 : 12.5,
        fontWeight: 600,
        lineHeight: 1.5,
      }}
    >
      {icon && <TagIcon kind={icon} color={c.fg} />}
      {children}
    </Box>
  );
}

/* ----------------------------------------------------------------- Lede */

export function Lede({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ maxWidth: 820, fontSize: 16.5, lineHeight: 1.72, mb: 4 }}>
      {children}
    </Typography>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ maxWidth: 820, mb: 3 }}>{children}</Typography>
  );
}

/* -------------------------------------------------------------- Bullets */

/** Small heading above a bullet list. */
export function BulletTitle({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h4" sx={{ mb: 1.5 }}>
      {children}
    </Typography>
  );
}

export function Bullets({ children }: { children: ReactNode }) {
  return (
    <Box component="ul" sx={{ m: 0, mb: 3.5, p: 0, listStyle: 'none', maxWidth: 820 }}>
      {children}
    </Box>
  );
}

export function Bullet({ children }: { children: ReactNode }) {
  return (
    <Box
      component="li"
      sx={{
        position: 'relative',
        pl: 2.25,
        mb: 1.125,
        fontSize: 15,
        lineHeight: 1.7,
        color: 'text.secondary',
        '&:last-of-type': { mb: 0 },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 10,
          width: 5,
          height: 5,
          borderRadius: '1px',
          bgcolor: navy[300],
        },
      }}
    >
      {children}
    </Box>
  );
}

/* --------------------------------------------------------------- SubHead */

export function SubHead({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <Typography
      variant="h3"
      id={id}
      sx={{
        mt: 6.5,
        mb: 2.25,
        pb: 1.25,
        borderBottom: '1px solid',
        borderColor: navy[50],
        // Keep the heading clear of the top edge when jumped to via anchor.
        scrollMarginTop: 88,
      }}
    >
      {children}
    </Typography>
  );
}

/* ----------------------------------------------------------------- Note */

export type NoteTone = 'default' | 'warn';

export function Note({
  label,
  tone = 'default',
  children,
}: {
  label: string;
  tone?: NoteTone;
  children: ReactNode;
}) {
  const warn = tone === 'warn';
  return (
    <Box
      sx={{
        px: 3.25,
        py: 2.75,
        mt: 1,
        mb: 3.75,
        bgcolor: warn ? accent.yellowBg : navy[25],
        border: '1px solid',
        borderColor: warn ? '#ecdfba' : 'divider',
        borderLeft: '3px solid',
        borderLeftColor: warn ? accent.yellowFg : navy[800],
        borderRadius: '0 8px 8px 0',
      }}
    >
      <Box
        component="span"
        sx={{
          display: 'block',
          mb: 1,
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: warn ? accent.yellowFg : navy[400],
        }}
      >
        {label}
      </Box>
      <Typography
        variant="body2"
        sx={{
          fontSize: 14.5,
          lineHeight: 1.7,
          color: warn ? '#5f4a12' : 'text.secondary',
          '& strong': { color: warn ? accent.yellowFg : navy[800], fontWeight: 600 },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

/* ----------------------------------------------------------- InfoCard */

export type CardTone = 'plain' | 'muted' | 'accent' | 'good' | 'bad';

const CARD_TONE: Record<CardTone, { bg: string; border: string }> = {
  plain: { bg: '#ffffff', border: '#e3e6f0' },
  muted: { bg: navy[25], border: '#e3e6f0' },
  accent: { bg: navy[25], border: navy[100] },
  good: { bg: '#f4fbf7', border: '#a8dcbc' },
  bad: { bg: '#fdf5f5', border: '#efb4b4' },
};

export function InfoCard({
  num,
  tag,
  tagTone,
  tagIcon,
  tagMono,
  tagBelowTitle,
  icon,
  title,
  tone = 'plain',
  children,
}: {
  num?: string;
  tag?: string;
  tagTone?: TagTone;
  /** Optional glyph shown before the tag label. */
  tagIcon?: 'cross' | 'tick';
  /** Render the tag in the code font. */
  tagMono?: boolean;
  /** Put the tag under the title instead of above it. */
  tagBelowTitle?: boolean;
  /** Rendered on the same row as the title, before it. */
  icon?: ReactNode;
  title?: string;
  tone?: CardTone;
  children?: ReactNode;
}) {
  const c = CARD_TONE[tone];
  return (
    <Card
      sx={{
        p: 3.25,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: c.bg,
        borderColor: c.border,
      }}
    >
      {num && (
        <Box
          component="span"
          sx={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: navy[200],
            mb: 1.5,
          }}
        >
          {num}
        </Box>
      )}
      {tag && !tagBelowTitle && (
        <Tag tone={tagTone} icon={tagIcon} mono={tagMono}>{tag}</Tag>
      )}
      {title && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            mb: tagBelowTitle ? 1 : 1.125,
          }}
        >
          {icon}
          <Typography variant="h4">{title}</Typography>
        </Box>
      )}
      {tag && tagBelowTitle && (
        <Tag tone={tagTone} icon={tagIcon} mono={tagMono}>{tag}</Tag>
      )}
      {children}
    </Card>
  );
}

/** Body copy inside an InfoCard. */
export function CardText({ children }: { children: ReactNode }) {
  return <Typography variant="body2">{children}</Typography>;
}

/* ---------------------------------------------------------------- Table */

export function DataTable({
  head,
  rows,
  columns,
}: {
  head: string[];
  rows: ReactNode[][];
  /** CSS grid template. Defaults to equal columns. */
  columns?: string;
}) {
  const template = columns ?? `repeat(${head.length}, 1fr)`;

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        mb: 3.75,
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'grid' },
          gridTemplateColumns: template,
          gap: 2.25,
          px: 2.5,
          py: 1.625,
          bgcolor: navy[25],
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          color: navy[400],
        }}
      >
        {head.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </Box>

      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: template },
            gap: { xs: 0.625, md: 2.25 },
            px: 2.5,
            py: 1.625,
            borderTop: i === 0 ? 'none' : '1px solid',
            borderColor: navy[50],
            fontSize: 13.5,
            lineHeight: 1.6,
            color: 'text.secondary',
            alignItems: 'baseline',
          }}
        >
          {row.map((cell, j) => (
            <Box key={j}>{cell}</Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

/* ----------------------------------------------------------- InlineCode */

export function C({ children }: { children: ReactNode }) {
  return (
    <Box
      component="code"
      sx={{
        fontFamily: fonts.mono,
        fontSize: '0.85em',
        px: 0.625,
        py: '1.5px',
        borderRadius: 1,
        bgcolor: navy[50],
        color: navy[700],
        border: '1px solid',
        borderColor: 'divider',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Box>
  );
}

/* --------------------------------------------------------------- Figure */

export function Figure({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <Box sx={{ mt: 1, mb: 4.25 }}>
      <Box
        sx={{
          px: 2.75,
          py: 3.25,
          bgcolor: navy[25],
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflowX: 'auto',
        }}
      >
        {children}
      </Box>
      <Typography
        sx={{
          mt: 1.5,
          mx: 'auto',
          maxWidth: 620,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: '#7d829c',
          textAlign: 'center',
        }}
      >
        {caption}
      </Typography>
    </Box>
  );
}

/** Dashed box standing in for a screenshot the team still needs to supply. */
export function ImagePlaceholder({
  description,
  path,
}: {
  description: string;
  path: string;
}) {
  return (
    <Box
      sx={{
        px: 4.25,
        py: 5.75,
        bgcolor: navy[25],
        border: '1px dashed',
        borderColor: navy[200],
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          mb: 2,
          px: 1.375,
          py: 0.5,
          border: '1px solid',
          borderColor: navy[200],
          borderRadius: 999,
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: navy[400],
        }}
      >
        Image placeholder
      </Box>
      <Typography variant="body2" sx={{ maxWidth: 460, mx: 'auto', mb: 2 }}>
        {description}
      </Typography>
      <Box
        component="code"
        sx={{
          display: 'inline-block',
          px: 1.25,
          py: 0.5,
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          fontFamily: fonts.mono,
          fontSize: 11.5,
          color: navy[700],
        }}
      >
        {path}
      </Box>
    </Box>
  );
}

/* ----------------------------------------------------------- DemoSurface */

/**
 * Wrapper marking a block as a live, running example rather than a
 * static code listing.
 */
export function Demo({
  label = 'Live demo',
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        mb: 3.75,
        border: '1px solid',
        borderColor: navy[100],
        borderRadius: 2.5,
        overflow: 'hidden',
        bgcolor: '#fff',
        // Lifts the demo off the page without a heavy drop shadow.
        boxShadow: `0 1px 2px ${navy[50]}, 0 12px 28px -18px ${navy[200]}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2.5,
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: navy[100],
          // Subtle wash so the header reads as a title bar, not a block.
          background: `linear-gradient(180deg, ${navy[25]}, ${navy[50]})`,
        }}
      >
        {/* Signals the panel below is running, not a screenshot. */}
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            flexShrink: 0,
            bgcolor: '#1c9b63',
            boxShadow: '0 0 0 3px rgba(28, 155, 99, 0.16)',
          }}
        />
        <Box
          component="span"
          sx={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: navy[500],
          }}
        >
          {label}
        </Box>
      </Box>
      <Box sx={{ p: 3.25 }}>{children}</Box>
    </Box>
  );
}

/* ---------------------------------------------------------------- Grids */

export function Grid({
  cols = 3,
  children,
}: {
  cols?: 2 | 3;
  children: ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: cols === 3 ? '1fr 1fr' : '1fr',
          md: `repeat(${cols}, 1fr)`,
        },
        gap: 2.25,
        mb: 3.75,
        alignItems: 'stretch',
      }}
    >
      {children}
    </Box>
  );
}

/**
 * Side by side pairing of two blocks, typically code beside a diagram.
 * Stacks on small screens. Columns align at the top by default.
 */
export function TwoUp({
  left,
  right,
  /** Equal width columns whose contents stretch to the taller of the two. */
  equal,
}: {
  left: ReactNode;
  right: ReactNode;
  equal?: boolean;
}) {
  // When equal, the column and everything in it fills the row height, so two
  // code blocks of differing length still end level.
  const fill = equal
    ? {
        display: 'flex',
        flexDirection: 'column',
        '& > pre': { flex: 1 },
      }
    : undefined;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: equal ? '1fr 1fr' : '1.15fr 1fr' },
        gap: 3,
        mb: 3.75,
        alignItems: equal ? 'stretch' : 'start',
      }}
    >
      <Box sx={{ minWidth: 0, ...fill }}>{left}</Box>
      <Box sx={{ minWidth: 0, ...fill }}>{right}</Box>
    </Box>
  );
}

/** Heading sitting above a column in a TwoUp. */
export function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <Typography
      component="h4"
      sx={{
        mb: 1.25,
        fontSize: 15.5,
        fontWeight: 600,
        letterSpacing: '-0.012em',
        lineHeight: 1.4,
        color: navy[800],
      }}
    >
      {children}
    </Typography>
  );
}

/**
 * Two column comparison, stacks on small screens.
 * Pass `equal` to stretch both cards, and any code block inside them, to
 * the height of the taller column.
 */
export function Split({
  equal,
  children,
}: {
  equal?: boolean;
  children: ReactNode;
}) {
  if (equal) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
          mb: 3.75,
          alignItems: 'stretch',
          // The card fills the row, and its trailing block fills the card.
          '& > .MuiCard-root': { height: '100%' },
          '& > .MuiCard-root > div:last-of-type': {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          },
          '& > .MuiCard-root > div:last-of-type > pre': { flex: 1 },
        }}
      >
        {children}
      </Box>
    );
  }

  return <SplitBase>{children}</SplitBase>;
}

function SplitBase({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 2.5,
        mb: 3.75,
        alignItems: 'start',
      }}
    >
      {children}
    </Box>
  );
}
