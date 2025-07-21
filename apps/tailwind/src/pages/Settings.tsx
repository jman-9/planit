import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { store } from "../store/store";
import { toggleTheme } from "../store/settingsSlice";

export default function Settings() {
  const [update, setUpdate] = useState(false);

  const handleToggleTheme = () => {
    const theme = store.getState().settings.theme;
    const next = theme === "dark" ? "light" : "dark";
    store.dispatch(toggleTheme());
    document.documentElement.classList.toggle("dark", next === "dark");

    setUpdate(!update);
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-900 p-4">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-300">Settings</h1>
      </div>
      <br/>
      <div>
        <button
          onClick={handleToggleTheme}
          className="flex align-middle items-center gap-2 px-3 py-1 rounded-md text-2xl font-semibold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {store.getState().settings.theme === "dark" ? (
            <>
              <Sun className="w-5 h-5" /> Light Mode
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" /> Dark Mode
            </>
          )}
        </button>
      </div>
      <br/>
    </div>
  );
}
