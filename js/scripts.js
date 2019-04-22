// Sample text generator.
function textGenerator(){
    var date = new Date();
    var nuclearCodes = [
        "Hey baby, what's poppin'.",
        "The Earth is flat.",
        "You know about the shoulder touch?",
        "I have a bad feeling about this.",
        "I don't like sand.",
        "(slow heavy metal music playing)"
    ];
    if(date.getDay() == 3) nuclearCodes.push('It\'s wednesday my dudes.');
    return nuclearCodes[Math.floor(Math.random()*nuclearCodes.length)];
};
$("#magic").val(textGenerator());


// Get get
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var background = getUrlParameter("background");
var font = getUrlParameter("font");

// The heart..
function colorGenerator(){
    var bgColor = "";
    var color = "";
    var data = "ABCDEF0123456789";
    for (var x = 0; x < 6; x++){
        bgColor += data.charAt(Math.floor(Math.random() * data.length));
        color += data.charAt(Math.floor(Math.random() * data.length));
    };
    if(background !== undefined){
        bgColor = background;
    }
    if(font !== undefined){
        color = font;
    }
    $(".main-container").css("background-color", "#"+bgColor);
    $("#bgColor").val("#"+bgColor);

    $(".main-container").find('*').css("color", "#"+color);
    $("#color").val("#"+color);

    $(".menu-item").find('*').css("color",getFontColorByBgColor(bgColor));
    $(".footer-container").css("color",getFontColorByBgColor(bgColor));
};
colorGenerator();

// Color input
$(".colorInput").each(function(){
    $(this).change(function(){
        var val = String($(this).val());
        if($(this).attr('name') == "bgColor"){
            if(!val.includes("#")) $(this).val( "#" + val );
            $(".main-container").css("background-color", val);

            $(".menu-item").find('*').css("color",getFontColorByBgColor($(this).val()));
            console.log("Backgroundcolor: " + $(this).val);
        }else{
            if(!val.includes("#")) $(this).val( "#" + val );
            $(".main-container").css("color", val);

            console.log("Color: " + $(this).val());
        };
    });
});

// Re-gen colors.
document.body.onkeyup = function(e){
    if(!$("input").is(":focus")){
        if(e.keyCode == 32) colorGenerator();
        if(background !== undefined && font !== undefined) window.location("https://bradleyoosterveen.nl/color/");
    };
};

function getFontColorByBgColor(bgColor){
    return(parseInt(bgColor.replace('#',''),16)>0xffffff/2)?'#000':'#fff';
}