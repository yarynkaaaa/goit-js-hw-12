import{a as f,S as p,i as l}from"./assets/vendor-BK_rxH-O.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();f.defaults.baseURL="https://pixabay.com/api/";function m(o){return f.get("/",{params:{key:"51491215-b07c5a52c3d96c7bcc8c26318",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(e=>e.data)}let s=null;function g(o){return o.map(e=>`
      <li class="gallery-item">
        <div class="image-wrap">
          <a href="${e.largeImageURL}" data-lightbox="gallery" data-title="${e.tags}">
            <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          </a>
        </div>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${e.likes}</p>
          <p class="info-item"><b>Views</b> ${e.views}</p>
          <p class="info-item"><b>Comments</b> ${e.comments}</p>
          <p class="info-item"><b>Downloads</b> ${e.downloads}</p>
        </div>
      </li>
    `).join("")}function y(o){o.innerHTML=""}function h(){return s||(s=new p(".gallery a",{captionsData:"alt",captionDelay:250})),s}function b(o,e){const i=g(e);o.insertAdjacentHTML("beforeend",i),s?s.refresh():s=h()}function L(){document.querySelector(".loader").style.display="block"}function w(){document.querySelector(".loader").style.display="none"}const d=document.querySelector(".form"),c=d.querySelector('input[name="search-text"]'),u=document.querySelector(".gallery");d.addEventListener("submit",o=>{o.preventDefault();const e=c.value.trim();if(e===""){l.warning({title:"",message:"Please enter something in the search field",position:"topRight",backgroundColor:"#ffa000",color:"white",progressBarColor:"#bb7b10",timeout:3e3});return}c.value="",y(u),L(),m(e).then(i=>{const a=i.hits;a.length===0?l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",color:"white",progressBarColor:"#b51b1b",timeout:3e3}):b(u,a)}).catch(i=>{console.error("Помилка при запиті до Pixabay:",i),l.error({title:"Error",message:"Сталася помилка при завантаженні зображень. Будь ласка, спробуйте пізніше.",position:"topRight",backgroundColor:"#ef4040;",color:"white",progressBarColor:"#b51b1b;",timeout:3e3})}).finally(()=>{w()})});
//# sourceMappingURL=index.js.map
