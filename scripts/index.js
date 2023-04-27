import { FormValidator } from "./FormValidator.js";

const menu = document.querySelector('.menu');
const buttonMenu = menu.querySelector('.menu__burger');
const menuLinks = menu.querySelector('.menu__links');
const menuLink = menu.querySelectorAll('.menu__link');
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

