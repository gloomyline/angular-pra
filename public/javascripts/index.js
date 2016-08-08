var myApp = angular.module('myApp',[]);
myApp.controller('myCtrl',['$scope','$http',function($scope,$http){
    
    $scope.pros = [];
    $scope.cities = [];
    $scope.areas = [];

    getDataRemote();

    $scope.proChanged = function(){
        // console.log($scope.province.ProID)
        $scope.area = ''
        getDataRemote('city',$scope.province.ProID);
    }

    $scope.cityChanged = function(){
        // console.dir($scope.city);
        if($scope.city){
            getDataRemote('area',$scope.city.CityID);
        }
    }

    /**
     * 
     * @function 从服务器接口获取省市区县数据
     * @param {[String]} fid
     * @returns 
     */
    function getDataRemote(tagName,fid){
        // console.log(tagName,fid)
        $http.get('http://localhost:3000/getAddressData/'+ tagName + '/' + fid).success(function(res){
            // console.log(res.data);
            switch(tagName){
                case 'area':
                $scope.areas = res.data;
                // console.log($scope.areas);
                break;

                case 'city':
                $scope.cities = res.data;
                break;

                default :
                $scope.pros = res.data;
                break;
            }
        })
    }

}])