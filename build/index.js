'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/test', function (req, res) {
    res.json({ success: true, message: 'test route' });
});

app.listen(8080, function () {
    return console.log('listening on port 8080');
});
//# sourceMappingURL=index.js.map