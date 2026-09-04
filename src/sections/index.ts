import type { ComponentType } from 'react';
import { LanguagesSection } from './LanguagesSection';
import { JsxSection } from './JsxSection';
import { HierarchySection } from './HierarchySection';
import { HooksUtilsSection } from './HooksUtilsSection';
import { StateSection } from './StateSection';
import { ReuseSection } from './ReuseSection';
import { PropsIntroSection } from './PropsIntroSection';
import { DataFetchingSection } from './DataFetchingSection';
import { TypeScriptSection } from './TypeScriptSection';
import { PuttingTogetherSection } from './PuttingTogetherSection';
import { FoldersSection } from './FoldersSection';
import { StackSection } from './StackSection';

/** Maps a section id from the registry to the component that renders it. */
export const SECTION_CONTENT: Record<string, ComponentType> = {
  languages: LanguagesSection,
  jsx: JsxSection,
  hierarchy: HierarchySection,
  'hooks-utils': HooksUtilsSection,
  state: StateSection,
  reuse: ReuseSection,
  'props-intro': PropsIntroSection,
  'data-fetching': DataFetchingSection,
  typescript: TypeScriptSection,
  'putting-together': PuttingTogetherSection,
  folders: FoldersSection,
  stack: StackSection,
};
