// Функція для встановлення кольору рамки для заданого елемента
function setBorderColor(element, color) {
    element.style.border = `2px solid ${color}`;
}

const savedColor = localStorage.getItem('borderColor');

if (savedColor) {
    document.querySelectorAll('main, .left, .right, .navigation, footer, header').forEach(block => {
        setBorderColor(block, savedColor);
    });
}

function changeBorderColor() {
    const userColor = prompt('Введіть колір рамки (наприклад, red, #ff0000, rgb(255, 0, 0)):');
    if (userColor) {
        document.querySelectorAll('main, .left, .right, .navigation, footer, header').forEach(block => {
            setBorderColor(block, userColor);
        });
        localStorage.setItem('borderColor', userColor);
    }
}

document.querySelector('#changeBorderColorButton').addEventListener('click', changeBorderColor);

//--------------------------------------------------------------------------------------------------------
// Функція для додавання зображення в блок .left
function addImageToLeft(imageUrl) {
    const leftElement = document.querySelector('.left');
    
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = 'User image';
    imageElement.style.maxWidth = '100%';
    imageElement.style.marginBottom = '10px';

    leftElement.appendChild(imageElement);
}

function saveImagesToLocalStorage(images) {
    localStorage.setItem('savedImages', JSON.stringify(images));
}

function loadImagesFromLocalStorage() {
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
    savedImages.forEach(url => addImageToLeft(url));
    return savedImages;
}

// Функція для очищення лише зображень з .left
function clearImages() {
    const leftElement = document.querySelector('.left');
    const images = leftElement.querySelectorAll('img');
    images.forEach(image => image.remove());
    
    localStorage.removeItem('savedImages');
}

const savedImages = loadImagesFromLocalStorage();

document.querySelector('#addImageButton').addEventListener('click', () => {
    const imageUrl = document.querySelector('#imageUrl').value.trim();
    
    if (imageUrl) {
        addImageToLeft(imageUrl);

        savedImages.push(imageUrl);
        saveImagesToLocalStorage(savedImages);

        document.querySelector('#imageUrl').value = '';
    } else {
        alert('Будь ласка, введіть URL зображення!');
    }
});

document.querySelector('#clearImagesButton').addEventListener('click', () => {
    clearImages(); 
});

//--------------------------------------------------------------------------------------------------------

const headerElement = document.querySelector('header');
const footerElement = document.querySelector('footer');

const headerContent = headerElement.innerHTML;
const footerContent = footerElement.innerHTML;

headerElement.innerHTML = footerContent;
footerElement.innerHTML = headerContent;

function calculateRhombusArea() {
    const diagonal1 = 10; 
    const diagonal2 = 8;  

    const area = (diagonal1 * diagonal2) / 2;

    const resultElement = document.createElement('p');
    resultElement.textContent = `Площа ромба: ${area}`;

    const mainElement = document.querySelector('main');
    mainElement.appendChild(resultElement);
}

calculateRhombusArea();

//--------------------------------------------------------------------------------------------------------
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return matches ? decodeURIComponent(matches[1]) : null;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value)}; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`;
}

function deleteCookie(name) {
    setCookie(name, '', { 'max-age': -1 });
}

function main() {
    const savedData = getCookie('minMaxNumbers');

    if (savedData) {
        if (confirm(`Дані збережені: ${savedData}\nВи хочете видалити дані?`)) {
            deleteCookie('minMaxNumbers');
            location.reload(); 
        } else {
            alert('Дані збережені у cookies. Для початку роботи перезавантажте сторінку.');
            return; 
        }
    } else {
        const formElement = document.querySelector('#inputForm');
        formElement.style.display = 'block'; 

        const submitButton = document.querySelector('#submitButton');
        submitButton.addEventListener('click', () => {
            const input = document.querySelector('#numbersInput').value;

            const numbers = input.split(',').map(Number).filter(n => !isNaN(n));
            if (numbers.length !== 10) {
                alert('Будь ласка, введіть рівно 10 чисел!');
                return;
            }

            const min = Math.min(...numbers);
            const max = Math.max(...numbers);

            const result = `Мінімум: ${min}, Максимум: ${max}`;
            setCookie('minMaxNumbers', result, { expires: new Date(Date.now() + 86400e3) }); 

            alert(result);

            formElement.style.display = 'none';
        });
    }
}
main();



