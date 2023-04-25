import { FormValidator } from "./FormValidator.js";

const settingsValidation = {
  formSelector: '.wedding-wish-guests__form',
  inputSelector: '.wedding-wish-guests__form-input',
  submitButtonSelector: '.wedding-wish-guests__form-submit-button',
  inactiveButtonClass: 'wedding-wish-guests__form-submit-button_inactive',
  inputErrorClass: 'wedding-wish-guests__text_type_error',
  errorClass: 'wedding-wish-guests__form-error_active',
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

