export type Theme = 'dark' | 'light';

const THEME_KEY = 'carbonbrake_theme_v1';

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  return 'dark'; // Default dark theme
}

export function saveStoredTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
  applyThemeToDocument(theme);
}

export function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }
}
