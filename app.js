// create server.
var express = require('express'),
    app = express(),
    port = 543,
    Joi = require('joi'),
    enableCache = 'yes',
    var cacheMaxAge = 86400/6,
    app.listen(port);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.configure(function() {
  app.use(allowCrossDomain);
});

var validation = function(obj){
        var S = Joi.Types.String;
        var rules = {'input': S().max(100)};
        var res = Joi.validate(obj, rules, function (err) {
            if (err) return 0;
            else return 1;
        });
        return res;

}

var dump = function(content){
    var svgS = "<svg viewBox='0 0 400 360' width='400' height='350' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>";
    var def = "<defs><path id='eye' d='M-22,10 A40,40 0 0,1 22,10 A22,22 0 0,0 -20,10Z'/> <path id='circle_text' d='M50,180 a130,130 0 1,1 260,0 a130,130 0 1,1 -260,0z'/></defs>";
    var circle = "<circle cx='180' cy='180' r='165' class='outline'/>";
    var text_head = "<text id='catcher_in_the_rye'> <textPath xlink:href='#circle_text' id='isay'>";
    var text_tail = "</textPath> <animateTransform type='rotate' attributeName='transform' attributeType='XML' additve='sum' dur='6' from='0 180 180' to='-360 180 180' repeatCount='indefinite'/></text>";
    var man = "<g class='man' transform='translate(180,180)'> <!-- circle cx='0' cy='0' r='100'/ --> <path d='M-110,0 A110,110 0 0,0 108,24 H175 A10,10 0 1,0 175,-20 H-108 A110,110 0 0,1 108,-24' fill='white'/> <path d='M-75,28 H70 A78,78 0 0,1 -75,28Z'/> <path d='M-12,-112 l2,-3 h10 l2,3z'/> <use xlink:href='#eye' transform='translate(-45,0)'/> <use xlink:href='#eye' transform='translate(45,0)'/></g>";
    var svgE = "</svg>";
    var full_text = text_head + content + text_tail;
    var htmlHead = "<!DOCTYPE html><html><head><script src='http://code.jquery.com/jquery.min.js'></script><link href='http://twitter.github.com/bootstrap/assets/css/bootstrap.css'　rel='stylesheet' type='text/css' /><link href='http://twitter.github.com/bootstrap/assets/css/bootstrap-responsive.css' rel='stylesheet' type='text/css' /><script src='http://twitter.github.com/bootstrap/assets/js/bootstrap.js'></script><meta charset=utf-8 /><title>The Laughing man</title><style>body { background-color: #DDDDDD; font: 16px sans-serif; }.outline, .man {stroke: rgb(0, 60, 190);fill: none;}.outline {stroke-width: 10;fill: white;}.man {stroke-width: 15;}#eye {stroke-width: 0;fill: rgb(0, 60, 190);}#catcher_in_the_rye {font-family: Impact;font-size: 30px;fill: rgb(0, 60, 190);}</style></head><body>";
    var htmlEnd = "</body></html>";
    var opt = htmlHead + svgS + def + circle + full_text + man + svgE + htmlEnd;
    return  opt 
}

    app.get("/edit/:isay", function(req, res){
        var input = req.params.isay;
        var obj = {
            input: req.params.isay,
        };

        var isVali = validation(obj);
        var msgObj = {"input" : input, "isVali" : isVali};
        
        if(isVali){
            var man = dump(req.params.isay)
            if(enableCache == 'yes')
                if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + cacheMaxAge );
            res.send(man);
        }else{
            res.send({"page": ':3' });
        }
        console.log(msgObj);
    });

    app.get('/', function(req, res){ })

    app.get('*', function(req, res){
        var input = req.params;
        var obj = { "other input": input };
        res.send({"page": ':3' });
        console.log(obj)
    });

    console.log('start express server at ' + port + '\n');
