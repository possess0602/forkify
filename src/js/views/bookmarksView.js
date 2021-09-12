import View from './view.js';
import icon from 'url:../../img/icons.svg'; //parcel2的寫法
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find good recipe and bookmark it ;)';
  _message = '';
  constructor() {
    super();
    // this._addHandlerHideMessageWindow();
  }
  // addHandlerHideMessageWindow() {
  //   this._messageOverlay.addEventListener(
  //     'click',
  //     this.toggleMessageWindow.bind(this)
  //   );
  //   this._btnMessageClose.addEventListener(
  //     'click',
  //     this.toggleMessageWindow.bind(this)
  //   );
  // }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
