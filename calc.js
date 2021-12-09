
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// use the body parser for parsing post request of form sent 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/htmls/index.html');
});



app.post('/calculate', function (req, res) {
    //console.log("form post request body : ", req.body);
    var num1 = parseInt(req.body.nums.num1);
    var num2 = parseInt(req.body.nums.num2);
    var op = req.body.op;
    var answer = null;

    if (op == '+')
        answer = num1 + num2;
    else if (op == '-')
        answer = num1 - num2;
    else if (op == '*')
        answer = num1 * num2;
    else if (op == '/') {
        if (num2 == 0)
            answer = `Cannot divide by zero`;
        else
            answer = num1 / num2;
    }
    else if (op == '%') {
        if (num2 == 0)
            answer = `Cannot modulo by zero`;
        else
            answer = num1 % num2;
    }
    else if (op == '**')
        answer = Math.pow(num1, num2);
    else if (op == 'C') {
        var t = 1, d = 1;
        for (let i = 0; i < num2; i++)
            t = t * (num1 - i);

        for (let i = 1; i <= num2; i++)
            d = d * i;

        answer = t / d;
    }
    else if (op == 'P') {
        var t = 1;
        for (let i = 0; i < num2; i++)
            t = t * (num1 - i);
        answer = t;
    }
    else if (op == 'ln2') {
        if (num2 === 0 || num2 == 0)
            answer = "Undefined";
        else {
            var a = Math.log(num2);
            var b = Math.log(num1);
            answer = b == 0 ? 'undefined' : a / b;
        }
    }
    else if (op == 'ln1') {
        if (num1 === 0 || num2 == 0)
            answer = "Undefined";
        else {
            var a = Math.log(num1);
            var b = Math.log(num2);
            answer = b == 0 ? 'undefined' : a / b;
        }
    }

    res.send({
        a: num1,
        b: num2,
        op: op,
        ans: answer
    });
});

app.listen(port, function () {
    console.log("Server is listening on port ", port);
});