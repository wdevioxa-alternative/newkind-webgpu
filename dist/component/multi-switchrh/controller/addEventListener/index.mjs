export default async(e,c)=>{const t=e.shadowRoot.querySelectorAll(".multiswitch");return{init:()=>{t.forEach((e=>{e.addEventListener("click",c.click,{bubbles:!0,composed:!0})}))},terminate:()=>{t.forEach((e=>{e.removeEventListener("click",c.click,{bubbles:!0,composed:!0})}))}}};