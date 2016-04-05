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
  vm.tempDisplay = '';
  
  function hello() {
    console.log('hello');
  }
  function numPush(num) {
    if (vm.display === '0') {
      vm.display = num.toString();
    } else {
      vm.display += num;
    }
  }
  function addPush() {
    vm.buffer.push(Number(vm.display));
    vm.buffer.push('+');
    vm.display = '';
    vm.tempDisplay = vm.buffer[vm.buffer.length - 2];
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
    func: numPush,
    value: 7
  }, {
    name: '8',
    func: numPush,
    value: 8
  }, {
    name: '9',
    func: numPush,
    value: 9
  }, {
    name: '/',
    func: hello
  }, {
    name: '4',
    func: numPush,
    value: 4
  }, {
    name: '5',
    func: numPush,
    value: 5
  }, {
    name: '6',
    func: numPush,
    value: 6
  }, {
    name: '-',
    func: hello
  }, {
    name: '1',
    func: numPush,
    value: 1
  }, {
    name: '2',
    func: numPush,
    value: 2
  }, {
    name: '3',
    func: numPush,
    value: 3
  }, {
    name: '+',
    func: addPush
  }, {
    name: '0',
    func: numPush,
    value: 0
  }, {
    name: '.',
    func: hello
  }, {
    name: '=',
    func: hello
  }];

});
