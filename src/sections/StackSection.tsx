import { C, DataTable, Lede } from '../components/primitives';

export function StackSection() {
  return (
    <>
      <Lede>
        What we actually install. Every library below is in the monorepo today,
        so these are the names you will meet in the first week rather than a
        survey of the ecosystem.
      </Lede>

      <DataTable
        columns="1fr 1fr"
        head={['Library', 'Job']}
        rows={[
          [<C>@mui/material</C>, 'Components'],
          [<C>react-router</C>, 'Routing'],
          [<C>@tanstack/react-query</C>, 'Server state'],
          [<C>axios</C>, 'HTTP'],
          [<C>react-hook-form</C>, 'Forms'],
          [<C>zod</C>, 'Validation'],
          [<><C>jotai</C> / <C>recoil</C></>, 'Client state'],
        ]}
      />
    </>
  );
}
