import{_ as M,r as y,o as A,x as P,w as V,a as w,b as r,g as c,F as x,h as G,e as t,t as v,f as S,k as C,p as L,i as K,y as z,z as F,l as U,A as W,c as q,d as H,M as O,B as k,q as R,m as T,u as j}from"./app-BrzEXclJ.js";const J=d=>(L("data-v-fd62bddb"),d=d(),K(),d),Y={class:"comment-section"},Z=J(()=>t("h2",null,"Kommentare",-1)),Q={key:0},X={key:1},ee={class:"new-comment"},te={__name:"CommentSection",props:{blogId:{type:Number,required:!0}},setup(d){const n=d,i=y([]),l=y("");let g=null;A(async()=>{await _(),h()}),P(()=>{b()}),V(()=>n.blogId,async()=>{await _(),b(),h()});const _=async()=>{try{const u=await w.get(`/api/comments?blog_id=${n.blogId}`);i.value=u.data,console.log("Kommentare geladen:",u.data)}catch(u){console.error("Error fetching comments:",u)}},f=async()=>{if(l.value.trim()!=="")try{const u=await w.post("/api/comments/store",{blog_id:n.blogId,content:l.value});i.value.push(u.data),l.value="",await _()}catch(u){console.error("Error submitting comment:",u)}},h=()=>{g=setInterval(_,9e5)},b=()=>{g&&(clearInterval(g),g=null)};return(u,I)=>(r(),c("div",Y,[Z,i.value.length===0?(r(),c("div",Q,"Keine Kommentare vorhanden.")):(r(),c("div",X,[(r(!0),c(x,null,G(i.value,o=>(r(),c("div",{key:o.id,class:"comment"},[t("p",null,v(o.content),1)]))),128))])),t("div",ee,[S(t("textarea",{"onUpdate:modelValue":I[0]||(I[0]=o=>l.value=o),placeholder:"Schreibe einen Kommentar..."},null,512),[[C,l.value]]),t("button",{onClick:f},"Kommentar hinzufügen")])]))}},oe=M(te,[["__scopeId","data-v-fd62bddb"]]),B=d=>(L("data-v-1005addc"),d=d(),K(),d),ne={id:"floating-panel"},se=B(()=>t("strong",null,"Start:",-1)),ae=B(()=>t("br",null,null,-1)),le=B(()=>t("strong",null,"Ende:",-1)),re=F('<br data-v-1005addc><strong data-v-1005addc>Modus:</strong><select id="mode" data-v-1005addc><option value="DRIVING" data-v-1005addc>Fahren</option><option value="WALKING" data-v-1005addc>Gehen</option><option value="BICYCLING" data-v-1005addc>Fahrradfahren</option><option value="TRANSIT" data-v-1005addc>Öffentliche Verkehrsmittel</option></select>',3),ce=B(()=>t("div",{id:"map",class:"map"},null,-1)),de=B(()=>t("div",{id:"sidebar"},null,-1)),ie={__name:"GoogleMap",setup(d){const n=y(null),i=y(""),l=y(""),g=z(),_=()=>{const o="AIzaSyCJfL4ue7m7ugPKfRMf1KRA0nzwK_fyFcE";if(document.querySelector(`script[src*="maps.googleapis.com/maps/api/js?key=${o}"]`))f();else{const e=document.createElement("script");e.src=`https://maps.googleapis.com/maps/api/js?key=${o}&callback=initMap`,e.async=!0,e.defer=!0,e.setAttribute("loading","async"),window.initMap=f,document.head.appendChild(e)}},f=()=>{const o=new google.maps.Geocoder,e=new google.maps.DirectionsRenderer,s=new google.maps.DirectionsService,a=new google.maps.Map(document.getElementById("map"),{zoom:7,center:{lat:47.3769,lng:8.5417},disableDefaultUI:!0});e.setMap(a),e.setPanel(document.getElementById("sidebar"));const p=document.getElementById("floating-panel");a.controls[google.maps.ControlPosition.TOP_CENTER].push(p);const m=()=>{u(s,e)};document.getElementById("start").addEventListener("change",m),document.getElementById("end").addEventListener("change",m),document.getElementById("mode").addEventListener("change",m);const E=document.createElement("button");E.textContent="Ihr Standort",E.classList.add("custom-map-control-button"),a.controls[google.maps.ControlPosition.TOP_CENTER].push(E),E.addEventListener("click",()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition($=>{const D={lat:$.coords.latitude,lng:$.coords.longitude};console.log("Aktuelle Position:",D),h(o,D,a)},$=>{console.error("Fehler beim Abrufen des aktuellen Standorts:",$),b(!0,a.getCenter())}):b(!1,a.getCenter())})},h=async(o,e,s)=>{try{const a=await o.geocode({location:e});a.results[0]?(console.log("Geocoding-Ergebnisse:",a.results),i.value=a.results[0].formatted_address,document.getElementById("start").value=i.value,new google.maps.InfoWindow({position:e,content:a.results[0].formatted_address}).open(s),s.setCenter(e)):console.error("Keine Ergebnisse gefunden")}catch(a){window.alert(`Geocoder failed due to: ${a}`)}},b=(o,e)=>{new google.maps.InfoWindow({position:e,content:o?"Error: The Geolocation service failed.":"Error: Your browser doesn't support geolocation."}).open(n.value)},u=(o,e)=>{const s=document.getElementById("start").value,a=document.getElementById("end").value,p=document.getElementById("mode").value;o.route({origin:s,destination:a,travelMode:google.maps.TravelMode[p]}).then(m=>{e.setDirections(m)}).catch(m=>window.alert("Directions request failed due to "+m))},I=async()=>{try{const e=(await w.get(`/api/blog/${g.params.id}`)).data;l.value=`${e.address}, ${e.zip} ${e.city}`,console.log("Abgerufene Adresse:",l.value)}catch(o){console.error("Fehler beim Abrufen der Blogadresse:",o)}};return A(()=>{_(),I()}),(o,e)=>(r(),c("div",null,[t("div",ne,[se,S(t("input",{id:"start","onUpdate:modelValue":e[0]||(e[0]=s=>i.value=s),placeholder:"Geben Sie Ihre Adresse ein"},null,512),[[C,i.value]]),ae,le,S(t("input",{id:"end","onUpdate:modelValue":e[1]||(e[1]=s=>l.value=s),placeholder:"Zieladresse"},null,512),[[C,l.value]]),re]),ce,de]))}},ue=M(ie,[["__scopeId","data-v-1005addc"]]),N=d=>(L("data-v-37ac8e2f"),d=d(),K(),d),ge={key:0,class:"blog"},pe={class:"header"},me={class:"meta-info"},ve={key:0},_e={key:1},he={class:"description"},fe={class:"title"},ye={class:"address-thumbnail"},be={class:"address"},we=["href"],Ie={class:"thumbnail"},Ee=["src"],$e={class:"map"},Be={key:0},ke=N(()=>t("h3",null,"Ausstattung und Besonderheiten:",-1)),Se={key:1},Ce=N(()=>t("p",null,"Keine Specials ausgewählt.",-1)),Me=[Ce],Ae=["innerHTML"],Le={key:1},Ke=N(()=>t("p",null,"Loading...",-1)),Ne=[Ke],De={__name:"SingleBlog",setup(d){const n=y(null),i=y(null),l=y(null),g=z(),_=j(),f=U(),h=W(()=>{if(!n.value||!n.value.custom_special)return[];let o;try{o=JSON.parse(n.value.custom_special)}catch(e){return console.error("Error parsing custom_special:",e),[]}return o.filter(e=>e.selected)});A(async()=>{var o,e;try{const s=await w.get(`/api/blog/${g.params.id}`);n.value=s.data,console.log("Blog geladen:",s.data),console.log(n.value.custom_special);const a=await w.get(`/api/categories/${s.data.category_id}`);i.value=a.data,console.log("Kategorie geladen:",a.data);const p=await w.get(`/api/users/${s.data.user_id}`);l.value=p.data,console.log("Benutzer geladen:",p.data),console.log("Ausgewählte Specials:",h.value),console.log("Blog-Verfasser Name:",(o=l.value)==null?void 0:o.name),console.log("Eingeloggter Benutzer Name:",(e=f.authUser)==null?void 0:e.name)}catch(s){console.error("Error loading blog, category, or user:",s)}});const b=o=>{const e={day:"2-digit",month:"2-digit",year:"numeric"};return new Date(o).toLocaleDateString("de-DE",e)},u=()=>{_.push(`/edit-blog/${g.params.id}`)},I=async()=>{try{await w.delete(`/api/blogs/${g.params.id}`),console.log("Blog erfolgreich gelöscht"),_.push("/")}catch(o){console.error("Fehler beim Löschen des Blogs:",o)}};return(o,e)=>(r(),q(O,null,{default:H(()=>{var s,a,p,m;return[n.value?(r(),c("div",ge,[t("div",pe,[t("div",me,[t("p",null,v(b(n.value.created_at)),1),i.value?(r(),c("p",ve,v((s=i.value)==null?void 0:s.name),1)):k("",!0),l.value?(r(),c("p",_e,v((a=l.value)==null?void 0:a.name),1)):k("",!0)]),t("div",he,[t("p",null,v(n.value.description),1)])]),t("div",fe,[t("h1",null,v(n.value.title),1)]),t("div",ye,[t("div",be,[t("p",null,v(n.value.address),1),t("p",null,v(n.value.city)+", "+v(n.value.zip),1),t("a",{href:n.value.homepage,target:"_blank"},"Homepage",8,we)]),t("div",Ie,[t("img",{src:`/storage/${n.value.thumbnail}`,alt:"Thumbnail"},null,8,Ee)])]),t("div",$e,[R(ue,{address:`${n.value.address}, ${n.value.city}, ${n.value.zip}`},null,8,["address"])]),h.value&&h.value.length>0?(r(),c("div",Be,[ke,t("ul",null,[(r(!0),c(x,null,G(h.value,(E,$)=>(r(),c("li",{key:$},v(E.label),1))),128))])])):(r(),c("div",Se,Me)),t("div",{class:"content",innerHTML:n.value.content},null,8,Ae),R(oe,{blogId:n.value.id},null,8,["blogId"])])):(r(),c("div",Le,Ne)),n.value&&l.value&&l.value.name===((p=T(f).authUser)==null?void 0:p.name)?(r(),c("button",{key:2,onClick:u},"Editieren")):k("",!0),n.value&&l.value&&l.value.name===((m=T(f).authUser)==null?void 0:m.name)?(r(),c("button",{key:3,onClick:I},"Löschen")):k("",!0)]}),_:1}))}},Te=M(De,[["__scopeId","data-v-37ac8e2f"]]);export{Te as default};
