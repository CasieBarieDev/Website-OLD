window.onload = function () {
    //Import other .HTML and .JS files
    let elements = document.getElementsByTagName('*'), i;
    for (i in elements) {
        if (elements[i].hasAttribute && elements[i].hasAttribute('data-include')) {
            fragment(elements[i], elements[i].getAttribute('data-include') + ".html");
        }
    }
    function fragment(el, url) {
        let localTest = /^file:/, xmlhttp = new XMLHttpRequest(), status = 0;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {status = xmlhttp.status;}
            if (localTest.test(location.href) && xmlhttp.responseText) {status = 200;}
            if (xmlhttp.readyState === 4 && status === 200) {
                el.innerHTML = xmlhttp.responseText;
                if(el.getAttribute('data-js') === "true") {
                    let script = document.createElement("script");
                    script.src = el.getAttribute('data-include') + ".js";
                    document.body.appendChild(script);
                }
            }
        }; try {
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        } catch(err) {console.log(err.stack)}
    }
};

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

//Smooth transition 2 and scroll
if (document.readyState !== 'loading') {loaded();
} else {document.addEventListener('DOMContentLoaded', function () {loaded();});}
function loaded() {
    $('body').css("opacity", 1);
    $(document).scroll(function() {
        const scroll = $(window).scrollTop();
        $("#scroll").css("background-position", "50%" + (scroll / 30) + "vh");
    });
}