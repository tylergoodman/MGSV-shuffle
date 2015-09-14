/// <reference path="./typings/tsd.d.ts" />

import * as fs from 'fs';
import * as path from 'path';

const [
  filename,
  shuffle_folder,
  time
] = process.argv.slice(2);

if (!filename || !shuffle_folder) {
  console.log(`Usage: MGSV-shuffle PATH_TO_FILE PATH_TO_MUSIC_FOLDER [INTERVAL(ms)]`);
  process.exit(0);
}

const files = fs.readdirSync(shuffle_folder).filter((file) => {
  return !fs.statSync(path.join(shuffle_folder, file)).isDirectory();
});

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(): void {
  const file = files[random(0, files.length - 1)];
  console.log(`shuffling file "${file}" -> "${filename}"`);
  fs.writeFileSync(filename, fs.readFileSync(path.join(shuffle_folder, file)));
}

let interval = parseInt(time, 10);
if (!interval || interval < 30000) {
  interval = 30000;
}
console.log(`shuffle interval set to ${interval / 1000}s`);

shuffle();
setInterval(shuffle, interval);
