'use strict';

var PORT = process.env.PORT || 3000

var express = require('express');

var app = express();

app.use(express.static('public'));

app.listen(PORT);
