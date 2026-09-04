import { CodeBlock } from '../components/CodeBlock';
import { Lede } from '../components/primitives';

export function FoldersSection() {
  return (
    <>
      <Lede>
        We group by feature, not by file type. A folder should tell you what the
        app does, not what technologies it uses. Here each step of the flow is
        one feature, and everything that step needs lives together.
      </Lede>

      <CodeBlock>{`src/
├── main.tsx
├── App.tsx
│
├── app/
│   ├── router.tsx
│   ├── theme.ts
│   └── providers.tsx
│
├── components/
│   ├── IcaButton/
│   │   ├── IcaButton.tsx
│   │   ├── IcaButton.test.tsx
│   │   └── index.ts
│   ├── IcaModal/
│   └── IcaLoader/
│
├── api/
│   ├── getUserInfo.ts
│   ├── getDashboard.ts
│   └── postUpdateApplicant.ts
│
├── features/
│   ├── fillInParticulars/
│   │   ├── hooks/
│   │   │   └── useParticularsForm.ts
│   │   ├── components/
│   │   │   ├── CoiFormComponent.tsx
│   │   │   └── UtdFormComponent.tsx
│   │   ├── pages/
│   │   │   └── FillInParticularsPage.tsx
│   │   └── types.ts
│   │
│   ├── uploadDocuments/
│   │   ├── hooks/
│   │   │   └── useDocumentUpload.ts
│   │   ├── components/
│   │   │   ├── DropZoneComponent.tsx
│   │   │   └── UploadedFileListComponent.tsx
│   │   ├── pages/
│   │   │   └── UploadDocumentsPage.tsx
│   │   └── types.ts
│   │
│   └── reviewDeclare/
│       ├── hooks/
│       │   └── useSubmitDeclaration.ts
│       ├── components/
│       │   ├── ReviewSummaryComponent.tsx
│       │   └── DeclarationCheckboxComponent.tsx
│       ├── pages/
│       │   └── ReviewDeclarePage.tsx
│       └── types.ts
│
├── hooks/
│   ├── useLogoutHandler.ts
│   └── useRefCode.ts
│
├── lib/
│   ├── react-hook-form/
│   │   └── fields/
│   │       ├── AddressField.tsx
│   │       └── NameField.tsx
│   ├── httpClient.ts
│   └── queryClient.ts
│
└── utils/
    ├── formatCurrency.ts
    └── formatDate.ts`}</CodeBlock>
    </>
  );
}
