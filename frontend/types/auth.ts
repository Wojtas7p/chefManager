export type AuthUser = {
  token : string;
};

export type AuthContextType = {
  user: AuthUser | null;
  loginUser: (token: string) => void;
  logout: () => void;
};


