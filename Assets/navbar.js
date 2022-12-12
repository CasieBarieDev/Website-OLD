$(document).ready(function() {
    //Mobile Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-open');
    })

    //Transparant On Scroll
    $(window).scroll(function () {scrolled();})
    function scrolled() {
        const nav = $('nav');
        if($(window).scrollTop() > 50) {
            changeOpacity(nav, 'color', '--nav-bg-color', .7);
            changeOpacity(nav, 'background-color', '--nav-bg-color', .7);
        } else {
            changeOpacity(nav, 'color', '--nav-bg-color', 1);
            changeOpacity(nav, 'background-color', '--nav-bg-color', 1);
        }
    }

    //Moving Highlight Line
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