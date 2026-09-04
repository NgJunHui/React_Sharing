import type { ReactNode } from 'react';
import { accent, fonts, navy } from '../theme';

/**
 * Thin wrappers over raw SVG so the diagrams stay declarative and share
 * one visual language. Deliberately plain: no layout engine, explicit
 * coordinates.
 */

export function Svg({
  viewBox,
  label,
  children,
}: {
  viewBox: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      style={{ width: '100%', minWidth: 560, height: 'auto', display: 'block' }}
    >
      {children}
    </svg>
  );
}

type BoxTone = 'plain' | 'primary' | 'soft' | 'dashed';

const BOX_TONE: Record<BoxTone, { fill: string; stroke: string; dash?: string }> = {
  plain: { fill: '#ffffff', stroke: navy[200] },
  primary: { fill: navy[800], stroke: navy[800] },
  soft: { fill: navy[50], stroke: navy[100] },
  dashed: { fill: '#ffffff', stroke: navy[200], dash: '4 3' },
};

export function DBox({
  x,
  y,
  w,
  h,
  tone = 'plain',
  r = 6,
  fill,
  stroke,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: BoxTone;
  r?: number;
  /** Overrides the tone, for diagrams that colour code their nodes. */
  fill?: string;
  stroke?: string;
}) {
  const t = BOX_TONE[tone];
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill ?? t.fill}
      stroke={stroke ?? t.stroke}
      strokeWidth={stroke ? 2 : 1}
      strokeDasharray={t.dash}
    />
  );
}

type TextTone = 'default' | 'inverse' | 'muted' | 'mono' | 'monoInverse' | 'error';

const TEXT_TONE: Record<
  TextTone,
  { fill: string; family: string; weight: number }
> = {
  default: { fill: navy[800], family: fonts.sans, weight: 500 },
  inverse: { fill: '#ffffff', family: fonts.sans, weight: 500 },
  muted: { fill: navy[600], family: fonts.sans, weight: 600 },
  mono: { fill: '#7d829c', family: fonts.mono, weight: 400 },
  monoInverse: { fill: navy[200], family: fonts.mono, weight: 400 },
  error: { fill: accent.redFg, family: fonts.sans, weight: 600 },
};

export function DText({
  x,
  y,
  size = 14,
  tone = 'default',
  fill,
  anchor = 'middle',
  italic,
  children,
}: {
  x: number;
  y: number;
  size?: number;
  tone?: TextTone;
  /** Overrides the tone, for diagrams that colour code their nodes. */
  fill?: string;
  /** Horizontal alignment. Use start or end for callout labels. */
  anchor?: 'start' | 'middle' | 'end';
  italic?: boolean;
  children: ReactNode;
}) {
  const t = TEXT_TONE[tone];
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontFamily={t.family}
      fontWeight={t.weight}
      fontStyle={italic ? 'italic' : undefined}
      fill={fill ?? t.fill}
    >
      {children}
    </text>
  );
}

/** Small uppercase caption used to label a region of a diagram. */
export function DLabel({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={11}
      fontFamily={fonts.sans}
      fontWeight={700}
      letterSpacing="0.07em"
      fill={navy[300]}
      style={{ textTransform: 'uppercase' }}
    >
      {children}
    </text>
  );
}

export function DLine({ d, arrow }: { d: string; arrow?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={arrow ? navy[400] : navy[300]}
      strokeWidth={arrow ? 1.6 : 1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** Horizontal arrow from x1 to x2 at height y. */
export function DArrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <>
      <DLine d={`M${x1} ${y} L${x2} ${y}`} arrow />
      <DLine d={`M${x2 - 7} ${y - 6} L${x2} ${y} L${x2 - 7} ${y + 6}`} arrow />
    </>
  );
}

/** Vertical arrow from y1 down to y2 at column x. */
export function DArrowDown({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <>
      <DLine d={`M${x} ${y1} L${x} ${y2}`} arrow />
      <DLine d={`M${x - 7} ${y2 - 8} L${x} ${y2} L${x + 7} ${y2 - 8}`} arrow />
    </>
  );
}
