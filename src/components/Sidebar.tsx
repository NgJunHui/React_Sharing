import { Box, Typography } from '@mui/material';
import { fonts, navy, SIDEBAR_DIVIDER, SIDEBAR_WIDTH } from '../theme';
import { SECTIONS_BY_GROUP } from '../sections/registry';
import type { ActiveIds } from '../hooks/useActiveSection';

/** The React atom mark. Inline so there is no icon dependency. */
function ReactLogo() {
  return (
    <Box
      component="svg"
      viewBox="-11.5 -10.232 23 20.463"
      aria-hidden
      sx={{ width: 36, height: 36, flexShrink: 0, color: '#087ea4' }}
    >
      <circle r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </Box>
  );
}

export function Sidebar({ active }: { active: ActiveIds }) {
  return (
    <Box
      component="aside"
      sx={{
        position: { xs: 'static', md: 'fixed' },
        top: 0,
        left: 0,
        bottom: 0,
        width: { xs: '100%', md: SIDEBAR_WIDTH },
        bgcolor: navy[25],
        borderRight: { xs: 'none', md: '1px solid' },
        borderBottom: { xs: '1px solid', md: 'none' },
        borderColor: SIDEBAR_DIVIDER,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 20,
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          px: 2.5,
          pt: 3.25,
          pb: 2.75,
          borderBottom: '1px solid',
          borderColor: SIDEBAR_DIVIDER,
        }}
      >
        <ReactLogo />
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: navy[800],
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
          }}
        >
          React &amp; TypeScript
        </Typography>
      </Box>

      {/* Nav */}
      <Box
        component="nav"
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 1.75,
          pt: 2,
          pb: 5,
          maxHeight: { xs: 260, md: 'none' },
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: navy[200],
            borderRadius: 3,
          },
        }}
      >
        {SECTIONS_BY_GROUP.map(({ group, items }) => (
          <Box key={group} sx={{ mb: 2 }}>
            <Box
              component="span"
              sx={{
                display: 'block',
                px: 1.25,
                pt: 1.25,
                pb: 1,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: navy[300],
              }}
            >
              {group}
            </Box>

            {items.map((s) => {
              const isActive = s.id === active.sectionId;
              return (
                <Box key={s.id} sx={{ mb: 0.5 }}>
                  <Box
                    component="a"
                    href={`#${s.id}`}
                    sx={{
                      display: 'flex',
                      gap: 1,
                      // Child sections sit in from the parent above them.
                      ml: s.nested ? 1.75 : 0,
                      px: 1.25,
                      py: 0.75,
                      borderRadius: 1.25,
                      fontSize: s.nested ? 13 : 13.5,
                      lineHeight: 1.45,
                      textDecoration: 'none',
                      color: isActive ? navy[800] : 'text.secondary',
                      fontWeight: isActive ? 600 : 400,
                      bgcolor: isActive ? navy[100] : 'transparent',
                      '&:hover': {
                        bgcolor: isActive ? navy[100] : navy[50],
                        color: navy[800],
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        flexShrink: 0,
                        width: 24,
                        textAlign: 'right',
                        fontFamily: fonts.mono,
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: 'inherit',
                        opacity: isActive ? 0.75 : 0.55,
                      }}
                    >
                      {s.num}
                    </Box>
                    <Box component="span" sx={{ minWidth: 0 }}>
                      {s.label}
                    </Box>
                  </Box>

                  {/* Sub headings, only for the section being read. */}
                  {isActive && s.subs && (
                    <Box sx={{ mt: 0.5, mb: 0.75 }}>
                      {s.subs.map((sub) => {
                        const subActive = sub.id === active.subId;
                        return (
                          <Box
                            key={sub.id}
                            component="a"
                            href={`#${sub.id}`}
                            sx={{
                              display: 'block',
                              // Aligns with the section label, past the number column.
                              ml: 5.25,
                              pl: 1.25,
                              pr: 1.25,
                              py: 0.4,
                              mb: 0.25,
                              borderLeft: '1px solid',
                              borderLeftColor: subActive
                                ? navy[400]
                                : navy[100],
                              fontSize: 12.5,
                              lineHeight: 1.45,
                              textDecoration: 'none',
                              color: subActive ? navy[700] : '#7d829c',
                              fontWeight: subActive ? 600 : 400,
                              '&:hover': { color: navy[800] },
                            }}
                          >
                            {sub.label}
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
