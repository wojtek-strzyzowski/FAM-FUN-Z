import{_ as q,r as l,o as N,a as B,b as d,c as O,d as P,e as o,f as i,v as $,g as _,h as E,F as I,B as J,k as n,j as L,M as j,u as H,y as K,t as M,C as W,p as Z,i as G}from"./app-Cr2bYjbY.js";const s=v=>(Z("data-v-b638cf2e"),v=v(),G(),v),Q={class:"form__group"},X=s(()=>o("label",{for:"category"},"Category",-1)),Y=["value"],ee={class:"form__group"},te=s(()=>o("label",{for:"thumbnail"},"Thumbnail",-1)),oe=["src"],ae={class:"form__group"},le=s(()=>o("label",{for:"title"},"Title",-1)),se={class:"form__group"},ie=s(()=>o("label",{for:"description"},"Description",-1)),ne={class:"form__group"},de=s(()=>o("label",{for:"content"},"Content",-1)),re={class:"form__group"},ue=s(()=>o("label",{for:"address"},"Address",-1)),pe={class:"form__group"},ce=s(()=>o("label",{for:"zip"},"ZIP",-1)),_e={class:"form__group"},ve=s(()=>o("label",{for:"city"},"City",-1)),me={class:"form__group"},ge=s(()=>o("label",{for:"homepage"},"Homepage",-1)),fe={class:"form__group"},he=s(()=>o("label",{for:"custom_special"},"Ausstattung",-1)),be={class:"custom_special"},ye=["for"],xe=["id","value"],ke={class:"form__group"},we=s(()=>o("label",{for:"additionalInfo"},"Additional Info",-1)),Ue=s(()=>o("button",{type:"submit"},"Aktualisieren",-1)),Be={__name:"EditBlog",setup(v){const D=H(),V=K(),m=l(""),g=l(""),r=l(""),U=l(null),f=l(null),h=l(""),b=l(""),y=l(""),x=l(""),u=l([]),k=l(""),R=l(""),w=l(null),C=l([]),p=l([{id:"toilet",label:"WC",selected:!1},{id:"drinking_water",label:"Trinkwasser",selected:!1},{id:"stroller_friendly",label:"Kinderwagen freundlich",selected:!1},{id:"changing_room",label:"Umkleide",selected:!1},{id:"restaurant_shopping",label:"Restaurant/Einkaufen",selected:!1}]),z=a=>{const t=a.target.files[0];if(U.value=t,t){const e=new FileReader;e.onload=c=>{f.value=c.target.result},e.readAsDataURL(t)}},A=async a=>{try{const e=(await B.get(`/api/blogs/get/${a}`)).data;m.value=e.title,g.value=e.description,r.value=e.content,h.value=e.address,b.value=e.zip,y.value=e.city,x.value=e.homepage,w.value=e.category_id,u.value=JSON.parse(e.custom_special||"[]"),k.value=e.additional_info,f.value=e.thumbnail?`/storage/${e.thumbnail}`:null,u.value.forEach(c=>{const S=p.value.find(T=>T.id===c);S&&(S.selected=!0)})}catch(t){console.error("Error loading blog:",t)}},F=async()=>{const a=new FormData;a.append("title",m.value),a.append("description",g.value),a.append("content",r.value),a.append("address",h.value),a.append("zip",b.value),a.append("city",y.value),a.append("homepage",x.value),a.append("category_id",w.value),p.value.forEach(t=>{t.selected=u.value.includes(t.id)}),p.value.push({id:"sonstiges",label:R.value,selected:!0}),a.append("custom_special",JSON.stringify(p.value)),a.append("additional_info",k.value),U.value&&a.append("thumbnail",U.value);for(let t of a.entries())console.log(t[0]+": "+t[1]);try{const t=await B.post(`/api/blogs/update/${V.params.id}`,a);console.log("Response:",t.data),D.push({name:"SingleBlog",params:{id:t.data.id}})}catch(t){console.error("Error updating blog:",t.response?t.response.data:t.message)}console.log("Update Blog:",r.value)};return N(()=>{A(V.params.id),B.get("/api/categories").then(a=>{C.value=a.data})}),(a,t)=>(d(),O(j,{title:"Edit Blog"},{default:P(()=>[o("form",{onSubmit:L(F,["prevent"])},[o("div",Q,[X,i(o("select",{id:"category","onUpdate:modelValue":t[0]||(t[0]=e=>w.value=e),required:""},[(d(!0),_(I,null,E(C.value,e=>(d(),_("option",{key:e.id,value:e.id},M(e.name),9,Y))),128))],512),[[$,w.value]])]),o("div",ee,[te,o("input",{id:"thumbnail",type:"file",onChange:z},null,32),f.value?(d(),_("img",{key:0,src:f.value,alt:"Thumbnail Preview",class:"thumbnail-preview"},null,8,oe)):J("",!0)]),o("div",ae,[le,i(o("input",{id:"title","onUpdate:modelValue":t[1]||(t[1]=e=>m.value=e),type:"text",required:""},null,512),[[n,m.value]])]),o("div",se,[ie,i(o("textarea",{id:"description","onUpdate:modelValue":t[2]||(t[2]=e=>g.value=e),required:""},null,512),[[n,g.value]])]),o("div",ne,[de,i(o("textarea",{id:"content","onUpdate:modelValue":t[3]||(t[3]=e=>r.value=e),required:""},null,512),[[n,r.value]])]),o("div",re,[ue,i(o("input",{id:"address","onUpdate:modelValue":t[4]||(t[4]=e=>h.value=e),type:"text"},null,512),[[n,h.value]])]),o("div",pe,[ce,i(o("input",{id:"zip","onUpdate:modelValue":t[5]||(t[5]=e=>b.value=e),type:"text"},null,512),[[n,b.value]])]),o("div",_e,[ve,i(o("input",{id:"city","onUpdate:modelValue":t[6]||(t[6]=e=>y.value=e),type:"text"},null,512),[[n,y.value]])]),o("div",me,[ge,i(o("input",{id:"homepage","onUpdate:modelValue":t[7]||(t[7]=e=>x.value=e),type:"text"},null,512),[[n,x.value]])]),o("div",fe,[he,o("div",be,[(d(!0),_(I,null,E(p.value,e=>(d(),_("div",{key:e.id,class:"checkbox_container"},[o("label",{for:e.id},M(e.label),9,ye),i(o("input",{type:"checkbox",id:e.id,value:e.id,"onUpdate:modelValue":t[8]||(t[8]=c=>u.value=c)},null,8,xe),[[W,u.value]])]))),128))])]),o("div",ke,[we,i(o("textarea",{id:"additionalInfo","onUpdate:modelValue":t[9]||(t[9]=e=>k.value=e)},null,512),[[n,k.value]])]),Ue],32)]),_:1}))}},Ce=q(Be,[["__scopeId","data-v-b638cf2e"]]);export{Ce as default};
