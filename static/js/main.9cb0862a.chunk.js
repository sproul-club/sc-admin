(this["webpackJsonpsc-admin-app"]=this["webpackJsonpsc-admin-app"]||[]).push([[0],{155:function(e,t,a){e.exports=a(290)},160:function(e,t,a){},290:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(33),l=a.n(c),s=(a(160),a(17)),o=a(2),i=a.n(o),u=a(6),m=a(1),p=a(305),d=a(306),f=a(327),g=a(307),b=a(309),E=a(310),h=a(325),v=a(311),x=a(70),O=a.n(x),y=a(13),w=a(10),k=a(34),j=a(48),C=a(133),S=a.n(C).a.create({baseURL:"https://sc-backend-prod.herokuapp.com",headers:{accept:"application/json","Access-Control-Allow-Origin":"*","Content-Type":"application/json"}}),T=function(){function e(t,a){Object(k.a)(this,e),this.tokenKey=t,this.expireKey=a,this.initializeAccessHeader()}return Object(j.a)(e,[{key:"set",value:function(e,t){localStorage.setItem(this.tokenKey,e),localStorage.setItem(this.expireKey,(new Date).getTime()+1e3*t),this.initializeAccessHeader()}},{key:"get",value:function(){return localStorage.getItem(this.tokenKey)}},{key:"initializeAccessHeader",value:function(){var e=this.get();"token"===this.tokenKey&&e&&(S.defaults.headers.common.Authorization="Bearer ".concat(e))}},{key:"exists",value:function(){return!!this.get()}},{key:"header",value:function(){return"Bearer ".concat(this.get())}},{key:"fullHeaderConfig",value:function(){return{headers:{Authorization:this.header()}}}},{key:"expiresAt",value:function(){return localStorage.getItem(this.expireKey)}},{key:"hasExpired",value:function(){return(new Date).getTime()>this.expiresAt()}},{key:"delete",value:function(){localStorage.setItem(this.tokenKey,""),localStorage.setItem(this.expireKey,-1),"token"===this.tokenKey&&delete S.defaults.headers.common.Authorization}}]),e}(),D={access:new T("token","expiresAt"),refresh:new T("refreshToken","refreshExpiresAt")},L=new(function(){function e(t){var a=t.accessAuthToken,n=t.refreshAuthToken;Object(k.a)(this,e),this.accessToken=a,this.refreshToken=n}return Object(j.a)(e,[{key:"isLoggedIn",value:function(){return this.accessToken.exists()&&!this.accessToken.hasExpired()}},{key:"isFullyLoggedIn",value:function(){var e=this.refreshToken.exists()&&!this.refreshToken.hasExpired();return this.isLoggedIn()&&e}},{key:"signIn",value:function(){var e=Object(u.a)(i.a.mark((function e(t){var a,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.email,n=t.password,e.next=3,S.post("/api/monitor/login",{email:a,password:n});case 3:r=e.sent,this.accessToken.set(r.data.access,r.data.access_expires_in),this.refreshToken.set(r.data.refresh,r.data.refresh_expires_in);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"signOut",value:function(){var e=Object(u.a)(i.a.mark((function e(){var t=arguments;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(!(t.length>0&&void 0!==t[0])||t[0])){e.next=6;break}return e.next=4,S.delete("/api/user/revoke-access",D.access.fullHeaderConfig());case 4:return e.next=6,S.delete("/api/user/revoke-refresh",D.refresh.fullHeaderConfig());case 6:this.accessToken.delete(),this.refreshToken.delete();case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}())({accessAuthToken:D.access,refreshAuthToken:D.refresh}),A=a(22),_=function(){Object(s.useTitle)("Login - sproul.club Dashboard");var e=Object(n.useState)(!1),t=Object(m.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(!1),o=Object(m.a)(l,2),x=o[0],k=o[1],j=function(){var e=Object(u.a)(i.a.mark((function e(t){var a,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),k(!0),a=t.target.email.value,n=t.target.password.value,e.prev=4,e.next=7,L.signIn({email:a,password:n});case 7:k(!1),Object(s.navigate)(yt.HOME.path),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(4),r=e.t0.response&&e.t0.response.data&&e.t0.response.data.reason,A.b.error(r||e.t0.message),k(!1);case 16:case"end":return e.stop()}}),e,null,[[4,11]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(p.a,{align:"center",bg:"blue.100",justify:"center",minHeight:"100vh"},r.a.createElement("form",{onSubmit:j},r.a.createElement(d.a,{bg:"white",spacing:4,align:"center",padding:"32px"},r.a.createElement(f.a,{src:O.a,boxSize:"192px"}),r.a.createElement(g.a,{as:"h1",size:"xl"},"Login"),r.a.createElement(h.a,{name:"email",type:"email",placeholder:"Email",isRequired:!0}),r.a.createElement(b.a,null,r.a.createElement(h.a,{name:"password",type:a?"text":"password",placeholder:"Enter password",isRequired:!0}),r.a.createElement(E.a,null,r.a.createElement(v.a,{onClick:function(){return c(!a)}},r.a.createElement(y.a,{icon:a?w.i:w.j})))),r.a.createElement(d.a,{spacing:8,align:"center",isInline:!0},r.a.createElement(v.a,{isLoading:x,colorScheme:"blue",type:"submit"},"Login")))))},R=a(312),z=a(314),N=a(313),U=a(60),M=a(292),I=function(e){var t=e.hasNavbar,a=void 0!==t&&t;return r.a.createElement(p.a,{align:"center",justify:"center",minHeight:a?"90vh":"100vh"},r.a.createElement(M.a,{size:"xl"}))},B=a(93),H={404:"Oh no! This page does not exist!",403:"You are not allowed to go here!",500:"An internal server error has occurred! Call the backend dev about this abomination and tell them 'shame on you and your cow'."},q=function(e){var t=e.errorCode,a=e.errorMsg||H[t]||"An unexpected error happened!";return r.a.createElement(p.a,{align:"center",justify:"center",minHeight:"100vh"},r.a.createElement(d.a,{spacing:8,align:"center",padding:"32px"},r.a.createElement(R.a,{paddingBottom:"2.0rem"}),r.a.createElement(B.a,{name:"warning",size:"10rem",color:"red.500"}),t&&r.a.createElement(g.a,{as:"h1",size:"xl"},"Error ",t),r.a.createElement(g.a,{as:"h4",size:"md"},a)))},P=function(e){var t=e.promiseFn,a=e.children;return r.a.createElement(U.a,{promiseFn:t},r.a.createElement(U.a.Loading,null,r.a.createElement(I,{hasNavbar:!0})),r.a.createElement(U.a.Fulfilled,null,(function(e,t){var n=t.setData,r=t.reload;return a(e,{setData:n,reload:r})})),r.a.createElement(U.a.Rejected,null,(function(e){return r.a.createElement(q,{errorCode:e.code,errorMsg:e.message})})))},F=function(e){return r.a.createElement(R.a,Object.assign({px:"4",py:"5",rounded:"sm",shadow:"lg"},e))},Y=function(e){var t=e.children,a=e.onReload;return r.a.createElement(p.a,{justify:"space-between",paddingBottom:"8px"},r.a.createElement(g.a,{as:"h3",size:"lg"},t),a&&r.a.createElement(v.a,{onClick:a},r.a.createElement(y.a,{icon:w.l})))},K=function(e){var t=e.label,a=e.number,n=e.arrow,c=void 0===n?null:n,l=e.helpText,s=void 0===l?null:l;e.isLoaded;return r.a.createElement(F,null,r.a.createElement(N.a,null,r.a.createElement(N.d,null,t),r.a.createElement(N.e,null,a),s&&r.a.createElement(N.c,null,c&&r.a.createElement(N.b,{type:c}),s)))};function G(){return W.apply(this,arguments)}function W(){return(W=Object(u.a)(i.a.mark((function e(){var t,a,n,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([S.get("/api/monitor/overview/stats/sign-up"),S.get("/api/monitor/overview/stats/activity")]);case 2:return t=e.sent,a=Object(m.a)(t,2),n=a[0],r=a[1],e.abrupt("return",{signUp:n.data.main,recentSignUp:n.data.changed,activity:r.data});case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function J(e){return e>0?"increase":e<0?"decrease":null}var V=function(e){var t=e.stats,a=e.reload;return r.a.createElement(d.a,{padding:"".concat(48,"px"),pr:"".concat(72,"px"),pl:"".concat(72,"px")},r.a.createElement(Y,{onReload:a},"Sign Up"),r.a.createElement(z.a,{templateColumns:"repeat(5, 1fr)",gap:6},r.a.createElement(K,{label:"Number of clubs registered",number:t.signUp.clubs_registered,arrow:J(t.recentSignUp.clubs_registered),helpText:"".concat(Math.abs(t.recentSignUp.clubs_registered)," from past week")}),r.a.createElement(K,{label:"Number of confirmed clubs",number:t.signUp.clubs_confirmed,arrow:J(t.recentSignUp.clubs_confirmed),helpText:"".concat(Math.abs(t.recentSignUp.clubs_confirmed)," from past week")}),r.a.createElement(K,{label:"Number of clubs on RSO list",number:t.signUp.clubs_rso_list}),r.a.createElement(K,{label:"Number of students registered",number:t.signUp.students_signed_up,arrow:J(t.recentSignUp.students_signed_up),helpText:"".concat(Math.abs(t.recentSignUp.students_signed_up)," from past week")}),r.a.createElement(K,{label:"Number of students confirmed",number:t.signUp.students_confirmed,arrow:J(t.recentSignUp.students_confirmed),helpText:"".concat(Math.abs(t.recentSignUp.students_confirmed)," from past week")})),r.a.createElement(R.a,{padding:"".concat(16,"px")}),r.a.createElement(Y,null,"Activity"),r.a.createElement(z.a,{templateColumns:"repeat(3, 1fr)",gap:6},r.a.createElement(K,{label:"Number of active club admins",number:t.activity.active_admins}),r.a.createElement(K,{label:"Number of active users",number:t.activity.active_users}),r.a.createElement(K,{label:"Number of searches",number:t.activity.catalog_searches})))},$=function(){return Object(s.useTitle)("Home - sproul.club Dashboard"),r.a.createElement(P,{promiseFn:G},(function(e,t){var a=t.reload;return r.a.createElement(V,{stats:e,reload:a})}))},Q=a(318),X=a(324);function Z(e){return r.a.createElement(R.a,{shadow:"sm",rounded:"lg",overflow:"hidden"},r.a.createElement(R.a,Object.assign({as:"table",width:"full"},e)))}function ee(e){return r.a.createElement(R.a,Object.assign({as:"thead"},e))}function te(e){return r.a.createElement(R.a,Object.assign({as:"tr"},e))}function ae(e){return r.a.createElement(R.a,Object.assign({as:"th",px:"6",py:"3",borderBottomWidth:"1px",backgroundColor:"gray.50",textAlign:"left",fontSize:"xs",color:"gray.500",textTransform:"uppercase",letterSpacing:"wider",lineHeight:"1rem",fontWeight:"medium"},e))}function ne(e){return r.a.createElement(R.a,Object.assign({as:"tbody"},e))}function re(e){return r.a.createElement(R.a,Object.assign({as:"td",px:"4",py:"2",lineHeight:"1.25rem",whiteSpace:"nowrap"},e))}var ce=a(319),le=a(52),se=a.n(le),oe=a(315),ie=a(191);function ue(e){var t=e.data,a=e.mapper,r=void 0===a?function(e){return e}:a,c=e.searchDelay,l=void 0===c?0:c,s=e.onListChange,o=void 0===s?null:s,p=Object(n.useState)(""),d=Object(m.a)(p,2),f=d[0],g=d[1],b=Object(n.useState)(!1),E=Object(m.a)(b,2),h=E[0],v=E[1],x=Object(n.useState)([]),O=Object(m.a)(x,2),y=O[0],w=O[1];function k(e){if(!e)return!1;var t=r(e).toLowerCase(),a=f.toLowerCase();return t.includes(a)}var j=Object(oe.a)((function(e){v(!0),g(e),v(!1)}),l);function C(){return(C=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.next=3,t();case 3:return e.next=5,o();case 5:v(!1);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){var e=f?t.filter(k):t;w(e)}),[t,f]),[{get:function(){return f},set:j.callback},{get:function(){return h},set:v},y,o?function(e){return C.apply(this,arguments)}:null]}function me(e,t,a){var r=Object(n.useState)(1),c=Object(m.a)(r,2),l=c[0],s=c[1],o=Object(n.useState)([]),i=Object(m.a)(o,2),u=i[0],p=i[1],d=Math.ceil(e.length/t);Object(n.useEffect)((function(){var a=(l-1)*t;p(e.slice(a,a+t))}),[e,l,t]),Object(n.useEffect)((function(){return s(1)}),[e]);return[l,d,u,function(){return l<d&&s(l+1)},function(){return l>1&&s(l-1)}]}var pe=a(139),de=function(e){var t=e.title,a=e.pageNum,n=e.numPages,c=e.prevPage,l=e.nextPage;return r.a.createElement(p.a,{justify:"space-between"},r.a.createElement(g.a,{as:"h1",size:"xl"},t),r.a.createElement(pe.a,{align:"flex-end",paddingTop:"4px"},r.a.createElement(v.a,{onClick:c,isDisabled:a<=1},r.a.createElement(y.a,{icon:w.d})),r.a.createElement(v.a,{isDisabled:!0},"".concat(a," / ").concat(n)),r.a.createElement(v.a,{onClick:l,isDisabled:a>=n},r.a.createElement(y.a,{icon:w.e}))))},fe=function(e){var t=e.onSearch,a=void 0===t?null:t,c=e.onChange,l=void 0===c?null:c,s=e.extraButtons,o=void 0===s?null:s,i=Object(n.useRef)(null);return r.a.createElement(p.a,null,r.a.createElement(b.a,{size:"lg",flexGrow:"1"},r.a.createElement(h.a,{rounded:"0",placeholder:"Search...",onChange:function(e){return l&&l(e.target.value.trim())},ref:i}),r.a.createElement(E.a,null,r.a.createElement(v.a,{colorScheme:"blue",isLoading:!1,onClick:function(){return a&&a(i.current.value.trim())}},r.a.createElement(y.a,{icon:w.m})))),o&&Object.keys(o).length>0&&r.a.createElement(pe.a,{align:"flex-end",paddingTop:"4px",paddingLeft:"4px"},o.map((function(e,t){var a=e.icon,n=e.onClick;return r.a.createElement(v.a,{onClick:n,key:t},r.a.createElement(y.a,{icon:a}))}))))},ge=a(322);function be(e,t){var a={};return Object.keys(e).forEach((function(n){t.current[n]?a[n]=t.current[n].value.trim():a[n]=e[n].value})),a}var Ee=function(e){var t=e.title,a=e.fields,c=e.ctrl,l=e.onSave,s=Object(n.useRef)({}),o=function(e){var t=Object(n.useState)(e),a=Object(m.a)(t,1)[0],r=Object(n.useState)(e),c=Object(m.a)(r,2),l=c[0],s=c[1],o=Object(n.useState)(!0),i=Object(m.a)(o,2),u=i[0],p=i[1];return Object(n.useEffect)((function(){p(ie(a,l))}),[l]),[l,s,u]}(be(a,s)),p=Object(m.a)(o,3),f=p[0],b=p[1],E=p[2];return r.a.createElement(ge.a,{isOpen:c.isOpen,onClose:c.onClose,isCentered:!0},r.a.createElement(ge.g,null,r.a.createElement(ge.d,null,r.a.createElement(ge.f,null,t),r.a.createElement(ge.c,null),r.a.createElement(ge.b,null,r.a.createElement(d.a,{spacing:3},Object.entries(a).map((function(e){var t=Object(m.a)(e,2),c=t[0],l=t[1];return r.a.createElement(n.Fragment,{key:c},r.a.createElement(g.a,{size:"md"},l.name),r.a.createElement(h.a,{placeholder:l.name,defaultValue:l.value||"",onChange:function(){return b(be(a,s))},ref:function(e){return s.current[c]=e}}))})))),r.a.createElement(ge.e,null,r.a.createElement(v.a,{colorScheme:"blue",mr:3,isDisabled:E,onClick:Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.onClose(),e.next=3,l(f);case 3:case"end":return e.stop()}}),e)})))},"Save"),r.a.createElement(v.a,{onClick:c.onClose},"Cancel")))))},he=a(323),ve=function(e){var t=e.title,a=e.fields,c=e.ctrl,l=e.onDelete;return r.a.createElement(ge.a,{isOpen:c.isOpen,onClose:c.onClose,isCentered:!0},r.a.createElement(ge.g,null,r.a.createElement(ge.d,null,r.a.createElement(ge.f,null,t),r.a.createElement(ge.c,null),r.a.createElement(ge.b,null,r.a.createElement(d.a,{spacing:3},a&&Object.keys(a).map((function(e,t){return r.a.createElement(n.Fragment,{key:t},r.a.createElement(g.a,{size:"md"},e),r.a.createElement(Q.a,null,a[e]))})))),r.a.createElement(ge.e,null,r.a.createElement(he.a,null,r.a.createElement(he.g,null,r.a.createElement(v.a,{colorScheme:"red",mr:3},"Delete")),r.a.createElement(he.e,null,r.a.createElement(he.b,null),r.a.createElement(he.f,null,"Are you sure?"),r.a.createElement(he.d,null),r.a.createElement(he.c,null,r.a.createElement(pe.a,{size:"sm"},r.a.createElement(v.a,{colorScheme:"red",onClick:Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.onClose(),e.next=3,l();case 3:case"end":return e.stop()}}),e)})))},"Yes"),r.a.createElement(v.a,{onClick:c.onClose},"No"))))),r.a.createElement(v.a,{onClick:c.onClose},"Cancel")))))};function xe(){return Oe.apply(this,arguments)}function Oe(){return(Oe=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.get("/api/monitor/rso/list");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ye(){return we.apply(this,arguments)}function we(){return(we=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.get("/api/monitor/rso/download");case 2:t=e.sent,se()(t.data,"rso_emails.csv");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ke(e){return je.apply(this,arguments)}function je(){return(je=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.post("/api/monitor/rso",{email:t});case 3:A.b.success("Successfully added RSO email: '".concat(t,"'!")),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),a=e.t0.response&&e.t0.response.data&&e.t0.response.data.reason,A.b.error(a||e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function Ce(e){return Se.apply(this,arguments)}function Se(){return(Se=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.delete("/api/monitor/rso/".concat(t));case 3:A.b.success("Successfully deleted RSO email: '".concat(t,"'!")),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),a=e.t0.response&&e.t0.response.data&&e.t0.response.data.reason,A.b.error(a||e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}var Te=function(e){var t=e.rso,a=e.onRequestDelete;return r.a.createElement(te,null,r.a.createElement(re,null,r.a.createElement(Q.a,{fontSize:"md",color:"gray.500"},t.email)),r.a.createElement(re,{bg:t.registered?"green.200":"red.200"},r.a.createElement(Q.a,{textAlign:"center",fontSize:"md",color:"gray.500"},t.registered?"Yes":"No")),r.a.createElement(re,{bg:t.confirmed?"green.200":"red.200"},r.a.createElement(Q.a,{textAlign:"center",fontSize:"md",color:"gray.500"},t.confirmed?"Yes":"No")),r.a.createElement(re,{textAlign:"center"},r.a.createElement(X.a,null,r.a.createElement(X.b,{as:v.a,variant:"ghost"},r.a.createElement(y.a,{icon:w.c,size:"sm"})),r.a.createElement(X.d,null,r.a.createElement(X.c,{onClick:a},r.a.createElement("span",null,r.a.createElement(y.a,{icon:w.o,size:"sm"}),"  ","Remove"))))))},De=function(e){var t=e.ctrl,a=e.onAdd;return r.a.createElement(Ee,{title:"Add RSO Email",ctrl:t,onSave:a,fields:{email:{name:"RSO Email",value:""}}})},Le=function(e){var t=e.rso,a=void 0===t?null:t,n=e.ctrl,c=e.onDelete;return a&&r.a.createElement(ve,{title:"Delete RSO Email",ctrl:n,onDelete:function(){return c(a)},fields:{"RSO Email":a.email,Registered:a.registered?"Yes":"No",Confirmed:a.confirmed?"Yes":"No"}})},Ae=function(e){var t=e.rsoList,a=e.setRsoList,c=ue({data:t,mapper:function(e){return e.email},searchDelay:500,onListChange:function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,xe();case 2:t=e.sent,a(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}),l=Object(m.a)(c,4),s=l[0],o=l[1],f=l[2],g=l[3],b=me(f,10),E=Object(m.a)(b,5),h=E[0],v=E[1],x=E[2],O=E[3],y=E[4],k=Object(ce.a)(),j=Object(ce.a)(),C=Object(n.useState)(null),S=Object(m.a)(C,2),T=S[0],D=S[1];return r.a.createElement(p.a,{align:"center",justify:"center"},r.a.createElement(d.a,{paddingTop:"32px"},r.a.createElement(de,{title:"RSO List",pageNum:h,numPages:v,prevPage:y,nextPage:O}),r.a.createElement(R.a,{paddingTop:"8px",paddingBottom:"4px"},r.a.createElement(fe,{onChange:function(e){return s.set(e)},onSearch:function(e){return s.set(e)},extraButtons:[{icon:w.k,onClick:j.onOpen},{icon:w.g,onClick:ye},{icon:w.n,onClick:function(){return g((function(){}))}}]})),r.a.createElement(Z,null,r.a.createElement(ee,null,r.a.createElement(te,null,r.a.createElement(ae,null,"Club email"),r.a.createElement(ae,null,"Registered?"),r.a.createElement(ae,null,"Confirmed?"),r.a.createElement(ae,null,"Actions"))),r.a.createElement(ne,{opacity:o.get()?.5:1},r.a.createElement(De,{ctrl:j,onAdd:function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g((function(){return ke(t.email)}));case 2:D(null);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),r.a.createElement(Le,{rso:T,ctrl:k,onDelete:function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g((function(){return Ce(t.email)}));case 2:D(null);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),x.map((function(e,t){return r.a.createElement(Te,{key:t,rso:e,onRequestDelete:function(){D(e),k.onOpen()}})}))))))},_e=function(){return Object(s.useTitle)("RSO List - sproul.club Dashboard"),r.a.createElement(P,{promiseFn:xe},(function(e,t){var a=t.setData;return r.a.createElement(Ae,{rsoList:e,setRsoList:a})}))};function Re(){return ze.apply(this,arguments)}function ze(){return(ze=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.get("/api/monitor/club/list");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ne(){return Ue.apply(this,arguments)}function Ue(){return(Ue=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.get("/api/monitor/club/download");case 2:t=e.sent,se()(t.data,"clubs.csv");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Me(e){return Ie.apply(this,arguments)}function Ie(){return(Ie=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.delete("/api/monitor/club/".concat(t.email));case 3:A.b.success("Successfully deleted club: '".concat(t.name,"'!")),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),a=e.t0.response&&e.t0.response.data&&e.t0.response.data.reason,A.b.error(a||e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}var Be=function(e){var t=e.club,a=e.onRequestDelete;return r.a.createElement(te,null,r.a.createElement(re,null,r.a.createElement(Q.a,{fontSize:"md",color:"gray.500"},t.name)),r.a.createElement(re,null,r.a.createElement(Q.a,{fontSize:"md",color:"gray.500"},t.email)),r.a.createElement(re,{bg:t.confirmed?"green.200":"red.200"},r.a.createElement(Q.a,{textAlign:"center",fontSize:"md",color:"gray.500"},t.confirmed?"Yes":"No")),r.a.createElement(re,{textAlign:"center"},r.a.createElement(X.a,null,r.a.createElement(X.b,{as:v.a,variant:"ghost"},r.a.createElement(y.a,{icon:w.c,size:"sm"})),r.a.createElement(X.d,null,r.a.createElement(X.c,{onClick:a},r.a.createElement("span",null,r.a.createElement(y.a,{icon:w.o,size:"sm"}),"  ","Remove"))))))},He=function(e){var t=e.club,a=void 0===t?null:t,n=e.ctrl,c=e.onDelete;return a&&r.a.createElement(ve,{title:"Delete Club",ctrl:n,onDelete:function(){return c(a)},fields:{"Club Name":a.name,"Club Email":a.email}})},qe=function(e){var t=e.clubs,a=e.setClubList,c=ue({data:t,mapper:function(e){return e.name},searchDelay:500,onListChange:function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Re();case 2:t=e.sent,a(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}),l=Object(m.a)(c,4),s=l[0],o=l[1],f=l[2],g=l[3],b=me(f,10),E=Object(m.a)(b,5),h=E[0],v=E[1],x=E[2],O=E[3],y=E[4],k=Object(ce.a)(),j=Object(n.useState)(null),C=Object(m.a)(j,2),S=C[0],T=C[1];return r.a.createElement(p.a,{align:"center",justify:"center"},r.a.createElement(d.a,{paddingTop:"32px"},r.a.createElement(de,{title:"Clubs",pageNum:h,numPages:v,prevPage:y,nextPage:O}),r.a.createElement(R.a,{paddingTop:"8px",paddingBottom:"4px"},r.a.createElement(fe,{onChange:function(e){return s.set(e)},onSearch:function(e){return s.set(e)},extraButtons:[{icon:w.g,onClick:Ne},{icon:w.n,onClick:function(){return g((function(){}))}}]})),r.a.createElement(Z,null,r.a.createElement(ee,null,r.a.createElement(te,null,r.a.createElement(ae,null,"Club name"),r.a.createElement(ae,null,"Club email"),r.a.createElement(ae,null,"Confirmed?"),r.a.createElement(ae,null,"Actions"))),r.a.createElement(ne,{opacity:o.get()?.5:1},r.a.createElement(He,{club:S,ctrl:k,onDelete:function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g((function(){return Me(t)}));case 2:T(null);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),x.map((function(e,t){return r.a.createElement(Be,{key:t,club:e,onRequestDelete:function(){T(e),k.onOpen()}})}))))))},Pe=function(){return Object(s.useTitle)("Clubs - sproul.club Dashboard"),r.a.createElement(P,{promiseFn:Re},(function(e,t){var a=t.setData;return r.a.createElement(qe,{clubs:e,setClubList:a})}))};function Fe(){return Ye.apply(this,arguments)}function Ye(){return(Ye=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.get("/api/monitor/tags/list");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ke(){return Ge.apply(this,arguments)}function Ge(){return(Ge=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S.get("/api/monitor/tags/download");case 2:t=e.sent,se()(t.data,"tags.csv");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function We(e){return Je.apply(this,arguments)}function Je(){return(Je=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.post("/api/monitor/tags",{name:t.name});case 3:A.b.success("Successfully added tag: '".concat(t.name,"'!")),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),a=e.t0.response&&e.t0.response.data&&e.t0.response.data.reason,A.b.error(a||e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function Ve(e,t){return $e.apply(this,arguments)}function $e(){return($e=Object(u.a)(i.a.mark((function e(t,a){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.put("/api/monitor/tags/".concat(t._id),{name:a.name});case 3:A.b.success("Successfully changed tag name from '".concat(t.name,"'' to '").concat(a.name,"'!")),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),n=e.t0.response&&e.t0.response.data&&e.t0.response.data.reason,A.b.error(n||e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}function Qe(e){return Xe.apply(this,arguments)}function Xe(){return(Xe=Object(u.a)(i.a.mark((function e(t){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.delete("/api/monitor/tags/".concat(t._id));case 3:A.b.success("Successfully deleted tag: '".concat(t.name,"'!")),e.next=10;break;case 6:e.prev=6,e.t0=e.catch(0),a=e.t0.response&&e.t0.response.data&&e.t0.response.data.reason,A.b.error(a||e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,6]])})))).apply(this,arguments)}var Ze=function(e){var t=e.tag,a=e.onRequestEdit,n=e.onRequestDelete;return r.a.createElement(te,null,r.a.createElement(re,null,r.a.createElement(Q.a,{fontSize:"md",color:"gray.500"},t.name)),r.a.createElement(re,{bg:0!==t.num_clubs?"green.200":"red.200"},r.a.createElement(Q.a,{textAlign:"center",fontSize:"md",color:"gray.500"},t.num_clubs)),r.a.createElement(re,{textAlign:"center"},r.a.createElement(X.a,null,r.a.createElement(X.b,{as:v.a,variant:"ghost"},r.a.createElement(y.a,{icon:w.c,size:"sm"})),r.a.createElement(X.d,null,r.a.createElement(X.c,{onClick:a},r.a.createElement("span",null,r.a.createElement(y.a,{icon:w.h,size:"sm"}),"  ","Edit")),r.a.createElement(X.c,{onClick:n},r.a.createElement("span",null,r.a.createElement(y.a,{icon:w.o,size:"sm"}),"  ","Remove"))))))},et=function(e){var t=e.ctrl,a=e.onAdd;return r.a.createElement(Ee,{title:"Add Tag",ctrl:t,onSave:a,fields:{name:{name:"Tag Name",value:""}}})},tt=function(e){var t=e.tag,a=void 0===t?null:t,n=e.ctrl,c=e.onEdit;return a&&r.a.createElement(Ee,{title:"Edit Tag",ctrl:n,onSave:c,fields:{name:{name:"Tag Name",value:a.name}}})},at=function(e){var t=e.tag,a=void 0===t?null:t,n=e.ctrl,c=e.onDelete;return a&&r.a.createElement(ve,{title:"Delete Tag",ctrl:n,onDelete:function(){return c(a)},fields:{"Tag Name":a.name,"# of Clubs":a.num_clubs}})},nt=function(e){var t=e.tags,a=e.setTags,c=ue({data:t,mapper:function(e){return e.name},searchDelay:500,onListChange:function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Fe();case 2:t=e.sent,a(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}),l=Object(m.a)(c,4),s=l[0],o=l[1],f=l[2],g=l[3],b=me(f,10),E=Object(m.a)(b,5),h=E[0],v=E[1],x=E[2],O=E[3],y=E[4],k=Object(ce.a)(),j=Object(ce.a)(),C=Object(ce.a)(),S=Object(n.useState)(null),T=Object(m.a)(S,2),D=T[0],L=T[1];return r.a.createElement(p.a,{align:"center",justify:"center"},r.a.createElement(d.a,{paddingTop:"32px"},r.a.createElement(de,{title:"Tags",pageNum:h,numPages:v,prevPage:y,nextPage:O}),r.a.createElement(R.a,{paddingTop:"8px",paddingBottom:"4px"},r.a.createElement(fe,{onChange:function(e){return s.set(e)},onSearch:function(e){return s.set(e)},extraButtons:[{icon:w.k,onClick:k.onOpen},{icon:w.g,onClick:Ke},{icon:w.n,onClick:function(){return g((function(){}))}}],onStartDownload:Ke})),r.a.createElement(Z,null,r.a.createElement(ee,null,r.a.createElement(te,null,r.a.createElement(ae,null,"Tag name"),r.a.createElement(ae,null,"# of clubs"),r.a.createElement(ae,null,"Actions"))),r.a.createElement(ne,{opacity:o.get()?.5:1},r.a.createElement(et,{ctrl:k,onAdd:function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g((function(){return We(t)}));case 2:L(null);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),r.a.createElement(tt,{tag:D,ctrl:j,onEdit:function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g((function(){return Ve(D,t)}));case 2:L(null);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),r.a.createElement(at,{tag:D,ctrl:C,onDelete:function(){var e=Object(u.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g((function(){return Qe(t)}));case 2:L(null);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}),x.map((function(e,t){return r.a.createElement(Ze,{key:t,tag:e,onRequestEdit:function(){L(e),j.onOpen()},onRequestDelete:function(){L(e),C.onOpen()}})}))))))},rt=function(){return Object(s.useTitle)("Tags - sproul.club Dashboard"),r.a.createElement(P,{promiseFn:Fe},(function(e,t){var a=t.setData;return r.a.createElement(nt,{tags:e,setTags:a})}))},ct=a(142),lt=a.n(ct),st=["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],ot=["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"];function it(){return ut.apply(this,arguments)}function ut(){return(ut=Object(u.a)(i.a.mark((function e(){var t,a,n,r,c,l;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([S.get("/api/monitor/tags/list"),S.get("/api/monitor/more-stats/social-media"),S.get("/api/monitor/more-stats/club-reqs"),S.get("/api/monitor/more-stats/pic-stats")]);case 2:return t=e.sent,a=Object(m.a)(t,4),n=a[0],r=a[1],c=a[2],l=a[3],e.abrupt("return",{tagUsage:n.data,socialMedia:r.data[0],clubReqs:c.data[0],picStats:l.data[0]});case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var mt=function(e){return r.a.createElement(R.a,Object.assign({px:"4",py:"5",rounded:"sm",shadow:"lg"},e))};function pt(e,t){for(var a=[],n=0;n<e;n++)a.push(t[n%t.length]);return a}for(var dt=function(e){var t=e.type,a=e.title,n=e.data,c=e.dataLabels,l=e.dataDescription,s=e.bgColors,o=e.borderColors,i=e.showLegend,u={labels:c,datasets:[{label:l,data:n,fill:!1,backgroundColor:s,borderColor:o,borderWidth:1}]},m={title:{display:!0,text:a,fontSize:18},legend:{display:void 0!==i&&i},responsive:!0,maintainAspectRatio:!0};return r.a.createElement(lt.a,{data:u,options:m,type:t,height:50,width:100})},ft=function(e){var t=e.stats,a=Object.keys(t),n=Object.values(t),c=n.length,l=pt(c,st),s=pt(c,ot);return r.a.createElement(dt,{type:"horizontalBar",title:"Social Media Usage",data:n,dataLabels:a,dataDescription:"# of clubs",bgColors:l,borderColors:s,showLegend:!0})},gt=function(e){var t=e.stats,a=t.map((function(e){return e.name})),n=t.map((function(e){return e.num_clubs})),c=n.length,l=pt(c,st),s=pt(c,ot);return r.a.createElement(dt,{type:"bar",title:"Tag Usage",data:n,dataLabels:a,dataDescription:"# of clubs",bgColors:l,borderColors:s,showLegend:!0})},bt=function(e){var t=e.stats,a=[t.app_required,t.no_app_required],n=[st[3],st[0]],c=[ot[3],ot[0]];return r.a.createElement(dt,{type:"doughnut",title:"App Required?",data:a,dataLabels:["Yes","No"],dataDescription:"# of clubs",bgColors:n,borderColors:c})},Et=function(e){var t=e.stats,a=[t.new_members,t.no_new_members],n=[st[3],st[0]],c=[ot[3],ot[0]];return r.a.createElement(dt,{type:"doughnut",title:"New Members?",data:a,dataLabels:["Yes","No"],dataDescription:"# of clubs",bgColors:n,borderColors:c})},ht=function(e){var t=e.stats,a=[t.logo_pic,t.no_logo_pic],n=[st[3],st[0]],c=[ot[3],ot[0]];return r.a.createElement(dt,{type:"doughnut",title:"Has Logo?",data:a,dataLabels:["Yes","No"],dataDescription:"# of clubs",bgColors:n,borderColors:c})},vt=function(e){var t=e.stats,a=[t.banner_pic,t.no_banner_pic],n=[st[3],st[0]],c=[ot[3],ot[0]];return r.a.createElement(dt,{type:"doughnut",title:"Has Banner?",data:a,dataLabels:["Yes","No"],dataDescription:"# of clubs",bgColors:n,borderColors:c})},xt=function(e){var t=e.stats,a=e.reload;return r.a.createElement(d.a,{padding:"24px",pr:"108px",pl:"108px"},r.a.createElement(p.a,{justify:"space-between"},r.a.createElement(g.a,{as:"h3",size:"lg"},"More Statistics"),r.a.createElement(v.a,{onClick:a},r.a.createElement(y.a,{icon:w.l}))),r.a.createElement(z.a,{templateColumns:"repeat(2, 1fr)",gap:6},r.a.createElement(mt,null,r.a.createElement(ft,{stats:t.socialMedia})),r.a.createElement(mt,null,r.a.createElement(gt,{stats:t.tagUsage}))),r.a.createElement(z.a,{templateColumns:"repeat(4, 1fr)",gap:6},r.a.createElement(mt,null,r.a.createElement(bt,{stats:t.clubReqs})),r.a.createElement(mt,null,r.a.createElement(Et,{stats:t.clubReqs})),r.a.createElement(mt,null,r.a.createElement(ht,{stats:t.picStats})),r.a.createElement(mt,null,r.a.createElement(vt,{stats:t.picStats}))))},Ot=function(){return Object(s.useTitle)("More Stats - sproul.club Dashboard"),r.a.createElement(P,{promiseFn:it},(function(e,t){var a=t.reload;return r.a.createElement(xt,{stats:e,reload:a})}))},yt={HOME:{name:"Overview",path:"/overview",widget:function(){return r.a.createElement($,null)}},LOGIN:{name:"Login",path:"/login",widget:function(){return r.a.createElement(_,null)},hidden:!0},RSO:{name:"RSO List",path:"/rso",widget:function(){return r.a.createElement(_e,null)}},CLUBS:{name:"Clubs",path:"/clubs",widget:function(){return r.a.createElement(Pe,null)}},TAGS:{name:"Tags",path:"/tags",widget:function(){return r.a.createElement(rt,null)}},MORE_STATS:{name:"More Stats",path:"/more-stats",widget:function(){return r.a.createElement(Ot,null)}}},wt={},kt=0,jt=Object.values(yt);kt<jt.length;kt++){var Ct=jt[kt];wt[Ct.path]=Ct.widget}var St=a(326),Tt=a(143),Dt="https://scoutapm.com/apps/182171",Lt="https://sentry.io/organizations/sproulclub/issues/?project=5392072",At=function(e){var t=e.link,a=e.children;return r.a.createElement(Q.a,{mt:{base:4,md:0},mr:6,display:"block"},r.a.createElement(s.A,{href:t},a))},_t=function(e){for(var t=e.showMenu,a=e.config,n=[],c=0,l=Object.entries(a);c<l.length;c++){var s=Object(m.a)(l[c],2),o=s[0],i=s[1];i.hidden||n.push(r.a.createElement(At,{key:o,link:i.path},i.name))}return r.a.createElement(R.a,{display:{sm:t?"block":"none",md:"flex"},width:{sm:"full",md:"auto"},alignItems:"center",flexGrow:1},n)};function Rt(){return zt.apply(this,arguments)}function zt(){return(zt=Object(u.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L.signOut();case 2:Object(s.navigate)(yt.LOGIN.path);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Nt=function(){var e=Object(n.useState)(!1),t=Object(m.a)(e,2),a=t[0],c=t[1],l=yt.HOME.path,o=Object(s.usePath)(),i=Object.values(yt).find((function(e){return o===e.path}));return!i||i.hidden?null:r.a.createElement(p.a,{as:"nav",align:"center",justify:"space-between",wrap:"wrap",padding:"1.0rem",bg:"blue.300",color:"white"},r.a.createElement(p.a,{align:"center",mr:5},r.a.createElement(s.A,{href:l},r.a.createElement(f.a,{src:O.a,boxSize:"3.0rem"})),r.a.createElement(g.a,{as:"h1",size:"lg",paddingLeft:"1.0rem"},r.a.createElement(s.A,{href:l},"sproul.club"))),r.a.createElement(R.a,{display:{sm:"block",md:"none"},onClick:function(){return c(!a)}},r.a.createElement(y.a,{icon:w.a})),r.a.createElement(_t,{showMenu:a,config:yt}),r.a.createElement(R.a,{display:{sm:a?"block":"none",md:"block"},mt:{base:4,md:0}},r.a.createElement(pe.a,null,r.a.createElement(v.a,{bg:"orange.300",border:"1px"},r.a.createElement("a",{href:Dt},r.a.createElement(y.a,{icon:w.f}),r.a.createElement("span",null,"  ","Scout APM"))),r.a.createElement(v.a,{bg:"purple.700",border:"1px"},r.a.createElement("a",{href:Lt},r.a.createElement(y.a,{icon:w.b}),r.a.createElement("span",null,"  ","Sentry.IO"))),r.a.createElement(v.a,{bg:"transparent",border:"1px",onClick:Rt},"Log out"))))};a(289);Object(s.setBasepath)("/sc-admin");var Ut=function(){Object(s.useRedirect)("/",yt.LOGIN.path);var e=Object(s.useRoutes)(wt)||r.a.createElement(q,{errorCode:404}),t=L.isLoggedIn();return t||Object(s.navigate)("/login"),r.a.createElement(St.a,{theme:Tt.b},r.a.createElement(A.a,{position:"top-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),t&&r.a.createElement(Nt,null),t?e:yt.LOGIN.widget())};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(Ut,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},70:function(e,t,a){e.exports=a.p+"static/media/logo.0f4508cd.png"}},[[155,1,2]]]);
//# sourceMappingURL=main.9cb0862a.chunk.js.map