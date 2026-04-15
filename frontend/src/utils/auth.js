export function getStoredToken() {
  try {
    return (
      window.localStorage.getItem("token") ||
      window.sessionStorage.getItem("token") ||
      null
    );
  } catch (error) {
    return null;
  }
}

export function clearStoredToken() {
  try {
    window.localStorage.removeItem("token");
  } catch (error) {}

  try {
    window.sessionStorage.removeItem("token");
  } catch (error) {}
}

export function saveToken(token) {
  try {
    window.localStorage.setItem("token", token);
    return "localStorage";
  } catch (error) {
    try {
      window.sessionStorage.setItem("token", token);
      return "sessionStorage";
    } catch (sessionError) {
      return null;
    }
  }
}

export function isAuthenticated() {
  return !!getStoredToken();
}