// import icon from 'url:../img/icons.svg'; //parcel2的寫法
import 'core-js/stable'; //以下兩個為支援舊的瀏覽器，其polyfilling everything else
import 'regenerator-runtime/runtime'; //polyfilling async/await
import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import deleteView from './views/deleteView.js';

// const recipeContainer = document.querySelector('.recipe');
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();
    // 0) update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    // 1) update bookmark view
    bookmarksView.update(model.state.bookmarks);
    // 2) loading recipe
    await model.loadingRecipe(id);
    // 3) render recipe
    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //  1) get search results
    const query = searchView.getQuery();
    if (!query) return;
    // 2) load search results
    await model.loadSearchResult(query);
    //  3) render results
    resultsView.render(model.getSearchResultsPage());

    //  4) render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};
const controlPagination = function (gotoPage) {
  //  3) render NEW　results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  //  4) render NEW pagination
  paginationView.render(model.state.search);
};
const controlServings = function (updateTo) {
  model.updateServings(updateTo);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const addBookmark = function () {
  //  1) add recipe to bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //  2) update bookmarks
  recipeView.update(model.state.recipe);

  //  3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner
    // addRecipeView.renderSpinner();
    // console.log(newRecipe);
    await model.uploadRecipe(newRecipe);
    // 由於在model.js這個uploadRecipe()他是非同步的，如果沒有在這邊await他沒辦法reject，
    // 因此也就無法 renderError
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // render recipe
    recipeView.render(model.state.recipe);
    // open MessageCard
    addRecipeView.toggleFormWindow();

    // success message
    addRecipeView.renderMessage();
    // render bookmarks
    bookmarksView.render(model.state.bookmarks);
    // change ID in URL

    // close form windwow
    setTimeout(function () {
      // addRecipeView.toggleFormWindow();
      addRecipeView.toggleMessageWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`💥`, err);
    addRecipeView.toggleFormWindow();
    addRecipeView.renderMessage(err.message);
  }
};
const clearLocalstorage = function () {
  model.clearBookmarks();
  if (model.state.bookmarks.length == 0) {
    // recipeView.update(model.state.recipe);

    //  3) render bookmarks
    bookmarksView.render(model.state.bookmarks);
  }
  recipeView._clear();

  window.history.pushState(null, '', ' ');
};

const init = function () {
  // 基於subscriber and publisher design pattern
  // view是永遠不知道controller地存在的，因此我們透過在controller丟給addHandlerRender，
  // 一個controlRecipe的callback function，當addHandlerRender被觸發後才會做controlRecipe的動作

  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(addBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  deleteView.addHandlerClear(clearLocalstorage);

  // controlServings(); 如果簡單的把這放在那哩，會發現因為沒有考慮async 導致沒有任何state到達那個api，造成forEach undefined
};
init();
