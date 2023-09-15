// console.log('Выполненные пункты:\n1) Вёрстка соответствует макету - +26\n2) Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - +12\nНа ширине экрана 768рх реализовано адаптивное меню - +12')

// console.log("Сумма баллов - 50");

// Burger-menu----------------------------------------------------

const burger = document.querySelector(".burger-menu");
const nav = document.querySelector(".nav-menu");
const navItems = document.querySelector(".nav-link");
const body = document.body;

burger.addEventListener("click", () => {
  // body.classList.toggle('stop-scroll');
  burger.classList.toggle("cross");
  nav.classList.toggle("open");
});

body.addEventListener("click", function (e) {
  if (!nav.contains(e.target) && !burger.contains(e.target)) {
    burger.classList.remove("cross");
    nav.classList.remove("open");
  }
});

navItems.addEventListener("click", () => {
  // body.classList.remove('stop-scroll');
  burger?.classList.remove("cross");
  nav.classList.remove("open");
});

// Slider-----------------------------------------------------

const slider = document.querySelector(".slider");
const leftArrow = document.querySelector(".left-slide");
const rightArrow = document.querySelector(".right-slide");
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
  const dotButtons = document.querySelectorAll(".pagination-button");
  dotButtons.forEach((button, index) => {
    if (index === currentIndex) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
};

// Функция для обновления состояния стрелок
const updateButtonState = () => {
  if (currentIndex === 0) {
    leftArrow.classList.add("pointer-events");
  } else {
    leftArrow.classList.remove("pointer-events");
  }

  if (currentIndex === slider.children.length - 1) {
    rightArrow.classList.add("pointer-events");
  } else {
    rightArrow.classList.remove("pointer-events");
  }
};

// Добавляем слушатели событий на кнопки "вправо" и "влево"
rightArrow.addEventListener("click", () => {
  if (currentIndex < slider.children.length - 1) {
    currentIndex++;
    updateSliderPosition();
    updateDotButtons();
    updateButtonState();
  }
});

leftArrow.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSliderPosition();
    updateDotButtons();
    updateButtonState();
  }
});

// Добавляем слушатели событий на кнопки пагинации
const paginationButtons = document.querySelectorAll(".pagination-button");
paginationButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    goToSlide(index);
  });
});

// Favorites-books-slider----------------------------------------------------

const books = document.querySelectorAll(".favorites-book");
const radiobuttons = document.querySelectorAll("input[type='radio']");

radiobuttons.forEach((button, index) => {
  button.addEventListener("change", () => {
    books.forEach((book, bookIndex) => {
      const categoryIndex = Math.floor(bookIndex / 4); // Разделяем книги по категориям (по 4 книги в каждой)
      if (categoryIndex === index) {
        book.classList.remove("non-display-book");
      } else {
        book.classList.add("non-display-book");
      }
    });
  });
});

// Drop-menu----------------------------------------------------

const user = document.querySelector(".user-icon");
const loginUser = document.querySelector(".user-icon-login");
const registerMenu = document.querySelector(".register-drop-menu");
const profileMenu = document.querySelector(".profile-drop-menu");
const modalRegister = document.querySelector(".pop-up-1");
const modalLogin = document.querySelector(".pop-up-2");

// Отслеживаем состояние меню
let openMenu = false;

// Функция для закрытия меню
const closeMenu = () => {
  openMenu = false;
  burger.classList.remove("cross");
  nav.classList.remove("open");
};

// Добавляем обработчик события на иконку пользователя
user.addEventListener("click", (event) => {
  event.stopPropagation(); // Предотвращаем всплытие события

  // Переключаем меню регистрации и меню профиля в зависимости от состояния
  if (!registerMenu.classList.contains("registered")) {
    registerMenu.classList.toggle("menu-open");
  } else {
    profileMenu.classList.toggle("login-menu-open");
  }

  // Переключаем видимость модальных окон входа и регистрации
  if (!modalLogin.classList.contains("non-visible-2")) {
    modalLogin.classList.toggle("non-visible-2");
  }
  if (!modalRegister.classList.contains("non-visible-1")) {
    modalRegister.classList.toggle("non-visible-1");
  }
  closeMenu(); // Закрываем меню
});

