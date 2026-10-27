type AuthUser = {
  id: string;
  email: string;
};

type AuthCredentials = {
  email: string;
  password: string;
};

type ApiError = {
  error?: string;
  errors?: [string, string][];
};