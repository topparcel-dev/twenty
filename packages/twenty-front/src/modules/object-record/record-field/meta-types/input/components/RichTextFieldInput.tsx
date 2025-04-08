import { BLOCK_SCHEMA } from '@/activities/blocks/constants/Schema';
import { FieldContext } from '@/object-record/record-field/contexts/FieldContext';
import { useRichTextField } from '@/object-record/record-field/meta-types/hooks/useRichTextField';
import { useRegisterInputEvents } from '@/object-record/record-field/meta-types/input/hooks/useRegisterInputEvents';
import { FieldInputClickOutsideEvent } from '@/object-record/record-field/types/FieldInputEvent';
import { DEFAULT_CELL_SCOPE } from '@/object-record/record-table/record-table-cell/hooks/useOpenRecordTableCellV2';
import { BlockEditor } from '@/ui/input/editor/components/BlockEditor';
import { BlockEditorComponentInstanceContext } from '@/ui/input/editor/contexts/BlockEditorCompoponeInstanceContext';
import { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import styled from '@emotion/styled';

import { useContext, useRef } from 'react';

const StyledRichTextContainer = styled.div`
  height: 400px;
  width: 500px;

  overflow: auto;
`;

export type RichTextFieldInputProps = {
  onClickOutside?: FieldInputClickOutsideEvent;
};

export const RichTextFieldInput = ({
  onClickOutside,
}: RichTextFieldInputProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { recordId } = useContext(FieldContext);
  const { draftValue, persistRichTextField, fieldDefinition } =
    useRichTextField();

  const editor = useCreateBlockNote({
    initialContent: draftValue,
    domAttributes: { editor: { class: 'editor' } },
    schema: BLOCK_SCHEMA,
  });

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    onClickOutside?.(() => persistRichTextField(editor.document), event);
  };

  useRegisterInputEvents<PartialBlock[]>({
    inputRef: containerRef,
    inputValue: draftValue,
    onClickOutside: handleClickOutside,
    hotkeyScope: DEFAULT_CELL_SCOPE.scope,
  });

  return (
    <StyledRichTextContainer ref={containerRef}>
      <BlockEditorComponentInstanceContext.Provider
        value={{ instanceId: `${recordId}-${fieldDefinition.fieldMetadataId}` }}
      >
        <BlockEditor editor={editor} />
      </BlockEditorComponentInstanceContext.Provider>
    </StyledRichTextContainer>
  );
};
