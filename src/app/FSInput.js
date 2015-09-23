var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var material_ui_1 = require('material-ui');
var remote = require('remote');
var dialog = remote.require('dialog');
var Type;
(function (Type) {
    Type[Type["FILE"] = 0] = "FILE";
    Type[Type["FOLDER"] = 1] = "FOLDER";
})(Type || (Type = {}));
var FSInput = (function (_super) {
    __extends(FSInput, _super);
    function FSInput(props) {
        _super.call(this, props);
        this.state = {
            path: '',
        };
    }
    FSInput.prototype.chooseFile = function (event) {
        var _this = this;
        dialog.showOpenDialog({
            defaultPath: process.env.USERPROFILE,
            properties: [("open" + (this.props.type === FSInput.Type.FILE ? 'File' : 'Directory'))],
        }, function (files) {
            if (files.length) {
                var path = files[0];
                _this.setState({
                    path: path,
                });
            }
        });
    };
    FSInput.prototype.render = function () {
        return (React.createElement(material_ui_1.Paper, {"style": {
            margin: '8px',
            padding: '5px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'center', }}, React.createElement("span", {"style": { padding: '8px' }}, this.props.label), React.createElement(material_ui_1.RaisedButton, {"style": {
            flexShrink: 0,
            whiteSpace: 'nowrap',
        }, "label": "Choose " + (this.props.type === FSInput.Type.FILE ? 'File' : 'Directory'), "primary": true, "onClick": this.chooseFile.bind(this)}), React.createElement("span", {"style": {
            padding: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }, "title": this.state.path}, this.state.path ? this.state.path : "No " + (this.props.type === FSInput.Type.FILE ? 'file' : 'folder') + " selected")));
    };
    FSInput.Type = Type;
    FSInput.defaultProps = {
        type: FSInput.Type.FILE,
        label: '',
    };
    return FSInput;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FSInput;
