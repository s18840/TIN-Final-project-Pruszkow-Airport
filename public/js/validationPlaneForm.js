function validateForm() {
    const nameInput = document.getElementById('name');
    const planeNumberInput = document.getElementById('planeNumber');
    const destinatnionInput = document.getElementById('destination');
    const dateInput = document.getElementById('date');

    const errorName = document.getElementById('errorName');
    const errorPlaneNumber = document.getElementById('errorPlaneNumber');
    const errorDestinatnion = document.getElementById('errorDestination');
    const errorDate = document.getElementById('errorDate');
    const errorsSummary = document.getElementById('errorsSummary');

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    resetErrors([nameInput, planeNumberInput, destinatnionInput, dateInput], [errorName, errorPlaneNumber, errorDestinatnion, errorDate], errorsSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 20)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if (!checkRequired(planeNumberInput.value)) {
        valid = false;
        planeNumberInput.classList.add("error-input");
        errorPlaneNumber.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(planeNumberInput.value, 2, 9)) {
        valid = false;
        planeNumberInput.classList.add("error-input");
        errorPlaneNumber.innerText = "Pole powinno zawierać od 2 do 9 znaków";
    }

    if (!checkRequired(destinatnionInput.value)) {
        valid = false;
        destinatnionInput.classList.add("error-input");
        errorDestinatnion.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(destinatnionInput.value, 2, 60)) {
        valid = false;
        destinatnionInput.classList.add("error-input");
        errorDestinatnion.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfBefore(nowString, dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Data nie może być z przeszłości";
    }
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}