function getAuthenticated() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function saveAuthenticated(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function removeAuthenticated() {
  localStorage.removeItem("user");
}

export { getAuthenticated, saveAuthenticated, removeAuthenticated };
