/**
 * Colour per level of the component tree, shared by the hierarchy diagram
 * (Figure 1) and the page wireframe (Figure 2) so the two can be read
 * against each other. Saturated on purpose: these need to be legible from
 * the back of a room on a projector.
 *
 * chipBg is only used by the filled OrderPage box in Figure 1.
 */
export const MOCKUP_TONE = {
  page: { border: '#141b4d', bg: '#e4e7f4', chipBg: '#141b4d' },
  header: { border: '#0b6bb5', bg: '#cde6f9', chipBg: '#0b6bb5' },
  body: { border: '#7b2ec7', bg: '#e8d7fa', chipBg: '#7b2ec7' },
  /** Shared by SearchBar, OrderTable and Pagination: siblings at one depth. */
  bodyChild: { border: '#0f8a52', bg: '#cdefdd', chipBg: '#0f8a52' },
  footer: { border: '#c2600a', bg: '#fbe2c6', chipBg: '#c2600a' },
} as const;
