import { FormValidator } from "./FormValidator.js";

const menu = document.querySelector('.menu');
const buttonMenu = menu.querySelector('.menu__burger');
const menuLinks = menu.querySelector('.menu__links');
const menuLink = menu.querySelectorAll('.menu__link');
const formSubmitButton = document.querySelector('.wedding-wish-guests__form-submit-button');
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
formValidators['wedding-form'].resetValidation();

const URL_APP = 'https://script.google.com/macros/s/AKfycbw9nHrFRNalNPp-3_-IHz87loGFYxqXDCj2Pk_HZ9-26HKuAcEag0kepZmbedKLrisf/exec';

const form = document.querySelector('#form');

form.action = URL_APP;

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const name = document.querySelector('.wedding-wish-guests__text_input_name');
  const holly = document.querySelector('.wedding-wish-guests__text_input_holly');
  const car = document.querySelector('.wedding-wish-guests__text_input_car');
  const eat = document.querySelector('.wedding-wish-guests__text_input_eat');
  const comment = document.querySelector('.wedding-wish-guests__text_input_comment');

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

  const result = await fetch(URL_APP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    cors: 'no-cors',
    body: formBody,
  })
    .then((res) => res.json());
  
  if (result.type === 'success') {
    name.value = '';
    holly.value = '';
    car.value = '';
    eat.value = '';
    comment.value = '';
    alert('chek');
  }
})