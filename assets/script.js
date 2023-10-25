
async function page_two_init(){
    await makeyoutube();
    await createtimer();
};

function restart(event){
    event.preventDefault()
    window.location.href = "index.html";
};

page_two_init();
