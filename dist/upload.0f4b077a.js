firebase.initializeApp({apiKey:"AIzaSyDBWZgf69JelbmqlPPPzj56W5yFL-Q5wZo",authDomain:"project-1-8debf.firebaseapp.com",projectId:"project-1-8debf",storageBucket:"project-1-8debf.appspot.com",messagingSenderId:"386056815137",appId:"1:386056815137:web:92425cb061808073ed9960"});const e=firebase.firestore(),t=firebase.storage();let a="",r="";const n=e.collection("profile"),l=document.querySelector(".btn-submit"),o=document.querySelector("form"),d=document.querySelector(".btn-cancel"),i=document.querySelector(".input-file"),c=document.querySelector(".input-rank"),u=document.querySelector(".input-name"),s=document.querySelector(".input-email"),b=document.querySelector(".input-self"),m=document.querySelector(".btn-modify"),f=document.querySelector(".btn-delete"),p=document.querySelector(".image"),[v,h]=location.search.split("=");function y(){let e=i.files[0],a=t.ref(),o=a.child("image/"+new Date().getTime()),d=o.put(e);if(h&&!i.value){let e={rank:c.value,name:u.value,email:s.value,self:b.value};A(e)}h&&i.value?d.on("state_changed",null,e=>{console.error("실패 사유는",e)},()=>{d.snapshot.ref.getDownloadURL().then(e=>{let t={rank:c.value,name:u.value,photo:e,email:s.value,self:b.value};A(t,g(r))})}):d.on("state_changed",null,e=>{console.error("실패 사유는",e)},()=>{d.snapshot.ref.getDownloadURL().then(e=>{let t={id:new Date().getTime(),rank:c.value,name:u.value,photo:e,email:s.value,self:b.value};!function(e){n.add(e).then(()=>{alert("프로필 등록이 완료되었습니다!"),k(),l.disabled="false"}).catch(e=>{console.log(e)})}(t)})})}function g(e){let a=t.refFromURL(e);return a.delete()}function k(){window.location.href="./index.html"}function A(e,t){l.disabled="true";let r=n.doc(a);r.update(e).then(()=>{alert("프로필이 변경되었습니다!"),k(),l.disabled="false"}).catch(e=>{console.error("Error updating document: ",e)})}l.addEventListener("click",y),i.addEventListener("change",function(e){let t=e.target.files[0];if(t){let e=new FileReader;e.onload=e=>{p.setAttribute("src",e.target.result)},e.readAsDataURL(t)}}),d.addEventListener("click",k),m.addEventListener("click",function(){i.removeAttribute("disabled"),c.removeAttribute("disabled"),u.removeAttribute("disabled"),s.removeAttribute("disabled"),b.removeAttribute("disabled")}),window.addEventListener("keydown",e=>{"Enter"===e.key&&y()}),o.addEventListener("submit",e=>{e.preventDefault()}),i.addEventListener("click",()=>r=p.src),h?(i.setAttribute("disabled",""),c.setAttribute("disabled",""),u.setAttribute("disabled",""),s.setAttribute("disabled",""),b.setAttribute("disabled",""),m.style.display="block",f.style.display="block",n.get().then(e=>{e.forEach(e=>{if(e.data().id===Number(h))return a=e.id})}).catch(e=>{console.error("문서 불러오기 중 오류:",e)})):(m.style.display="none",f.style.display="none"),document.addEventListener("DOMContentLoaded",async()=>{try{n.get().then(e=>{e.forEach(e=>{e.data().id===Number(h)&&(p.setAttribute("src",`${e.data().photo}`),i.value="",c.value=e.data().rank,u.value=e.data().name,s.value=e.data().email,b.value=e.data().self)})})}catch(e){console.error("문서를 가져오는 도중 오류가 발생했습니다",e)}}),f.addEventListener("click",()=>{let e=n.doc(a);g(p.src).then(()=>n.get()).then(t=>{let r=null;if(t.forEach(e=>{e.data().id===Number(h)&&(r=e.id)}),r)return a=r,e.delete();throw Error("문서를 찾을 수 없습니다")}).then(()=>{alert("프로필 삭제가 완료되었습니다"),k()}).catch(e=>{console.error(e)})});
//# sourceMappingURL=upload.0f4b077a.js.map