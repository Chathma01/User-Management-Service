import type { User, UserStatus } from "./usersTypes";

export function buildConfirmCopy(user: User | null, current: UserStatus | null) {
  if (!current) return { title: "", message: "", label: "" };

  const action = current === "active" ? "Inactivate" : "Activate";
  const fullName = user ? `${user.first_name} ${user.last_name}`.trim() : "this user";

  return {
    title: `${action} user?`,
    label: action,
    message:
      current === "active"
        ? `Do you want to deactivate ${fullName}'s account?`
        : `Do you want to activate ${fullName}'s account?`,
  };
}