function doCollapse() {
    var WW=$(window).width();
    if(WW<=767){
        $('.collapse').css('display','none');
        $('.navbar-toggler').removeClass('navbar-toggler--close');
    }else{
        $('.collapse').css('display','block');
        $('.navbar-toggler').removeClass('navbar-toggler--close');
    }
}
$('.navbar-toggler').click(function(){
    $(this).toggleClass('navbar-toggler--close');
    if($(this).hasClass('navbar-toggler--close')) {
        $('.collapse').slideDown(250);    
    } else {
        $('.collapse').slideUp(250);
    }
    //$('header').toggleClass('darken');
});

function ImgBG() {
    var WW = $(window).width();
    var MyAtr = 'data-img'
    if (WW <= 650) {
        $('*').each(function() {
            var attr = $(this).attr(MyAtr + '-small');
            if (typeof attr !== typeof undefined && attr !== false) {
                var OxImg = $(this).attr(MyAtr + '-small');
                $(this).css('background-image', 'url(' + OxImg + ')' );
            } else {
                var attr = $(this).attr(MyAtr);
                if (typeof attr !== typeof undefined && attr !== false) {
                    var OxImg = $(this).attr(MyAtr);
                    $(this).css('background-image', 'url(' + OxImg + ')' );
                }    
            }
        });
    } else {
        $('*').each(function() {
            var attr = $(this).attr(MyAtr);
            if (typeof attr !== typeof undefined && attr !== false) {
                var OxImg = $(this).attr(MyAtr);
                $(this).css('background-image', 'url(' + OxImg + ')' );
            }
        });
    }
}


$("a.scrollto").click(function () {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
    return false;
});



$(function() {
    ImgBG();
    doCollapse();
    /* Форм контролу делаю красоту */
    $('.form-control').each(function() {
        var MyPh = $(this).attr('placeholder');
        $(this).on('focus', function() {
            $(this).attr('placeholder', '');
            $(this).removeClass('wpcf7-not-valid');
        });
        $(this).on('blur', function() {
            $(this).attr('placeholder', MyPh);
        });
    });
    /*
    $('.folio__slider').owlCarousel({
        items: 1,
        loop: false,
        dots: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 750,
        nav: true,
        navText: ['<i class="fal fa-angle-left" aria-hidden="true"></i>','<i class="fal fa-angle-right" aria-hidden="true"></i>'],
    });
    */
    var WW=$(window).width();
    $(window).resize(function(){
        var WR=$(window).width();
        if (WW != WR) {
            doCollapse();
            ImgBG();
        }
    });
});

$('.open-form').click(function(e) {
    e.preventDefault();
    var Target = $(this).attr('data-modal');
    $('body').addClass('ovfh');
    if (Target) {
        $('.modal[data-modal="'+Target+'"]').fadeIn(250);
    } else {
        $('.modal').fadeIn(250);
    }    
});
$('.close').click(function() {
    $('.modal').fadeOut(250);
    $('body').removeClass('ovfh');
});
$('.modal').click(function(e) {
    $('.modal').fadeOut(250);
    $('body').removeClass('ovfh');
});
$('.modal-container').click(function(e) {
    e.stopImmediatePropagation();
});