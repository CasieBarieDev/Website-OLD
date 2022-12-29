//Change the opacity of an element
function changeOpacity(element, cssname, varcolor, opacity) {
    const current_color = getComputedStyle(document.documentElement).getPropertyValue(varcolor);
    const match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[.\d+]*)*\)/g.exec(current_color);
    element.css(cssname, "rgba(" + [match[1],match[2],match[3],opacity].join(',') +")");
    return false;
}

//Smooth transition
window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = "0"
    setTimeout(function() {
        window.location.href = href
    }, 500)
}

window.onunload = function(){};
window.addEventListener('popstate', function () {loaded();});
if (document.readyState !== 'loading') {loaded();
} else {document.addEventListener('DOMContentLoaded', function () {loaded();});}
function loaded() {
    //Smooth transition 2 and scroll
    const includes = $('[data-include]')
    $.each(includes, function () {
        const file = $(this).data('include') + '.html'
        $(this).load(file)
    })

    $('body').css("opacity", 1);

    $(document).scroll(function() {
        const scroll = $(window).scrollTop();
        $("#scroll").css("background-position", "50%" + (scroll / 30) + "vh");
    }); copy();
}

function copy() {
    const code = $('co-py')
    $.each(code, function () {
        const text = $(this).clone().children().remove().end().text();
        $(this).html(text + "<span class=\"tooltiptext\" class=\"myTooltip\">𝘾𝙤𝙥𝙮 𝙏𝙤 𝘾𝙡𝙞𝙥𝙗𝙤𝙖𝙧𝙙</span>");
        $(this).click(function () {
            navigator.clipboard.writeText(text).then(r => {});
            $(this).find('span').text("𝘾𝙤𝙥𝙞𝙚𝙙")
        })
        $(this).mouseout(function () {
            $(this).find('span').text("𝘾𝙤𝙥𝙮 𝙏𝙤 𝘾𝙡𝙞𝙥𝙗𝙤𝙖𝙧𝙙")
        })
    })
}