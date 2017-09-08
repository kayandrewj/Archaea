document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('searchform').addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch(e.target["0"].value);
  });
});
