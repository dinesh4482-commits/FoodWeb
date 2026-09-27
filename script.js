const menuItems = [
  {name:"Charred Paneer Tikka", cuisine:"indian", price:"₹420", tag:"Vegetarian", desc:"Smoked paneer, burnt chilli chutney, pickled onion.", img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80"},
  {name:"Butter Chicken", cuisine:"indian", price:"₹560", tag:"Signature", desc:"Clay-oven chicken, tomato makhani, fenugreek.", img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"},
  {name:"Truffle Butter Naan", cuisine:"indian", price:"₹290", tag:"Chef's Pick", desc:"Charred naan, truffle butter, garlic and herbs.", img:"https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80"},
  {name:"Miso Ramen", cuisine:"asian", price:"₹480", tag:"Popular", desc:"Rich miso broth, noodles, corn, greens and egg.", img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"},
  {name:"Crispy Sushi Tacos", cuisine:"asian", price:"₹520", tag:"New", desc:"Sushi rice, avocado, crispy nori and spicy mayo.", img:"https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80"},
  {name:"Thai Basil Tofu", cuisine:"asian", price:"₹450", tag:"Vegan", desc:"Wok-tossed tofu, Thai basil, peppers and jasmine rice.", img:"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80"},
  {name:"Wild Mushroom Ravioli", cuisine:"italian", price:"₹590", tag:"Vegetarian", desc:"Hand-rolled pasta, wild mushrooms, sage butter.", img:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80"},
  {name:"Burrata Panzanella", cuisine:"italian", price:"₹540", tag:"Fresh", desc:"Creamy burrata, heirloom tomato, sourdough and basil.", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
  {name:"Classic Tiramisu", cuisine:"desserts", price:"₹320", tag:"Sweet", desc:"Espresso-soaked sponge, mascarpone and cocoa.", img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80"},
  {name:"Dark Chocolate Tart", cuisine:"desserts", price:"₹350", tag:"Rich", desc:"70% dark chocolate, sea salt and vanilla cream.", img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"},
  {name:"Grilled Citrus Salmon", cuisine:"continental", price:"₹720", tag:"Protein", desc:"Herb grilled salmon, citrus butter and greens.", img:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"},
  {name:"Roasted Vegetable Steak", cuisine:"continental", price:"₹620", tag:"Vegan", desc:"Seasonal vegetables, chimichurri and crispy potatoes.", img:"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"}
];

const reviews = [
  ["“The kind of place where you come for dinner and accidentally stay for three hours. Every dish had a little surprise.”","— Ananya M."],
  ["“Beautiful food, relaxed service and a menu that actually makes it hard to choose. The chef's table was fantastic.”","— Rohan K."],
  ["“We came for the pasta, stayed for the dessert, and left planning our next visit.”","— Meera S."]
];

const grid = document.getElementById("menuGrid");
const count = document.getElementById("menuCount");
let currentCuisine = "all";
let showAll = false;

function renderMenu(){
  const filtered = currentCuisine === "all" ? menuItems : menuItems.filter(x => x.cuisine === currentCuisine);
  const visible = showAll ? filtered : filtered.slice(0,6);
  grid.innerHTML = visible.map(item => `
    <article class="menu-card">
      <img src="${item.img}" alt="${item.name}" loading="lazy">
      <div class="menu-info">
        <div class="menu-top"><h3>${item.name}</h3><span class="price">${item.price}</span></div>
        <p>${item.desc}</p><span class="tag">${item.tag}</span>
      </div>
    </article>`).join("");
  count.textContent = `Showing ${visible.length} of ${filtered.length} dishes`;
  document.getElementById("loadMore").style.display = filtered.length > 6 ? "inline-flex" : "none";
  document.getElementById("loadMore").innerHTML = showAll ? "Show less ↑" : "View full menu ↓";
}

document.querySelectorAll(".cuisine-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".cuisine-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentCuisine = tab.dataset.cuisine;
    showAll = false;
    renderMenu();
  });
});
document.getElementById("loadMore").addEventListener("click", () => { showAll = !showAll; renderMenu(); });

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"}));
});

document.querySelector(".menu-toggle").addEventListener("click", () => document.querySelector(".nav-links").classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => document.querySelector(".nav-links").classList.remove("open")));

const date = document.getElementById("date");
date.min = new Date().toISOString().split("T")[0];
document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();
  const guests = document.getElementById("guests").value;
  const time = document.getElementById("time").value;
  document.getElementById("formMessage").textContent = `Great! We received your request for ${guests} at ${time}. We'll confirm availability shortly.`;
});

let reviewIndex = 0;
function renderReview(){
  const [text, author] = reviews[reviewIndex];
  document.getElementById("reviewText").innerHTML = `${text}<div class="review-author">${author}</div>`;
}
document.getElementById("prevReview").addEventListener("click", () => { reviewIndex=(reviewIndex-1+reviews.length)%reviews.length; renderReview(); });
document.getElementById("nextReview").addEventListener("click", () => { reviewIndex=(reviewIndex+1)%reviews.length; renderReview(); });

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
function openModal(title,text){
  modalTitle.textContent=title; modalText.textContent=text; modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
}
document.getElementById("secretSupper").addEventListener("click", () => openModal("Secret Supper", "You're on the list! Leave your details with our team at the restaurant and we'll contact you before the next secret menu is announced."));
document.getElementById("modalClose").addEventListener("click", () => modal.classList.remove("open"));
document.getElementById("modalAction").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("open"); });

renderMenu();
renderReview();
