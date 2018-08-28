// Get Color Object from color.json

var $color = (function() {
    var $color = null;
    $.ajax({
        'async': false,
        'global': false,
        'cache': false,
        'url': "js/color.json",
        'dataType': "json",
        'success': function(data) {
            $color = data;
        }
    });
    return $color;
})();

// Get Output Setting from chrome.Storage and send it to add_colors()
$(document).ready(function() {

    get_output_setting(add_colors);

});

// Get colorOutput and call callback function
function get_output_setting(callback) {
    var storageItems = chrome.storage.sync.get("colorOutput", function(items) {
        callback(items.colorOutput);
    });
}

// Generate the colors and selection based on output setting
function add_colors(output) {

    clear_colors();

    $.each($color.mainColors, function(key, data) {
        $('.mainColors').append(
            '<div class="color" data-clipboard-text="' + color(this.hex, output) + '" style="background:' + this.hex + '" data-hex="' + this.hex + '" id="' + key + '">' +
            this.name + '</div>'
        );

        $('.variations').append("<div class='colorset' id='colorset-" + key + "'></div>");

        $.each(this.alternates, function(keys, data) {
            if (keys === "A100") {
                $('#colorset-' + key).append("<hr>")
            };
            $('#colorset-' + key).append(
                '<div class="color" data-clipboard-text="' + color(this, output) + '" style="background:' + this + '" title="' + color(this, output) + '" data-hex="' + this + '" id="' + keys + '"></div>'
            );
        });

    });


    function save_options() {
        var color = $('#outputOptions').find(":selected").val();
        chrome.storage.sync.set({
            "colorOutput": color
        }, function() {
            // Update status to let user know options were saved.
            var status = $('#headerAlert');

            status.textContent = 'Options saved.';
            status.fadeOut();

        });
    }

    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    function restore_options() {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.sync.get({
            colorOutput: 'hashHex'
        }, function(items) {
            console.log('#outputOptions option[value="' + items.colorOutput + '"]')
            $('#outputOptions option[value="' + items.colorOutput + '"]').attr('selected', "selected");
        });
    }

    $(document).ready(function() {

        restore_options()
        $('#outputOptions').change(function() {
            save_options();

            // clear_colors();

            get_output_setting(add_colors);
        });
    });

    document.body.onload = function() {
        chrome.storage.sync.get("colorOutput", function(items) {
            if (items) {
                console.log(items);

            }
        });
    }




    // Colorize header
    $("header").css("background", $color.mainColors.red.hex);



    // Bind on click
    $(".color").click(function() {
        $("header").css("background", $(this).data("hex"));
        if ($(this).attr('id') === "a50") {
            $("header").css("color", "#000");
        } else {
            $("header").css("color", "#fff");
        }

        // Alert color has been copied
        $("#headerAlert").stop(true, true);
        $("#headerAlert").fadeIn();
        $("#headerAlert").html("Copied to Clipboard: " + $(this).data("clipboard-text"));
        $('#headerAlert').delay(1000).fadeOut();
    });

    var clipboard = new Clipboard('.color');

}


// Determine how to output and then output
function color(hex, output) {


    switch (output) {
        case "hashHex":
            convertedHex = hex;
            break;
        case "hex":
            convertedHex = convert_hex_to_hex(hex);
            break;
        case "rgb":
            convertedHex = convert_hex_to_rgb(hex);
            break;
        case "rgba":
            convertedHex = convert_hex_to_rgba(hex);
            break;
        default:
            convertedHex = hex;
            break;
    }

    return convertedHex;
}




function convert_hex_to_rgb(hex) {

    R = hexToR(hex);
    G = hexToG(hex);
    B = hexToB(hex);

    var rgb = "rgb(";
    rgb += R;
    rgb += ",";
    rgb += G;
    rgb += ",";
    rgb += B;
    rgb += ")";
    return rgb;
}

function convert_hex_to_rgba(hex) {
    R = hexToR(hex);
    G = hexToG(hex);
    B = hexToB(hex);
    A = "1"

    var rgba = "rgba(";
    rgba += R;
    rgba += ",";
    rgba += G;
    rgba += ",";
    rgba += B;
    rgba += ",";
    rgba += A;
    rgba += ")";
    return rgba;
}

function convert_hex_to_hex(hex) {
    hex = hex.replace(/([#])/g, "");
    return hex;

}

function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }

function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }

function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }

function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }


function clear_colors() {

    $('.variations').html('');
    $('.mainColors').html('');

}