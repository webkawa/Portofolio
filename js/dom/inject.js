/* 
    inject.js
    ---------
    Fonctions utiles à l'injection de code dans le DOM.
 */

/* Création d'un titre */
function injectTitle(title, subtitle) {
    /* Mise à jour du contenu sortant */
    $("div#header div.title").addClass("leaving");
    
    /* Création du contenu entrant */
    var opt = '';
    if(subtitle != null) {
        opt = '<p>' + subtitle + '</p>';
    }
    var data = 
        '<div class="title incoming">' +
            '<h1>' + title + '</h1>' +
            opt +
        '</div>';
    $(data).insertAfter("div#header div.title.leaving");
    
    /* Rafraichissement du titre entrant */
    refreshTitleSize($("div#header div.title.incoming"));
}

/* Création d'une page */
function injectPage(target) {
    /* Création du contenu entrant */
    var data = 
        $('<div class="spacer">' +
            '<div class="core" style="opacity: 0;"></div>' +
        '</div>');
    
    /* Création des coins */
    addCorners($(data).children("div.core"), "medium");
    
    /* Ajout au conteneur */
    $(target).append($(data));
    
    /* Affectation de la taille */
    realHeight($(data), $("div#page").height());
}

/* Création d'un coeur de page */
function injectCore(target, dom) {
    /* Création du contenu */
    var data =
        $('<div id="content" style="opacity: 0">' +
            '<div class="scroller">' +
                dom +
            '</div>' +
            '<div class="scrollbar">' +
                '<div class="scrollzone">' +
                    '<div class="marker"></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div id="media" style="opacity: 0">' +
        '</div>');
    
    /* Ajout du contenu */
    $(target).append($(data));
    
    /* Décoration de la scrollbar */
    addCorner($("div#content div.scrollbar"), "tc", "small");
    addCorner($("div#content div.scrollbar"), "bc", "small");
    
    /* Variables utiles */
    var content = $("div#content");
    var core = $("div#page div.spacer div.core");
    var scroller = $("div#content div.scroller");
    var scrollbar = $("div#content div.scrollbar");
    var scrollzone = $("div#content div.scrollbar div.scrollzone");
    var marker = $("div#content div.scrollbar div.scrollzone div.marker");
    
    /* Affectation des tailles */
    realHeight(content, $(core).height());
    realHeight(scrollzone, $(scrollbar).height());
    realHeight(marker, markerSize(content, scroller, scrollzone));
}