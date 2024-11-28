"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5406],{5406:(F,c,t)=>{t.r(c),t.d(c,{AlumnosPageModule:()=>P});var m=t(177),d=t(4341),o=t(791),s=t(70),g=t(467),n=t(3953),h=t(3656),p=t(3067),f=t(7291);const v=[{path:"",component:(()=>{class e{constructor(a,i,r,u,b,x,j){this.router=a,this.alertController=i,this.animationCtrl=r,this.menuCtrl=u,this.navCtrl=b,this.loginService=x,this.storageService=j,this.username="Invitado",this.carrera="Ingenieria en Informatica";const l=this.router.getCurrentNavigation()?.extras.state;l?(this.username=l.user||"Usuario no especificado",this.carrera=l.carrera||"Carrera no especificada"):this.loadUserData(),!this.loginService.isAlumno()&&!this.loginService.isProfesor()&&this.router.navigate(["/home"])}ngOnInit(){const a=this.router.getCurrentNavigation()?.extras.state;a?(this.username=a.user||"Usuario no especificado",this.carrera=a.carrera||"Carrera no especificada"):this.loadUserData()}loadUserData(){var a=this;return(0,g.A)(function*(){const i=yield a.storageService.get("userData");i&&(a.username=i.username||"Usuario no especificado",a.carrera=i.carrera||"Carrera no especificada")})()}logout(){localStorage.removeItem("currentUser"),localStorage.removeItem("currentUser2"),this.storageService.clear(),this.router.navigate(["/home"])}ngAfterViewInit(){this.animateBienvenida("#bienvenida"),this.animateBienvenida(".bienvenida")}animateBienvenida(a){const i=document.querySelector(a);i?this.animationCtrl.create().addElement(i).duration(1e3).easing("ease-in-out").fromTo("opacity","0","1").fromTo("transform","translateY(50px)","translateY(0px)").play():console.log(`Error en la animaci\xf3n para ${a}`)}static#n=this.\u0275fac=function(i){return new(i||e)(n.rXU(s.Ix),n.rXU(o.hG),n.rXU(o.Hx),n.rXU(o._t),n.rXU(h.q9),n.rXU(p.H),n.rXU(f.n))};static#t=this.\u0275cmp=n.VBU({type:e,selectors:[["app-alumnos"]],decls:46,vars:4,consts:[[3,"translucent"],["slot","end"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],["id","bienvenida",1,"ion-text-center"],["id","contenedor",1,"bienvenida"],["id","contenedor-hijo"],["id","imagen-profile","src","assets/img/pngegg (2).png","alt","Logo duoc"],[1,"ion-text-center"],[1,"uppercase-text"],["slot","bottom"],["tab","inicio"],["name","home-outline"],["tab","perfil-alumno"],["name","person-circle-outline"],["tab","asignaturas"],["name","school-outline"],["tab","asistencia"],["name","book-outline"],[3,"click"],["name","log-out-outline"]],template:function(i,r){1&i&&(n.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),n.EFF(3,"RegistrAPP"),n.k0s(),n.j41(4,"ion-buttons",1),n.nrm(5,"ion-menu-button"),n.k0s()()(),n.j41(6,"ion-content",2)(7,"ion-header",3)(8,"ion-toolbar")(9,"ion-title",4),n.EFF(10,"blank"),n.k0s()()(),n.j41(11,"div",5)(12,"ion-title",6),n.EFF(13,"\xa1Bienvenido nuevamente a RegistrAPP!"),n.k0s(),n.nrm(14,"br"),n.j41(15,"div",7)(16,"div",8),n.nrm(17,"ion-img",9)(18,"br"),n.j41(19,"ion-title",10)(20,"strong",11),n.EFF(21),n.k0s(),n.j41(22,"p"),n.EFF(23),n.k0s()()()()()(),n.j41(24,"ion-tabs")(25,"ion-tab-bar",12)(26,"ion-tab-button",13),n.nrm(27,"ion-icon",14),n.j41(28,"ion-label"),n.EFF(29,"Inicio"),n.k0s()(),n.j41(30,"ion-tab-button",15),n.nrm(31,"ion-icon",16),n.j41(32,"ion-label"),n.EFF(33,"Perfil"),n.k0s()(),n.j41(34,"ion-tab-button",17),n.nrm(35,"ion-icon",18),n.j41(36,"ion-label"),n.EFF(37,"Asignaturas"),n.k0s()(),n.j41(38,"ion-tab-button",19),n.nrm(39,"ion-icon",20),n.j41(40,"ion-label"),n.EFF(41,"Asistencia"),n.k0s()(),n.j41(42,"ion-tab-button",21),n.bIt("click",function(){return r.logout()}),n.nrm(43,"ion-icon",22),n.j41(44,"ion-label"),n.EFF(45,"Logout"),n.k0s()()()()),2&i&&(n.Y8G("translucent",!0),n.R7$(6),n.Y8G("fullscreen",!0),n.R7$(15),n.JRh(r.username),n.R7$(2),n.JRh(r.carrera))},dependencies:[o.QW,o.W9,o.eU,o.iq,o.KW,o.he,o.MC,o.Jq,o.qW,o.BC,o.ai,o.p4],styles:["#container[_ngcontent-%COMP%]{margin:170px;display:grid;justify-content:center;align-items:center}#tituloMain[_ngcontent-%COMP%]{font-family:Impact,Haettenschweiler,Arial Narrow Bold,sans-serif;font-size:25px;text-align:center}#col1[_ngcontent-%COMP%]{justify-content:center;align-content:center}p[_ngcontent-%COMP%]{font-size:15px;font-family:monospace;color:gray}a[_ngcontent-%COMP%]{text-decoration:none}#imagen-logo[_ngcontent-%COMP%]{width:150px;margin-left:120px;opacity:.3}#imagen-profile[_ngcontent-%COMP%]{width:130px;margin-left:50px;margin-top:50px;opacity:.3}#contenedor[_ngcontent-%COMP%]{box-shadow:1px 1px 10px #000;border-radius:20px;height:400px;padding:10px}.uppercase-text[_ngcontent-%COMP%]{text-transform:uppercase}#contenedor-hijo[_ngcontent-%COMP%]{display:grid;justify-content:center;align-items:center}.opciones[_ngcontent-%COMP%]{pointer-events:pointer}"]})}return e})(),children:[{path:"inicio",loadChildren:()=>Promise.resolve().then(t.bind(t,5406)).then(e=>e.AlumnosPageModule)},{path:"perfil-alumno",loadChildren:()=>t.e(2076).then(t.bind(t,8510)).then(e=>e.PerfilPageModule)},{path:"asignaturas",loadChildren:()=>t.e(2483).then(t.bind(t,2483)).then(e=>e.AsignaturasPageModule)},{path:"asistencia",loadChildren:()=>t.e(8116).then(t.bind(t,8116)).then(e=>e.AsistenciaPageModule)},{path:"",redirectTo:"perfil",pathMatch:"full"}]}];let C=(()=>{class e{static#n=this.\u0275fac=function(i){return new(i||e)};static#t=this.\u0275mod=n.$C({type:e});static#e=this.\u0275inj=n.G2t({imports:[s.iI.forChild(v),s.iI]})}return e})(),P=(()=>{class e{static#n=this.\u0275fac=function(i){return new(i||e)};static#t=this.\u0275mod=n.$C({type:e});static#e=this.\u0275inj=n.G2t({imports:[m.MD,d.YN,o.bv,C]})}return e})()}}]);