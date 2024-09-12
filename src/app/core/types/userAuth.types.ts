export type SignInResponse = {
  response: number;
  path: string;
  timestamp: string;
  data: {
    accessToken: string;
    refreshToken: string;
    username: string;
    userPermissions: UserPermission[];
  };
};
export type UserPermission = {
  name: string;
  dropdown: string;
  url: string;
  dropdownList: DropdownList[];
};

export type DropdownList = {
  name: string;
  url: string;
};

export type UserCredential = {
  username: string;
  password: string;
};

export type SigninSession = {
  username: string;
  accessToken: string;
  userPermissions: string;
  refreshToken: string;
};
