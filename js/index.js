var showImageAtIndex = (slide, index) => {
    var nextIndex = index
    slide.dataset.active = nextIndex
    var className = 'class-active'
    removeClassAll(className)
    var nextSelector = '#id-image-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)
}

var showIndicatorAtIndex = (slide, index) => {
    var nextIndex = index
    var className = 'class-white'
    removeClassAll(className)
    var nextSelevtor = '#id-indi-' + String(nextIndex)
    var indi = e(nextSelevtor)
    indi.classList.add(className)
}

var nextIndex = (slide, offset) => {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventMainDivMouseover = () => {
    var selector = '.class-div-main'
    bindAll(selector, 'mouseover', function(event) {
        var buttons = es('.class-slide-button')
        for (var i = 0; i < buttons.length; i++) {
            var className = 'buttonShow'
            buttons[i].classList.add(className)
        }
        var intervalId = getIntervalEventId()
        clearInterval(intervalId)
    })
}

var bindEventMainDivMouseout = () => {
    var selector = '.class-div-main'
    bindAll(selector, 'mouseout', function(event) {
        var className = 'buttonShow'
        removeClassAll(className)
        autoPlay()
    })
}

var bindEventButtonMouseOver = () => {
    var selector = '.class-slide-button'
    bindAll(selector, 'mouseover', function(event) {
        var self = event.target
        var className = 'buttonLight'
        self.classList.add(className)
    })
}
var bindEventButtonMouseOut = () => {
    var selector = '.class-slide-button'
    bindAll(selector, 'mouseout', function(event) {
        var className = 'buttonLight'
        removeClassAll(className)
    })
}

var bindEventSlide = () => {
    var selector = '.class-slide-button'
    bindAll(selector, 'click', function(event) {
        var button = event.target
        var slide = button.parentElement
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
        showIndicatorAtIndex(slide, index)
    })
}

var bindEventIndicator = () => {
    var selector = '.class-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        var self = event.target
        var index = Number(self.dataset.index)
        var slide = self.closest('.class-slide')
        showImageAtIndex(slide, index)
        showIndicatorAtIndex(slide, index)
    })
}

var playNextImage = () => {
    var slide = e('.class-slide')
    var offset = 1
    var index = nextIndex(slide, offset)
    showImageAtIndex(slide, index)
    showIndicatorAtIndex(slide, index)
}

var setIntervalEventId = (eventId) => {
    var mainDiv = e('.class-div-main')
    mainDiv.dataset.intervalId = eventId
}

var getIntervalEventId = () => {
    var mainDiv = e('.class-div-main')
    return mainDiv.dataset.intervalId
}

var autoPlay = () => {
    var interval = 1000
    var eventId = setInterval(() => {
        playNextImage()
    }, interval)
    setIntervalEventId(eventId)
}

var _main = () => {
    bindEventMainDivMouseover()
    bindEventMainDivMouseout()
    bindEventButtonMouseOver()
    bindEventButtonMouseOut()
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}

_main()
