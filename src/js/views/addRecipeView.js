import View from './view.js';
import icon from 'url:../../img/icons.svg'; //parcel2的寫法
// import { format } from 'core-js/core/date';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _message = 'Recipe was successfully uploaded: )';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this._addHandlerHideMessageWindow();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  // toggleMessageWindow() {
  //   // this._messageElement.classList.toggle('hidden');

  //   this._messageElement.classList.toggle('hidden');
  //   this._messageOverlay.classList.toggle('hidden');
  // }

  // _addHandlerHideMessageWindow() {
  //   this._messageOverlay.addEventListener(
  //     'click',
  //     this.toggleMessageWindow.bind(this)
  //   );
  //   this._btnMessageClose.addEventListener(
  //     'click',
  //     this.toggleMessageWindow.bind(this)
  //   );
  // }

  toggleFormWindow() {
    // this._messageElement.classList.toggle('hidden');

    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleFormWindow.bind(this));
  }
  _addHandlerHideWindow() {
    this._overlay.addEventListener('click', this.toggleFormWindow.bind(this));
    this._btnClose.addEventListener('click', this.toggleFormWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      // console.log(data);

      handler(data);
    });
  }
  _generateMarkup() {}
}
export default new AddRecipeView();
