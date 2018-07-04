/* export const add = (a, b) => a+b;
 export const multiply = (a,b) => a*b;
 export const ID = 23; */
import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};
// 'Title title title title3
// acc: 0 => acc+ cur.length = 5 => newTitle = Title
// acc: 5 => acc+ cur.length = 10 => newTitle = Title title
// till array is finished
// value pushed to newTitle till within the limit
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
  if (title.length > limit){
      title.split(' ').reduce((acc, cur)=> {
          if (acc + cur.length <= limit) {
              newTitle.push(cur);
          }
              return acc + cur.length;
      }, 0);
      return `${newTitle.join(' ')}...`;
  }
  return title;
};
const renderRecipe = recipe => {
    const markup = `
     <li>
          <a class="likes__link" href="#${recipe.recipe_id}">
                <figure class="likes__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
           </figure>
           <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="likes__author">${recipe.publisher}</p>
               </div>
             </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup)
};
const createButton = (page, type)=> `
                <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page -1 : page + 1}">
                    <span>${type === 'prev' ? page -1 : page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                </button>
         `;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page ===1 && pages > 1) {
        // only button to next page
        button = createButton(page,'next');
    } else if (page < pages ){
        // both buttons
        button =`
            ${createButton(page,'next')}
            ${createButton(page,'prev')}
        `;
    }   else if (page === pages && pages > 1) {
        // only button to prev page
        button = createButton(page,'prev');

    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};
export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    // render cur page results
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    // render pagination
    renderButtons(page, recipes.length, resPerPage);

};