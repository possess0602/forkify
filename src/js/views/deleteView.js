class searchView {
  #parentEl = document.querySelector('.nav__btn--clear-recipe');

  addHandlerClear(handler) {
    this.#parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new searchView();
