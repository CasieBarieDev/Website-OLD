if (document.readyState !== 'loading') {aboutme();
} else {document.addEventListener('DOMContentLoaded', function () {aboutme();});}
function aboutme() {
    checkForm();
    //Requirement switch for Email and Discord
    jQuery(function ($) {
        const $inputs = $("input[name=Discord],input[name='Email']");
        $inputs.on('input', function () {
            $inputs.not(this).prop('required', !$(this).val().length || !(this).checkValidity());
            checkForm();
        });
    });

    //Check if text is valid
    function validateForm() {
        const allForm = document.querySelectorAll('.form input, .form textarea, .form select');
        for (let form of allForm) {
            form.classList.remove('valid');
            form.addEventListener('input', function () {
                if (this.checkValidity()) {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                } else {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                }
                if (this.value === '') {
                    this.classList.remove('valid');
                    this.classList.remove('invalid');
                }
                checkForm();
            });
        }
    } validateForm();

    //Check if everthing is filled in
    function checkForm() {
        let canSubmit = true;
        const elements = document.forms[0].elements;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].type !== "select-btn") {
                if (elements[i].value === '' && elements[i].required) {
                    canSubmit = false;
                }
            }
        }
        if(canSubmit) {document.getElementById("submit-btn").classList.add("enabled");
        } else {document.getElementById("submit-btn").classList.remove("enabled");}
        return false;
    }

    //Submit and Shake
    const submitBTN = document.getElementById('submit-btn');
    submitBTN.addEventListener('click', function () {
        if(submitBTN.classList.contains("enabled")) {
            document.getElementsByTagName('form')[0].submit();
        } else {
            submitBTN.style.animation = "shake .2s";
            setTimeout(function () {submitBTN.style.animation = "";
            }, 500);
        }
    })

    //Reset form when submitted
    window.onbeforeunload = () => {
        for (const form of document.getElementsByTagName('form')) {form.reset();}
        validateForm();
        checkForm();
    }

    //Show current age.
    document.getElementById('age').innerText = "" + calcAge();
    function calcAge() {
        const ageDifMs = Date.now() - new Date('06/08/2004').getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}