let Eve = "";

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchform').addEventListener("submit", (e) => {
    e.preventDefault();
    Eve = e.target["0"].value;
    handleSearch(e.target["0"].value);
    data(dataGraph);
  });

  document.getElementById('reset').onclick = () => {
    reset();
  };

  document.getElementById('demo').onclick = () => {
    Eve = "archaea";
    handleSearch("archaea");
    data(dataGraph);
  };


});
