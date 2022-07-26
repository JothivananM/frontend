const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    console.log("text----",event.target.href);
    var href ="";
    if(event.target.nodeName ==='I' || event.target.nodeName ===  'P')
{
    href =event.target.parentNode.href;
}
else
{
    href = event.target.href;
}
    window.history.pushState({}, "", href);
    handleLocation();
};

let roleId;


const getRoleId = () => {

    $.ajax({
        url:"user/roleId",
        type: 'get',
        dataType: 'json',
        async: false,
        contentType: "application/json",

        success: function(successData) {
  
                roleId = successData;
        },

        error : function(response, message, error){
            console.log(response);
        }

    });
}

const sidebarList = (list) => {

    console.log("SidebarList",list);
    console.log("ROLE",roleId);

    let filteredArray = list.filter((item) => {
        return item.roleId === roleId;
    });

    console.log(filteredArray);

    let sidebarMenu  = $("#ul-div");

    $.each(filteredArray,function(i, users){
        if (users.menuName === 'Dashboard') {
            $("<li class='nav-item'><a href='"+users.url+"'class='nav-link my-active my-item'onClick='route()'id='my-item'><i class='nav-icon far fa-chart-bar' id='item-id'></i><p>"+users.menuName+"</p></a> </li>").appendTo(sidebarMenu);
        }
        else{
            $("<li class='nav-item'><a href='"+users.url+"'class='nav-link my-item'onClick='route()'id='my-item'><i class='nav-icon far fa-chart-bar' id='item-id'></i><p>"+users.menuName+"</p></a> </li>").appendTo(sidebarMenu);
        }
    })
    
}

const checkRoleId = () => {

    $.ajax({
        url:"role/list",
        type: 'get',
        dataType: 'json',
        async: false,
        contentType: "application/json",

        success: function(successData) {            
            
            sidebarList(successData);

        },

        error : function(response, message, error){
            console.log(response);
        }

    });

}

getRoleId();
checkRoleId();


const routes = {
    404: "/templates/404.html",
    "/":"/templates/index.html",
    "/employee": "/templates/Employee-Panel.html",
    "/admin": "/templates/Admin-Panel.html",
    "/toastr":"/templates/button.js"
};

    console.log(routes);


const accessCheck = (path) => {

    let accessPath = false;

    $.ajax({
        url:"http://ec2-35-170-131-162.compute-1.amazonaws.com:8080/employeeTimesheet/user/access?url"+path,
        type: 'get',
        dataType: 'json',
        async: false,
        contentType: "application/json",
        headers: {"authorization": $.cookie("auth")},

        success: function(successData) {            
            
            alert(successData);
            accessPath = successData;
            
        },

        error : function(response, message, error){
            console.log(response);
        }

    });

    return accessPath;

}


const handleLocation = async () => {

        let path = window.location.pathname;
        let route = routes[path] || routes[404];

       if( accessCheck(path)){

        if (path === "/admin" || path === "/") {
            route = "/templates/Admin-Panel.html";
        }
       }
       else{
             route = routes[404];
       }
        //alert(route);
        let html = await fetch(route).then((data) => data.text());
        document.getElementById("main-page").innerHTML = html;
    };

console.log("nipurnait",window);
handleLocation();
window.onpopstate = handleLocation;
window.route = route;


