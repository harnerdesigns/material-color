$( document ).ready( function(){

var $color = (function() {
        var $color = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "js/color.json",
            'dataType': "json",
            'success': function (data) {
                $color = data;
            }
        });
        return $color;
    })();

console.log($color);

    $.each($color.mainColors, function(key, data) {
      console.log(this.hex + key);
    $('.mainColors').append(
        '<div class="color" style="background:'+ this.hex +'" data-hex="' + this.hex + '" id="'+ key +'">'
        + this.name + '</div>'
    );
});
  });
