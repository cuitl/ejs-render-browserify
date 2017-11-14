var ejs = require('ejs')
var through = require('through')

module.exports = function (file, data, options) {
    if (!/\.js|\.ejs$/.test(file)) return through()

    data = data || {}
    options = options || {}

    var buffer = ""

    return through(function write(chunk) {
        buffer += chunk
    }, function end() {
        this.queue(ejs.render(buffer, data, options));
        this.queue(null);
    })
}