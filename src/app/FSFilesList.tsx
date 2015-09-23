/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import { Paper, List, ListItem, FlatButton, IconButton } from 'material-ui';
import * as remote from 'remote';
const dialog = remote.require('dialog');

interface Props {
  ref?: string | ((component: JSX.Element) => void); // workaround for custom component refs in typescript
}

interface State {
  selected_file?: number;
  files?: string[];
}

export default class FSFilesList extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      selected_file: 0,
      files: [],
    };
  }

  addFiles(): void {
    dialog.showOpenDialog({
      defaultPath: process.env.USERPROFILE,
      properties: ['openFile', 'multiSelections'],
    }, (files) => {
      if (files) {
        this.setState({
          files: this.state.files.concat(files),
        });
      }
    });
  }

  clear(): void {
    this.setState({
      files: [],
    });
  }

  removeItem(index: number): void {
    const files = this.state.files.slice();
    files.splice(index, 1);
    this.setState({
      files,
    });
  }

  render(): JSX.Element {
    let files = this.state.files.map((file, index) => {
      return <ListItem
        key={index}
        primaryText={<div style={{overflow: 'hidden', 'textOverflow': 'ellipsis'}} title={file}>{file}</div>}
        rightIconButton={<IconButton iconClassName='material-icons' onClick={this.removeItem.bind(this, index)} >clear</IconButton>}
      />
    });
    if (!files.length) {
      files = [<ListItem primaryText={'No Files Added'} />];
    }
    return (
      <Paper className='pure-g' style={{margin: '8px'}}>
        <div className='pure-u-1'>
          <FlatButton className='pure-u-1 pure-u-sm-1-2' label='Add Files' onClick={this.addFiles.bind(this)} />
          <FlatButton className='pure-u-1 pure-u-sm-1-2' label='Clear' onClick={this.clear.bind(this)} />
        </div>
        <List className='pure-u-1'>
          {files}
        </List>
      </Paper>
    )
  }
}
