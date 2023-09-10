console.log('Выполненные пункты:\n1) Вёрстка соответствует макету - +26\n2) Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - +12\nНа ширине экрана 768рх реализовано адаптивное меню - +12')

console.log('Сумма баллов - 50');

// Burger-menu----------------------------------------------------

const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav-menu');
const navItems = document.querySelector('.nav-link');
const body = document.body;


burger.addEventListener('click', () => {
    // body.classList.toggle('stop-scroll');
    burger.classList.toggle('cross');
    nav.classList.toggle('open');
});

body.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('cross');
        nav.classList.remove('open');
    }
});

navItems.addEventListener('click', () => {
    // body.classList.remove('stop-scroll');
    burger?.classList.remove('cross');
    nav.classList.remove('open');
});


// Slider-----------------------------------------------------

const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left-slide');
const rightArrow = document.querySelector('.right-slide');
// const dotButtons = document.querySelectorAll('.pagination-button');

const slideWidth = 475; // Ширина одного слайда

let currentIndex = 0; // Текущий индекс слайда

// Функция для прокрутки слайдера к указанному индексу
const goToSlide = (index) => {
    if (index >= 0 && index < slider.children.length) {
        currentIndex = index;
        updateSliderPosition();
        updateDotButtons();
    }
};

// Функция для обновления положения слайдера
const updateSliderPosition = () => {
    slider.scrollLeft = currentIndex * slideWidth;
};

// Функция для обновления состояния точек активации
const updateDotButtons = () => {
    const dotButtons = document.querySelectorAll('.pagination-button');
    dotButtons.forEach((button, index) => {
        if (index === currentIndex) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
};

// Функция для обновления состояния стрелок
const updateButtonState = () => {
  if (currentIndex === 0) {
      leftArrow.classList.add('pointer-events');
  } else {
      leftArrow.classList.remove('pointer-events');
  }

  if (currentIndex === slider.children.length - 1) {
      rightArrow.classList.add('pointer-events');
  } else {
      rightArrow.classList.remove('pointer-events');
  }
};

// Добавляем слушатели событий на кнопки "вправо" и "влево"
rightArrow.addEventListener('click', () => {
  if (currentIndex < slider.children.length - 1) {
      currentIndex++;
      updateSliderPosition();
      updateDotButtons();
      updateButtonState();
  }
});

leftArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
      updateDotButtons();
      updateButtonState();
  }
});

// Добавляем слушатели событий на кнопки пагинации
const paginationButtons = document.querySelectorAll('.pagination-button');
paginationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Favorites-books----------------------------------------------------

const books = document.querySelectorAll('.favorites-book')
const radiobuttons = document.querySelectorAll("input[type='radio']")

radiobuttons.forEach(button => {
	button.addEventListener("change", () => {
		books.forEach(book => {
			book.classList.add('non-display-book')
		});
		for (let i = 0; i < radiobuttons.length; i += 1) {
			let s = i + (i * 3)
			for (let j = 0; j < 4; j += 1, s += 1) {
				if (radiobuttons[i].checked) {
					books[s].classList.remove('non-display-book')
				}
			}
		}
	})
});

// Drop-menu----------------------------------------------------

const user = document.querySelector('.user-icon');
const registerMenu = document.querySelector('.register-drop-menu');
const profileMenu = document.querySelector('.profile-drop-menu')
const loginUser = document.querySelector('.user-icon-login');
const userIcon = document.querySelector('.my-profile-init');
const userName = document.querySelector('.my-profile-name');
const visitsCount = document.querySelectorAll('.visits-count');
const booksCount = document.querySelectorAll('.books-count');
const cardNumber = document.querySelector('.card-number');
const modalLogin = document.querySelector('.pop-up-2');
const modalReg = document.querySelector('.pop-up-1');

let isOpenMenu = false;
// let isTransitioning = false;


const closeMenu = () => {
  isOpenMenu = false;
  burger.classList.remove("cross");
  nav.classList.remove('open');
}

user.addEventListener('click', (event) => {
  event.stopPropagation();
  if (!registerMenu.classList.contains('registered')) {
  registerMenu.classList.toggle('menu-open');
} else {
  profileMenu.classList.toggle('login-menu-open');
  }
  if (!modalLogin.classList.contains('non-visible-2')) {
    modalLogin.classList.toggle('non-visible-2');
  }
  if (!modalReg.classList.contains('non-visible-1')) {
  modalReg.classList.toggle('non-visible-1');
  }
  closeMenu();
  });


loginUser.addEventListener('click', (event) => {
  event.stopPropagation();
  profileMenu.classList.toggle('login-menu-open');
  closeMenu();
 });

document.addEventListener('click', (event) => {
 if (!registerMenu.contains(event.target)) {
   registerMenu.classList.remove('menu-open');
 }
 if (!profileMenu.contains(event.target)) {
   profileMenu.classList.remove('login-menu-open');
 }
});

