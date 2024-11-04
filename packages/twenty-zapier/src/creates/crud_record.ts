import { Bundle, ZObject } from 'zapier-platform-core';

import { findObjectNamesSingularKey } from '../triggers/find_object_names_singular';
import { listRecordIdsKey } from '../triggers/list_record_ids';
import { capitalize } from '../utils/capitalize';
import { computeInputFields } from '../utils/computeInputFields';
import { InputData } from '../utils/data.types';
import handleQueryParams from '../utils/handleQueryParams';
import requestDb, { requestSchema } from '../utils/requestDb';
import { DatabaseEventAction } from '../utils/triggers/triggers.utils';

export const recordInputFields = async (
  z: ZObject,
  bundle: Bundle,
  idRequired = false,
) => {
  const schema = await requestSchema(z, bundle);
  const node = schema.data.objects.edges.filter(
    (edge) => edge.node.nameSingular === bundle.inputData.nameSingular,
  )[0].node;
  return computeInputFields(node, idRequired);
};

const computeFields = async (z: ZObject, bundle: Bundle) => {
  const operation = bundle.inputData.crudZapierOperation;
  switch (operation) {
    case DatabaseEventAction.DELETED:
      return [
        {
          key: 'id',
          label: 'Id',
          type: 'string',
          dynamic: `${listRecordIdsKey}.id`,
          required: true,
        },
      ];
    case DatabaseEventAction.UPDATED:
      return recordInputFields(z, bundle, true);
    case DatabaseEventAction.CREATED:
      return recordInputFields(z, bundle, false);
    default:
      return [];
  }
};

const computeQueryParameters = (
  operation: DatabaseEventAction,
  data: InputData,
): string => {
  switch (operation) {
    case DatabaseEventAction.CREATED:
      return `data:{${handleQueryParams(data)}}`;
    case DatabaseEventAction.UPDATED:
      return `
      data:{${handleQueryParams(data)}},
      id: "${data.id}"
      `;
    case DatabaseEventAction.DELETED:
      return `
      id: "${data.id}"
      `;
    default:
      return '';
  }
};

const perform = async (z: ZObject, bundle: Bundle) => {
  const data = bundle.inputData;
  const operation = data.crudZapierOperation;
  const nameSingular = data.nameSingular;
  delete data.nameSingular;
  delete data.crudZapierOperation;
  const query = `
  mutation ${operation}${capitalize(nameSingular)} {
    ${operation}${capitalize(nameSingular)}(
      ${computeQueryParameters(operation, data)}
    )
    {id}
  }`;
  return await requestDb(z, bundle, query);
};

export const crudRecordKey = 'crud_record';

export default {
  display: {
    description: 'Create, Update or Delete a Record in Twenty.',
    hidden: false,
    label: 'Create, Update or Delete Record',
  },
  key: crudRecordKey,
  noun: 'Record',
  operation: {
    inputFields: [
      {
        key: 'nameSingular',
        required: true,
        label: 'Record Name',
        dynamic: `${findObjectNamesSingularKey}.nameSingular.labelSingular`,
        altersDynamicFields: true,
      },
      {
        key: 'crudZapierOperation',
        required: true,
        label: 'Operation',
        choices: {
          [DatabaseEventAction.CREATED]: DatabaseEventAction.CREATED,
          [DatabaseEventAction.UPDATED]: DatabaseEventAction.UPDATED,
          [DatabaseEventAction.DELETED]: DatabaseEventAction.DELETED,
        },
        altersDynamicFields: true,
      },
      computeFields,
    ],
    sample: {
      id: '179ed459-79cf-41d9-ab85-96397fa8e936',
    },
    perform,
  },
};
