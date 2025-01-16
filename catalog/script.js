


    // Function to create product card (adapt as needed for your product data)
    function createProductCard(product) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <div class="product-image-container">
                <img class="product-image" src="${product.image}" alt="${product.name}">
                ${product.discount ? `<span class="discount">${product.discount}</span>` : ''}
                <span class="favorite">❤</span>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <div class="prices">
                ${product.oldPrice ? `<span class="old-price">${product.oldPrice}</span>` : ''}
                <span class="new-price">${product.newPrice}</span>
            </div>
            ${product.rating ? `<div class="rating">★ ${product.rating}</div>` : ''}
        `;

    productCard.addEventListener("click", () => {
        window.location.href = `../product/product.html?id=${product.id}`; // Используйте уникальный ID товара
    });

        return productCard;
    }

    // Function to populate the catalog grid
    function populateCatalogGrid() {
        const catalogGrid = document.getElementById('catalogGrid');
        catalogGrid.innerHTML = ''; // Clear any existing products

        fetch('../products.json')
        .then(response => response.json())
        .then(data => {
        data.forEach(product => {
            if (product.category==="clothes") {
                product.image = "../" + product.image;
            const productCard = createProductCard(product);
            catalogGrid.appendChild(productCard);
            }
        });
        
    });
    };
    

    // Initial population of the grid
    populateCatalogGrid();

    // Dropdown menu functionality (you might use a library for more advanced features)
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    dropdownButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            dropdownContents[index].classList.toggle('show'); // Toggle the "show" class
        });
    });


    // Stop propagation of clicks inside dropdown to prevent closing on link click
    dropdownContents.forEach(content => {
        content.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent the click from reaching the document
        });
      });



    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        dropdownContents.forEach(content => {
            if (!content.contains(event.target) && !dropdownButtons.some(button => button.contains(event.target) )) {
               content.classList.remove('show');
            }
        });
    });


    // Filtering functionality (example - adapt based on your data and filter structure)
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]'); // Replace with your actual filter selectors

    // ... Add filter event listeners and logic (similar to previous examples)
    // ... (Sorting functionality, if required)
