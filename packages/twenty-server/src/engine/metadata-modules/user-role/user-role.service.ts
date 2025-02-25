import { InjectRepository } from '@nestjs/typeorm';

import { isDefined } from 'twenty-shared';
import { In, Not, Repository } from 'typeorm';

import { UserWorkspace } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { ADMIN_ROLE_LABEL } from 'src/engine/metadata-modules/permissions/constants/admin-role-label.constants';
import {
  PermissionsException,
  PermissionsExceptionCode,
  PermissionsExceptionMessage,
} from 'src/engine/metadata-modules/permissions/permissions.exception';
import { RoleEntity } from 'src/engine/metadata-modules/role/role.entity';
import { UserWorkspaceRoleEntity } from 'src/engine/metadata-modules/role/user-workspace-role.entity';
import { TwentyORMGlobalManager } from 'src/engine/twenty-orm/twenty-orm-global.manager';
import { WorkspaceMemberWorkspaceEntity } from 'src/modules/workspace-member/standard-objects/workspace-member.workspace-entity';

export class UserRoleService {
  constructor(
    @InjectRepository(RoleEntity, 'metadata')
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserWorkspaceRoleEntity, 'metadata')
    private readonly userWorkspaceRoleRepository: Repository<UserWorkspaceRoleEntity>,
    @InjectRepository(UserWorkspace, 'core')
    private readonly userWorkspaceRepository: Repository<UserWorkspace>,
    private readonly twentyORMGlobalManager: TwentyORMGlobalManager,
  ) {}

  public async assignRoleToUserWorkspace({
    workspaceId,
    userWorkspaceId,
    roleId,
  }: {
    workspaceId: string;
    userWorkspaceId: string;
    roleId: string;
  }): Promise<void> {
    await this.validateAssignRoleInput({
      userWorkspaceId,
      workspaceId,
      roleId,
    });

    const newUserWorkspaceRole = await this.userWorkspaceRoleRepository.save({
      roleId,
      userWorkspaceId,
      workspaceId,
    });

    await this.userWorkspaceRoleRepository.delete({
      userWorkspaceId,
      workspaceId,
      id: Not(newUserWorkspaceRole.id),
    });
  }

  public async getRolesByUserWorkspaces({
    userWorkspaceIds,
    workspaceId,
  }: {
    userWorkspaceIds: string[];
    workspaceId: string;
  }): Promise<Map<string, RoleEntity[]>> {
    if (!userWorkspaceIds.length) {
      return new Map();
    }

    const allUserWorkspaceRoles = await this.userWorkspaceRoleRepository.find({
      where: {
        userWorkspaceId: In(userWorkspaceIds),
        workspaceId,
      },
      relations: {
        role: true,
      },
    });

    if (!allUserWorkspaceRoles.length) {
      return new Map();
    }

    const rolesMap = new Map<string, RoleEntity[]>();

    for (const userWorkspaceId of userWorkspaceIds) {
      const userWorkspaceRolesOfUserWorkspace = allUserWorkspaceRoles.filter(
        (userWorkspaceRole) =>
          userWorkspaceRole.userWorkspaceId === userWorkspaceId,
      );

      const rolesOfUserWorkspace = userWorkspaceRolesOfUserWorkspace
        .map((userWorkspaceRole) => userWorkspaceRole.role)
        .filter(isDefined);

      rolesMap.set(userWorkspaceId, rolesOfUserWorkspace);
    }

    return rolesMap;
  }

  public async getWorkspaceMembersAssignedToRole(
    roleId: string,
    workspaceId: string,
  ): Promise<WorkspaceMemberWorkspaceEntity[]> {
    const userWorkspaceRoles = await this.userWorkspaceRoleRepository.find({
      where: {
        roleId,
        workspaceId,
      },
    });

    const userIds = await this.userWorkspaceRepository
      .find({
        where: {
          id: In(
            userWorkspaceRoles.map(
              (userWorkspaceRole) => userWorkspaceRole.userWorkspaceId,
            ),
          ),
        },
      })
      .then((userWorkspaces) =>
        userWorkspaces.map((userWorkspace) => userWorkspace.userId),
      );

    const workspaceMemberRepository =
      await this.twentyORMGlobalManager.getRepositoryForWorkspace<WorkspaceMemberWorkspaceEntity>(
        workspaceId,
        'workspaceMember',
      );

    const workspaceMembers = await workspaceMemberRepository.find({
      where: {
        userId: In(userIds),
      },
    });

    return workspaceMembers;
  }

  private async validateAssignRoleInput({
    userWorkspaceId,
    workspaceId,
    roleId,
  }: {
    userWorkspaceId: string;
    workspaceId: string;
    roleId: string;
  }) {
    const userWorkspace = await this.userWorkspaceRepository.findOne({
      where: {
        id: userWorkspaceId,
      },
    });

    if (!isDefined(userWorkspace)) {
      throw new PermissionsException(
        'User workspace not found',
        PermissionsExceptionCode.USER_WORKSPACE_NOT_FOUND,
      );
    }

    const role = await this.roleRepository.findOne({
      where: {
        id: roleId,
      },
    });

    if (!isDefined(role)) {
      throw new PermissionsException(
        'Role not found',
        PermissionsExceptionCode.ROLE_NOT_FOUND,
      );
    }

    const roles = await this.getRolesByUserWorkspaces({
      userWorkspaceIds: [userWorkspace.id],
      workspaceId,
    });

    const currentRole = roles.get(userWorkspace.id)?.[0];

    if (currentRole?.id === roleId) {
      return;
    }

    if (!(currentRole?.label === ADMIN_ROLE_LABEL)) {
      return;
    }

    const workspaceMembersWithAdminRole =
      await this.getWorkspaceMembersAssignedToRole(currentRole.id, workspaceId);

    if (workspaceMembersWithAdminRole.length === 1) {
      throw new PermissionsException(
        PermissionsExceptionMessage.CANNOT_UNASSIGN_LAST_ADMIN,
        PermissionsExceptionCode.CANNOT_UNASSIGN_LAST_ADMIN,
      );
    }
  }
}
