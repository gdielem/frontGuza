const BACKENDURL = "http://192.168.1.17:8000/polls";

let visibleElement =[];
//backArrow :
const backArrow = $("#back");


//Client menu items:
const client_menu = $("#menu_client");

//Main menu items :
const menu = $("#menu_main");
const menu_client = $("#client")

//init state == Main menu view :
hide(client_menu);
hide(backArrow);


backArrow.on("click",function () {
    for (let i = 0 ; i < visibleElement.length ;i++){
        hide(visibleElement[i]);
    }
    show(menu);
});





menu_client.on("click",function () {
    hide(menu);
    show(backArrow);
    show(client_menu);
    visibleElement.push(backArrow);
    visibleElement.push(client_menu);

});

//functions :
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
}