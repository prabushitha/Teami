/**
 * Created by project on 9/6/2015.
 */
var storage=window.localStorage;
window.onload = function() {
    storage=window.localStorage;
};
function logout(){
    storage.clear();
    window.location = "index.html";
}