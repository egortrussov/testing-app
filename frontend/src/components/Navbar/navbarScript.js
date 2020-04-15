const toggleView = () => {
    let nav = document.querySelector('nav');
    let linkTexts = document.querySelectorAll('.text');
    let btn = document.querySelector('#toggle-view');
    nav.classList.toggle('hidden');
    linkTexts.forEach(text => text.classList.toggle('hidden'));
    btn.classList.toggle('hidden');
}

const init = () => {
    let btn = document.querySelector('#toggle-view');
    btn.addEventListener('click', toggleView);
}

export {
    toggleView,
    init
};