import getPictures from './API.js'
import getRefs from './getRefs.js';
import fotoCard from '../templates/fotoCard.hbs';
// import countryСard from '../templates/countryСard.hbs'
import debounce from 'lodash.debounce';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = getRefs();

const state = {
    query: '',
    page: 1

}

refs.searchForm.addEventListener("submit", onSearch);
refs.btnLoadeMore.addEventListener("click", onLoadMore);

async function onSearch(e) {
    e.preventDefault();
    
    refs.btnLoadeMore.style.visibility = "hidden";
    
    if (!e.currentTarget.elements.query.value.trim()) {
        return;
    }

    try {
        state.value = e.currentTarget.elements.query.value;
        
        const pictures = await getPictures(state.value, state.page);
        refs.gallery.innerHTML = fotoCard(pictures);
        
        if (pictures.length > 11) {
        refs.btnLoadeMore.style.visibility = "visible";
        };
        if (!pictures.length) {
            onFetchError();  
        };
    }
    
    catch (error) {
        onFetchError();
    }
}


async function onLoadMore() {
    state.page += 1;
  
    const pictures = await getPictures(state.value, state.page);
    refs.gallery.insertAdjacentHTML("beforeend", fotoCard(pictures));
    
    if (state.page === 2) {
        const observer = new IntersectionObserver(onLoadMore, options);
        observer.observe(refs.btnLoadeMore);
    }

}


refs.gallery.addEventListener("click", onOpenGallery);

function onOpenGallery(e) {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") {
        return;
    }

    const changeModalImage = `<img src=${e.target.dataset.source}/>`;
    const instance = basicLightbox.create(changeModalImage);

    instance.show();
}

function onFetchError(error) {
    alert({
        text:
            'Oops, something went wrong! Please enter a more specific query!'
    });
};

