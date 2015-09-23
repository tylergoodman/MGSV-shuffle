/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import { Paper, RaisedButton } from 'material-ui';
import * as remote from 'remote';
const dialog = remote.require('dialog');

enum Type {
  FILE,
  FOLDER,
}

interface Props {
  type?: Type;
  label?: string;
  ref?: string | ((component: JSX.Element) => void); // workaround for custom component refs in typescript
}

interface State {
  path: string;
}

export default class FSInput extends React.Component<Props, State> {

  static Type = Type;
  static defaultProps: Props = {
    type: FSInput.Type.FILE,
    label: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      path: '',
    };
  }

  chooseFile(event: Event): void {
    dialog.showOpenDialog({
      defaultPath: process.env.USERPROFILE,
      properties: [`open${this.props.type === FSInput.Type.FILE ? 'File' : 'Directory'}`],
    }, (files) => {
      if (files.length) {
        const [path] = files;
        this.setState({
          path,
        });
      }
    });
  }

  render(): JSX.Element {
    return (
      <Paper
        style={{
          margin: '8px',
          padding: '5px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignContent: 'center', }}>
        <span style={{padding: '8px'}}>{this.props.label}</span>
        <RaisedButton
          style={{
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
          label={`Choose ${this.props.type === FSInput.Type.FILE ? 'File' : 'Directory'}`}
          primary={true}
          onClick={this.chooseFile.bind(this)} />
        <span
          style={{
            padding: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={this.state.path} >
          {this.state.path ? this.state.path : `No ${this.props.type === FSInput.Type.FILE ? 'file' : 'folder'} selected`}
        </span>
      </Paper>
    );
  }
}
