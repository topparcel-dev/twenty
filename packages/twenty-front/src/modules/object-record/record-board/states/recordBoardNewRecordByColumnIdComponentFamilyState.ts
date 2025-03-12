import { SingleRecordPickerRecord } from '@/object-record/record-picker/single-record-picker/types/SingleRecordPickerRecord';
import { createComponentFamilyState } from '@/ui/utilities/state/component-state/utils/createComponentFamilyState';

export type NewCard = {
  id: string;
  columnId: string;
  isCreating: boolean;
  position: 'first' | 'last';
  isOpportunity: boolean;
  company: SingleRecordPickerRecord | null;
};

export const recordBoardNewRecordByColumnIdComponentFamilyState =
  createComponentFamilyState<NewCard, string>({
    key: 'recordBoardNewRecordByColumnIdComponentFamilyState',
    defaultValue: {
      id: '',
      columnId: '',
      isCreating: false,
      position: 'last',
      isOpportunity: false,
      company: null,
    },
  });