// Добавляем обработчик события на зарегистрированном пользователе
loginUser.addEventListener("click", (event) => {
  event.stopPropagation();
  // Переключаем меню профиля в положение
  profileMenu.classList.toggle("login-menu-open");
  closeMenu();
});

document.addEventListener("click", (event) => {
  // Закрываем дроп-меню регистрации, если клик был вне него
  if (!registerMenu.contains(event.target)) {
    registerMenu.classList.remove("menu-open");
  }
  // Закрываем меню профиля, если клик был вне него
  if (!profileMenu.contains(event.target)) {
    profileMenu.classList.remove("login-menu-open");
  }
});

// Registration----------------------------------------------------

const registerButton = document.querySelector(".register-button");
const registerCardButton = document.querySelector(".register-card-btn");
const closeRegister = document.querySelector(".register-close");
const signUpButton = modalRegister.querySelector(".sign-up-btn");

const firstNameInput = modalRegister.querySelector("#first-name");
const lastNameInput = modalRegister.querySelector("#last-name");
const emailInput = modalRegister.querySelector("#email");
const passwordInput = modalRegister.querySelector("#password");

const visitsCount = document.querySelectorAll(".visits-count");
const booksCount = document.querySelectorAll(".books-count");
const buyButtons = document.querySelectorAll(".book-button");
const cardNumber = document.querySelector(".card-number");

// Получаем случайный номер карты
const getCardNumber = () => {
  const randomNumber = Math.random();
  return randomNumber.toString(16).toUpperCase().slice(-9);
};

// Проверяем email
const checkEmail = (email) => {
  const emailRules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRules.test(email);
};

// Очистка данных в форме регистрации
const clearData = () => {
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
};

// Получаем сохраненные данные пользователя из локального хранилища
let storedUserData = localStorage.getItem("userData");
let userDataArray = storedUserData ? JSON.parse(storedUserData) : [];

// Проверяем, что данные являются массивом
if (!Array.isArray(userDataArray)) {
  userDataArray = [];
}

// Обработчик на кнопке Register в дроп-меню
registerButton.addEventListener("click", () => {
  modalRegister.classList.toggle("non-visible-1");
  clearData();
  registerMenu.classList.toggle("menu-open");
});

// Обработчик на кнопке Register в digital library cards
registerCardButton.addEventListener("click", () => {
  modalRegister.classList.toggle("non-visible-1");
  clearData();
});

modalRegister.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up-1")) {
    modalRegister.classList.toggle("non-visible-1");
    clearData();
  }
});

closeRegister.addEventListener("click", () => {
  modalRegister.classList.toggle("non-visible-1");
  clearData();
});

// Обработчик на кнопке sign up в модалке register
signUpButton.addEventListener("click", () => {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  // Проверяем правильно ли введены данные
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    password.length < 8 ||
    !checkEmail(email)
  ) {
    alert(
      "The form contains errors! All fields must be filled in. The password must contain at least 8 characters."
    );
    return;
  }

  // Проверяем, существует ли уже пользователь с таким email
  const registeredUser = userDataArray.find((user) => user.email === email);
  if (registeredUser) {
    alert(
      "A user with such an email already exists. Log in or use another email to register." //Если есть
    );
    return;
  }

  // Если нет
  const cardNumber = getCardNumber();

  // Создаем нового пользователя
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
    booksName: [],
  };

  // Добавляем пользователя в массив и сохраняем в локальное хранилище
  userDataArray.push(newUser);
  localStorage.setItem("userData", JSON.stringify(userDataArray));

  alert("Congratulations! You have successfully registered!");
  location.reload(); // Перезагружаем страницу
  clearData(); // Очищаем данные в форме
  localStorage.setItem("isLoggedIn", "true"); // Устанавливаем флаг в "true"
  localStorage.setItem("loggedInEmail", email); // Сохраняем email зарегистрированного пользователя
});

