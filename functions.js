$(document).ready(function() {
    //Tooltip widget
    $('#appleBtn').tooltip();
    $('#googlePlayBtn').tooltip();

    //Plugin for images
    $('img').hide();
    $('img').each(function(i) {
        if (this.complete) {
            $(this).fadeIn();
        } else {
            $(this).load(function() {
                $(this).fadeIn();
            });
        }
    });

    //How it works title slide up fade
    $('#slide-up-animation').hide();
    $('#slide-up-animation').slideToggle("slow");
});