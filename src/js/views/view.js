// import { isArray } from 'core-js/core/array';
import 'core-js/es/array';
import icon from 'url:../../img/icons.svg'; //parcel2的寫法

export default class View {
  _data;
  _messageElement = document.querySelector('.message-window');
  _messageOverlay = document.querySelector('.overlay-message');
  _btnMessageClose = document.querySelector('.btn--close-modal-meg');

  render(data, render = true) {
    // If false, create markup string instead of rendering to the DOM

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    // console.log(this._data);
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    // console.log(data);
    this._data = data;

    // console.log(`update func ${this._data}`);
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup); //把newMarkup轉成字串去比較
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl)) {
        // console.log(curEl, newEl.isEqualNode(curEl), i);
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner = function () {
    const markup = ` 
   <div class="spinner">
     <svg>
       <use href="${icon}#icon-loader"></use>
     </svg>
   </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => {
      return window.addEventListener(ev, handler);
    });
  }
  toggleMessageWindow() {
    // console.log(this);
    this._messageElement.classList.toggle('hidden');
    this._messageOverlay.classList.toggle('hidden');
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

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icon}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    // this.toggleMessageWindow();
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // renderMessage(message = this._message) {
  //   const markup = `
  //   <div class="message">
  //     <div>
  //       <svg>
  //         <use href="${icon}#icon-alert-smile"></use>
  //       </svg>
  //     </div>
  //     <p>${message}</p>
  //   </div>`;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML('afterbegin', markup);
  // }
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
         <svg>
          <use href="${icon}#icon-alert-smile"></use>
         </svg>         
        </div>
        <p>${message}</p>
      </div>`;
    this.toggleMessageWindow();
    this._messageElement.innerHTML = '';
    this._messageElement.insertAdjacentHTML('afterbegin', markup);
  }
}
