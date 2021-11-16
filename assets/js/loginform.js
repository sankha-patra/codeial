const labels=document.querySelector(".form-control label")
labels.array.forEach(label => {
    label.innerHtml=label.innerText.split("").map((letter,idx)=>`<span>${letter}</span>`).join("")
});
