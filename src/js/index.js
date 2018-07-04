/* Global app controller
import num from './test';
const x= 23;
console.log(` I imported another ${num} from another module or else Variable x is ${x}`);

import str from './models/Search';
// import {add as a, multiply as m, ID } from './views/searchView';

import  * as searchView from './views/searchView';

console.log(`using imported function ${searchView.add(ID,2)} and ${searchView.multiply(3, 5)} and here is ${str}`);
    */
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 *
 */
const state = {};

///////Search Controler  ////////
const controlSearch = async () => {
    // 1) Get query from the view
    const query = searchView.getInput(); //'pizza'; // TODO
    // console.log(query);

    if(query) {
        // 2) New search object and add to state
        state.search = new Search(query);
        //3) Prepare UI for result
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);

        //4) Search for recipes
        await state.search.getResult();

        //5) Render results on UI
        //console.log(state.search.result);
        clearLoader();
        searchView.renderResult(state.search.result)
    }
};

elements.searchForm.addEventListener('submit', e=> {
e.preventDefault();
controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.result,goToPage);

    }
});

/////////////RECIPE CONTROLLER ///////


