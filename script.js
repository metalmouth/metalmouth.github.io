// Add JavaScript for scroll-to-top button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
}

scrollToTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Telegram widget function
function onTelegramAuth(user) {
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
}


const productGrid = document.getElementById("popularProducts");
const actualGrid = document.getElementById("actualProducts");

// Function to create product card
function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
        <div class="product-image-container">
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <span class="discount">${product.discount}</span>
            <span class="favorite">❤</span>
        </div>
        <h3 class="product-title">${product.name}</h3>
        <div class="prices">
            <span class="old-price">${product.oldPrice}</span>
            <span class="new-price">${product.newPrice}</span>
        </div>
        <div class="rating">★ ${product.rating}</div>
    `;

        productCard.addEventListener("click", () => {
            window.location.href = `product/product.html?id=${product.id}`;
        });
        
    return productCard;
}


fetch('./products.json')
    .then(response => response.json())
    .then(data => {

        data.forEach((product) => {
        if (product.type==="actual") {
            actualGrid.appendChild(createProductCard(product));
        } else {
            productGrid.appendChild(createProductCard(product));
        }
        });

    });