// Log-In----------------------------------------------------

const loginButton = document.querySelector(".login-button");
const registerLogin = document.querySelector(".register");
const loginRegister = document.querySelector(".login");
const loginCardButton = document.querySelector(".login-card-btn");
const modalLoginButton = document.querySelector(".log-in-btn");

const closeModal = document.querySelector(".modal-close");
const loginModal = document.querySelector(".pop-up-2");

const userIcon = document.querySelector(".my-profile-init");
const userName = document.querySelector(".my-profile-name");

const emailLoginInput = document.querySelector("#email-login");
const passwordLoginInput = document.querySelector("#password-login");

// Очистка данных в форме входа
const clearLoginData = () => {
  emailLoginInput.value = "";
  passwordLoginInput.value = "";
};

// Обработчик на кнопке Login в дроп-меню
loginButton.addEventListener("click", () => {
  loginModal.classList.toggle("non-visible-2");
  clearLoginData();
  registerMenu.classList.toggle("menu-open");
});

// Обработчик на ссылке register в модалке LOGIN
registerLogin.addEventListener("click", () => {
  loginModal.classList.toggle("non-visible-2");
  setTimeout(() => {
    modalRegister.classList.toggle("non-visible-1");
  }, 200);
});

// Обработчик на ссылке Login в модалке REGISTER
loginRegister.addEventListener("click", () => {
  modalRegister.classList.toggle("non-visible-1");
  setTimeout(() => {
    loginModal.classList.toggle("non-visible-2");
  }, 200);
});

// Обработчик на кнопке Login в digital library cards
loginCardButton.addEventListener("click", () => {
  loginModal.classList.toggle("non-visible-2");
  clearLoginData();
});

loginModal.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up-2")) {
    loginModal.classList.toggle("non-visible-2");
    clearLoginData();
  }
});

// Закрытие модалки входа
closeModal.addEventListener("click", () => {
  loginModal.classList.toggle("non-visible-2");
  clearLoginData();
});

// Переменная для хранения текущего пользователя
let currentUser = null;

// Обработчик на кнопке входа модалки LOGIN
modalLoginButton.addEventListener("click", () => {
  const email = emailLoginInput.value.trim();
  const password = passwordLoginInput.value;

  // Получаем сохраненные данные пользователя из локального хранилища
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    const userDataArray = JSON.parse(storedUserData);

  // Ищем пользователя с введенным email и паролем
  const someUser = userDataArray.find(
    (someUser) => someUser.email === email && someUser.password === password
  );

  if (someUser) {
    //если нашли
    alert("Congratulations! You are successfully logged in!"); // Выводим сообщение об успешном входе
    someUser.visitsCount += 1; //Увеличиваем счетчик посещений пользователя
    loginModal.classList.toggle("non-visible-2");
    clearLoginData();
    // Добавляем класс "registered" к кнопкам покупки
    buyButtons.forEach((button) => {
      button.classList.add("registered");
    });
    registerMenu.classList.add("non-display-menu");
    profileMenu.classList.remove("non-display-menu");
    const fullName = `${someUser.firstName} ${someUser.lastName}`;

    const firstNameInit = someUser.firstName[0]; // инициалы
    const lastNameInit = someUser.lastName[0];

  // Устанавливаем для пользователя
  loginUser.textContent = `${firstNameInit}${lastNameInit}`.toUpperCase();
  userIcon.textContent = `${firstNameInit}${lastNameInit}`.toUpperCase();
  userName.textContent = fullName;
  cardNumber.textContent = someUser.cardNumber;
  visitsCount.textContent = `${someUser.visitsCount}`;
  booksCount.textContent = `${someUser.booksCount}`;
  userIcon.setAttribute("title", fullName);
  userIcon.style.display = "block";
  userIcon.style.font;
  user.classList.add("none-display-icon");
  currentUser = someUser;
  localStorage.setItem("isLoggedIn", "true"); // Устанавливаем флаг "true"
  localStorage.setItem("loggedInEmail", email); // Сохраняем email зарегистрированного пользователя
  const profileNumber = document.querySelector(".profile-num");

  // Обновляем данные пользователя в локальном хранилище
  localStorage.setItem("userData", JSON.stringify(userDataArray));
  location.reload(); // Перезагружаем страницу
    if (profileNumber) {
      profileNumber.textContent = `${currentUser.cardNumber}`;
    }
    } else {
      alert("Invalid password or email."); //Выводим сообщение об ошибке
    }
  } else {
    alert("The user was not found. Please register."); // Выводим сообщение о том, что пользователь не найден
  }
});

