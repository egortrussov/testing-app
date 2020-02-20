let mainEl = document.querySelector('main')
console.log("Hello");


setInterval(() => {
    if (is_scrolling()) {
        if (mainEl.classList.contains("on-scroll-bar") === false) {
            mainEl.classList.add("on-scroll-bar");
        }
    }
    console.log('jj');
    
}, 500)

mainEl.addEventListener('scroll', (e) => {
    window.lastScrollTime = new Date().getTime()
}, false)

function is_scrolling() {
    return window.lastScrollTime && new Date().getTime() < window.lastScrollTime + 500
}