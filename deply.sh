#!/bin/bash

git reset --hard
git pull origin master:master
rm -rf dist/
npm install
npm run build