import { useMemo } from 'react';
import { Box } from '@mui/material';
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
    </Box>
  );
}
