# Передача проекта: лендинг «Сам себе визажист»

Одностраничный сайт курса макияжа визажиста Анастасии Пономаревой. Чистый HTML + CSS + vanilla JS, без сборщиков.

## Файлы
- `index.html` — разметка всех секций (hero, обо мне, шаги, тарифы, работы, отзывы, FAQ, финал, футер, лайтбокс, закреплённая кнопка).
- `styles.css` — стили, mobile-first, палитра в `:root`.
- `script.js` — плейсхолдеры отсутствующих картинок, появление при скролле, закреплённая кнопка, «Показать всё», FAQ, лайтбокс (свайп/стрелки/Esc).
- `optimize_images.py` — сжатие до 1600px и создание .webp (нужен `pip install pillow`).
- `.nojekyll` — для GitHub Pages.
- `assets/` — сюда кладутся картинки (сейчас пусто, стоят заглушки).

## Что нужно сделать
1. Положить картинки: `assets/welcome.jpg`, `assets/avatar.png`, `assets/works/w1.jpg … w5.jpg`, `assets/reviews/r1.jpg … r3.jpg`. Запустить `python optimize_images.py`.
2. В `index.html` заменить `og:image` на полный URL после публикации (`https://ЛОГИН.github.io/РЕПО/assets/avatar.png`), при желании добавить `og:url` и `canonical`.
3. Опубликовать на GitHub Pages: репозиторий → Settings → Pages → Deploy from a branch → `main` / root.
4. Проверить на ширинах 360, 390, 768, 1440 после добавления реальных фото (особенно высоту картинок «до/после» и скриншотов отзывов).

## Ссылки (не менять без просьбы)
- Запись (все кнопки «Записаться»): https://t.me/samsebe_vizazhist_bot
- Telegram Анастасии: https://t.me/bambyk100
- Instagram: https://www.instagram.com/mk.anastasia
- ВКонтакте: https://vk.ru/nastyaponama
- Автор сайта: https://neelux.is-a.dev

## Стиль (фирменные цвета)
Фон `#FBF6F0`, белый `#FFFFFF`, золото `#B39058` / `#D6BA80`, розовый `#F1D9D6` / `#C48088`, зелёный `#1F3A2E` (тарифы и футер), текст `#46302E` / `#96766F`. Шрифты: Playfair Display (курсив) для заголовков, Manrope для текста.

## Правила
- Не придумывать текстовые отзывы, имена и фото — только реальные скриншоты из `assets/reviews/`.
- Внешние ссылки — `target="_blank" rel="noopener"`.
- Уважать `prefers-reduced-motion`.
