import { ROLES } from "@/constraints";
import { Role } from "@/feature/user/type";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useRoleStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role") as Role | null;

    if (roleParam === "admin" || roleParam === "teacher") {
      setRole(roleParam);
    } else {
      setRole(null);
    }
  }, [location]);

  const updateRole = useCallback((newRole: Role | null) => {
    setRole(newRole);

    const params = new URLSearchParams(location.search);

    if (newRole) {
      params.set("role", newRole);
    } else {
      params.delete("role");
    }

    navigate({
      pathname: location.pathname,
      search: params.toString()
    }, { replace: true });
  }, [location, navigate]);

  return {
    role,
    updateRole,
    isAdmin: role === ROLES.ADMIN,
    isTeacher: role === ROLES.TEACHER,
    hasRole: role !== null
  };
}
