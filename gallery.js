
document.addEventListener("DOMContentLoaded", () => {

  const modal       = document.getElementById("modal");
  const modalImg    = document.getElementById("modalImage");
  const searchInput = document.getElementById("searchInput");
  const searchIcon  = document.querySelector(".search-icon");
  const cards       = [...document.querySelectorAll(".gallery-container .card")];

  const imageList = cards.map(card => card.querySelector("img").getAttribute("src"));
  let current = 0;

  window.openModal = (src) => {
    current    = imageList.indexOf(src);           // start carousel on clicked image
    modalImg.src       = src;
    modal.style.display = "flex";
  };

  window.changeImage = (step) => {
    if (!imageList.length) return;
    current = (current + step + imageList.length) % imageList.length;
    modalImg.src = imageList[current];
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  
  function searchGallery() {
    const term = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const haystack = [
        card.dataset.name,
        card.querySelector("h3")?.textContent,
        card.querySelector(".card-back p")?.textContent
      ].join(" ").toLowerCase();

      card.classList.toggle("hidden", !haystack.includes(term));
    });
  }

  searchInput.addEventListener("input", searchGallery);
  searchIcon?.addEventListener("click", searchGallery);
});

