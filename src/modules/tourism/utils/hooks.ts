import { TenantInfo } from "../../../components/other/InfoAboutUserTenants";
import { slugs } from "./slugs";

export const useUserTenantInfo = (profiles, roleLabels?: any) => {
  if (!profiles) return [];

  const getUserTenantInfo: TenantInfo[] =
    profiles
      ?.map((profile) => {
        return {
          tenant: {
            id: profile.id,
            name: profile.name,
            code: profile.code
          },
          role: roleLabels[profile.role],
          ...(!!profile.role && { url: slugs.tenantUsers(profile.id) })
        };
      })
      .sort((a, b) => (a?.url && !b?.url ? -1 : 0)) || [];

  return getUserTenantInfo;
};
