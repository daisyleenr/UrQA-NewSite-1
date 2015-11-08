/**
 * Created by karuana on 15. 7. 4..
 */
var app = angular.module("app");

app.constant("DETAIL_NAV_SIDE", [{
        name: "DETAIL_NAV_SIDE.DASHBOARD",
        path: "detail.dashboard",
        icon: "fa-dashboard"
    }, {
        name: "DETAIL_NAV_SIDE.ERRORS",
        path: "detail.errors",
        icon: "fa-laptop"
    }, {
        name: "DETAIL_NAV_SIDE.STATISTICS",
        path: "detail.statistics",
        icon: "fa-book"
    },
        {
            name: "DETAIL_NAV_SIDE.SETTINGS.TITLE",
            icon: "fa-bullhorn",
            menu: [{
                name: "DETAIL_NAV_SIDE.SETTINGS.GENERAL",
                path: "detail.general",
                parent: "DETAIL_NAV_SIDE.SETTINGS"
            },{
                name: "DETAIL_NAV_SIDE.SETTINGS.VIEWER",
                path: "detail.viewer",
                parent: "DETAIL_NAV_SIDE.SETTINGS"
            }, {
                name: "DETAIL_NAV_SIDE.SETTINGS.SYMBOLICATE",
                path: "detail.symbolicate",
                parent: "DETAIL_NAV_SIDE.SETTINGS"
            }]
        }])

    .config(function ($stateProvider, PROJECT_INFO) {
        var apiKey = JSON.parse(PROJECT_INFO).id;
        $stateProvider.state("detail", {
                url: "/",
                template: "<ui-view />",
                abstract: true,
                data: {project : PROJECT_INFO}
            })
            .state("detail.dashboard", {
                url: 'v/' + apiKey,
                templateUrl: "/static/app/projects/detail/dashboard/template.html"
            })
            .state("detail.errors",{
                url: 'v/' + apiKey + "/errors",
                templateUrl: "/static/app/projects/detail/errors/template.html"
            })
            .state("detail.statistics", {
                url: 'v/' + apiKey + "/statistics",
                templateUrl: "/static/app/projectDetail/statistics/template.html"
            })
            .state("detail.general", {
                url: 'v/' + apiKey + "/setting",
                templateUrl: "/static/app/projectDetail/setting/general/template.html"
            })
            .state("detail.viewer", {
                url: 'v/' + apiKey + "/setting/viewer",
                templateUrl: "/static/app/projectDetail/setting/viewer/template.html"
            })
            .state("detail.symbolicate", {
                url: 'v/' + apiKey + "/setting/symbolicate",
                templateUrl: "/static/app/projectDetail/setting/symbolicate/template.html"
            });
    })
    .controller("DetailNavSideCtrl", function ($scope, DETAIL_NAV_SIDE) {
        $scope.menu = DETAIL_NAV_SIDE;
        $scope.activeMenu = "detail.dashboard";
        $scope.$on('$stateChangeSuccess', function(event, toState){
            $scope.activeMenu = toState.name;
        });

        $scope.clickMenu = function(target) {
            $scope.activeMenu = target;
        };

        $scope.hasPathParm = function(param) {
            return (param !== undefined) && (param !== null);
        };
    })
    .controller("DetailViewController", function($scope, PROJECT_INFO){
        $scope.project = PROJECT_INFO;
    });