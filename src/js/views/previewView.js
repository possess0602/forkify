import View from './view.js';
import icon from 'url:../../img/icons.svg'; //parcel2的寫法

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    // addRecipeView.toggleFormWindow();
    let id;
    //  setTimeout(async function () {
    //    id = await window.location.hash.slice(1);
    //    console.log(id);
    //  }, 3 * 1000);
    id = window.location.hash.slice(1);
    let markup = `
     <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
           <figure class="preview__fig">
           <img src="${this._data.image}" alt="${
      this._data.title
    }" crossOrigin= "anonymous"/>
           </figure>
           <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p> 
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">   
                 <svg>
                    <use href="${icon}#icon-user"></use>
                 </svg>
              </div>
              
            
           </div>
        </a>
     </li>`;

    return markup;
  }
}
export default new PreviewView();
