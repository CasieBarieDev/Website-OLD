$(document).ready(function() {
    //Mobile Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-open');
    })

    //Darkmode Switch
    let darkSwitches = $('.theme-switch input[type="checkbox"]');
    let darkIcons = $('.theme-switch-icon');
    darkSwitches.change(function (e) {
        if(e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            changeDarkIcon(true);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            changeDarkIcon(false)
        }
    })
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {darkSwitches.prop('checked', true); changeDarkIcon(true)}
    }
    function changeDarkIcon(isChecked) {
        if(isChecked) {
            darkIcons.removeClass("fa-solid fa-moon theme-switch-icon");
            darkIcons.addClass("fa-solid fa-sun theme-switch-icon");
        } else {
            darkIcons.removeClass("fa-solid fa-sun theme-switch-icon");
            darkIcons.addClass("fa-solid fa-moon theme-switch-icon");
        }
    }

    $(window).resize(function() {
        $('.menu-item').hover(function() {
            const $thisnav = $('.current').offset().left;
            let $left = $(this).offset().left - $thisnav;
            let $width = $(this).outerWidth();
            $('.wee').css({ 'left': $left , 'width': $width });
        }, function() {
            const $initwidth = $('.current').width();
            $('.wee').css({'left': '0', 'width': $initwidth });
        });
    }).resize()

    //Current Page Highlight
    const body = $('[data-currentnav]');
    $.each(body, function () {
        const toHighlightName = $(this).data('currentnav');
        $.each($('.menu-item, .mobile-item'), function () {
            if(this.innerHTML === toHighlightName) {
                this.className += ' current';
                if(this.className === "menu-item current") {
                    this.innerHTML += '<div class="wee"></div>'
                }
            }
        })
    })
});