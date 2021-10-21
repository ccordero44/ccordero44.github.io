
$( document ).ready(function() {
    $('div').not('#livespell___contextmenu, #myTextArea___livespell_proxy').remove();
     window.moveTo(((screen.width - 542) / 2), ((screen.height - 325) / 2)); 
    window.resizeTo('722', '422')
    $('.content').richText();
    $('.richText-editor').focus();
});