// Log-Out----------------------------------------------------

const logOut = document.querySelector(".logout-button");

// Обработчик на кнопке "Logout"
logOut.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false"); // Устанавливаем  в "false"
  location.reload();
});

// Buy-books---------------------------------------------------

const libraryCard = document.querySelector(".cards-container");
const libraryCardLogin = document.querySelector(".cards-container-login");
const buyCardModal = document.querySelector(".pop-up-4");
const buyCard = document.querySelector(".buy-book-button");

buyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Проверяем, содержит ли кнопка текст "Buy" и не имеет ли класс "registered"
    if (
      button.textContent.includes("Buy") &&
      !button.classList.contains("registered")
    ) {
      loginModal.classList.toggle("non-visible-2");
      clearLoginData();
    }
  });
});

// Когда страница загружена
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userDataArray = JSON.parse(storedUserData);
      const email = localStorage.getItem("loggedInEmail");

      // Находим текущего пользователя по email
      const currentUser = userDataArray.find(
        (someUser) => someUser.email === email
      );

if (currentUser) {
  libraryCard.classList.add("non-display-card"); // Скрываем карточку библиотеки
  libraryCardLogin.classList.remove("non-display-card"); // Отображаем для зарегистрированных пользователей

  const updateBookCount = (count) => {
    const booksCountElements = document.querySelectorAll(".books-count");
    booksCountElements.forEach((element) => {
      element.textContent = count;
    });
  }

  buyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
// Проверяем, что текущий пользователь не имеет подписки и кнопка имеет класс "registered"
     if (
   currentUser &&
   !currentUser.subscription &&
    button.classList.contains("registered")
     ) {
    buyCardModal.classList.toggle("non-visible-4");
     } else if (button.classList.contains("own-button")) {
      // Если кнопка уже имеет класс "own-button", ничего не делаем
     } else {
     button.classList.add("own-button"); //Добавляем own к купленной книге
     button.textContent = "Own";

     currentUser.booksCount += 1;  //Увеличиваем счетчик купленных книг
     updateBookCount(currentUser.booksCount);

     const buttonId = button.dataset.id;

    if (!currentUser.buyButton.includes(buttonId)) {
       currentUser.buyButton.push(buttonId); // Добавляем идентификатор кнопки к списку купленных
     }

    const bookItem = button.closest(".favorites-book");
    const bookTitle =
    bookItem.querySelector(".book-title").textContent;
    const bookAuthor =
    bookItem.querySelector(".book-author").textContent;

    // Добавляем инфо о купленной книге в данные пользователя
    currentUser.booksName.push({
      title: bookTitle,
      author: bookAuthor,
    });

    const userIndex = userDataArray.findIndex(
      (someUser) => someUser.email === currentUser.email
    );
    if (userIndex !== -1) {
      userDataArray[userIndex] = currentUser;
      localStorage.setItem("userData", JSON.stringify(userDataArray));
    }

// Создаем и добавляем элемент списка арендованных книг в библиотеку пользователя
   let bookname = button.parentElement.children[2].innerHTML + ', ' + button.parentElement.children[3].innerHTML.slice(3);
   const li = document.createElement("li");
   li.textContent = `${bookTitle}, ${bookAuthor}`;
   li.classList.add("rented-item");
   document.querySelector(".rented-books ul").appendChild(li);
     }
   });
});

