$(document).ready(function() {
    //Tooltip widget
    $('#appleBtn').tooltip();
    $('#googlePlayBtn').tooltip();

    //Plugin for images
    $("img").each(function(){
        if (!this.complete) {
            $(this).bind("load", function () {
                $(this).css('opacity', '1');
            });
        } else {
            $(this).css('opacity', '1');
        }
    });

    //How it works title slide up fade
    $('#slide-up-animation').hide();
    $('#slide-up-animation').slideToggle("slow");

    //Page would refresh everytime you hit submit so I took it off
    $("#form-fields").submit(function(form) {
        form.preventDefault();
    });
});

//Functions
function contact(form) {
    const firstName = this.$('#firstName').val();
    const lastName = this.$('#lastName').val();
    const email = this.$('#emailAddress').val();
    const message = this.$('#messageField').val();

    $("#submit-btn").html("Sending...");

    uploadData(`${firstName} ${lastName}`, email, message);
}

function uploadData(name, email, message) {
    var param = {name: name, email: email, message: message};
    
    //Ajax post to firebase
    $.post('https://gimmi-website-default-rtdb.firebaseio.com/inquiries.json',JSON.stringify(param),function () {

        //Ajax get to a joke api to lighten up as a thanks 
        $.get('https://sv443.net/jokeapi/v2/joke/Programming?type=twopart?blacklistFlags=nsfw,racist,sexist', function(data){
            var setup = data["setup"];
            var delivery = data["delivery"];

            if (setup == null || delivery == null) {
                $('#joke-setup').text(`${data["joke"]}`);
            } else {
                $('#joke-setup').text(`${setup}`);
                $('#joke-delivery').text(`${delivery}`);
            }
            
            $('#myModal').modal('show'); 

            resetForm();
        });
    });
}

function resetForm() {
    $(':input','#form-fields')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .prop('checked', false)
    .prop('selected', false);

    $("#submit-btn").html("Submit");
}
