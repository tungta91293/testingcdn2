function setMarginBottomIntro() {
    for (var i = 1; i <= 4; i++) {
        if (!($('section#gen-part' + i + ' > h2').next().is('p') || $('section#gen-part' + i + ' > h2').next().is('ul'))) {
            $('section#gen-part' + i + ' > h3').first().addClass('first-head');
            $('section#gen-part' + i + ' > div.col-odd > h3').first().addClass('first-head');
            $('section#gen-part' + i + ' > div.col-even > h3').first().addClass('first-head');
        }
    }
}


$(function () {
    setMarginBottomIntro();
});
