// console.log('Выполненные пункты:\n1) Вёрстка соответствует макету - +26\n2) Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - +12\nНа ширине экрана 768рх реализовано адаптивное меню - +12')

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

// Registration----------------------------------------------------

const registerModal = document.querySelector('.pop-up-1');
const registerButton = document.querySelector('.register-button');
const registerCardBtn = document.querySelector('.register-card-btn');
const signUpBtn = registerModal.querySelector('.sign-up-btn');
const firstNameInput = registerModal.querySelector('#first-name');
const lastNameInput = registerModal.querySelector('#last-name');
const emailInput = registerModal.querySelector('#email');
const passwordInput = registerModal.querySelector('#password');
const closeRegister = document.querySelector('.register-close');
const buyButtons = document.querySelectorAll(".book-button");

const clearData = () => {
  firstNameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
 }

const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
 }

 const generateCardNumber = () => {
   const randomNumber = Math.floor(Math.random() * 0x1000000000);
   return randomNumber.toString(16).toUpperCase().slice(-9);
 }

 let storedUserData = localStorage.getItem('userData');
 let userDataArray = storedUserData ? JSON.parse(storedUserData) : [];

 if (!Array.isArray(userDataArray)) {
  userDataArray = [];
 }

 registerButton.addEventListener('click', () => {
  registerModal.classList.toggle('non-visible-1');
  clearData();
  registerMenu.classList.toggle('menu-open');
 });

 registerCardBtn.addEventListener('click', () => {
   registerModal.classList.toggle('non-visible-1');
  clearData();
 });

 registerModal.addEventListener('click', (event) => {
  if (event.target.classList.contains('pop-up-1')) {
    registerModal.classList.toggle('non-visible-1');
    clearData();
  }
 });

 closeRegister.addEventListener('click', () => {
  registerModal.classList.toggle('non-visible-1');
  clearData();
 });

 signUpBtn.addEventListener('click', () => {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!firstName || !lastName || !email || !password || password.length < 8 || !isValidEmail(email)) {
    alert('The form contains errors! All fields must be filled in. The password must contain at least 8 characters.');
    return;
  }

  const existingUser = userDataArray.find(user => user.email === email);
  if (existingUser) {
    alert('A user with such an email already exists. Log in or use another email to register.');
    return;
  }

  const cardNumber = generateCardNumber();

const newUser = {
  firstName,
  lastName,
  email,
  password,
  cardNumber,
  visitsCount: 1,
  booksCount: 0,
  subscription: false,
  buyButton: [],
  booksName: []
 };

  userDataArray.push(newUser);
  localStorage.setItem('userData', JSON.stringify(userDataArray));

  alert('Congratulations! You have successfully registered!');
  location.reload();
  clearData();
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('loggedInEmail', email);
 });

 // Log-In----------------------------------------------------

 const loginModal = document.querySelector('.pop-up-2');
 const emailLoginInput = document.querySelector('#email-login');
 const passwordLoginInput = document.querySelector('#password-login');
 const loginCardBtn = document.querySelector('.login-card-btn')
 const registerLogin = document.querySelector('.register')
 const loginRegister = document.querySelector('.login');
 const closeModal = document.querySelector('.modal-close');

 const clearLoginData = () => {
  emailLoginInput.value = '';
  passwordLoginInput.value = '';
 }

 loginCardBtn.addEventListener('click', () => {
  loginModal.classList.toggle('non-visible-2');
  clearLoginData();
  registerMenu.classList.toggle('menu-open');
 });

 registerLogin.addEventListener('click', () => {
 loginModal.classList.toggle('non-visible-2');
  setTimeout(() => {
    registerModal.classList.toggle('non-visible-1');
  }, 200);
 })

 loginRegister.addEventListener('click', () => {
 registerModal.classList.toggle('non-visible-1');
  setTimeout(() => {
    loginModal.classList.toggle('non-visible-2');
  }, 200);
 })

 loginCardBtn.addEventListener('click', () => {
  loginModal.classList.toggle('non-visible-2');
  clearLoginData();
 });

 loginModal.addEventListener('click', (event) => {
  if (event.target.classList.contains('pop-up-2')) {
    loginModal.classList.toggle('non-visible-2');
    clearLoginData();
  }
 });

 closeModal.addEventListener('click', () => {
  loginModal.classList.toggle('non-visible-2');
  clearLoginData();
 });

