var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fs = require('fs');
var React = require('react');
var material_ui_1 = require('material-ui');
var FSInput_1 = require('./FSInput');
var FSFilesList_1 = require('./FSFilesList');
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.state = {
            interval: -1,
            notice: '',
        };
    }
    App.prototype.getChildContext = function () {
        return {
            muiTheme: App.muiTheme.getCurrentTheme(),
        };
    };
    App.prototype.start = function () {
        this.setState({
            interval: setInterval(this.shuffle.bind(this), 120000),
        });
        this.shuffle();
    };
    App.prototype.stop = function (notice) {
        clearInterval(this.state.interval);
        this.setState({
            interval: -1,
            notice: notice,
        });
        this.refs['notice'].show();
    };
    App.prototype.shuffle = function () {
        var files = this.refs['files'].state.files;
        if (!files.length) {
            return this.stop('Please specify files to shuffle.');
        }
        var dest = this.refs['file'].state.path;
        if (!dest) {
            return this.stop('Please specify the destination file.');
        }
        var src = files[random(0, files.length - 1)];
        copy(src, dest);
        this.setState({
            notice: "Shuffled File \"" + src + "\"",
        });
        this.refs['notice'].show();
    };
    App.prototype.render = function () {
        return (React.createElement("div", null, React.createElement("div", {"className": 'pure-g'}, React.createElement("div", {"className": 'pure-u-1 pure-u-sm-1-2'}, React.createElement("div", {"className": 'pure-u-1'}, React.createElement(material_ui_1.Paper, {"style": { margin: '8px' }}, React.createElement("div", {"className": 'pure-u-1'}, React.createElement(material_ui_1.FlatButton, {"className": 'pure-u-1 pure-u-sm-1-2', "label": 'Start', "onClick": this.start.bind(this)}), React.createElement(material_ui_1.FlatButton, {"className": 'pure-u-1 pure-u-sm-1-2', "label": 'Stop', "onClick": this.stop.bind(this, 'Stopped.')})), React.createElement("div", {"className": 'pure-u-1'}, React.createElement(material_ui_1.LinearProgress, {"mode": this.state.interval > -1 ? 'indeterminate' : 'determinate'})))), React.createElement("div", {"className": 'pure-u-1'}, React.createElement(FSInput_1.default, {"ref": 'file', "label": 'Music File'}))), React.createElement("div", {"className": 'pure-u-1 pure-u-sm-1-2'}, React.createElement(FSFilesList_1.default, {"ref": 'files'}))), React.createElement(material_ui_1.Snackbar, {"ref": 'notice', "message": this.state.notice, "title": this.state.notice})));
    };
    App.muiTheme = new material_ui_1.Styles.ThemeManager;
    App.childContextTypes = {
        muiTheme: React.PropTypes.object,
    };
    return App;
})(React.Component);
function AppFactory(element) {
    var ret = React.createElement(App, null);
    React.render(ret, element);
    return ret;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppFactory;
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function copy(source, destination) {
    return fs.writeFileSync(destination, fs.readFileSync(source));
}
