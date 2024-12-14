// Sample Artworks Data
const artworks = [
  { id: 1, title: "Starry Night", price: 500, image: "assets/art1.jpg", category: "classic" },
  { id: 2, title: "The Scream", price: 400, image: "assets/art2.jpg", category: "modern" },
  { id: 3, title: "Mona Lisa", price: 600, image: "assets/art3.jpg", category: "classic" },
  { id: 4, title: "The Persistence of Memory", price: 450, image: "assets/art4.jpg", category: "surreal" },
  { id: 5, title: "Girl with a Pearl Earring", price: 550, image: "assets/art5.jpg", category: "classic" },
  { id: 6, title: "The Night Watch", price: 700, image: "assets/art6.jpg", category: "historic" },
  { id: 7, title: "Resin Abstract", price: 350, image: "assets/art7.jpg", category: "resin-art" },
  { id: 8, title: "Pencil Lead Sculpture", price: 300, image: "assets/art8.jpg", category: "pencil-lead-art" },
];

// Function to Render Artworks
function renderGallery(category = "all") {
  const artGrid = document.getElementById("art-grid");
  artGrid.innerHTML = ""; // Clear the grid before rendering

  // Filter artworks based on the selected category
  const filteredArtworks = artworks.filter((art) => category === "all" || art.category === category);

  // Check if no items match the category
  if (filteredArtworks.length === 0) {
    artGrid.innerHTML = "<p>No artworks found in this category.</p>";
    return;
  }

  // Add each filtered artwork to the grid
  filteredArtworks.forEach((art) => {
    artGrid.innerHTML += `
      <div class="art-item" data-category="${art.category}">
        <img src="${art.image}" alt="${art.title}">
        <h3>${art.title}</h3>
        <p>$${art.price}</p>
        <button class="add-to-cart" onclick="addToCart(${art.id})">Add to Cart</button>
      </div>
    `;
  });
}

// Function to Add "Active" Class to Buttons
function handleFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      // Update active state
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Re-render gallery based on the selected category
      renderGallery(category);
    });
  });
}

// Function to Handle "Add to Cart" (Placeholder)
function addToCart(artId) {
  const selectedArt = artworks.find((art) => art.id === artId);
  alert(`Added "${selectedArt.title}" to your cart!`);
}

// Initialize Gallery and Filters on Page Load
document.addEventListener("DOMContentLoaded", () => {
  renderGallery(); // Load all artworks initially
  handleFilterButtons(); // Set up filter buttons
});
