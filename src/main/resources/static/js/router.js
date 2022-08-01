const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    
    var href ="";
    if(event.target.nodeName ==='I' || event.target.nodeName ===  'P')
{
    href =event.target.parentNode.href;
}
else
{
    href = event.target.href;
}
    console.log("text----",event.target.href);

    window.history.pushState({}, "", href);
    handleLocation();
};

let roleId, count = 0;


const getRoleId = () => {

    $.ajax({
        url:"http://localhost:8090/role/roleId",
        type: 'get',
        dataType: 'json',
        async: false,
        contentType: "application/json",
        headers: {"authorization": "Bearer "+$.cookie("auth")},

        success: function(successData) {

                // alert(successData);
                console.log(successData);
  
                roleId = successData;
        },

        error : function(response, message, error){
            alert("Error")
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

    
    console.log("Filtered Array",filteredArray);

    let sidebarMenu  = $("#ul-div");

    $.each(filteredArray,function(i, users){
        if (users.menuName === 'Dashboard') {
            $("<li class='nav-item'><a href='"+users.url+"'class='nav-link my-item'onClick='route()'id='my-item'><i class='nav-icon far fa-chart-bar' id='item-id'></i><p>"+users.menuName+"</p></a> </li>").appendTo(sidebarMenu);
        }
        else{
            $("<li class='nav-item'><a href='"+users.url+"'class='nav-link my-item'onClick='route()'id='my-item'><i class='nav-icon far fa-chart-bar' id='item-id'></i><p>"+users.menuName+"</p></a> </li>").appendTo(sidebarMenu);
        }
    })
    
}

const checkRoleId = () => {

    $.ajax({
        url:"http://localhost:8090/role/list",
        type: 'get',
        dataType: 'json',
        async: false,
        contentType: "application/json",
        headers: {"authorization": "Bearer "+$.cookie("auth")},

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
    "/employee": "/templates/Employee-Panel.html",
    "/admin": "/templates/Admin-Panel.html",
    "/list":"/templates/Employee-List.html",
    "/timesheet_management":"/templates/Timesheet-Management.html"
};

    console.log("ROUTES ",routes);


// const accessCheck = (path) => {

//     let accessPath = false;

//     $.ajax({
//         url:"http://localhost:8090/user/access?url"+path,
//         type: 'get',
//         dataType: 'json',
//         async: false,
//         contentType: "application/json",
//         headers: {"authorization": "Bearer "+$.cookie("auth")},

//         success: function(successData) {            
            
//             alert(successData);
//             accessPath = successData;
            
//         },

//         error : function(response, message, error){
//             console.log(response);
//         }

//     });

//     return accessPath;

// }


const handleLocation = async () => {

        let path = window.location.pathname;
        let route = routes[path] || routes[404];

       if (roleId === 1 && path === "/") {
        route = "/templates/Admin-Panel.html";
        }
        else if(roleId === 2 && path === "/"){
            route = "/templates/Employee-Panel.html";
        }
        //alert(route);
        let html = await fetch(route).then((data) => data.text());
        document.getElementById("main-page").innerHTML = html;
    };


console.log("nipurnait",window);
handleLocation();
window.onpopstate = handleLocation;
window.route = route;


