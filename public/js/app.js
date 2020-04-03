const hesabiKapat = document.getElementById("hesabiKapa");

hesabiKapat.addEventListener("click",run);

function run(e)
{
    if(confirm("Hesabı kapatmak istediğinizden emin misiniz?"))
    {
        console.log("Hesap kapandı.");
    }
    else
    {
        console.log("Hesap kapanmadı");
    }
}


// var header = document.querySelector("#header");
// var menunav = document.querySelector("#menu-nav");

const sureButon = document.getElementById("bildirim");
var panel = document.getElementById("paneledit");

// console.log(kontayner.children[0].children[0]);

var newDiv = document.createElement("div");
var closebuton = document.createElement("a");

closebuton.href = "profil-ayarlari.html";
closebuton.className = "btn btn-danger";
closebuton.textContent = "Uyarıyı kapat";
closebuton.id = "closebuton";

newDiv.className = "popup";
newDiv.id = "sureUyari";
newDiv.textContent = "Kiraladığınız filmin süresinin bitmesine az bir zaman kaldı...";
newDiv.appendChild(closebuton);

// newDiv.style = "border: 5px solid green;width:320px;margin:0pxpadding:20px;";


// kontayner.children[0].children[0].children[0].children[1].innerHTML = newDiv.outerHTML;

sureButon.onclick = function ()
{
    // header.setAttribute("style","opacity:0.5;filter:alpha(opacity=50)");
    // menunav.setAttribute("style","opacity:0.5;filter:alpha(opacity=50)");
    panel.replaceWith(newDiv);
    
}


// var sel = document.getElementById("input");
// var paragraf = document.getElementById("prf");

// var buton = document.getElementById("buton2");

// buton.onclick = function ()
// {
//     paragraf.textContent = sel.options[sel.selectedIndex].text;
// }