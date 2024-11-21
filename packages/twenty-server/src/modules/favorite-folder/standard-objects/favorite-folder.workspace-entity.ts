import { Relation } from 'src/engine/workspace-manager/workspace-sync-metadata/interfaces/relation.interface';

import { FeatureFlagKey } from 'src/engine/core-modules/feature-flag/enums/feature-flag-key.enum';
import { FieldMetadataType } from 'src/engine/metadata-modules/field-metadata/field-metadata.entity';
import { RelationMetadataType } from 'src/engine/metadata-modules/relation-metadata/relation-metadata.entity';
import { BaseWorkspaceEntity } from 'src/engine/twenty-orm/base.workspace-entity';
import { WorkspaceEntity } from 'src/engine/twenty-orm/decorators/workspace-entity.decorator';
import { WorkspaceField } from 'src/engine/twenty-orm/decorators/workspace-field.decorator';
import { WorkspaceGate } from 'src/engine/twenty-orm/decorators/workspace-gate.decorator';
import { WorkspaceIsSystem } from 'src/engine/twenty-orm/decorators/workspace-is-system.decorator';
import { WorkspaceRelation } from 'src/engine/twenty-orm/decorators/workspace-relation.decorator';
import { FAVORITE_FOLDER_STANDARD_FIELD_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import { STANDARD_OBJECT_IDS } from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import { FavoriteWorkspaceEntity } from 'src/modules/favorite/standard-objects/favorite.workspace-entity';

@WorkspaceEntity({
  standardId: STANDARD_OBJECT_IDS.favoriteFolder,
  namePlural: 'favoriteFolders',
  labelSingular: 'Favorite Folder',
  labelPlural: 'Favorite Folders',
  description: 'A Folder of favorites',
  icon: 'IconFolder',
})
@WorkspaceIsSystem()
@WorkspaceGate({
  featureFlag: FeatureFlagKey.IsFavoriteFolderEntityEnabled,
})
export class FavoriteFolderWorkspaceEntity extends BaseWorkspaceEntity {
  @WorkspaceField({
    standardId: FAVORITE_FOLDER_STANDARD_FIELD_IDS.position,
    type: FieldMetadataType.NUMBER,
    label: 'Position',
    description: 'Favorite folder position',
    icon: 'IconList',
    defaultValue: 0,
  })
  position: number;

  @WorkspaceField({
    standardId: FAVORITE_FOLDER_STANDARD_FIELD_IDS.name,
    type: FieldMetadataType.TEXT,
    label: 'Name',
    description: 'Name of the favorite folder',
    icon: 'IconText',
  })
  name: string;

  @WorkspaceRelation({
    standardId: FAVORITE_FOLDER_STANDARD_FIELD_IDS.favorites,
    type: RelationMetadataType.ONE_TO_MANY,
    label: 'Favorites',
    description: 'Favorites in this folder',
    icon: 'IconHeart',
    inverseSideFieldKey: 'favoriteFolder',
    inverseSideTarget: () => FavoriteWorkspaceEntity,
  })
  favorites: Relation<FavoriteWorkspaceEntity[]>;
}
