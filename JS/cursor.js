const cursor = document.getElementById('cursor');
document.addEventListener('mousemove',(e)=>{
        cursor.style.display = "block";
        let x = e.x;
        let y = e.y;
        cursor.style.top = (y-cursor.offsetHeight/2)+"px";
        cursor.style.left = (x-cursor.offsetWidth/2)+"px";
}
);

document.addEventListener('mouseout', function(event) {
        if (!event.relatedTarget && !event.toElement) {
                cursor.style.display = "none";
        }
});

// Cursor Fade
document.querySelectorAll('.cursorFade').forEach((e)=>{
     e.addEventListener('mouseover', (e) => {
        cursor.style.opacity = "0.5";
     });
     e.addEventListener('mouseout', (e) => {
        cursor.style.opacity = "1";
     });   
});

// Cursor Scale
document.querySelectorAll('.cursorScale').forEach((e)=>{
        e.addEventListener('mouseover',(e)=>{
                cursor.style.transform = "scale(2)";
                cursor.style.transition = "transform 0.5s ease 0s";
                cursor.style.mixBlendMode = "difference";
        });
        e.addEventListener('mouseout',(e)=>{
                cursor.style.transform = "scale(1)";
                cursor.style.transition = "transform 0.5s ease 0s";
                cursor.style.mixBlendMode = "normal";
        });
});
