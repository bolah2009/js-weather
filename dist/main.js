!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=async e=>{const t=`https://api.openweathermap.org/data/2.5/forecast?q=${e}&appid=ed33e3ceb71d11a88646b4199155dac1&units=metric`,n=await fetch(t),{list:r,city:{name:o}}=await n.json(),a=e=>{const{dt_txt:t,clouds:{all:n},main:{humidity:r,pressure:o,temp:a,temp_max:c,temp_min:i,grnd_level:l,sea_level:u},weather:[{main:d,description:s,icon:p}],wind:{deg:m,speed:f}}=e;return{date:t,cloudiness:n,humidity:r,pressure:o,temp:a,tempMax:c,tempMin:i,groundLevel:l,seaLevel:u,weatherCondition:d,weatherDescription:s,weatherIcon:p,windDirection:m,windSpeed:f}},c=[];let i=(new Date).getDay();for(let e=0;e<r.length;e+=1){if(new Date(r[e].dt_txt).getDay()===i&&(c.push(a(r[e])),i+=1,i%=7),5===c.length)break}return{forecasts:c,cityName:o}};const o=document.querySelector(".weather-location"),a=document.querySelectorAll(".main-weather-data"),c=document.querySelectorAll(".forecast-card"),i=async(e="Lagos,ng")=>{const{forecasts:t,cityName:n}=await r(e),i=(e,n)=>{const r=t[e];n.forEach(({dataset:{name:e}},t)=>{if("weatherIcon"===e){const o=`http://openweathermap.org/img/wn/${r[`${e}`]}@2x.png`;return n[t].src=o,void(n[t].alt=r.weatherDescription)}n[t].textContent=r[`${e}`]})},l=(e=0)=>{i(e,a)};return{all:()=>{o.textContent=n,l(),c.forEach(e=>{const{dataset:{day:t}}=e,n=e.querySelectorAll("[data-name]");i(t,n)})},main:l}};(()=>{const e=document.querySelector("#metric"),t=document.querySelector("#imperial"),n=document.querySelector("#location");i().then(e=>e.all()),document.querySelector('input[type="checkbox"]').addEventListener("click",({target:{checked:n}})=>{t.classList.toggle("checked",n),e.classList.toggle("checked",!n)}),document.querySelector("#get-location").addEventListener("click",()=>{const e=n.value;i(e).then(e=>e.all())})})()}]);