import { GlobalActionMenuEntriesSetter } from '@/action-menu/actions/global-actions/components/GlobalActionMenuEntriesSetter';
import { RecordActionMenuEntriesSetter } from '@/action-menu/actions/record-actions/components/RecordActionMenuEntriesSetter';
import { ActionMenuConfirmationModals } from '@/action-menu/components/ActionMenuConfirmationModals';
import { ActionMenuContext } from '@/action-menu/contexts/ActionMenuContext';

import { contextStoreCurrentObjectMetadataIdComponentState } from '@/context-store/states/contextStoreCurrentObjectMetadataIdComponentState';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { RecordShowPageBaseHeader } from '~/pages/object-record/RecordShowPageBaseHeader';

export const RecordShowActionMenu = ({
  isFavorite,
  handleFavoriteButtonClick,
  record,
  objectMetadataItem,
  objectNameSingular,
}: {
  isFavorite: boolean;
  handleFavoriteButtonClick: () => void;
  record: ObjectRecord | undefined;
  objectMetadataItem: ObjectMetadataItem;
  objectNameSingular: string;
}) => {
  const contextStoreCurrentObjectMetadataId = useRecoilComponentValueV2(
    contextStoreCurrentObjectMetadataIdComponentState,
  );

  // TODO: refactor RecordShowPageBaseHeader to use the context store

  return (
    <>
      {contextStoreCurrentObjectMetadataId && (
        <ActionMenuContext.Provider
          value={{
            isInRightDrawer: false,
            onActionExecutedCallback: () => {},
          }}
        >
          <RecordShowPageBaseHeader
            {...{
              isFavorite,
              handleFavoriteButtonClick,
              record,
              objectMetadataItem,
              objectNameSingular,
            }}
          />
          <ActionMenuConfirmationModals />
          <RecordActionMenuEntriesSetter />
          <GlobalActionMenuEntriesSetter />
        </ActionMenuContext.Provider>
      )}
    </>
  );
};
