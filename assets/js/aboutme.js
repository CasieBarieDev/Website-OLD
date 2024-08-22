if (document.readyState !== 'loading') {aboutme();
} else {document.addEventListener('DOMContentLoaded', function () {aboutme();});}
function aboutme() {

    const $inputs = $("input[name=Discord], input[name='Email']");
    const $submitBtn = $('#submit-btn');
    const $allInputs = $('.form input, .form textarea, .form select');

    function checkForm() {
        let canSubmit = true;
        $allInputs.each(function () {
            if (!this.checkValidity() && this.required) {
                canSubmit = false;
                return false;
            }
        });
        $submitBtn.toggleClass('enabled', canSubmit);
    }

    function validateInput() {
        if (this.value.trim() !== '') {$(this).toggleClass('valid', this.checkValidity()).toggleClass('invalid', !this.checkValidity());
        } else {$(this).removeClass('valid invalid');}
        $(this).next('.count').text(this.value.length + '/' + this.maxLength);
        checkForm();
    }

    $inputs.on('input', function () {
        $inputs.not(this).prop('required', !$(this).val().length);
        validateInput.call(this);
    });

    $allInputs.on('input', validateInput);

    $submitBtn.on('click', function () {
        if ($submitBtn.hasClass('enabled')) {
            $('form')[0].submit();
        } else {
            $submitBtn.css('animation', 'shake .2s');
            if (navigator.vibrate) navigator.vibrate(300);
            setTimeout(() => $submitBtn.css('animation', ''), 500);
        }
    });

    window.onbeforeunload = function () {
        $('form')[0].reset();
        $allInputs.each(function() {validateInput.call(this);});
        checkForm();
    };

    $allInputs.each(function() {validateInput.call(this);});

    //Show current age.
    document.getElementById('age').innerText = "" + calcAge();
    function calcAge() {
        const ageDifMs = Date.now() - new Date('06/08/2004').getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}