#! node
var fs = require('fs');
var path = require('path');
var _a = process.argv.slice(2), filename = _a[0], shuffle_folder = _a[1], time = _a[2];
if (!filename || !shuffle_folder) {
    console.log("Usage: MGSV-shuffle PATH_TO_FILE PATH_TO_MUSIC_FOLDER [INTERVAL]");
    process.exit(0);
}
var files = fs.readdirSync(shuffle_folder).filter(function (file) {
    return !fs.statSync(path.join(shuffle_folder, file)).isDirectory();
});
var interval = parseInt(time, 10);
if (!interval || interval < 30000) {
    interval = 30000;
}
console.log("shuffle interval set to " + interval / 1000 + "s");
shuffle();
setInterval(shuffle, interval);
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function copy(source, destination) {
    return fs.writeFileSync(destination, fs.readFileSync(source));
}
function shuffle() {
    var file = files[random(0, files.length - 1)];
    copy(path.join(shuffle_folder, file), filename);
    console.log("shuffled file \"" + file + "\" -> \"" + filename + "\"");
}
