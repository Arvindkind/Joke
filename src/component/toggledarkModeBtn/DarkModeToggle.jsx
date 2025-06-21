import "./DarkModeToggle.css";

export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="dark-toggle-btn"
      onClick={() => setDarkMode((prev) => !prev)}
      aria-pressed={darkMode}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
