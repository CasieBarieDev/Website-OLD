window.onload = function () {
    const includes = $('[data-include]')
    $.each(includes, function () {
        const file = $(this).data('include') + '.html'
        $(this).load(file)
    })
};

$(document).ready(function() {
    const donateBTN = $('.donate-button')
    $.each(donateBTN, function () {
        $(this).html('\t<form action="https://www.paypal.com/donate" method="post" target="print_popup" onsubmit="window.open(\'about:blank\',\'print_popup\',\'width=500,height=500\')">\n' +
            '\t\t<input type="hidden" name="hosted_button_id" value="PGLMKJEJRL6XN" />\n' +
            '\t\t<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />\n' +
            '\t\t<img alt="" border="0" src="https://www.paypal.com/en_NL/i/scr/pixel.gif" width="1" height="1" />\n' +
            '\t</form>');
    })
})

$(document).scroll(function() {
    const scroll = $(window).scrollTop();
    $("#scroll").css("background-position", "50%" + (scroll / 30) + "vh");
});

function changeOpacity(element, cssname, varcolor, opacity) {
    const current_color = getComputedStyle(document.documentElement).getPropertyValue(varcolor);
    const match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[.\d+]*)*\)/g.exec(current_color);
    element.css(cssname, "rgba(" + [match[1],match[2],match[3],opacity].join(',') +")");
}