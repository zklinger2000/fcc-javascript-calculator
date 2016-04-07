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
  function numPush(num) {
    if (vm.display.length === 1 && vm.display === '0') {
      vm.display = num.toString();
      vm.buffer = [vm.display];
    } else if (vm.display === '') {
      vm.display = num.toString();
      vm.buffer.push(vm.display);
    } else if (vm.buffer[vm.buffer.length - 1] === '=') {
      vm.display = num.toString();
      vm.buffer = [vm.display];
    } else {
      vm.display += num.toString();
      vm.buffer[vm.buffer.length - 1] = vm.display;
    }
  }
  function addPush() {
    // If the display is empty, do nothing
    if (vm.display === '0' || vm.display === '') return;
    // If the last element in the buffer is the equals sign, reset buffer
    if (vm.buffer[vm.buffer.length - 1] === '=') {
      vm.buffer = [vm.display];
    }
    vm.buffer.push('+');
    vm.display = '';
  }
  function equalsPush() {
    console.log(vm.buffer);
    if (vm.buffer.length % 2 === 0) {
      vm.buffer.pop();
    }
    vm.display = eval(vm.buffer.join(''));
    vm.buffer.push('=');
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
    func: equalsPush
  }];

});
