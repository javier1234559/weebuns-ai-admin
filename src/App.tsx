import { SIDEBAR_COOKIE_NAME } from "@/constraints";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const user = useAuthStore((state) => state.user);

  console.log(user);

  useLayoutEffect(() => {
    const handleOpenSettings = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // TODO: Toggle Sidebar
        const state = getLocalStorage(SIDEBAR_COOKIE_NAME);
        if (state) {
          setLocalStorage(SIDEBAR_COOKIE_NAME, !state);
        } else {
          setLocalStorage(SIDEBAR_COOKIE_NAME, true);
        }
      }
    };
    document.addEventListener("keydown", handleOpenSettings);

    return () => {
      document.removeEventListener("keydown", handleOpenSettings);
    };
  }, []);

  return <Outlet />;
}

export default App;
