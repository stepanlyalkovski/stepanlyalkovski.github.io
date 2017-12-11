import 'bootstrap/scss/bootstrap.scss';
document.addEventListener("DOMContentLoaded", runApp);

function runApp() {
    let showNewsBtn = document.querySelector('#show-news');
    showNewsBtn.addEventListener("click", showNewsClick);

    function showNewsClick() {
        showNewsBtn.removeEventListener('click', showNewsClick);
        loadAppModule();
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
