console.log('Выполненные пункты:\n1) Вёрстка соответствует макету - +26\n2) Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется - +12\nНа ширине экрана 768рх реализовано адаптивное меню - +12')

console.log('Сумма баллов - 50');

// Burger-menu----------------------------------------------------

const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav-menu');
const navItems = document.querySelector('.nav-link');
const body = document.body;


burger.addEventListener('click', () => {
    // body.classList.toggle('stop-scroll');
    burger?.classList.toggle('cross');
    nav?.classList.toggle('open');
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

// const windowWidth = window.innerWidth;
// const slider = document.querySelector('.slider');
// const leftSlide = document.querySelector('.left-slide');
// const rightSlide = document.querySelector('.right-slide');
// const buttons = document.querySelectorAll('.pagination-button');

const slider = document.querySelector('.slider');
const firstImage = slider.querySelectorAll('.image-about')[0];
const arrows = document.querySelectorAll('.carret');
// const leftSlide = document.querySelector('.left-slide');
// const rightSlide = document.querySelector('.right-slide');
const buttons = document.querySelectorAll('.pagination-button');

let firstImageWidth = firstImage.clientWidth + 25;
let twoImageWidth = firstImage.clientWidth + 200;

// leftSlide.addEventListener('click', prevSlide);
// rightSlide.addEventListener('click', nextSlide);


arrows.forEach(arrow => {
  arrow.addEventListener("click", () => {
    slider.scrollLeft += arrow.id === 'left' ? -firstImageWidth : firstImageWidth;
  });
});

buttons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.add('active');
    slider.scrollLeft += button.id === 'leftbtn' ? -firstImageWidth : firstImageWidth;
  });
});


// let position = 0;
// let i = 0;

// const nextSlide = () => {
//     if (position < (buttons.length - 1) * 475) {
//       position += 475;
//       i += 1;
//       leftSlide.classList.remove('pointer-events');
//     } else{
//       rightSlide.classList.add('pointer-events');
//     }
//     slider.style.left = -position + 'px';
//     currentSlide(i);
//   }

//   const previousSlide = () => {
//     if (position > 0) {
//       position -= 465
//       i -= 1
//       rightSlide.classList.remove('pointer-events')
//     } else{
//       leftSlide.classList.add('pointer-events')
//     }
//     slider.style.left = -position + 'px'
//    currentSlide(i)
//   }

//   const currentSlide = (index) => {
//     for (let button of buttons) {
//       button.classList.remove('active')
//     }
//     buttons[index].classList.add('active')
//   }

//   rightSlide.addEventListener('click', nextSlide);
//   leftSlide.addEventListener('click', previousSlide);


//   if (windowWidth < 1024){
//     buttons.forEach( (button, index) => {
//       button.addEventListener('click', () => {
//         position = 465 * index
//         slider.style.left = -position + 'px'
//         i = index
//         currentSlide(i)
//       })
//     })
//   } else if (windowWidth >= 1440) {
//       buttons.forEach( (button, index) => {
//         button.addEventListener('click', () => {
//           position = 475 * index
//           slider.style.left = -position + 'px'
//           i = index
//           currentSlide(i)
//         })
//       })
//   } else if (windowWidth >= 1024) {
//     buttons.forEach( (button, index) => {
//       button.addEventListener('click', () => {
//         position = 335 * index
//         slider.style.left = -position + 'px'
//         i = index
//         currentSlide(i)
//       })
//     })
//  }




// const dragging = (e) => {
//   slider.scrollLeft = e.pageX;
// }

// slider.addEventListener('mousemove', dragging);






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