var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var material_ui_1 = require('material-ui');
var remote = require('remote');
var dialog = remote.require('dialog');
var FSFilesList = (function (_super) {
    __extends(FSFilesList, _super);
    function FSFilesList(props) {
        _super.call(this, props);
        this.state = {
            selected_file: 0,
            files: [],
        };
    }
    FSFilesList.prototype.addFiles = function () {
        var _this = this;
        dialog.showOpenDialog({
            defaultPath: process.env.USERPROFILE,
            properties: ['openFile', 'multiSelections'],
        }, function (files) {
            if (files) {
                _this.setState({
                    files: _this.state.files.concat(files),
                });
            }
        });
    };
    FSFilesList.prototype.clear = function () {
        this.setState({
            files: [],
        });
    };
    FSFilesList.prototype.removeItem = function (index) {
        var files = this.state.files.slice();
        files.splice(index, 1);
        this.setState({
            files: files,
        });
    };
    FSFilesList.prototype.render = function () {
        var _this = this;
        var files = this.state.files.map(function (file, index) {
            return React.createElement(material_ui_1.ListItem, {"key": index, "primaryText": React.createElement("div", {"style": { overflow: 'hidden', 'textOverflow': 'ellipsis' }, "title": file}, file), "rightIconButton": React.createElement(material_ui_1.IconButton, {"iconClassName": 'material-icons', "onClick": _this.removeItem.bind(_this, index)}, "clear")});
        });
        if (!files.length) {
            files = [React.createElement(material_ui_1.ListItem, {"primaryText": 'No Files Added'})];
        }
        return (React.createElement(material_ui_1.Paper, {"className": 'pure-g', "style": { margin: '8px' }}, React.createElement("div", {"className": 'pure-u-1'}, React.createElement(material_ui_1.FlatButton, {"className": 'pure-u-1 pure-u-sm-1-2', "label": 'Add Files', "onClick": this.addFiles.bind(this)}), React.createElement(material_ui_1.FlatButton, {"className": 'pure-u-1 pure-u-sm-1-2', "label": 'Clear', "onClick": this.clear.bind(this)})), React.createElement(material_ui_1.List, {"className": 'pure-u-1'}, files)));
    };
    return FSFilesList;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FSFilesList;
