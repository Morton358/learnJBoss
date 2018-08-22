$(document).ready(function(){

    $("#emptyItems").click(function(){alert('clearing ...');resetOrder();})
    $("#submitItems").click(function(){alert('submitting ...');submitOrder();})
    getMeals();

});

var serverUri = window.location.origin + "/librarian/order";


function getMeals(){
     $.ajax({
          method: "GET",
          url: serverUri + "/orderitems",
          Accept : "application/json",
          contentType: "application/json"
     }).done(function(meals, status){
        $("#orders table > tbody > tr").remove();
        var totalPrice = 0;
        meals.forEach(function(meal){
            $("#orders table")
                .append("<tr><td>" + meal.name + "</td><td>" +
                 meal.price + "</td><td>" + meal.restaurantName +
                 "</td><td onclick='javascript:removeMeal(" + meal.id + ")'><p class='action'>-</p></td></tr>");
            totalPrice = totalPrice + meal.price;
        });
        $("#totalPrice > span").text(totalPrice);
    } );
}

function addMeal(id){
    $.ajax({
      method: "POST",
      url: serverUri + "/orderitems/"+id
    }).done(function() {
        getMeals();
    });
}

function removeMeal(id){
    $.ajax({
      method: "DELETE",
      url: serverUri + "/orderitems/" + id
    }).done(function() {
        getMeals();
    });
}

function resetOrder(){
     $.ajax({
       method: "DELETE",
       url: serverUri + "/orderitems"
     }).done(function() {
         getMeals();
     });
 }

 function submitOrder(){
     $.ajax({
       method: "POST",
       url: serverUri + "/orderitems"
     }).done(function() {
         getMeals();
         alert("The order has been submited. Thank You!");
     });
 }