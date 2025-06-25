import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = "light" | "dark";
type Language = "en" | "ko";

interface SettingsState {
  theme: ThemeMode;
  language: Language;
  showHints: boolean;
}

const initialState: SettingsState = {
  theme: "light",
  language: "en",
  showHints: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    toggleHints(state) {
      state.showHints = !state.showHints;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  setLanguage,
  toggleHints,
} = settingsSlice.actions;

export default settingsSlice;
