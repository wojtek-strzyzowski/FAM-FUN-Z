import{_ as d,r,o as _,a as u,n as h,b as a,g as c,e as t,t as s,q as g,d as p,s as m,p as b,i as v}from"./app-BrzEXclJ.js";const f="/build/assets/violett-gold-PXFhdetM.png",k=e=>(b("data-v-f2c7fd0e"),e=e(),v(),e),x={class:"flip-card"},y={class:"flip-card-inner"},B={class:"flip-card-front"},C={class:"card-image-container"},D=["src"],N={key:1,class:"no-thumbnail"},S=k(()=>t("img",{src:f,alt:"No Thumbnail",class:"card-image"},null,-1)),w=[S],E={class:"front-text"},I={class:"created"},V={class:"Date"},$={class:"User"},q={class:"front-description"},M={class:"flip-card-back"},T={__name:"BlogCard",props:{blog:{type:Object,required:!0}},setup(e){const i=e,l=r("");return _(async()=>{try{const o=await u.get(`/api/users/${i.blog.user_id}`);l.value=o.data.name}catch(o){console.error("Error loading user:",o)}}),(o,j)=>{const n=h("router-link");return a(),c("div",x,[t("div",y,[t("div",B,[t("div",C,[e.blog.thumbnail?(a(),c("img",{key:0,src:`/storage/${e.blog.thumbnail}`,alt:"Card",class:"card-image"},null,8,D)):(a(),c("div",N,w))]),t("div",E,[t("div",I,[t("div",V,[t("p",null,"Erstellt am: "+s(new Date(e.blog.created_at).toLocaleDateString("de-DE")),1)]),t("div",$,[t("p",null,"Autor: "+s(l.value),1)])]),t("div",q,[t("p",null,s(e.blog.title),1)])])]),t("div",M,[t("h1",null,s(e.blog.title),1),t("p",null,s(e.blog.description),1),g(n,{to:`/blog/${e.blog.id}`},{default:p(()=>[m("Weiterlesen")]),_:1},8,["to"])])])])}}},F=d(T,[["__scopeId","data-v-f2c7fd0e"]]);export{F as B};
