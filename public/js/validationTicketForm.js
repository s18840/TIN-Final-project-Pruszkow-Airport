function validateForm() {

    const Klient_idInput = document.getElementById('Klient_id');
    const plane_id = document.getElementById('plane_id');
    const sittingPlaceInput = document.getElementById('sittingPlace');
    const baggageNumberInput = document.getElementById('baggageNumber');

    const errorKlient_id = document.getElementById('errorKlient_id');
    const errorplane_id = document.getElementById('errorplane_id');
    const errorSittingPlace = document.getElementById('errorSittingPlace');
    const errorBaggageNumber = document.getElementById('errorBaggageNumber');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([Klient_idInput, plane_id, sittingPlaceInput, baggageNumberInput], [errorKlient_id, errorplane_id, errorSittingPlace, errorBaggageNumber], errorsSummary);

    let valid = true;

    if (!checkRequired(Klient_idInput.value) || Klient_idInput.value != "--Wybierz klienta--") {
        valid = false;
        Klient_idInput.classList.add("error-input");
        errorKlient_id.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(plane_id.value) || plane_id.value != "--Wybierz lot--") {
        valid = false;
        plane_id.classList.add("error-input");
        errorplane_id.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(sittingPlaceInput.value)) {
        valid = false;
        sittingPlaceInput.classList.add("error-input");
        errorSittingPlace.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(baggageNumberInput.value)) {
        valid = false;
        baggageNumberInput.classList.add("error-input");
        errorBaggageNumber.innerText = "Pole jest wymagane";
    } else if (!checkNumber(baggageNumberInput.value)) {
        valid = false;
        baggageNumberInput.classList.add("error-input");
        errorBaggageNumber.innerText = "Pole powinno być liczbą";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;


}