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

console.log($color);

$.each($color.alternateNames, function(key, data) { 
    if(this == "A100"){$('.sideBar').append("<hr>")};
    $('.sideBar').append(
        '<div class="color">'
        + this + '</div>'
    );

});

    $.each($color.mainColors, function(key, data) {
      console.log(this.hex + key);
    $('.mainColors').append(
        '<div class="color" style="background:'+ this.hex +'" data-hex="' + this.hex + '" id="'+ key +'">'
        + this.name + '</div>'
    );

    $('.variations').append("<div class='colorset' id='colorset-" + key + "'></div>" );

    $.each(this.alternates, function(keys, data){
        if(keys === "A100"){$('#colorset-' + key).append("<hr>")};
        $('#colorset-' + key).append(
        '<div class="color" style="background:'+ this +'" data-hex="' + this + '" id="'+ keys +'"></div>'
    );
    });

    });
});
