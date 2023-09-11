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
 const loginButton = document.querySelector('.login-button');
 const loginCardBtn = document.querySelector('.login-card-btn')
 const registerLogin = document.querySelector('.register')
 const loginRegister = document.querySelector('.login');
 const closeModal = document.querySelector('.modal-close');
 const loginBtn = document.querySelector('.log-in-btn');
 const libraryCard = document.querySelector('.cards-container');
 const libraryCardLogin = document.querySelector('.cards-container-login');
 const buyCardModal = document.querySelector('.pop-up-4');
 const buyCard = document.querySelector('.buy-book-button');

 const clearLoginData = () => {
  emailLoginInput.value = '';
  passwordLoginInput.value = '';
 }

 loginButton.addEventListener('click', () => {
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

 let currentUser = null;

loginBtn.addEventListener('click', () => {
  const email = emailLoginInput.value.trim();
  const password = passwordLoginInput.value;

  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    const userDataArray = JSON.parse(storedUserData);
    const someUser = userDataArray.find(someUser => someUser.email === email && someUser.password === password);

    if (someUser) {
     alert('Congratulations! You are successfully logged in!');
     someUser.visitsCount += 1;
     loginModal.classList.toggle('non-visible-2');
     clearLoginData();
     buyButtons.forEach((button) => {
       button.classList.add('registered')
     })
     registerMenu.classList.add('non-display-menu')
     profileMenu.classList.remove('non-display-menu')
     const fullName = `${someUser.firstName} ${someUser.lastName}`;

     const firstNameInit = someUser.firstName[0];
     const lastNameInit = someUser.lastName[0];

     loginUser.textContent = `${firstNameInit}${lastNameInit}`.toUpperCase();
     userIcon.textContent = `${firstNameInit}${lastNameInit}`.toUpperCase();
     userName.textContent = fullName;
     cardNumber.textContent = someUser.cardNumber
     visitsCount.textContent = `${someUser.visitsCount}`;
     booksCount.textContent = `${someUser.booksCount}`;
     userIcon.setAttribute('title', fullName);
     userIcon.style.display = 'block';
     userIcon.style.font
     user.classList.add('none-display-icon')
     currentUser = someUser;
     localStorage.setItem('isLoggedIn', 'true');
     localStorage.setItem('loggedInEmail', email);
     const profileNumber = document.querySelector('.profile-num');
     localStorage.setItem('userData', JSON.stringify(userDataArray));
     location.reload();
     if (profileNumber) {
      profileNumber.textContent = `${currentUser.cardNumber}`;
     }
    } else {
      alert('Invalid password or email.');
    }
  } else {
    alert('The user was not found. Please register.');
  }
});

const logOut = document.querySelector('.logout-button')

logOut.addEventListener('click', () => {
  localStorage.setItem('isLoggedIn', 'false');
  location.reload();
})

 buyButtons.forEach(function(button) {
   button.addEventListener("click", function() {
     if (button.textContent.includes("Buy") && !button.classList.contains('registered')) {
       loginModal.classList.toggle('non-visible-2');
       clearLoginData();
     }
   });
 });

 document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userDataArray = JSON.parse(storedUserData);
      const email = localStorage.getItem('loggedInEmail');
      const currentUser = userDataArray.find(someUser => someUser.email === email);

      if (currentUser) {
        libraryCard.classList.add('non-display-card');
        libraryCardLogin.classList.remove('non-display-card');
        buyButtons.forEach(function(button) {
          button.addEventListener("click", function() {
            if (currentUser && !currentUser.subscription && button.classList.contains('registered')) {
              buyCardModal.classList.toggle('non-visible-4');
            } else if(button.classList.contains('own-button')){

            } else {
              button.classList.add('own-button');
              button.textContent = 'Own';

              currentUser.booksCount += 1;

              const buttonId = button.dataset.id;

              if (!currentUser.buyButton.includes(buttonId)) {
                currentUser.buyButton.push(buttonId);
              }

              const bookItem = button.closest('.favorites-book');
              const bookTitle = bookItem.querySelector('.book-title').textContent;
              const bookAuthor = bookItem.querySelector('.book-author').textContent;

              currentUser.booksName.push({ title: bookTitle, author: bookAuthor });

              const userIndex = userDataArray.findIndex(someUser => someUser.email === currentUser.email);
              if (userIndex !== -1) {
                userDataArray[userIndex] = currentUser;
                localStorage.setItem('userData', JSON.stringify(userDataArray));
              }
              const li = document.createElement('li');
              li.textContent = `${bookTitle}, ${bookAuthor}`;
              li.classList.add('rented-item');
              document.querySelector('.rented-books nav').appendChild(li);
            }
          });
        });
        currentUser.booksName.forEach(book => {
          const li = document.createElement('li');
          li.textContent = `${book.title}, ${book.author}`;
          li.classList.add('rented-item');
          document.querySelector('.rented-books nav').appendChild(li);
        });
        buyButtons.forEach(function(button) {
          const buttonId = button.dataset.id;
          if (currentUser.buyButton.includes(buttonId)) {
            button.classList.add('own-button');
            button.textContent = 'Own';
          }
        });


        const buyCNInput = document.querySelector('#bank-card-number');
        const mounthInput = document.querySelector('#mounth');
        const yearInput = document.querySelector('#year');
        const cvcInput = document.querySelector('#cvc');
        const cardholderNameInput = document.querySelector('#cardholder-name');
        const postalCodeInput = document.querySelector('#postal-code');
        const cityInput = document.querySelector('#city-town');
       
        const fullNameDlC = document.querySelector('.name-digital-card');
        const cardNumberDLC = document.querySelector('.card-digital-card');

        buyCard.addEventListener('click', () => {
          const buyCN = buyCNInput.value.trim();
          const mounth = mounthInput.value.trim();
          const year = yearInput.value.trim();
          const cvc = cvcInput.value.trim();
          const cardholderName = cardholderNameInput.value.trim();
          const postalCode = postalCodeInput.value.trim();
          const city = cityInput.value.trim();

          if (buyCN.length !== 16 || mounth.length !== 2 || year.length !== 2 || cvc.length !== 3 || !cardholderName || !postalCode || !city) {
            alert('Fill in all the fields correctly!');
          } else {
            alert('Thanks for the purchase!');
            buyCardModal.classList.toggle('non-visible-4');
            currentUser.subscription = true;
            const userIndex = userDataArray.findIndex(someUser => someUser.email === currentUser.email);
            if (userIndex !== -1) {
              userDataArray[userIndex] = currentUser;
              localStorage.setItem('userData', JSON.stringify(userDataArray));
            }
          }
        });

        const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
        const firstNameInit = currentUser.firstName[0];
        const lastNameInit = currentUser.lastName[0];
        const visitsVBB = currentUser.visitsCount;
        const booksVBB = currentUser.booksCount;

       loginUser.textContent = `${firstNameInit}${lastNameInit}`.toUpperCase();
       userIcon.textContent = `${firstNameInit}${lastNameInit}`.toUpperCase();
        visitsCount.forEach(visitsCount => {
          visitsCount.textContent = `${visitsVBB}`;
        })
        booksCount.forEach(booksCount => {
          booksCount.textContent = `${booksVBB}`;
        })
        fullNameDlC.textContent = `${fullName}`
        cardNumberDLC.textContent = `${currentUser.cardNumber}`
        cardNumber.textContent = currentUser.cardNumber
        userName.textContent = fullName;
        loginUser.setAttribute('title', fullName);
        loginUser.style.display = 'block';
        user.classList.add('non-display-icon');
        buyButtons.forEach((button) => {
          button.classList.add('registered');
        });
        registerMenu.classList.add('registered');
        registerMenu.classList.add('non-display-menu');
        profileMenu.classList.remove('non-display-menu');

        const numberProfileElement = document.querySelector('.profile-num');
        if (numberProfileElement) {
          numberProfileElement.textContent = `${currentUser.cardNumber}`;
        }
      }
    }
  }
});

