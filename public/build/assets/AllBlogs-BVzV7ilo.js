import{_ as c,r as n,o as d,a as _,c as r,d as i,M as p,b as s,e as a,g,h as u,F as h,p as B,i as f}from"./app-DTbi3nY0.js";import{B as m}from"./BlogCard--aXgv_CY.js";const b=o=>(B("data-v-42d61e7f"),o=o(),f(),o),v=b(()=>a("div",{class:"header"},[a("h1",null,"Alle Blogs")],-1)),x={class:"blog-list"},k={__name:"AllBlogs",setup(o){const t=n([]);return d(async()=>{try{const e=await _.get("/api/blogs");t.value=e.data,console.log("Blogs geladen:",e.data)}catch(e){console.error("Error loading blogs:",e)}}),(e,I)=>(s(),r(p,null,{default:i(()=>[v,a("div",x,[(s(!0),g(h,null,u(t.value,l=>(s(),r(m,{key:l.id,blog:l},null,8,["blog"]))),128))])]),_:1}))}},A=c(k,[["__scopeId","data-v-42d61e7f"]]);export{A as default};