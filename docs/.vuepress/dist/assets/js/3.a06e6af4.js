(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{13:function(t,e,i){"use strict";var a=i(8);i.n(a).a},41:function(t,e,i){"use strict";i.r(e);i(20),i(33);var a=i(19),s=i(36),n=i(0),r=Object(n.a)({},(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",[i("nav",{staticClass:"nav-bar"},[i("ul",{staticClass:"list"},[i("transition",{attrs:{name:"logo-anim","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[this.$page.frontmatter.home?t._e():i("router-link",{attrs:{to:"/"}},[i("img",{staticClass:"logo-link",attrs:{src:t.$withBase("/x-logo.svg")}})])],1),t._v(" "),t._l(t.$site.themeConfig.nav,(function(e){return i("li",[i("router-link",{attrs:{to:e.link}},[i("span",{staticClass:"underline"},[t._v(t._s(e.text))]),t._v(" "),i("img",{staticClass:"arrow-link",attrs:{src:t.$withBase("/arrow-link.svg")}})])],1)})),t._v(" "),i("router-link",{attrs:{to:"/nusasonic"}},[i("img",{staticClass:"nusa-link",attrs:{src:t.$withBase("/nusasonic-logo.svg")}})])],2)])])}),[],!1,null,null,null).exports,o=Object(n.a)({},(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("footer",[i("ul",{staticClass:"list"},[i("li",[t._m(0),t._v(" "),i("img",{staticClass:"arrow-link",attrs:{src:t.$withBase("/arrow-link.svg")}})]),t._v(" "),i("li",[t._m(1),t._v(" "),i("img",{staticClass:"arrow-link",attrs:{src:t.$withBase("/arrow-link.svg")}})]),t._v(" "),i("li",[t._m(2),t._v(" "),i("img",{staticClass:"arrow-link",attrs:{src:t.$withBase("/arrow-link.svg")}})])]),t._v(" "),i("div",{staticClass:"text-center"},[t._v("2019 © WSK")])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{attrs:{href:"https://instagram.com/wsk.io"}},[e("span",{staticClass:"underline"},[this._v("INSTAGRAM")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{attrs:{href:"https://facebook.com/wsk.io"}},[e("span",{staticClass:"underline"},[this._v("FACEBOOK")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("a",{attrs:{href:"https://www.youtube.com/channel/UCiNKu5vYpvqPJ69NU5aGkmA"}},[e("span",{staticClass:"underline"},[this._v("YOUTUBE")])])}],!1,null,null,null).exports,l=(i(37),{data:function(){return{slider:null,navSlider:null}},props:{imageData:Array,name:String},mounted:function(){var t=this;i.e(5).then(i.bind(null,40)).then((function(e){t.slider=e.tns({container:".tiny-slider-"+t.name,items:1,controls:!1,navAsThumbnails:!0,slideBy:"page",navContainer:".nav-slider-"+t.name}),t.navSlider=e.tns({loop:!1,container:".nav-slider-"+t.name,items:t.imageData.length,nav:!1,controls:!1})}))}}),c={components:{Nav:r,Footer:o,Slider:Object(n.a)(l,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"slider-container"},[i("div",{class:"tiny-slider-"+t.name},t._l(t.imageData,(function(e,a){return i("div",{key:"image"+a,staticClass:"tiny-slider-image"},[i("img",{attrs:{src:t.$withBase("/event-images/"+e)}})])})),0),t._v(" "),i("div",{class:"nav-slider-"+t.name},t._l(t.imageData,(function(e,a){return i("div",{key:"nav-image"+a,staticClass:"nav-slider-image"},[i("img",{attrs:{src:t.$withBase("/event-images/"+e)}})])})),0)])}),[],!1,null,null,null).exports},name:"Layout",data:function(){return{camera:null,scene:null,renderer:null,mesh:null}},methods:{log:function(t){console.log(t)},init:function(){var t=this,e=document.getElementById("three-canvas");this.renderer=new a.lb({antialias:!0,alpha:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(0,1),this.renderer.setPixelRatio(e.devicePixelRatio),e.appendChild(this.renderer.domElement),this.scene=new a.X,this.camera=new a.O(45,window.innerWidth/window.innerHeight,.01,1e4),this.camera.position.z=10,this.scene.add(this.camera);var i=new a.P(16777215);i.position.set(-100,200,100),this.scene.add(i),this.mesh=null,this.mouse=new a.hb(0,0),this.glTFGeometry=null;var n=null,r=null,o=new a.db;(new s.a).load("./x.glb",(function(e){e.scene.traverse(function(t){if(t.isMesh){this.glTFGeometry=t.geometry,this.glTFGeometry.center(),n=o.load("./gradient-disc-2.png"),o.load("./gradient-triangle.png"),o.load("./gradient-square.png"),o.load("./gradient-stripe.png"),o.load("./plain-x.png");var e=new a.f;e.setHSL(0,0,.7);for(var i={texture:{type:"t",value:n},customColor:{type:"vec3",value:[e.r,e.g,e.b]},frequency:{type:"f",value:100}},s=[],l=[],c=[],v=[],m=[],d=[],h=0;h<this.glTFGeometry.attributes.position.count;h++){var u=new a.ib(this.getRandomArbitrary(-5,5),this.getRandomArbitrary(-5,5),this.getRandomArbitrary(-5,5));c.push(u.x,u.y,u.z),v.push(0),l.push(0),s.push(0),m.push(.003),d.push(.003)}r=new a.Z({uniforms:i,vertexShader:"attribute float displacement;\nattribute float rotation;\nattribute float xDistort;\nattribute float yDistort;\nattribute vec3 direction;\nattribute float customSize;\n\nuniform vec3 customColor;\nuniform float frequency;\n\nvarying vec3 vColor;\nvarying float vRotation;\nvarying float vXDistort;\nvarying float vYDistort;\nvarying float vFrequency;\n\nvoid main()\n{\n\n\tvColor = customColor; // set color associated to vertex; use later in fragment shader\n  vRotation = rotation;\n  vXDistort = xDistort;\n  vYDistort = yDistort;\n  vFrequency = frequency;\n  vec3 p = position;\n\n  p.x += direction.x * displacement;\n  p.y += direction.y * displacement;\n  p.z += direction.z * displacement;\n\n  //p.z =  p.z + (15.) * tan( 0.1 * displacement); //cool effect!\n\n  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);\n  gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );\n  gl_Position = projectionMatrix * mvPosition;\n\n}",fragmentShader:"uniform sampler2D texture;\nvarying float vRotation;\nvarying float vXDistort;\nvarying float vYDistort;\nvarying float vFrequency;\nvarying vec3 vColor;\n\nvoid main()\n{\n  float mid = 0.5;\n\n  float xDistortion = sin(gl_PointCoord.x*vFrequency)*vXDistort;\n  float yDistortion = cos(gl_PointCoord.y*vFrequency)*vYDistort;\n\n  vec2 rotated = vec2(cos(vRotation) * ((gl_PointCoord.x+xDistortion) - mid) + sin(vRotation) * ((gl_PointCoord.y+yDistortion) - mid) + mid,\n                      cos(vRotation) * ((gl_PointCoord.y+yDistortion) - mid) - sin(vRotation) * ((gl_PointCoord.x+xDistortion) - mid) + mid);\n  vec4 rotatedTexture = texture2D( texture, rotated );\n\n  gl_FragColor = (vec4( vColor, 1. ) * rotatedTexture) ;\n}",depthTest:!1,transparent:!0,vertexColors:!0}),this.glTFGeometry.addAttribute("customSize",new a.k(s,1).setDynamic(!0)),this.glTFGeometry.addAttribute("displacement",new a.k(l,1).setDynamic(!0)),this.glTFGeometry.addAttribute("direction",new a.k(c,3)),this.glTFGeometry.addAttribute("rotation",new a.k(v,1).setDynamic(!0)),this.glTFGeometry.addAttribute("xDistort",new a.k(m,1).setDynamic(!0)),this.glTFGeometry.addAttribute("yDistort",new a.k(d,1).setDynamic(!0)),this.mesh=new a.Q(this.glTFGeometry,r),this.mesh.position.set(0,0,0),this.mesh.dynamic=!0,this.mesh.sortParticles=!0,this.scene.add(this.mesh),this.resize(),this.animate()}}.bind(t))}),void 0,(function(t){console.error(t)}))},animate:function(){requestAnimationFrame(this.animate);var t=this.glTFGeometry.attributes.customSize.array,e=this.glTFGeometry.attributes.displacement.array,i=this.glTFGeometry.attributes.rotation.array,s=this.glTFGeometry.attributes.xDistort.array,n=this.glTFGeometry.attributes.yDistort.array,r=.0035*Date.now();this.mesh.rotation.y=.05*r;for(var o=0;o<this.glTFGeometry.attributes.position.count;o++){var l=(new a.ib).fromBufferAttribute(this.glTFGeometry.attributes.position,o);l.applyMatrix4(this.mesh.matrix),l.project(this.camera),l.x=Math.round((l.x+1)*window.innerWidth/2),l.y=Math.round((1-l.y)*window.innerHeight/2),l.z=0;var c=this.scale(l.x,0,window.innerWidth,-1,1)-this.mouse.x,v=this.scale(l.y,window.innerHeight,0,-1,1)-this.mouse.y;Math.sqrt(c*c+v*v)<.15?(t[o]=1*(.1+Math.sin(.1*o+r)),e[o]+=.002*o*.001,i[o]=.001*(.1+Math.sin(.1*o+r)),s[o]=.002*o*.001,n[o]=.002*o*.001):(t[o]>1?t[o]--:t[o]=1,e[o]=0,i[o]=0,s[o]=0,n[o]=0)}this.glTFGeometry.attributes.customSize.needsUpdate=!0,this.glTFGeometry.attributes.rotation.needsUpdate=!0,this.glTFGeometry.attributes.displacement.needsUpdate=!0,this.glTFGeometry.attributes.xDistort.needsUpdate=!0,this.glTFGeometry.attributes.yDistort.needsUpdate=!0,this.renderer.render(this.scene,this.camera)},getRandomArbitrary:function(t,e){return Math.random()*(e-t)+t},scale:function(t,e,i,a,s){return(t-e)*(s-a)/(i-e)+a},resize:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)},windowMouseMove:function(t){t.preventDefault(),this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-t.clientY/window.innerHeight*2+1}},mounted:function(){window.addEventListener("resize",this.resize),window.addEventListener("mousemove",this.windowMouseMove),this.init()}},v=(i(13),Object(n.a)(c,(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"theme-container"},[i("transition",{attrs:{name:"logo-anim","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[this.$page.frontmatter.home?i("div",{staticClass:"subtitle"},[i("h2",[t._v("FESTIVAL OF ")]),t._v(" "),i("h2",[t._v("THE RECENTLY ")]),t._v(" "),i("h2",[t._v("POSSIBLE ")])]):t._e()]),t._v(" "),i("transition",{attrs:{name:"logo-anim","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[this.$page.frontmatter.home?i("div",{staticClass:"frontpage-logo"},[i("img",{attrs:{src:"wsk-logo.svg"}})]):t._e()]),t._v(" "),i("Nav"),t._v(" "),i("div",{staticClass:"content-container"},[i("transition",{attrs:{name:"page-anim","enter-active-class":"animated fadeInLeft"}},[this.$page.frontmatter.programs?i("div",{staticClass:"program-links"},[i("ul",{staticClass:"list"},t._l(t.$site.themeConfig.programsNav,(function(e){return i("li",[i("router-link",{class:e.class,attrs:{to:e.link}},[t._v("\n              "+t._s(e.text)+"\n              "),i("svg",{staticClass:"big-arrow",attrs:{id:"Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 26.85 40.85"}},[i("defs",[i("style",[t._v(".cls-1{fill:#fff}")])]),i("title",[t._v("X")]),i("path",{staticClass:"cls-1 ",class:e.class,attrs:{d:"M6.43 1.84L25 20.43 6.43 39l-4.59-4.57 13.08-13.08.92-.92-.92-.92L1.84 6.43l4.59-4.59m0-1.84L0 6.43l14 14-14 14 6.43 6.42 20.42-20.42L6.43 0z"}})])])],1)})),0)]):t._e()]),t._v(" "),i("transition",{attrs:{name:"page-anim"}},[this.$page.frontmatter.home||this.$page.frontmatter.programPage?t._e():i("div",{staticClass:"page-title"},[i("h1",[t._v(t._s(this.$page.frontmatter.title)+" ")]),t._v(" "),i("img",{attrs:{src:t.$withBase("/arrow-down.svg")}})])]),t._v(" "),i("transition",{attrs:{name:"page-anim"}},[this.$page.frontmatter.programPage?i("div",[i("div",{staticClass:"page-title"},[i("h1",[t._v("PROGRAMS")]),t._v(" "),i("img",{attrs:{src:t.$withBase("/arrow-down.svg")}})]),t._v(" "),i("div",{staticClass:"program-page-title",class:this.$page.frontmatter.class},[t._v("\n          "+t._s(this.$page.frontmatter.title)+"\n          "),i("svg",{staticClass:"big-arrow",attrs:{id:"Layer_1","data-name":"Layer 1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 26.85 40.85"}},[i("defs",[i("style",[t._v(".cls-1{fill:#fff}")])]),i("title",[t._v("X")]),i("path",{staticClass:"cls-1",class:this.$page.frontmatter.class,attrs:{d:"M6.43 1.84L25 20.43 6.43 39l-4.59-4.57 13.08-13.08.92-.92-.92-.92L1.84 6.43l4.59-4.59m0-1.84L0 6.43l14 14-14 14 6.43 6.42 20.42-20.42L6.43 0z"}})]),t._v(" "),i("div",{staticClass:"date"},[t._v("\n            "+t._s(this.$page.frontmatter.date)+"\n          ")])])]):t._e()]),t._v(" "),this.$page.frontmatter.content&&this.$page.frontmatter.content.length?i("div",{staticClass:"event-container",class:this.$page.frontmatter.class},t._l(this.$page.frontmatter.content,(function(e,a){return i("div",{key:a,staticClass:"event-block"},[i("div",{staticClass:"event-description"},[i("div",{staticClass:"event-title"},[i("h1",[t._v(t._s(e.title))])]),t._v(" "),i("div",{staticClass:"event-artists"},t._l(e.artists,(function(e,a){return i("div",{key:"artist"+a,staticClass:"event-artist"},[t._v("\n              "+t._s(e)+"\n            ")])})),0),t._v(" "),i("div",{staticClass:"event-details"},[i("ul",{staticClass:"list"},[i("li",[t._v(t._s(e.date))]),t._v(" "),i("li",[t._v(t._s(e.time))]),t._v(" "),i("li",[t._v(t._s(e.venue))])])]),t._v(" "),i("div",{staticClass:"event-desc"},t._l(e.desc,(function(e,a){return i("p",{key:"event"+a},[t._v("  "+t._s(e)+" ")])})),0)]),t._v(" "),i("div",{staticClass:"event-images"},[i("ClientOnly",[e.images?i("Slider",{attrs:{name:e.class,imageData:e.images}}):t._e()],1)],1)])})),0):t._e(),t._v(" "),i("Content")],1),t._v(" "),i("div",{class:{opacitydown:!this.$page.frontmatter.home},attrs:{id:"three-canvas"}}),t._v(" "),this.$page.frontmatter.home||this.$page.frontmatter.programs?t._e():i("Footer")],1)}),[],!1,null,null,null));e.default=v.exports},8:function(t,e,i){}}]);