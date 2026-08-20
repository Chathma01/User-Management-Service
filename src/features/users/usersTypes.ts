export type UserStatus = "active" | "inactive";
export type UserTitle = "Mr" | "Mrs" | "Ms" | "Mx" | "Dr";

export type UserUpsertPayload = {
  title: UserTitle;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  date_of_birth: string; // YYYY-MM-DD
  internal_note: string;
  hire_date: string; // YYYY-MM-DD
  status: UserStatus;
  email: string;
  phone: string;
  department: string;
  job_title: string;
  employee_code: string;
  address: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
};

export type User = UserUpsertPayload & {
  id: string;
  created_at: string;
  updated_at: string;
};

export type FetchUsersParams = {
  limit: number;
  offset: number;
  search?: string;
  status?: UserStatus;
};

export type FetchUsersResponse = {
  limit: number;
  offset: number;
  total: number;
  items: User[];
};

export type CreateUserRequest = UserUpsertPayload;

export type UpdateUserRequest = {
  employee_id: string;
  data: UserUpsertPayload;
};