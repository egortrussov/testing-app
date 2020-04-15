const toggleView = () => {
    let nav = document.querySelector('nav');
    let linkTexts = document.querySelectorAll('.text');
    nav.classList.toggle('hidden');
    linkTexts.forEach(text => text.classList.toggle('hidden'));
}

const init = () => {
    let btn = document.querySelector('#toggle-view');
    btn.addEventListener('click', toggleView);
}

export {
    toggleView,
    init
};