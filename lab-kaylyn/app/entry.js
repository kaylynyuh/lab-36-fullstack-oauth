'use strict';

// build sass
require('./scss/main.scss');

// require node modules
const path = require('path');

// require npm modules
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');

// require angualr modules
// literally just requiring the name of the module, not the module itself
const ngTouch = require('angular-touch');
const ngAnimate = require('angular-animate');
const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
const ngFileUpload = require('ng-file-upload');

// create angular module
const demoApp = angular.module('demoApp', [ngTouch, ngAnimate, uiRouter, uiBootstrap, ngFileUpload]);

// load config
let context = require.context('./config/', true, /.js$/);
context.keys().forEach( path => {
  demoApp.config(context(path));
});

// load view controllers
// loop through js files in view dir, get the name of each file and the actual thing that was exported
context = require.context('./view/', true, /.js$/);
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js')); // name controller based on file name
  let module = context(key); // value of module.exports
  demoApp.controller(name, module);
});

// load services
context = require.context('./service/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  demoApp.service(name, module);
});

// load components
context = require.context('./component/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js')); // name component based on filename
  let module = context(key); // value of module.exports
  demoApp.component(name, module);
});

// load filters
context = require.context('./filter/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js')); // name component based on filename
  let module = context(key); // value of module.exports
  demoApp.filter(name, module);
});
