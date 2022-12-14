jQuery(function ($) {
    const $inputs = $("input[name=Discord],input[name='Email Address']");
    $inputs.on('input', function () {
        $inputs.not(this).prop('required', !$(this).val().length || !(this).checkValidity());
    });
});

const allForm = document.querySelectorAll('.form input, .form textarea, .form select');
for(let form of allForm) {
    form.addEventListener('input', function () {
       if(this.checkValidity()) {
           this.classList.add('valid');
           this.classList.remove('invalid');
       } else {
           this.classList.add('invalid');
           this.classList.remove('valid');
       }
       if(this.value === '') {
           this.classList.remove('valid');
           this.classList.remove('invalid');
       }
    });
    form.addEventListener('keyup', checkForm);
    form.addEventListener('keydown', checkForm)
}

function checkForm() {
    let canSubmit = true;
    const elements = document.forms[0].elements;
    for(let i = 0; i < elements.length; i++) {
        if(elements[i].type !== "select-btn") {
            if (elements[i].value === '' && elements[i].required) {
                canSubmit = false;
            }
        }
    }
    document.getElementById("submit-btn").disabled = !canSubmit;
    return false;
}
window.onbeforeunload = () => {for(const form of document.getElementsByTagName('form')) {form.reset();}}