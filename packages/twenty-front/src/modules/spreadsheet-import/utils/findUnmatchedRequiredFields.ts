import { Columns } from '@/spreadsheet-import/steps/components/MatchColumnsStep/MatchColumnsStep';
import { SpreadsheetImportFields } from '@/spreadsheet-import/types';

export const findUnmatchedRequiredFields = <T extends string>(
  fields: SpreadsheetImportFields<T>,
  columns: Columns<T>,
) =>
  fields
    .filter((field) =>
      field.fieldValidationDefinitions?.some(
        (validation) => validation.rule === 'required',
      ),
    )
    .filter(
      (field) =>
        columns.findIndex(
          (column) => 'value' in column && column.value === field.key,
        ) === -1,
    )
    .map((field) => field.label) || [];
