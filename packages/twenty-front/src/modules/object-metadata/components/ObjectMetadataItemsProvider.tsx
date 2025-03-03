import React from 'react';
import { useRecoilValue } from 'recoil';

import { ObjectMetadataItemsLoadEffect } from '@/object-metadata/components/ObjectMetadataItemsLoadEffect';
import { PreComputedChipGeneratorsProvider } from '@/object-metadata/components/PreComputedChipGeneratorsProvider';
import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { UserOrMetadataLoader } from '~/loading/components/UserOrMetadataLoader';

export const ObjectMetadataItemsProvider = ({
  children,
}: React.PropsWithChildren) => {
  const objectMetadataItems = useRecoilValue(objectMetadataItemsState);

  const shouldDisplayChildren = objectMetadataItems.length > 0;

  return (
    <>
      <ObjectMetadataItemsLoadEffect />
      {shouldDisplayChildren ? (
        <PreComputedChipGeneratorsProvider>
          {children}
        </PreComputedChipGeneratorsProvider>
      ) : (
        <UserOrMetadataLoader />
      )}
    </>
  );
};
