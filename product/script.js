document.addEventListener("DOMContentLoaded", () => {
    // Обработка выбора размера товара
    const sizeButtons = document.querySelectorAll(".product-page-size-btn");

    sizeButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Убираем активный класс у всех кнопок
            sizeButtons.forEach(btn => btn.classList.remove("active"));
            // Добавляем активный класс к выбранной кнопке
            button.classList.add("active");
        });
    });

    // Функция для создания карточки товара
    function createProductCard(product) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <div class="product-image-container">
                <img class="product-image" src="../${product.image}" alt="${product.name}">
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

        // Добавляем обработчик клика для перехода на страницу товара
        productCard.addEventListener("click", () => {
            window.location.href = `product.html?id=${product.id}`;
        });

        return productCard;
    }

    // Функция для получения случайных товаров
    function getRandomProducts(products, count) {
        const shuffled = products.sort(() => 0.5 - Math.random()); // Перемешиваем массив
        return shuffled.slice(0, count); // Выбираем первые `count` товаров
    }

    // Получаем ID товара из URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Загружаем данные о товарах
        fetch('../products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.find(p => p.id == productId);
                if (product) {
                    // Обновляем информацию о товаре на странице
                    document.title = product.name + ' — ShopoЦенам';
                    document.querySelector('.product-page-image img').src = "../" + product.image;
                    document.querySelector('.product-name').textContent = product.name;
                    document.querySelector('.product-page-title').textContent = product.name;
                    document.querySelectorAll('.product-page-delivery-name').forEach((i) => {
                        i.textContent = product.name;
                    });
                    document.querySelector('.product-page-description p').textContent = product.description;
                    document.querySelector('.product-page-new-price').textContent = product.newPrice;
                    document.querySelector('.product-page-old-price').textContent = product.oldPrice;
                    document.querySelector('.product-page-discount').textContent = product.discount;
                    document.querySelectorAll('.product-page-delivery-price').forEach((i) => {
                        i.textContent = product.newPrice;
                    });

                    // Отображаем случайные товары в блоке "Смотрите также"
                    const productGrid = document.getElementById("popularProducts");
                    const randomProducts = getRandomProducts(data, 5);
                    randomProducts.forEach((product) => {
                        productGrid.appendChild(createProductCard(product));
                    });

                    // Загружаем информацию о товаре для блока "О товаре"
                    const aboutProductContainer = document.getElementById('aboutProduct');
                    aboutProductContainer.innerHTML = `
                        <div class="product-page-about-section">
                            <h3>Основная информация</h3>
                            <ul>
                                <li><strong>Состав:</strong> ${product.material}</li>
                                <li><strong>Цвет:</strong> ${product.color}</li>
                            </ul>
                        </div>
                        <div class="product-page-about-section">
                            <h3>Дополнительная информация</h3>
                            <ul>
                                <li><strong>Страна производства:</strong> ${product.country || 'Не указано'}</li>
                                <li><strong>Особенности модели:</strong> ${product.features || 'Не указано'}</li>
                                <li><strong>Декоративные элементы:</strong> ${product.decor || 'Не указано'}</li>
                                <li><strong>Комплектация:</strong> ${product.complectation || 'Не указано'}</li>
                            </ul>
                        </div>
                        <div class="product-page-about-section">
                            <h3>Дополнительная информация</h3>
                            <p>Создано на ShopoЦенам ${new Date().toLocaleDateString()}</p>
                        </div>
                    `;
                }
            })
            .catch(error => console.error('Ошибка при загрузке данных о товарах:', error));
    }

    // Функция для создания карточки отзыва
    function createReviewCard(review) {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        reviewCard.innerHTML = `
            <div class="review-author">${review.author}</div>
            <div class="review-rating">★ ${review.rating}</div>
            <div class="review-comment">${review.comment}</div>
            <div class="review-date">${review.date}</div>
        `;

        return reviewCard;
    }

    // Загрузка отзывов из JSON-файла
    fetch('../reviews.json')
        .then(response => response.json())
        .then(data => {
            const reviewsList = document.getElementById("reviewsList");
            const productId = new URLSearchParams(window.location.search).get('id'); // Получаем ID товара из URL

            // Фильтруем отзывы по productId
            const productReviews = data.filter(review => review.productId == productId);

            if (productReviews.length > 0) {
                // Если есть отзывы, отображаем их
                productReviews.forEach(review => {
                    reviewsList.appendChild(createReviewCard(review));
                });
            } else {
                // Если отзывов нет, выводим сообщение
                reviewsList.innerHTML = `<div class="no-reviews">Отзывов на этот товар пока нет.</div>`;
            }
        })
        .catch(error => console.error('Ошибка при загрузке отзывов:', error));
});