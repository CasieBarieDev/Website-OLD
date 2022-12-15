//Requirement switch for Email and Discord
jQuery(function ($) {
    const $inputs = $("input[name=Discord],input[name='Email']");
    $inputs.on('input', function () {
        $inputs.not(this).prop('required', !$(this).val().length || !(this).checkValidity());
        checkForm();
    });
});

//Check if text is valid
const allForm = document.querySelectorAll('.form input, .form textarea, .form select');
for(let form of allForm) {
    form.addEventListener('input', function () {
       if(this.checkValidity()) {
           this.classList.add('valid');
           this.classList.remove('invalid');
       } else {
           this.classList.add('invalid');
           this.classList.remove('valid');
       } if(this.value === '') {
           this.classList.remove('valid');
           this.classList.remove('invalid');
       } checkForm();
    });
}

//Check if everthing is filled in
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
} window.onbeforeunload = () => {for(const form of document.getElementsByTagName('form')) {form.reset();}}

//Show current age.
document.getElementById('age').innerText = "" + calcAge();
function calcAge() {
    const ageDifMs = Date.now() - new Date('06/08/2004').getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}