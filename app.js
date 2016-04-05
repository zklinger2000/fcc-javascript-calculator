// app.js
angular.module('calcApp', [])
// Add lodash for use in controllers, unit tests
.constant('_', window._)
// Add lodash for use in views, ng-repeat="x in _.range(3)"
.run(function ($rootScope) {
  $rootScope._ = window._;
})
// Main Controller
.controller('MainController', function($scope) {
  var vm = this;
  
  vm.buffer = [];
  vm.display = '0';
  
  function hello() {
    console.log('hello');
  }
  function addKey(num) {
    if (vm.display === '0') {
      vm.display = num.toString();
    } else {
      vm.display += num;
    }
  }
  
  vm.keys = [{
    name: 'C',
    func: hello
  }, {
    name: 'CE',
    func: hello
  }, {
    name: '+/-',
    func: hello
  }, {
    name: 'X',
    func: hello
  }, {
    name: '7',
    func: hello,
    value: 7
  }, {
    name: '8',
    func: hello,
    value: 8
  }, {
    name: '9',
    func: addKey,
    value: 9
  }, {
    name: '/',
    func: hello
  }];

});
