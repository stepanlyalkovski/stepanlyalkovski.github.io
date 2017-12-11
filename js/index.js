import 'bootstrap/scss/bootstrap.scss';

document.addEventListener("DOMContentLoaded", runApp);

function runApp() {
    let showNewsBtn = document.querySelector('#show-news');
    showNewsBtn.addEventListener("click", showNewsClick);

    function showNewsClick() {
        showNewsBtn.removeEventListener('click', showNewsClick);
        loadAppModule();
        setTimeout(() => showNewsBtn.parentNode.removeChild(showNewsBtn), 4000);
    }

    function loadAppModule() {
        import(
            /* webpackChunkName: "app" */
            /* webpackMode: "lazy" */
            './app'
            ).then(module => {
                let startApp = module.default;
                startApp();
        });
    }
}
