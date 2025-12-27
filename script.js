let Saturate= document.getElementById("Saturate");
let Contrast= document.getElementById("Contrast");
let Brightness= document.getElementById("Brightness");
let Sepia= document.getElementById("Sepia");
let Grayscale= document.getElementById("Grayscale");
let Blur= document.getElementById("Blur");
let HueRotate= document.getElementById("HueRotate");  
let img= document.getElementById("img");
let Upload= document.getElementById("upload");
let download=document.getElementById("download");
let reset=document.querySelector("span");
let canvas= document.querySelector("canvas"); 
const ctx= canvas.getContext("2d"); 
window.onload=function(){
    download.style.display="none";
    img.style.display="none";
    reset.style.display="none";
}
//upload photo
Upload.onchange=function(){
    resetValues(); 
    reset.style.display="block";
    download.style.display="block";
    img.style.display="block";
    //read img
    let file= new FileReader();//read from device
    file.readAsDataURL(Upload.files[0]);//read the first file
    //set img source
    file.onload=function(){
        img.src=file.result;
    }
    
    img.onload=function(){
        canvas.width=img.width;
        canvas.height=img.height;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);//make copy of img on canvas
        img.style.display="none";
    }
}
//add filters
let filters=document.querySelectorAll("ul li input");
filters.forEach(filter=>{
    filter.addEventListener("input",function(){
        ctx.filter=`
        saturate(${Saturate.value}%)
        contrast(${Contrast.value}%)
        brightness(${Brightness.value}%)
        sepia(${Sepia.value}%)
        grayscale(${Grayscale.value})
        blur(${Blur.value}px)
        hue-rotate(${HueRotate.value}deg)
        `;
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    });
});
//reset button
function  resetValues(){
   ctx.filter = "none";  
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    Saturate.value="100";
    Contrast.value="100";
    Brightness.value="100";
    Sepia.value="0";
    Grayscale.value="0";
    Blur.value="0";
    HueRotate.value="0";
}
//download button
download.onclick=function(){
    download.href=canvas.toDataURL('image/jpeg');
}