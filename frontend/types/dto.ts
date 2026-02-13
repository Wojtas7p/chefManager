export type CreateUserDTO = {
  login: string;
  password: string;
  name: string;
  position: string;
  birthDate: string;
  phone: string;
  permissions: {
    canManageSchedule: boolean;
  };
};







export type RegisterDTO = {
  login: string;
  password: string;
  name: string;
  position: string;
  birthDate: string;
  phone: string;
};
