(window.webpackJsonpfrontend=window.webpackJsonpfrontend||[]).push([[3],{71:function(e,t,a){"use strict";a.r(t);var c=a(0),s=a.n(c),n=a(10),l=a(29),r=a(25),d=a(12),i=a(23);t.default=function(e){var t=e.test,a=e.type,c=e.user,m="";return m="/app/testInfo/".concat("full"===a||"created"===a?t._id:t.testId),"result"===a?s.a.createElement(n.b,{to:m,key:t._id},s.a.createElement("div",{class:"test-card"},s.a.createElement("h3",{class:"test-card__title"},t.title),s.a.createElement(r.a,{points:t.points,maxPoints:t.maxPoints}),s.a.createElement(n.b,{className:"result-link",to:"/app/testResult/".concat(c._id,"/").concat(t._id)},"View result"),s.a.createElement("h4",{class:"test-card__date"},Object(l.a)(t.date)))):"created"===a?s.a.createElement(n.b,{to:m},s.a.createElement("div",{class:"test-card"},s.a.createElement("h3",{class:"test-card__title"},t.title),s.a.createElement("h4",{class:"test-card__subject"},t.subject),s.a.createElement("div",{class:"test-card__btns"},s.a.createElement("div",{class:"btns-btn left"},s.a.createElement(d.a,{className:"icon",icon:i.b})," ",s.a.createElement("span",null,"0")," "),s.a.createElement("div",{class:"btns-btn right"},s.a.createElement(d.a,{className:"icon",icon:i.d})," ",s.a.createElement("span",null,t.results.length)," ")),s.a.createElement("h4",{class:"test-card__date"},Object(l.a)(t.createdAt)))):"full"===a?s.a.createElement(n.b,{to:m},s.a.createElement("div",{class:"test-card"},s.a.createElement("h3",{class:"test-card__title"},t.title),s.a.createElement("h4",{class:"test-card__subject"},t.subject),s.a.createElement("p",{class:"test-card__description"},t.description?t.description:"No description provided!"),s.a.createElement("div",{class:"test-card__btns"},s.a.createElement("div",{class:"btns-btn left"},s.a.createElement(d.a,{className:"icon",icon:i.b})," ",s.a.createElement("span",null,"0")," "),s.a.createElement("div",{class:"btns-btn right"},s.a.createElement(d.a,{className:"icon",icon:i.d})," ",s.a.createElement("span",null,t.results.length)," ")),s.a.createElement("h4",{class:"test-card__date"},Object(l.a)(t.createdAt)))):void 0}}}]);
//# sourceMappingURL=3.66e5891f.chunk.js.map