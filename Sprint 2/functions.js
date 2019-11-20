
function login() {

    var email = document.getElementById("inputEmail").value
    var password = document.getElementById("inputPassword").value
    var db = new restdb("5dc5bab464e7774913b6eaab");

    var query = {}; // get all records
    var hints = { "$max": 10, "$orderby": { "_id": -1 } }; // top ten, sort by creation id in descending order
    db.mockdata1.find(query, hints, function (err, res) {
        if (!err) {
            // res is an array of mockdata1 instances
            // var flag = false;
            console.log("True")
            console.log(res)

            /*for(var i = 0; i < res.length; i++){
              //  console.log(res[i].email)
                if(res[i].email == email){
                    flag = true;
                    console.log("TRUE")
                }
            }
    
            if(flag == true){
                if(password == res[0].password){
                    console.log("Success")
                    window.location.href = './index.html';
                }
                else {
                    console.log("Fail")
                    alert("Password is incorrect.")
                }
            }*/
            //  console.log(res.length)
        }
        else {
            console.log(err)
        }
    });
}
