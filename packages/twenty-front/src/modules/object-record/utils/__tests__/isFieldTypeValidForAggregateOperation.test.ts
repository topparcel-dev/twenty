import { AGGREGATE_OPERATIONS } from '@/object-record/record-table/constants/AggregateOperations';
import { AggregateOperationsOmittingStandardOperations } from '@/object-record/types/AggregateOperationsOmittingStandardOperations';
import { isFieldTypeValidForAggregateOperation } from '@/object-record/utils/isFieldTypeValidForAggregateOperation';
import { FieldMetadataType } from '~/generated/graphql';

describe('isFieldTypeValidForAggregateOperation', () => {
  it('should return true for valid field types and operations', () => {
    expect(
      isFieldTypeValidForAggregateOperation(
        FieldMetadataType.NUMBER,
        AGGREGATE_OPERATIONS.sum,
      ),
    ).toBe(true);

    expect(
      isFieldTypeValidForAggregateOperation(
        FieldMetadataType.CURRENCY,
        AGGREGATE_OPERATIONS.min,
      ),
    ).toBe(true);
  });

  it('should return false for invalid field types', () => {
    expect(
      isFieldTypeValidForAggregateOperation(
        FieldMetadataType.TEXT,
        AGGREGATE_OPERATIONS.avg,
      ),
    ).toBe(false);

    expect(
      isFieldTypeValidForAggregateOperation(
        FieldMetadataType.BOOLEAN,
        AGGREGATE_OPERATIONS.max,
      ),
    ).toBe(false);
  });

  it('should handle all aggregate operations', () => {
    const numericField = FieldMetadataType.NUMBER;
    const operations = [
      AGGREGATE_OPERATIONS.min,
      AGGREGATE_OPERATIONS.max,
      AGGREGATE_OPERATIONS.avg,
      AGGREGATE_OPERATIONS.sum,
    ];

    operations.forEach((operation) => {
      expect(
        isFieldTypeValidForAggregateOperation(
          numericField,
          operation as AggregateOperationsOmittingStandardOperations,
        ),
      ).toBe(true);
    });
  });
});
