//convenience error message printer

/*
    *@desc Displays an error message when there is a problem with the controllers
*/
function errorMsg(res, error){
    res.writeHead(404, {"Content-Type": "application/json"})
    res.end(error);
}

/*
    *@desc Displays an error message when no route is found
*/
async function noRouteFound(req, res) {
    res.writeHead(404, {"Content-Type": "application/json"});
    res.end(JSON.stringify({message: "Route not found"}));
}

module.exports = {errorMsg, noRouteFound};