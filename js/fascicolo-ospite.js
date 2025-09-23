$(function () {
  $(".menu .item").tab();

  const anagraficaTab = document.querySelector('[data-tab="anagrafica"]');
  const editButton = document.getElementById("editButton");

  if (anagraficaTab && anagraficaTab.classList.contains("active")) {
    editButton.style.display = "none";
  }

  const tabs = document.querySelectorAll(".ui.tabular.menu .item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const activeTabName = this.dataset.tab;

      if (activeTabName === "anagrafica") {
        editButton.style.display = "none";
      } else {
        editButton.style.display = "block";
      }
    });
  });
});
