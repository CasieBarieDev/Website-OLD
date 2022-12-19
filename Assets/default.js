window.onload = function () {
    const includes = $('[data-include]')
    $.each(includes, function () {
        const file = $(this).data('include') + '.html'
        $(this).load(file)
    })
};

$(document).scroll(function() {
    const scroll = $(window).scrollTop();
    $("#scroll").css("background-position", "50%" + (scroll / 30) + "vh");
});

function changeOpacity(element, cssname, varcolor, opacity) {
    const current_color = getComputedStyle(document.documentElement).getPropertyValue(varcolor);
    const match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[.\d+]*)*\)/g.exec(current_color);
    element.css(cssname, "rgba(" + [match[1],match[2],match[3],opacity].join(',') +")");
    return false;
}

window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = "0"
    setTimeout(function() {
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function() {
    $('body').css("opacity", 1);
})