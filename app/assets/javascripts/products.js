// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

(function(){
    angular
    .module('inventory',["ngResource"])
    .controller('products_controller',products_controller);

    function products_controller($scope,$resource){
        var Product=$resource('/products/:id.json',{},{update:{method:'PUT'}});
        $scope.products=Product.query();
        $scope.btn_add_product_click=function(evt){
            var new_product={name:$scope.product_name,cost:$scope.product_cost,quantity:$scope.product_quantity,orgin:$scope.product_orgin,note:$scope.product_note};
            Product.save(new_product,function(response){
                if(response.success){
                    $scope.products.push(new_product);
                    $scope.product_name="";
                    $scope.product_cost="";
                    $scope.product_quantity="";
                    $scope.product_orgin="";
                    $scope.product_note="";
                }
                else{
                    
                }
            });
        };
        $scope.total_cost=function(){
           var total=0;
           $scope.products.forEach(function(product){
               if(product.quantity){
                   total+=product.cost*product.quantity;
               }
           });
            return total;
        }
        $scope.btn_delete_product_click=function(product){
            Product.delete({id:product.id},function(response){
                console.log(response);
                var product_index=$scope.products.indexOf(product);
                $scope.products.splice(product_index,1);
            });
        };
        $scope.btn_update_product_click=function(product){
            Product.update({id:product.id},product,function(response){
                console.log("ok");
            });
        };
    }
})();