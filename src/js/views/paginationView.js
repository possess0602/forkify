import View from './view.js';
import icon from 'url:../../img/icons.svg'; //parcel2的寫法

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    console.log(`curPage ${curPage}`);
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1, and there are other page
    if (curPage === 1 && numPage > 1) {
      return ` 
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
         <use href="${icon}#icon-arrow-right"></use>
         </svg>
      </button>`;
    }
    //  last page
    if (curPage === numPage && numPage > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
         <use href="${icon}#icon-arrow-left"></use>
         </svg>
         <span>Page ${curPage - 1}</span>
      </button>`;
    }
    //  other page
    if (curPage < numPage) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
         <use href="${icon}#icon-arrow-left"></use>
         </svg>
         <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
         <span>Page ${curPage + 1}</span>
         <svg class="search__icon">
         <use href="${icon}#icon-arrow-right"></use>
         </svg>
      </button>`;
    }
    // page 1, and there are NO page
    return '';
  }
}
export default new PaginationView();
