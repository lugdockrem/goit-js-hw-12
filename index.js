import{a as S,i as n,S as v}from"./assets/vendor-D0cagnvz.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&u(s)}).observe(document,{childList:!0,subtree:!0});function c(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(t){if(t.ep)return;t.ep=!0;const r=c(t);fetch(t.href,r)}})();function w(e){return e.map(({webformatURL:o,largeImageURL:c,tags:u,likes:t,views:r,comments:s,downloads:L})=>`
        <a class="gallery__item" href="${c}">
          <div class="photo-card">
            <img class="photo-card__image" src="${o}" alt="${u}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${t}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${r}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${s}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${L}
              </p>
            </div>
          </div>
        </a>
      `).join("")}async function g(e,o,c){const r=`https://pixabay.com/api/?key=47381991-217f0392cb987e93da3bacc78&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${c}`,s=await S.get(r);return{hits:s.data.hits,totalHits:s.data.totalHits}}n.settings({position:"topRight",timeout:5e3,progressBar:!0});const p=document.querySelector("#search-input"),P=document.querySelector("#search-button"),h=document.querySelector(".gallery"),i=document.querySelector("#load-more-button"),f=document.querySelector("#loading-indicator");let m=new v(".gallery a",{captionsData:"alt",captionDelay:250}),a=1;const l=15;let d="",y=0;P.addEventListener("click",b);p.addEventListener("keypress",e=>{e.key==="Enter"&&b()});i.addEventListener("click",$);async function b(){if(d=p.value.trim(),!d){n.error({title:"Input Error",message:"Please enter a search query."});return}f.style.display="block",i.style.display="none";try{a=1;const e=await g(d,a,l);y=e.totalHits,e.hits.length===0?(n.error({title:"No Results",message:"Sorry, no images match your query. Please try again!"}),h.innerHTML=""):(h.innerHTML="",E(e.hits),m.refresh(),i.style.display=y>l?"block":"none",a*l>=y&&(n.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}),i.style.display="none"))}catch(e){console.error("Error fetching images:",e),n.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{f.style.display="none",p.value=""}}async function $(){if(d){f.style.display="block";try{a+=1;const e=await g(d,a,l);e.hits.length===0||a*l>=y?(n.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}),i.style.display="none"):(E(e.hits),m.refresh(),q(),a*l>=y&&(n.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}),i.style.display="none"))}catch(e){console.error("Error fetching more images:",e),n.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{f.style.display="none"}}}function E(e){const o=w(e);h.insertAdjacentHTML("beforeend",o)}function q(){const e=document.querySelectorAll(".gallery .photo-card");if(e.length>0){const{height:o}=e[0].getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
