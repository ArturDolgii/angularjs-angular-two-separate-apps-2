'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'angular-phonecat/app/phone-list/phone-list.template.html',
    controller: ['Phone',
      function PhoneListController(Phone) {
        var self = this;
        Phone.query().toPromise().then(function(phones) {
          self.phones = phones;
        });
        this.orderProp = 'age';
      }
    ]
  });
