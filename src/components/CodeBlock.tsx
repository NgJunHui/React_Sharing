import { Box } from '@mui/material';
import { fonts } from '../theme';

/**
 * Token kinds the highlighter understands. Kept deliberately small:
 * this is a teaching aid, not a real parser.
 */
type TokenKind =
  | 'comment'
  | 'keyword'
  | 'string'
  | 'number'
  | 'fn'
  | 'tag'
  | 'attr'
  | 'type'
  | 'plain';

/** Surface the code sits on. Near black rather than pure, to soften contrast. */
const CODE_BG = '#14161c';

const TOKEN_COLOR: Record<TokenKind, string> = {
  comment: '#8b8f9e',
  keyword: '#9fb4ff',
  string: '#a8dcb4',
  number: '#f2c88f',
  fn: '#ffd88a',
  tag: '#7fd4e8',
  attr: '#c9a8f0',
  type: '#7fd4e8',
  plain: '#dfe1e8',
};

const KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'import', 'from', 'export', 'default', 'interface', 'type', 'extends',
  'async', 'await', 'new', 'throw', 'try', 'catch', 'finally', 'class',
  'readonly', 'typeof', 'as', 'in', 'of', 'null', 'undefined', 'true',
  'false', 'void', 'this', 'super', 'implements', 'enum', 'public',
  'private', 'protected', 'static', 'yield', 'delete', 'instanceof',
]);

const TYPES = new Set([
  'string', 'number', 'boolean', 'unknown', 'any', 'never', 'object',
  'Promise', 'Array', 'Record', 'Partial', 'Required', 'Pick', 'Omit',
  'ReturnType', 'ReactNode', 'Error', 'Meta', 'StoryObj', 'React',
  'HTMLInputElement', 'HTMLFormElement', 'HTMLElement',
]);

/** Split a line into coloured spans. */
function tokenize(line: string): Array<{ text: string; kind: TokenKind }> {
  const out: Array<{ text: string; kind: TokenKind }> = [];

  // Whole-line comments (// and /* */ and <!-- -->) win outright.
  const trimmed = line.trimStart();
  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/*') ||
    trimmed.startsWith('*') ||
    trimmed.startsWith('<!--') ||
    trimmed.startsWith('#')
  ) {
    return [{ text: line, kind: 'comment' }];
  }

  // Trailing comment: split and recurse on the code half.
  const commentAt = findTrailingComment(line);
  if (commentAt > -1) {
    return [
      ...tokenize(line.slice(0, commentAt)),
      { text: line.slice(commentAt), kind: 'comment' },
    ];
  }

  const re =
    /(`[^`]*`|'[^']*'|"[^"]*")|(\b\d+(?:[._]\d+)*\b)|(<\/?[A-Za-z][\w.]*)|(\b[A-Za-z_$][\w$]*\b)(\s*\()?|([A-Za-z-]+)(?==)|(\s+)|(.)/g;

  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    const [, str, num, tag, word, callParen, attr, ws, other] = m;

    if (str) out.push({ text: str, kind: 'string' });
    else if (num) out.push({ text: num, kind: 'number' });
    else if (tag) out.push({ text: tag, kind: 'tag' });
    else if (word) {
      const kind: TokenKind = KEYWORDS.has(word)
        ? 'keyword'
        : TYPES.has(word)
          ? 'type'
          : callParen
            ? 'fn'
            : /^[A-Z]/.test(word)
              ? 'type'
              : 'plain';
      out.push({ text: word, kind });
      if (callParen) out.push({ text: callParen, kind: 'plain' });
    } else if (attr) out.push({ text: attr, kind: 'attr' });
    else if (ws) out.push({ text: ws, kind: 'plain' });
    else if (other) out.push({ text: other, kind: 'plain' });
  }

  return out;
}

/** Index of a `//` that is not inside a string literal, or -1. */
function findTrailingComment(line: string): number {
  let quote: string | null = null;
  for (let i = 0; i < line.length - 1; i++) {
    const ch = line[i];
    if (quote) {
      if (ch === quote && line[i - 1] !== '\\') quote = null;
    } else if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
    } else if (ch === '/' && line[i + 1] === '/') {
      return i;
    }
  }
  return -1;
}

export interface CodeBlockProps {
  children: string;
  /** Smaller type, for code sitting inside a card. */
  dense?: boolean;
  /** Removes the bottom margin. */
  flush?: boolean;
}

export function CodeBlock({ children, dense, flush }: CodeBlockProps) {
  const lines = children.replace(/\n$/, '').split('\n');

  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        mb: flush ? 0 : 3,
        px: dense ? 2.5 : 3,
        py: dense ? 2.25 : 2.75,
        bgcolor: CODE_BG,
        borderRadius: 2,
        overflowX: 'auto',
        fontFamily: fonts.mono,
        fontSize: dense ? 12 : 13,
        lineHeight: 1.72,
        color: TOKEN_COLOR.plain,
        tabSize: 2,
        '&::-webkit-scrollbar': { height: 8 },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: '#3a3e4a',
          borderRadius: 4,
        },
      }}
    >
      <Box component="code" sx={{ fontFamily: 'inherit' }}>
        {lines.map((line, i) => (
          <span key={i}>
            {line === ''
              ? ' '
              : tokenize(line).map((t, j) => (
                  <span
                    key={j}
                    style={{
                      color: TOKEN_COLOR[t.kind],
                      fontStyle: t.kind === 'comment' ? 'italic' : undefined,
                    }}
                  >
                    {t.text}
                  </span>
                ))}
            {i < lines.length - 1 ? '\n' : null}
          </span>
        ))}
      </Box>
    </Box>
  );
}
