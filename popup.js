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

// Get Output Setting from Chrome.Storage and send it to add_colors()
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
                        '<div class="color" data-clipboard-text="' + color(this, output) + '" style="background:' + this + '" title="' + this + '" data-hex="' + this + '" id="' + keys + '"></div>'
                    );
                });

            });
            // Colorize header
            $("header").css("background", $color.mainColors.red.hex);

            // Add Sidebar
            $.each($color.alternateNames, function(key, data) {
                if (this == "A100") {
                    $('.sideBar').append("<hr>")
                };
                $('.sideBar').append(
                    '<div class="square">' +
                    this + '</div>'
                );

            });

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

            new Clipboard('.color');

        }


        // Determine how to output and then output
        function color(hex, output) {


            switch (output) {
                case "hashHex":
                    console.log("Output is HashHex");
                    convertedHex = hex;
                    break;
                case "hex":
                    console.log("Output is hex");
                    convertedHex = convert_hex_to_hex(hex);
                    break;
                case "rgb":
                    console.log("Output is rgb");
                    convertedHex = convert_hex_to_rgb(hex);
                    break;
                case "rgba":
                    console.log("Output is rgba");
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

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}