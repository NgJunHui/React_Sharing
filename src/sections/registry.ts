/**
 * Single source of truth for the sections and the sidebar.
 * Adding a section here adds it to the nav automatically.
 */
export interface SubSection {
  /** Anchor id, must match the SubHead rendered in the section. */
  id: string;
  label: string;
}

export interface SectionMeta {
  id: string;
  /** Sidebar label. */
  label: string;
  /** Heading shown in the section itself. */
  title: string;
  /** Ordinal rendered beside the title. Dotted for child sections. */
  num: string;
  group: SectionGroup;
  /** Indent this row in the sidebar, for sections numbered like 4.1. */
  nested?: boolean;
  /** Indented rows shown under this section in the sidebar. */
  subs?: SubSection[];
}

export type SectionGroup =
  | 'Foundation'
  | 'TypeScript'
  | 'Workflow';

export const GROUP_ORDER: SectionGroup[] = [
  'Foundation',
  'TypeScript',
  'Workflow',
];

export const SECTIONS: SectionMeta[] = [
  // ------------------------------------------------------- Foundation
  { id: 'languages',   num: '1',  label: 'Frontend',              title: 'Frontend',                 group: 'Foundation' },
  { id: 'jsx',         num: '2',  label: 'What is JSX?',          title: 'What is JSX?',             group: 'Foundation' },
  { id: 'hierarchy',   num: '3',  label: 'Component Hierarchy',   title: 'Component Hierarchy',      group: 'Foundation' },
  { id: 'hooks-utils', num: '4',  label: 'Hooks vs Utility Functions', title: 'Hooks vs Utility Functions', group: 'Foundation' },
  { id: 'state',       num: '4.1', label: 'useState',             title: 'useState',                 group: 'Foundation', nested: true },
  { id: 'props-intro', num: '5',  label: 'Props',                 title: 'Props',                    group: 'Foundation' },
  { id: 'reuse',       num: '6',  label: 'Reusability',           title: 'Reusability (Common Components)', group: 'Foundation' },
  { id: 'data-fetching', num: '7',  label: 'Data Fetching',        title: 'Data Fetching',            group: 'Foundation' },

  // ------------------------------------------------------- TypeScript
  {
    id: 'typescript', num: '8', label: 'TypeScript in React', title: 'TypeScript in React', group: 'TypeScript',
    subs: [
      { id: 'ts-interface', label: 'interface or type' },
      { id: 'ts-optional',  label: 'Optional fields' },
      { id: 'ts-strict',    label: 'Loose vs strict types' },
      { id: 'ts-utility',   label: 'Utility Types' },
    ],
  },

  { id: 'putting-together', num: '9', label: 'Putting It Together', title: 'Putting It Together', group: 'TypeScript' },

  // ---------------------------------------------------------- Workflow
  { id: 'folders', num: '10', label: 'Folder Structure', title: 'Folder Structure', group: 'Workflow' },
  { id: 'stack',   num: '11', label: 'Our Stack',        title: 'Our Stack',        group: 'Workflow' },
];

export const SECTIONS_BY_GROUP = GROUP_ORDER.map((group) => ({
  group,
  items: SECTIONS.filter((s) => s.group === group),
}));
