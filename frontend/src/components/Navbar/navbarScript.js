import ls from 'local-storage';

const toggleView = (shouldChangeLS) => {
    let nav = document.querySelector('nav');
    let linkTexts = document.querySelectorAll('.text');
    let btn = document.querySelector('#toggle-view');
    nav.classList.toggle('hidden');
    linkTexts.forEach(text => text.classList.toggle('hidden'));
    btn.classList.toggle('hidden');
    console.log('object')

    if (shouldChangeLS) {
        let state = ls.get('isNavbarHidden');
        ls.set('isNavbarHidden', !state);
    }
}

const init = () => {
    let btn = document.querySelector('#toggle-view');
    const state = ls.get('isNavbarHidden');
    console.log(state)
    if (state) {
        toggleView(false);
    }
    btn.addEventListener('click', () => toggleView(true));
}

export {
    toggleView,
    init
};