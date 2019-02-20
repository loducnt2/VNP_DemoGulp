/*jQuery(document).ready(function($) {
    let currentpos=0;
    let length = parseInt($('.list li').css('height'))+parseInt($('.list li').css('margin-bottom'));
$('.next').click(function(event) {
    currentpos+=length;
    if (currentpos>=$('.list')[0].scrollHeight-4*72) {
        currentpos-=length;
        console.log('false')
    }else {
        $('.list').animate({
        scrollTop: currentpos
    }, 300);
    }
    
    // console.log($('.list')[0].scrollHeight);
    // console.log(currentpos);

});
$('.prev').click(function(event) {
    currentpos-=length;
   if (currentpos<0) {
        currentpos+=length;
        console.log('false')
    }else {
        $('.list').animate({
        scrollTop: currentpos
    }, 300);
    }
    // console.log($('.list')[0].scrollHeight);
    // console.log(currentpos);
});
});*/

$('.list li img').click(function(event) {
    // alert($(this).attr('target'));
    $('.img-content').attr('src',$(this).attr('target'));
    $(".img-content").attr("width", "100%");
    // $('.list li').removeClass('active');
    $(this).addClass('product-active');

});
$('.list li img').click(function(event) {
    
    $('.list li img').removeClass('product-active');
    $(this).addClass('product-active');

});


$('.product760-anh').click(function(event) {
    // alert($(this).attr('target'));
    $('.img760-content').attr('src',$(this).attr('target'));
    $(".img760-content").attr("width", "100%");
    // $('.list li').removeClass('active');
    $(this).addClass('product760-active');

});
$('.product760-anh').click(function(event) {
    
    $('.product760-anh').removeClass('product760-active');
    $(this).addClass('product760-active');

});


$('.product320-anh').click(function(event) {
    // alert($(this).attr('target'));
    $('.img320-content').attr('src',$(this).attr('target'));
    $(".img320-content").attr("width", "100%");
    // $('.list li').removeClass('active');
    $(this).addClass('product320-active');

});
$('.product320-anh').click(function(event) {
    
    $('.product320-anh').removeClass('product320-active');
    $(this).addClass('product320-active');

});