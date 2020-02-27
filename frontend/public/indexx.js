let mainEl = document.querySelector('main')

setInterval(() => {
    if (is_scrolling()) {
        if (mainEl.classList.contains("on-scroll-bar") === false) {
            mainEl.classList.add("on-scroll-bar");
        }
    }    
}, 500)

mainEl.addEventListener('scroll', (e) => {
    window.lastScrollTime = new Date().getTime()
}, false)

function is_scrolling() {
    return window.lastScrollTime && new Date().getTime() < window.lastScrollTime + 500
}