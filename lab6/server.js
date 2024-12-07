const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Використовуємо статичні файли
app.use(express.static('public'));
app.use(express.json());  // Для парсингу JSON

// Функція для читання вкладок із файлу
function getTabs() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'tabsData.json'), 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];  // Якщо файл не знайдено або порожній, повертаємо порожній масив
    }
}

// Функція для збереження вкладок у файл
function saveTabs(tabs) {
    fs.writeFileSync(path.join(__dirname, 'tabsData.json'), JSON.stringify(tabs, null, 2));
}

// Маршрут для отримання вкладок
app.get('/tabs', (req, res) => {
    const tabs = getTabs();
    res.json(tabs);
});

// Маршрут для додавання нової вкладки
app.post('/tabs', (req, res) => {
    const newTab = req.body;
    const tabs = getTabs();
    tabs.push(newTab);
    saveTabs(tabs);
    res.status(201).json(newTab);
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
