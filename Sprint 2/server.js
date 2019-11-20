const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var path = require('path');
var request = require("request");
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/register', function (req, res) {
    var options = {
        method: 'POST',
        url: 'https://disown-d5f7.restdb.io/rest/mock-data-1',
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': 'ef1a04ec93d81ebe60426cd7d190f8a6fa2e4',
            'content-type': 'application/json'
        },
        body: { fullName: req.body.name, email: req.body.email, password: req.body.password, phoneNumber: req.body.phone},
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        res.redirect('/')
    });
})

app.post('/', function (req, res) {

    var email = req.body.email;
    var password = req.body.password;



    if (req.body.button == "1") {

        var options = {
            method: 'GET',
            url: 'https://disown-d5f7.restdb.io/rest/mock-data-1',
            headers:
            {
                'cache-control': 'no-cache',
                'x-apikey': 'ef1a04ec93d81ebe60426cd7d190f8a6fa2e4'
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                throw new Error(error);
            }

            var result = JSON.parse(body)

            var flag = -1;

            for (var i = 0; i < result.length; i++) {
                if (result[i].email == email) {
                    flag = i;
                    // console.log("TRUE")
                }
            }
            if (flag == -1) {
                res.sendFile(path.join(__dirname + '/loginFailed.html'));
            }
            if (flag != -1) {
                if (password == result[flag].password) {
                    res.redirect('forum')
                }
                else {
                    console.log("Fail")
                    res.sendFile(path.join(__dirname + '/loginFailed.html'));

                }
            }


        });
    }

    else if (req.body.button == "2") {
        res.sendFile(path.join(__dirname + '/register.html'));
    }


    // req2.end();

});


app.get('/forum', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))