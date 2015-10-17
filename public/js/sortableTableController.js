/**
 * Created by a on 9/9/2015.
 */
// Make sure that in html/jade page that this file is after controllers.js
// (the one that declares controllers array)
(function() {

'use strict';
angular.module('myApp.controllers').
  controller('SortableTableCtrl', ['$scope', function($scope) {

    var Purchases = {};

    Purchases.data = [
      {
        date: '10/05/2012',
        text: '3 Lorem ipsum dolor sit amet ipsum dolor',
        price: '�123.45',
        availability: '1 Available until 10th Dec 2013'
      },
      {
        date: '24/05/2012',
        text: '2 Lorem ipsum dolor sit amet ipsum dolor',
        price: '�34.56',
        availability: '2 Available until 10th Dec 2013'
      },
      {
        date: '20/05/2012',
        text: '1 Lorem ipsum dolor sit amet ipsum dolor',
        price: '�245.67',
        availability: '3 Available until 10th Dec 2013'
      }
    ];

    $scope.purchases = Purchases;
    $scope.sort = {
      column: '',
      descending: false
    };

    $scope.changeSorting = function(column) {

      var sort = $scope.sort;

      if (sort.column == column) {
        sort.descending = !sort.descending;
      } else {
        sort.column = column;
        sort.descending = false;
      }
    };

  }
  ]);
})();