var cardCopyButtons = document.querySelectorAll(".card-copy");
  cardCopyButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      var cardNumberElement = this.parentNode.querySelector(".card-number");
      var cardNumber = cardNumberElement.textContent.trim();

      var tempElement = document.createElement("textarea");
      tempElement.value = cardNumber;
      document.body.appendChild(tempElement);

      tempElement.select();

      document.execCommand("copy");

      document.body.removeChild(tempElement);

    });
  });

  const closeProfile = document.querySelector('.close-profile');
  const myProfile = document.querySelector('.pop-up-3');
  const buttonMyProfile = document.querySelector('.my-profile-btn');

  closeProfile.addEventListener('click', () => {
    myProfile.classList.toggle('non-visible-3')
  })

  buttonMyProfile.addEventListener('click', () => {
    myProfile.classList.toggle('non-visible-3')
    profileMenu.classList.toggle('login-menu-open');
  })

  myProfile.addEventListener('click', (event) => {
    if (event.target.classList.contains('pop-up-3')) {
      myProfile.classList.toggle('non-visible-3');
      clearData();
    }
   });

   const DLCProfile = document.querySelector('.dlc-button');

   DLCProfile.addEventListener('click', () => {
    myProfile.classList.toggle('non-visible-3')
   })

const closeBuy = document.querySelector('.close-buy');

   closeBuy.addEventListener('click', () => {
    console.log('закрываюсь');
    buyCardModal.classList.toggle('non-visible-4')
  })

  buyCardModal.addEventListener('click', (event) => {
    if (event.target.classList.contains('pop-up-4')) {
      buyCardModal.classList.toggle('non-visible-4');
    }
   });
