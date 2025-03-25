import { Field, InputType } from '@nestjs/graphql';

import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { SettingPermissionType } from 'src/engine/metadata-modules/permissions/constants/setting-permission-type.constants';

@InputType()
export class UpsertSettingPermissionInput {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  roleId: string;

  @IsString()
  @IsNotEmpty()
  @Field({ nullable: false })
  setting: SettingPermissionType;

  @IsBoolean()
  @IsOptional()
  @Field({ nullable: true })
  canUpdateSetting?: boolean;
}
