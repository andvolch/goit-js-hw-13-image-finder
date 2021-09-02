// import fetch from './fetchCountries.js'
import getRefs from './getRefs.js';
// import countriesList from '../templates/countriesList.hbs'
// import countryСard from '../templates/countryСard.hbs'
import debounce from 'lodash.debounce';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();

// debounce(onSearch, 500)
refs.searchForm.addEventListener('submit', onSearch);


function onSearch(e) {
   
    onClear();
    e.preventDefault();

    const searchQuery = e.target.value;

    if (searchQuery) {
        fetch.fetchCountry(searchQuery.trim())
        .then(renderCountryCard)
        .catch(onFetchError);
    };
}

function renderCountryCard(data) {
    const markupCountry = countryСard(data);
    const markupList = countriesList(data);

    if (data.length > 1 && data.length <= 10) {
        refs.cardContainer.insertAdjacentHTML("beforeend", markupList);
    }

    if (data.length > 10) {
        onFetchError();
    }

    if (data.length === 1) {
        onClear();
        refs.cardContainer.insertAdjacentHTML("beforeend", markupCountry);
    }

};

function onFetchError(error) {
    alert({
        text:
            'Oops, something went wrong! Please enter a more specific query!'
    });
};
 
function onClear() {
    refs.cardContainer.innerHTML = "";

 };


