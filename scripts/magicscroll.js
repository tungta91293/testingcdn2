function triggerMagicScroll(controller, numberOfPinnedItem) {
    var scrollDuration = (numberOfPinnedItem - 1) + '00%';
    var scenePinned = new ScrollMagic.Scene({
        triggerElement: "#pinned-trigger", 
        duration: scrollDuration, 
        triggerHook: 0
    })
    .setPin("#pinned-element")
    //.addIndicators({name: "pin-pic"}) // add indicators (requires plugin)
    .addTo(controller);

    $('.case-fixed__item').each(function(){
        if(this.id != "last"){
            var sceneOpacity = new ScrollMagic.Scene({
                triggerElement: this, 
                duration: '100%',
                triggerHook: 0.5
            })
            .setClassToggle("#pinned-element img[data-item='"+this.id+"']","pinned")
            //.addIndicators({name: "opacity-pic"}) // add indicators (requires plugin)
            .addTo(controller);
        }else {
            var sceneOpacity = new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.5
            })
            .setClassToggle("#pinned-element img[data-item='"+this.id+"']","pinned")
            //.addIndicators({name: "opacity-pic"}) // add indicators (requires plugin)
            .addTo(controller);
        }
    });
}