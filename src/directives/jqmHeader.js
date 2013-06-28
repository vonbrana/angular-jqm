/**
 * @ngdoc directive
 * @name jqm.directive:jqmHeader
 * @restrict A
 *
 * @description
 * Defines the header of a `jqm-page`.
 *
 * @example
 <example module="jqm">
 <file name="index.html">
 <div jqm-page class="jqm-standalone-page" style="height: 100px;">
   <div jqm-header>
     <h1>Header of Page1</h1>
   </div>
   Hello world!
 </div>
 </file>
 </example>
 */
jqmModule.directive('jqmHeader', function () {
    return {
        restrict: 'A',
        // Own scope as we have a different default theme
        // than the page.
        scope: true,
        require: '^jqmPage',
        controller: angular.noop,
        link: function (scope, element, attr, jqmPageCtrl) {
            jqmPageCtrl.header = element;
            var hasExplicitTheme = scope.hasOwnProperty('$theme');
            if (!hasExplicitTheme) {
                scope.$theme = 'a';
            }
            element.addClass("ui-header ui-bar-"+scope.$theme);
        }
    };
});

angular.forEach(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'], function (headerName) {
    jqmModule.directive(headerName, hxDirective);
});
function hxDirective() {
    return {
        restrict: 'E',
        require: ['?^jqmHeader', '?^jqmFooter'],
        compile: function () {
            return function (scope, element, attrs, ctrls) {
                var i;
                for (i=0; i<ctrls.length; i++) {
                    if (ctrls[i]) {
                        element.addClass("ui-title");
                        break;
                    }
                }
            };
        }
    };
}