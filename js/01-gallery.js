// Завдання 1 - галерея зображень
// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні.
// Подивися демо відео роботи галереї.
// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:
//
//     Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
//     Реалізація делегування на div.gallery і отримання url великого зображення.
//     Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і
//     додай у проект посилання на мініфіковані (.min) файли бібліотеки.
//     Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
//     Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку
//     модального вікна із зображенням з прикладів бібліотеки basicLightbox.
//     Розмітка елемента галереї
// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися
// в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.
//
// <div class="gallery__item">
//     <a class="gallery__link" href="large-image.jpg">
//         <img
//             class="gallery__image"
//             src="small-image.jpg"
//             data-source="large-image.jpg"
//             alt="Image description"
//         />
//     </a>
// </div>
//
// Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде
// перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.
//
//     Закриття з клавіатури
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.
//
// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було
// тільки доти, доки відкрите модальне вікно. Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

import {galleryItems} from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector(`.gallery`);
const itemsMarkUp = createGalleryItems(galleryItems);

galleryContainer.insertAdjacentHTML(`beforeend`, itemsMarkUp);
galleryContainer.addEventListener(`click`, onImageClickCreateModal);

function createGalleryItems(items) {
    return items.map(({preview, original, description}) => {
        return `<div class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</div>`
    }).join('');
}

const ESC_KEY = `Escape`;
const generateOnKeyPress = (cb) => (event) => {
    const isEscKey = event.code === ESC_KEY;
    if (isEscKey) {
        cb?.();
    }
}
function onImageClickCreateModal(event) {
    event.preventDefault();

    const isItemImg = event.target.classList.contains("gallery__image");
    if (!isItemImg) {
        return;
    }

    const currentImgUrl = event.target.dataset.source;
    const onEscPress = generateOnKeyPress(() => instance.close());

    const instance = basicLightbox.create(`<img src="${currentImgUrl}"/>`,
        {
            onShow: () => window.addEventListener(`keydown`, onEscPress),
            onClose: () => window.removeEventListener(`keydown`, onEscPress)
        }
    );

    instance.show();
}




