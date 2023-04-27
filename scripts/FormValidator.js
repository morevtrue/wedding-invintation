export class FormValidator {
  constructor(objectSettingsValidation, elementFormValidation) {
    this._objectSettingsValidation = objectSettingsValidation;
    this._elementFormValidation = elementFormValidation;
  }

  _hasInvalidInput() {
    const inputArray = Array.from(this._inputList);
    return inputArray.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._objectSettingsValidation.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._objectSettingsValidation.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._objectSettingsValidation.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._objectSettingsValidation.errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._objectSettingsValidation.inputErrorClass);

    this._errorElementList = this._elementFormValidation.querySelectorAll(`.${inputElement.id}-error`);
    
    this._errorElementList.forEach(errorElement => {
      if (errorElement) {
        errorElement.classList.remove(this._objectSettingsValidation.errorClass);
        errorElement.textContent = '';
      }
    })
  }

  _checkInputValidity(inputElement) {
    this._errorElement = this._elementFormValidation.querySelector(`.${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._elementFormValidation.querySelectorAll(this._objectSettingsValidation.inputSelector));
    this._buttonElement = this._elementFormValidation.querySelector(this._objectSettingsValidation.submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}