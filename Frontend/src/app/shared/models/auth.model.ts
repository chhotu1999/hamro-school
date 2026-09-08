/**
 * Mirrors HamroSchool.Model.Shared.Auth (backend). The API serializes with
 * Newtonsoft's CamelCasePropertyNamesContractResolver, so property names
 * here are camelCase even though the C# records are PascalCase.
 */
export interface MvParamLogin {
  username: string;
  password: string;
}

export interface MvParamRegister {
  username: string;
  password: string;
  roleId: number;
}

export interface MvParamRefreshToken {
  accessToken: string;
  refreshToken: string;
}

export interface MvParamLogout {
  accessToken: string;
}

export interface MvUserInfo {
  id: number;
  username: string | null;
  roleId: number;
  roleDisplayName: string | null;
  isActive: boolean;
  isLocked: boolean;
  signInTokenExpiresAt: string | null;
  createdAt: string;
  lastModifiedAt: string | null;
}

export interface MvLoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresAt: string;
  user: MvUserInfo;
}
