if (document.readyState !== 'loading') {loaded();
} else {document.addEventListener('DOMContentLoaded', function () {loaded();});}
function loaded() {
    $('[data-include]').each(function() {
        const file = $(this).data('include') + '.html';
        $(this).load(file);
    });

    $('#down-button').on("click", function() {
        $('#scrollto')[0].scrollIntoView({
            behavior: 'smooth'
        });
    });

    $(window).scroll(function () {
        const downbutton = $('#down-button');
        if($(window).scrollTop() >= 10){
            downbutton.css('opacity', '0');
        } else {
            downbutton.css('opacity', '1');
        }
    })

    copy();
    for(let i = 0; i < 10; i++) {$('#circles').append('<li></li>');}

    $('.modal-image').each(function() {
        const $image = $(this);
        const $modal = $image.next('.modal');
        const $modalImg = $modal.find('.modal-content');
        const $caption = $modal.find('.modal-caption');
        $modalImg.attr('src', $image.attr('src'));
        $caption.text($image.attr('alt'));
        $image.on('click', function() {
            $modal.show();
            toggle();
        });
        $modal.on('click', function() {
            $modal.hide();
            toggle();
        });
    });
}

function copy() {
    $('.copy').each(function() {
        const $this = $(this);
        const text = $this.clone().children().remove().end().text();
        $this.attr("title", "Copy").css("cursor", "pointer").click(function() {
            navigator.clipboard.writeText(text).then(() => {});
            $this.css("cursor", "auto");
        }).mouseout(function() {
            $this.css("cursor", "pointer");
        });
    });
}