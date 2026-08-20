import { apiRequest } from "@/lib/api";
import type {
  FetchUsersParams,
  FetchUsersResponse,
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