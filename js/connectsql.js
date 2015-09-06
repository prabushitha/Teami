var PhpPostRequest = function(phpfilename,arr_inps,callback,failpage){
    var server = "http://localhost:8080";
	var hr = new XMLHttpRequest();
    var url = server+"/Teami/ihackwhileloop/phps/"+phpfilename;
	//creating data to be sent in vars 
	var vars = "";
	for(var i=0;i<arr_inps.length;i++){
		vars += "val"+(i+1)+"="+arr_inps[i];
		if(i!=arr_inps.length-1){
			vars += "&";
		}
	}
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.setRequestHeader("Content-length",vars.length);
        hr.setRequestHeader("Connection","close");
        hr.onreadystatechange = function() {
            if(hr.readyState == 4 && hr.status == 200) {
                var resp = hr.responseText;
                callback(resp);
            }else if(hr.readyState == 2 || hr.readyState==3){

            }else{
                if(failpage!=null){
                    window.location = failpage;
                }

            }
        };
        hr.send(vars);

};


