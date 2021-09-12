import View from './view.js';

class DeleteView extends View {
  #parentEl = document.querySelector('.nav__btn--clear-recipe');

  addHandlerClear(handler) {
    this.#parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new DeleteView();
