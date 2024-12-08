import{i as a,S,a as v}from"./assets/vendor-D0cagnvz.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();function P(t){return t.map(({webformatURL:o,largeImageURL:n,tags:i,likes:e,views:r,comments:s,downloads:L})=>`
        <a class="gallery__item" href="${n}">
          <div class="photo-card">
            <img class="photo-card__image" src="${o}" alt="${i}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${e}
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
      `).join("")}a.settings({position:"topRight",timeout:5e3,transitionIn:"fadeIn",transitionOut:"fadeOut",progressBar:!0,customClass:{toast:"toast-top-right"}});const p=document.querySelector("#search-input"),k=document.querySelector("#search-button"),g=document.querySelector(".gallery"),u=document.querySelector("#load-more-button"),d=document.querySelector("#loading-indicator");let m=new S(".gallery a",{captionsData:"alt",captionDelay:250});k.addEventListener("click",h);p.addEventListener("keypress",t=>{t.key==="Enter"&&h()});u.addEventListener("click",$);let l=1;const f=15;let c="",y=0;async function h(){if(c=p.value.trim(),!c){a.error({title:"Input Error",message:"Please enter a search query.",backgroundColor:"#FF4E4E"});return}d.style.display="block",u.style.display="none";try{l=1;const t=await b(c,l,f);y=t.totalHits;const o=t.hits;o.length===0?a.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#FF4E4E"}):(g.innerHTML="",E(o),m.refresh(),f<y?u.style.display="block":a.info({title:"No More Results",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#007bff"}))}catch(t){a.error({title:"Error",message:"Something went wrong. Please try again later!"}),console.error("Error fetching images:",t)}finally{d.style.display="none",p.value=""}}async function $(){if(!c){a.error({title:"Input Error",message:"Please enter a search query.",backgroundColor:"#FF4E4E"});return}d.style.display="block";try{l+=1;const o=(await b(c,l,f)).hits;E(o),m.refresh(),l*f>=y&&(a.info({title:"No More Results",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#007bff"}),u.style.display="none")}catch(t){a.error({title:"Error",message:"Something went wrong. Please try again later!",backgroundColor:"#dc3545"}),console.error("Error fetching images:",t)}finally{d.style.display="none"}}async function b(t,o,n){const r=`https://pixabay.com/api/?key=47381991-217f0392cb987e93da3bacc78&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${n}`,s=await v.get(r);return{hits:s.data.hits,totalHits:s.data.totalHits}}function E(t){const o=P(t);g.insertAdjacentHTML("beforeend",o)}
//# sourceMappingURL=index.js.map
