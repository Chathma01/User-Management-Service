import { apiRequest } from "@/lib/api";
import type {
    CreateUserRequest,
  FetchUsersParams,
  FetchUsersResponse,
  UpdateUserRequest,
  User,
} from "./usersTypes";

export function fetchUsers(params: FetchUsersParams, token: string) {
  return apiRequest<FetchUsersResponse>({
    path: "/api/v1/employees",
    token,
    query: {
      limit: params.limit,
      offset: params.offset,
      search: params.search,
      status: params.status,
    },
  });
}

export function createUser(payload: CreateUserRequest, token: string) {
  return apiRequest<User>({
    path: "/api/v1/employees",
    method: "POST",
    token,
    body: payload,
  });
}

export function updateUser(req: UpdateUserRequest, token: string) {
  return apiRequest<User>({
    path: `/api/v1/employees/${req.employee_id}`,
    method: "PUT",
    token,
    body: req.data,
  });
}