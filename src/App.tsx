import { useMemo, useEffect, useState } from 'react';
import { Box, Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Sidebar } from './components/Sidebar';
import { Section } from './components/Section';
import { StickyTitleBar } from './components/StickyTitleBar';
import { useActiveSection } from './hooks/useActiveSection';
import { usePassedTitle } from './hooks/usePassedTitle';
import { SECTIONS } from './sections/registry';
import { SECTION_CONTENT } from './sections';
import { SIDEBAR_WIDTH } from './theme';

export default function App() {
  // Stable array identities so the effect inside the hook does not
  // re-subscribe on every render.
  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const subIds = useMemo(
    () => SECTIONS.flatMap((s) => s.subs?.map((sub) => sub.id) ?? []),
    [],
  );
  const active = useActiveSection(sectionIds, subIds);

  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ids of the <h2> in each section, watched to drive the sticky bar.
  const titleIds = useMemo(() => SECTIONS.map((s) => `${s.id}-title`), []);
  const passedTitleId = usePassedTitle(titleIds);
  const passedSection = passedTitleId
    ? (SECTIONS.find((s) => `${s.id}-title` === passedTitleId) ?? null)
    : null;

  // Only show a sub crumb when it belongs to the section in the bar.
  const subLabel =
    passedSection?.subs?.find((sub) => sub.id === active.subId)?.label ?? null;

  return (
    <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
      <Sidebar active={active} />
      <StickyTitleBar section={passedSection} subLabel={subLabel} />

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
        }}
      >
        {SECTIONS.map((meta) => {
          const Content = SECTION_CONTENT[meta.id];
          return (
            <Section key={meta.id} meta={meta}>
              {Content ? <Content /> : null}
            </Section>
          );
        })}

      </Box>
      <Zoom in={showScrollTop}>
        <Fab
          size="small"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'rgba(50, 50, 50, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
            color: '#fff',
            '&:hover': {
              background: 'rgba(50, 50, 50, 0.8)',
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
}
