var app = angular.module('directiveWorkshop');
app.directive('pendingDir', function($q) {
  return {
    restrict: "A",
    scope: {
      request: '&'
    },
    link: function(scope, elem, attrs) {
      var spinnerIcon = angular.element('<i class="fa fa-spinner"></i>');
      spinnerIcon.hide();
      elem.after(spinnerIcon);

      var invokeRequest = function() {
        var dfd = $q.defer();
        dfd.resolve(scope.request());
        return dfd.promise;
      }

      elem.on('click', function() {
        elem.hide();
        spinnerIcon.show();
        invokeRequest().then(function(){
          setTimeout(function(){
            elem.show();
            spinnerIcon.hide();
          }, 1000)
        })
      })
    }
  }
});