// Добавляем купленные книги пользователя в список
    currentUser.booksName.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.title}, ${book.author}`;
    li.classList.add("rented-item");
    document.querySelector(".rented-books ul").appendChild(li);
});

// Помечаем книги, которые уже куплены пользователем
    buyButtons.forEach(function (button) {
      const buttonId = button.dataset.id;
       if (currentUser.buyButton.includes(buttonId)) {
       button.classList.add("own-button");
       button.textContent = "Own";
    }
});

// Buy-Library-cards---------------------------------------------------

const buyCNInput = document.querySelector("#bank-card-number");
const mounthInput = document.querySelector("#mounth");
const yearInput = document.querySelector("#year");
const cvcInput = document.querySelector("#cvc");
const cardholderNameInput = document.querySelector("#cardholder-name");
const postalCodeInput = document.querySelector("#postal-code");
const cityInput = document.querySelector("#city-town");

const fullNameCard = document.querySelector(".name-digital-card");
const cardNumberCard = document.querySelector(".card-digital-card");

//Покупка подписки
buyCard.addEventListener("click", () => {
  const buyCN = buyCNInput.value.trim();
  const mounth = mounthInput.value.trim();
  const year = yearInput.value.trim();
  const cvc = cvcInput.value.trim();
  const cardholderName = cardholderNameInput.value.trim();
  const postalCode = postalCodeInput.value.trim();
  const city = cityInput.value.trim();

// Проверяем правильность заполнения всех полей формы
   if (
     buyCN.length !== 16 ||
     mounth.length !== 2 ||
     year.length !== 2 ||
     cvc.length !== 3 ||
     !cardholderName ||
     !postalCode ||
     !city
  ) {
      alert("Fill in all the fields correctly! The bank card number must have 16 digits. The expiration code must have 4 digits. The CVC must have 3 digits."); // Выводим сообщение об ошибке
      } else {
      alert("Thanks for the purchase!"); // Выводим сообщение об успешной покупке
      buyCardModal.classList.toggle("non-visible-4");

// Устанавливаем флаг подписки текущего пользователя в "true"
      currentUser.subscription = true;

// Находим индекс текущего пользователя в массиве данных пользователей
      const userIndex = userDataArray.findIndex(
      (someUser) => someUser.email === currentUser.email
     );
       if (userIndex !== -1) {
       userDataArray[userIndex] = currentUser;
       localStorage.setItem("userData", JSON.stringify(userDataArray));
        }
     }
 });

// Visits-count, books-count---------------------------------------------------

const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
const firstNameInit = currentUser.firstName[0];
const lastNameInit = currentUser.lastName[0];
const currentVisits = currentUser.visitsCount;
const currentBooks = currentUser.booksCount;

loginUser.textContent = `${firstNameInit}${lastNameInit}`.toUpperCase();
userIcon.textContent = `${firstNameInit}${lastNameInit}`.toUpperCase();

visitsCount.forEach((visitsCount) => {
   visitsCount.textContent = `${currentVisits}`; // Количество посещений
});

booksCount.forEach((booksCount) => {
   booksCount.textContent = `${currentBooks}`; // Количество купленных книг
});

//Interface----------------------------------------------------------------------

fullNameCard.textContent = `${fullName}`; // Полное имя пользователя в модальном окне
cardNumberCard.textContent = `${currentUser.cardNumber}`; // Номер карты в модальном окне
cardNumber.textContent = currentUser.cardNumber; // Номер карты в верхнем меню
userName.textContent = fullName; // Имя пользователя в верхнем меню
loginUser.setAttribute("title", fullName); // Всплывающая подсказка с именем пользователя
loginUser.style.display = "block";
user.classList.add("non-display-icon");

 // Добавляем класс "registered" ко всем кнопкам Buy
    buyButtons.forEach((button) => {
      button.classList.add("registered");
    });

registerMenu.classList.add("registered"); // Добавляем класс "registered" к меню регистрации
registerMenu.classList.add("non-display-menu");
profileMenu.classList.remove("non-display-menu");

  // Обновляем номер профиля, если он есть на странице
    const numberProfileElement = document.querySelector(".profile-num");
        if (numberProfileElement) {
          numberProfileElement.textContent = `${currentUser.cardNumber}`;
        }
      }
    }
  }
});

// Copy-card----------------------------------------------------
const cardNumberElement = document.querySelector(".card-number");
const cardCopyButton = document.querySelector(".card-copy-button");

cardCopyButton.addEventListener('click', () => {
  const cardNumber = cardNumberElement.textContent.trim();

  navigator.clipboard.writeText(cardNumber)
    .then(() => {
      alert('The card number has been copied to the clipboard');
    })
    .catch((error) => {
      console.error('Unable to copy to clipboard:', error);
    });
});

//My-profile-------------------------------------------------

const closeProfile = document.querySelector(".close-profile");
const myProfile = document.querySelector(".pop-up-3");
const buttonMyProfile = document.querySelector(".my-profile-btn");

closeProfile.addEventListener("click", () => {
  myProfile.classList.toggle("non-visible-3");
});

buttonMyProfile.addEventListener("click", () => {
  myProfile.classList.toggle("non-visible-3");
  profileMenu.classList.toggle("login-menu-open");
});

myProfile.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up-3")) {
    myProfile.classList.toggle("non-visible-3");
    clearData();
  }
});

//Card-profile--------------------------------------------------

const cardProfile = document.querySelector(".card-profile-button");
const closeBuy = document.querySelector(".close-buy");

cardProfile.addEventListener("click", () => {
  myProfile.classList.toggle("non-visible-3");
});

closeBuy.addEventListener("click", () => {
  console.log("закрываюсь");
  buyCardModal.classList.toggle("non-visible-4");
});

buyCardModal.addEventListener("click", (event) => {
  if (event.target.classList.contains("pop-up-4")) {
    buyCardModal.classList.toggle("non-visible-4");
  }
});

// Update-profile-----------------------------------------------------

const updateCardData = (someUser) => {
  fullNameCard.textContent = `${someUser.firstName} ${someUser.lastName}`;
  cardNumberCard.textContent = someUser.cardNumber;
  visitsCount.textContent = someUser.visitsCount;
  booksCount.textContent = someUser.booksCount;
  visitsCount.forEach((visitsCount) => {
    visitsCount.textContent = `${someUser.visitsCount}`;
  });
  booksCount.forEach((booksCount) => {
    booksCount.textContent = `${someUser.booksCount}`;
  });
};

//Check-card-----------------------------------------------------

// const cardForm = document.querySelector('.card-form');
const checkCard = document.querySelector(".find-button");
const checkCardLogin = document.querySelector(".check-count-container");

const name = document.querySelector("#name");
const number = document.querySelector("#card");
const fullNameCard = document.querySelector(".name-digital-card");
const cardNumberCard = document.querySelector(".card-digital-card");

// Очистка данных в форме
const clearCardData = () => {
  name.value = "";
  number.value = "";
};

checkCard.addEventListener("click", () => {
  console.log("закрываюсь");
  const storedUserData = localStorage.getItem("userData");
  const enteredFullName = name.value.trim();
  const enteredNumber = number.value.trim();

  if (storedUserData) {
    const userDataArray = JSON.parse(storedUserData);
    const existUser = userDataArray.find(
      (someUser) =>
        someUser.firstName + ' ' + someUser.lastName === enteredFullName &&
        someUser.cardNumber === enteredNumber
    );

    if (existUser) {
      console.log('myau');
      checkCard.classList.add("non-display-card");
      checkCardLogin.classList.remove("none-display-check");

      setTimeout(() => {
        checkCardLogin.classList.add("none-display-check");
        checkCard.classList.remove("non-display-card");
        clearCardData();
      }, 10000);

      updateCardData(existUser); // Обновляем данные в карточке профиля
    }
  }
});

