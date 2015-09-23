/// <reference path="../../typings/tsd.d.ts" />

import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import { Styles, Paper, LinearProgress, FlatButton, Snackbar } from 'material-ui';

import FSInput from './FSInput';
import FSFilesList from './FSFilesList';

interface State {
  interval?: number;
  notice?: string;
}

class App extends React.Component<{}, State> {

  static muiTheme = new Styles.ThemeManager;
  static childContextTypes = {
    muiTheme: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      interval: -1,
      notice: '',
    };
  }

  getChildContext() {
    return {
      muiTheme: App.muiTheme.getCurrentTheme(),
    };
  }

  start(): void {
    this.setState({
      // interval: setInterval(this.shuffle.bind(this), 10000),
      interval: setInterval(this.shuffle.bind(this), 120000),
    });
    this.shuffle();
  }

  stop(notice: string): void {
    clearInterval(this.state.interval);
    this.setState({
      interval: -1,
      notice,
    });
    this.refs['notice'].show();
  }

  shuffle(): void {
    const files = this.refs['files'].state.files;
    if (!files.length) {
      return this.stop('Please specify files to shuffle.');
    }
    const dest = this.refs['file'].state.path;
    if (!dest) {
      return this.stop('Please specify the destination file.');
    }
    const src = files[random(0, files.length - 1)];
    copy(src, dest);
    this.setState({
      notice: `Shuffled File "${src}"`,
    });
    this.refs['notice'].show();
  }

  render(): JSX.Element {
    return (
      <div>
        <div className='pure-g'>
          <div className='pure-u-1 pure-u-sm-1-2'>
            <div className='pure-u-1'>
              <Paper style={{margin: '8px'}}>
                <div className='pure-u-1'>
                  <FlatButton className='pure-u-1 pure-u-sm-1-2' label='Start' onClick={this.start.bind(this)} />
                  <FlatButton className='pure-u-1 pure-u-sm-1-2' label='Stop' onClick={this.stop.bind(this, 'Stopped.')} />
                </div>
                <div className='pure-u-1'>
                  <LinearProgress mode={this.state.interval > -1 ? 'indeterminate' : 'determinate'} />
                </div>
              </Paper>
            </div>
            <div className='pure-u-1'>
              <FSInput ref='file' label='Music File' />
            </div>
          </div>
          <div className='pure-u-1 pure-u-sm-1-2'>
            <FSFilesList ref='files' />
          </div>
        </div>
        <Snackbar ref='notice' message={this.state.notice} title={this.state.notice} />
      </div>
    );
  }
}

export default function AppFactory(element: Element): JSX.Element {
  const ret = <App />;
  React.render(ret, element);
  return ret;
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copy(source: string, destination: string): void {
  return fs.writeFileSync(destination, fs.readFileSync(source));
}
