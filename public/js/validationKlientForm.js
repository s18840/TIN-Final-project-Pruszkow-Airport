function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneNumberInput = document.getElementById('numerTelefonu');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([firstNameInput, lastNameInput, phoneNumberInput], [errorFirstName, errorLastName, errorPhoneNumber], errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(phoneNumberInput.value)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(phoneNumberInput.value, 9, 14)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole powinno zawierać od 9 do 14 znaków";
    } else if (!checkPhoneNumber(phoneNumberInput.value)) {
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole powinno zawierać prawidłowy numer telefonu np: ((48)(0048))506123567";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}