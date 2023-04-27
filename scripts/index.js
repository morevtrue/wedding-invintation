import { FormValidator } from "./FormValidator.js";

const menu = document.querySelector('.menu');
const buttonMenu = menu.querySelector('.menu__burger');
const menuLinks = menu.querySelector('.menu__links');
const menuLink = menu.querySelectorAll('.menu__link');
const formTitle = document.querySelector('.wedding-wish-guests__title');
const formSubtitle = document.querySelector('.wedding-wish-guests__subtitle');
const messageHappy = document.querySelector('.wedding-wish-guests__happy');
const settingsValidation = {
  formSelector: '.wedding-wish-guests__form',
  inputSelector: '.wedding-wish-guests__form-input',
  submitButtonSelector: '.wedding-wish-guests__form-submit-button',
  inactiveButtonClass: 'wedding-wish-guests__form-submit-button_inactive',
  inputErrorClass: 'wedding-wish-guests__text_type_error',
  errorClass: 'wedding-wish-guests__form-error_active',
};

// ПЕРЕКЛЮЧЕНИЕ МЕНЮ--------------------------------
buttonMenu.addEventListener('click', () => {
  switchMenu();
});

menuLink.forEach(link => {
  link.addEventListener('click', () => {
    switchMenu();
  })
});

const switchMenu = () => {
  menuLinks.classList.toggle('menu__links_opened');
  buttonMenu.classList.toggle('menu__burger_arrow_top');
  menu.classList.toggle('menu_theme_opacity');
};

// ВАЛИДАЦИЯ----------------------------------------
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
};

enableValidation(settingsValidation);

const URL_APP = "https://script.google.com/macros/s/AKfycbzG3Tw5iULLXqZJCgwvvM-LrOuNAPh3omqKFFSKR8mxkeqbh26VC9pWdzGeD15aEO7E/exec";

const form = document.querySelector('#wedding-form');

form.action = URL_APP;

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const name = document.querySelector('[name=name]');
  const holly = document.querySelector('[name=holly]');
  const car = document.querySelector('[name=car]');
  const eat = document.querySelector('[name=eat]');
  const comment = document.querySelector('[name=comment]');

  let details = {
    name: name.value.trim(),
    holly: holly.value.trim(),
    car: car.value.trim(),
    eat: eat.value.trim(),
    comment: comment.value.trim(),
  }

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  formBody = formBody.join('&');

  await fetch(URL_APP, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    mode: "no-cors",
    body: formBody,
  }).then((response) => response.json)

    name.value = '';
    holly.value = '';
    car.value = '';
    eat.value = '';
    comment.value = '';

    formTitle.style.opacity = '0';
    formSubtitle.style.opacity = '0';
    form.style.opacity = '0';
    messageHappy.style.visibility = 'visible';
})