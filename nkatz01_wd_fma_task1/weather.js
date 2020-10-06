(function updateScore(){
    setTimeout(function() { //structure of the code for this function, taken from activity2 in lecture 7.
        $.ajax({
            
            url: "weather.json", 
            type: "GET", 
            dataType: "json", 
            success: function(response){
            
                let sTxt = ""; 
                $("#forcast").html("");
                 sTxt +="<tr><th id='index'></th><th>City</th><th>Weather condition</th><th>Temperature</th><th>Wind speed</th><th>Wind direction</th><th>Wind chill factor</th><th></th></tr>";
                $.each(response.weather, function(index){
                    sTxt += "<tr><td>" +
                    response.weather[index].cityID + "</td><td>" +
                    response.weather[index].cityName + "</td><td>" +
                    response.weather[index].currerntCond +   "</td><td>"  +
                    response.weather[index].temperature.amount +  response.weather[index].temperature.scale + "</td><td>" +
                    response.weather[index].windDirection +  "</td><td>" +
                    response.weather[index].windSpeed.amount +  response.weather[index].windSpeed.scale + "</td><td>" ;
               if (response.weather[index].hasOwnProperty('windChilFactor')){
                   sTxt +=     response.weather[index].windChilFactor.amount +  response.weather[index].windChilFactor.scale + "</td><td>" ;
               }
               else{
                    sTxt += "N/A</td><td>";
               }
               
                sTxt +=  "<img src=\"weather_icons/" + response.weather[index].iconName + "\"\\>" + "</td></tr>";
             
                
                    
                });
                $("#forcast").append(sTxt); 
                 updateScore();
            }, 
            error: function(){
              $("#info").html("<p>An error has occurred</p>");
           
            }
        });
    } ,250);
    
})();
