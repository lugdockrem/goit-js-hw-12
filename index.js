import{a as S,i as n,S as v}from"./assets/vendor-D0cagnvz.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function l(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=l(t);fetch(t.href,r)}})();function w(e){return e.map(({webformatURL:o,largeImageURL:l,tags:c,likes:t,views:r,comments:s,downloads:L})=>`
        <a class="gallery__item" href="${l}">
          <div class="photo-card">
            <img class="photo-card__image" src="${o}" alt="${c}" loading="lazy" />
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
      `).join("")}async function h(e,o,l){const r=`https://pixabay.com/api/?key=47381991-217f0392cb987e93da3bacc78&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${l}`,s=await S.get(r);return{hits:s.data.hits,totalHits:s.data.totalHits}}n.settings({position:"topRight",timeout:5e3,progressBar:!0});const f=document.querySelector("#search-input"),P=document.querySelector("#search-button"),g=document.querySelector(".gallery"),u=document.querySelector("#load-more-button"),p=document.querySelector("#loading-indicator");let m=new v(".gallery a",{captionsData:"alt",captionDelay:250}),a=1;const i=15;let d="",y=0;P.addEventListener("click",b);f.addEventListener("keypress",e=>{e.key==="Enter"&&b()});u.addEventListener("click",$);async function b(){if(d=f.value.trim(),!d){n.error({title:"Input Error",message:"Please enter a search query."});return}p.style.display="block",u.style.display="none";try{a=1;const e=await h(d,a,i);y=e.totalHits,e.hits.length===0?(n.error({title:"No Results",message:"Sorry, no images match your query. Please try again!"}),g.innerHTML=""):(g.innerHTML="",E(e.hits),m.refresh(),u.style.display=y>i?"block":"none",a*i>=y&&(n.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}),u.style.display="none"))}catch(e){console.error("Error fetching images:",e),n.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{p.style.display="none",f.value=""}}async function $(){if(d){p.style.display="block";try{a+=1;const e=await h(d,a,i);E(e.hits),m.refresh(),q(),(a*i>=y||e.hits.length<i)&&(n.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}),u.style.display="none")}catch(e){console.error("Error fetching more images:",e),n.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{p.style.display="none"}}}function E(e){const o=w(e);g.insertAdjacentHTML("beforeend",o)}function q(){const e=document.querySelectorAll(".gallery .photo-card");if(e.length>0){const{height:o}=e[0].getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
