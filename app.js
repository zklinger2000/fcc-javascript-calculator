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
      if (vm.buffer[vm.buffer.length - 1]) {
        vm.buffer[vm.buffer.length - 1] = vm.display;
      } else {
        vm.buffer.push(vm.display);
      }
    } else if (vm.buffer[vm.buffer.length - 1] === '=') {
      vm.display = num.toString();
      vm.buffer = [vm.display];
    } else if (vm.display === '') {
      vm.display = num.toString();
      vm.buffer.push(vm.display);
    } else {
      vm.display += num.toString();
      if (vm.buffer[vm.buffer.length - 1]) {
        vm.buffer[vm.buffer.length - 1] = vm.display;
      } else {
        vm.buffer.push(vm.display);
      }
    }
  }
  
  function decimalPush () {
    if (!vm.display.includes('.')) {
      vm.display += '.';
      if (vm.buffer[vm.buffer.length - 1]) {
        vm.buffer[vm.buffer.length - 1] = vm.display;
      } else {
        vm.buffer.push(vm.display);
      }
    }
  }
  
  function operandPush(value) {
    // If the display is empty, do nothing
    if (vm.display === '0') return;
    if (vm.display === '' && vm.buffer.length % 2 === 0) return;
    // If the last element in the buffer is the equals sign, reset buffer
    if (vm.buffer[vm.buffer.length - 1] === '=') {
      vm.buffer = [vm.display];
    }
    vm.buffer.push(value);
    vm.display = '';
  }
  
  function clear() {
    vm.buffer = [];
    vm.display = '0';
  }
  
  function popLast() {
    if (vm.buffer.length > 1) {
      vm.buffer.pop();
      if (vm.buffer.length % 2 === 0) {
        vm.display = '';
      } else {
        vm.display = vm.buffer[vm.buffer.length - 1];
      }
    } else if (vm.buffer.length === 1) {
      vm.buffer.pop();
      vm.display = '0';
    }
  }
  
  function equalsPush() {
    console.log(vm.buffer);
    if (vm.buffer.length % 2 === 0) {
      vm.buffer.pop();
    }
    vm.display = Math.round(eval(vm.buffer.join('')) * 10000000000) / 10000000000;
    vm.display = vm.display.toString().slice(0, 16);
    vm.buffer.push('=');
  }
  
  function plusMinus() {
    if (vm.buffer.length % 2 !== 0) {
      if (vm.display[0] === '-') {
        vm.display = vm.display.slice(1);
        vm.buffer[vm.buffer.length - 1] = vm.display;
      } else if (vm.display !== '0') {
        vm.display = '-' + vm.display;
        vm.buffer[vm.buffer.length - 1] = vm.display;
      }
    }
  }

  vm.keys = [{
    value: 'C',
    func: clear
  }, {
    value: 'CE',
    func: popLast
  }, {
    value: '+/-',
    func: plusMinus
  }, {
    value: '*',
    func: operandPush,
  }, {
    func: numPush,
    value: 7
  }, {
    func: numPush,
    value: 8
  }, {
    func: numPush,
    value: 9
  }, {
    value: '/',
    func: operandPush,
  }, {
    func: numPush,
    value: 4
  }, {
    func: numPush,
    value: 5
  }, {
    func: numPush,
    value: 6
  }, {
    value: '-',
    func: operandPush,
  }, {
    func: numPush,
    value: 1
  }, {
    func: numPush,
    value: 2
  }, {
    func: numPush,
    value: 3
  }, {
    func: operandPush,
    value: '+'
  }, {
    func: numPush,
    value: 0
  }, {
    value: '.',
    func: decimalPush
  }, {
    value: '=',
    func: equalsPush
  }];

});
