
export type User = {
  _id: string;
  login: string;
  name: string;
  position: string;
  birthDate: string;
  phone: string;
  role: "ADMIN" | "USER";
  permissions: {
    canManageSchedule: boolean;
    readOnly: boolean;
  };
};
