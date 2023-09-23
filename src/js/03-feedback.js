
import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const SI_FORM_STATE = 'feedback-form-state';
let formData = {};

formEl.addEventListener('input', throttle(handleFormInput, 500));
formEl.addEventListener('submit', handleFormSubmit);

function handleFormInput(event) {
    console.log(event.target);
    formData[event.target.name] = event.target.value;

    const jsonFormData = JSON.stringify(formData);
    localStorage.setItem(SI_FORM_STATE, jsonFormData);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const formElements = formEl.elements;
    const email = formElements.email.value;
    const message = formElements.message.value;

    if (!email || !message) return alert('All the fields should be filled');

    console.log(formData);

    localStorage.removeItem(SI_FORM_STATE);
    formData = {};
    event.currentTarget.reset();
}

function populateForm() {
    if (localStorage.getItem(SI_FORM_STATE)) {
        formData = JSON.parse(localStorage.getItem(SI_FORM_STATE));

        for (const key in formData) {
            if (formData[key]) {
                formEl.elements[key].value = formData[key];
            }
        }
    }
}

populateForm();