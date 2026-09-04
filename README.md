# Frontend Crossover — React and TypeScript

A one hour internal engineering session, built as the thing it teaches: a React
+ TypeScript app using the same stack the team works in.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type check and produce dist/
npm run preview    # serve dist/ locally
```

## Stack

| Tool | Why it is here |
| --- | --- |
| React 19 | The subject of the session |
| TypeScript | Ditto, and every file is typed |
| Vite | Dev server and build, section 15 walks through it |
| MUI v9 | Every visible control, themed from `#141B4D` |
| react-hook-form | Powers the live form demo in section 12 |

## Structure

```
src/
├── main.tsx                  entry point, mounts React and providers
├── App.tsx                   sidebar + section list
├── theme.ts                  design tokens and the MUI theme
├── index.css                 the few genuinely global rules
│
├── components/               presentational primitives, no domain knowledge
│   ├── CodeBlock.tsx         syntax highlighted code, hand rolled
│   ├── Section.tsx           section shell with number and title
│   ├── Sidebar.tsx           nav, highlights the active section
│   ├── diagram.tsx           small SVG wrappers used by the figures
│   └── primitives.tsx        Lede, Note, InfoCard, DataTable, Figure, Demo
│
├── demos/                    the live, running examples
│   ├── CounterDemo.tsx       useState and re-render
│   ├── PropsFlowDemo.tsx     data down, events up
│   ├── RenderCountDemo.tsx   render counts and effect timing
│   ├── FetchDemo.tsx         loading / error / success
│   └── FormDemo.tsx          react-hook-form with MUI fields
│
├── hooks/
│   └── useActiveSection.ts   scroll spy, also the custom hook example
│
└── sections/
    ├── registry.ts           section ids, titles, groups. Drives the sidebar
    ├── index.ts              maps an id to its content component
    └── *.tsx                 one file per section
```

## Adding or reordering a section

1. Add an entry to `SECTIONS` in `src/sections/registry.ts`.
2. Write the content component in `src/sections/`.
3. Register it in `src/sections/index.ts`.

The sidebar, numbering, and scroll spy all read from the registry, so there is
nothing else to update.

## Outstanding

Two screenshots still need to be supplied. Both currently render as dashed
placeholders that name the file they expect:

- `public/assets/storybook-overview.png` — Storybook sidebar showing the Common
  component tree, one component open with its controls panel visible
- `public/assets/react-devtools-components.png` — React DevTools Components tab
  with a component selected so its props and hooks show in the right panel

Drop each file in place, then swap `<ImagePlaceholder />` for an `<img>` in
`StorybookSection.tsx` and `DevToolsSection.tsx`.

## Reference

The original hand written HTML version is kept in `_legacy/` for comparison. It
is not part of the build and can be deleted once nobody needs it.
