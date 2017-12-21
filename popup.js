$( document ).ready( function(){

var $color = (function() {
        var $color = null;
        $.ajax({
            'async': false,
            'global': false,
            'cache': false,
            'url': "js/color.json",
            'dataType': "json",
            'success': function (data) {
                $color = data;
            }
        });
        return $color;
    })();

    $("header").css("background", $color.mainColors.red.hex);

$.each($color.alternateNames, function(key, data) { 
    if(this == "A100"){$('.sideBar').append("<hr>")};
    $('.sideBar').append(
        '<div class="square">'
        + this + '</div>'
    );

});

    $.each($color.mainColors, function(key, data) {
    $('.mainColors').append(
        '<div class="color" data-clipboard-text="'+ color(this.hex) + '" style="background:'+ this.hex +'" data-hex="' + this.hex + '" id="'+ key +'">'
        + this.name + '</div>'
    );

    $('.variations').append("<div class='colorset' id='colorset-" + key + "'></div>" );

    $.each(this.alternates, function(keys, data){
        if(keys === "A100"){$('#colorset-' + key).append("<hr>")};
        $('#colorset-' + key).append(
        '<div class="color" data-clipboard-text="'+ this + '" style="background:'+ this +'" title="' + this +'" data-hex="' + this + '" id="'+ keys +'"></div>'
    );
    });

    });


    $(".color").click(function(){
        $("header").css("background", $(this).data("hex"));
        if ($(this).attr('id') === "a50"){
            $("header").css("color", "#000");
        } else {$("header").css("color", "#fff");}
        
        $("#headerAlert").stop(true, true);
        $("#headerAlert").fadeIn();
        $("#headerAlert").html("Copied to Clipboard: " + $(this).data("clipboard-text"));
        $('#headerAlert').delay(1000).fadeOut();
    });

new Clipboard('.color');


});


function color(hex) {

    var output;
    var convertedHex;

    chrome.storage.sync.get("colorOutput", function(items) {
        if (!chrome.runtime.error) {
            var output = items.colorOutput;

        }

        if (output === "rgb") {

            console.log("rgb");

        }
        if (output === "hex") {
            console.log("hex___");
            convertedHex = hex.replace(/([#])/g, "");
            console.log(convertedHex);
        }
        if (output === "rgba") {
            console.log("rgba");

        }
        if (output === "hashHex") {
            console.log("hashHex");
            hex = hex;
        }

        return convertedHex;
    });

}