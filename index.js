const BACKENDURL = "http://192.168.1.17:8000/polls";

let visibleElements =[];
//backArrow :
const backArrow = $("#back");
visibleElements.push(backArrow);

//Connexion items:
const connexion_menu = $("#connexionView");
const button_connexion = $("#buttonConnexion");
visibleElements.push(connexion_menu);

//Client menu items:
const client_menu = $("#menu_client");visibleElements.push(client_menu);
const button_new_client = $("#buttonNewClient");

//Main menu items :
const menu = $("#menu_main");
const deconnexion = $("#logOut");
const button_client_view = $("#client");
visibleElements.push(menu);visibleElements.push(deconnexion);

//check if the user is already connected and display the right interface :
checkConnexionAndDisplay();



//Gestion des événements :
button_new_client.on("click",function () {
    let nom = $("#newClientName");
    makeRequest("POST",{action:"addClient",name:nom});
});

button_connexion.on("click",function () {
   let email = $("#inputEmail").val();
   let password = $("#inputPassword").val();
   if(email =="g" && password == "g"){
       hideEverythingsVisible();
       show(menu);
       show(deconnexion);
       document.cookie = 'connected=true'; //Crée ou met à jour un cookie 'connected'
       alert(document.cookie); //Affiche la liste
   }
});

deconnexion.on("click",function () {
    hideEverythingsVisible();
    show(connexion_menu);
    document.cookie = 'connected=false';
    alert(document.cookie);
});


backArrow.on("click",function () {
    hideEverythingsVisible();
    show(menu);
    show(deconnexion);
});





button_client_view.on("click",function () {
    hideEverythingsVisible();
    show(backArrow);
    show(client_menu);

});

//functions :
function checkConnexionAndDisplay() {
    let connexionCookie = document.cookie;
    console.log("cookie = " + connexionCookie);
}

function makeRequest(type,data){
    $.ajax({
        url:BACKENDURL,
        type:type,
        data:data,
        dataType:"json",
        success:function(response){
            return response;

        },
        error:function(jqxhr,textStatus,errorThrown){
            console.log(jqxhr);
            console.log(textStatus);
            console.log(errorThrown);
            return textStatus;
        }
    })
}
function hide(a) {
    a.css("display","none");
}
function show(a) {
    a.css("display","block");
    visibleElements.push(a);
}
function hideEverythingsVisible() {
    for (let i = 0 ; i<visibleElements.length ; i++){
        visibleElements[i].css("display","none");
    }
}
function checkConnexionAndDisplay() {
    console.log("cookie =" +document.cookie);
    if (getCookie("connected")==="true"){
        //init state == Main menu view :
        hide(client_menu);
        hide(backArrow);
        hide(connexion_menu);
        visibleElements.push(menu); visibleElements.push(deconnexion);
    }
    else {

        hideEverythingsVisible();
        show(connexion_menu);
    }
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}