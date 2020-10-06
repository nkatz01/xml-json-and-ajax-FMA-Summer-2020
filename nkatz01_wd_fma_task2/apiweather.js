$(document).ready(function () { //structure of the code for this function, taken mainly from lecture 7 and lecture 6, activity 3.
    
    
    
    $("#regions").change(function () {
        let region = $(this).val();
        switch (region) {
            case 'england':
            $("#cities").load("england-cities.html");
            break;
            case 'scotland':
            $("#cities").load("scotland-cities.html");
            break;
            case 'wales':
            $("#cities").load("wales-cities.html");
            break;
            case 'nirland':
            $("#cities").load("nireland-cities.html");
            break;
        }
        
        $("#cities").change(function () {
            let city = $(this).val();
            
            let apiUrl = `https:\/\/api.openweathermap.org/data/2.5/weather?q= ${city},uk&APPID=414c5f64311ce1d3548d02e08f7fe1a6`;
            $.ajax({
                url: apiUrl,
                type: "GET",
                dataType: "json",
                success: function (response) {
                    let lastUpdated = new Date(response.dt * 1000);
                    let dd = lastUpdated.getDate();
                    let mm = lastUpdated.getMonth() + 1;
                    let yyyy = lastUpdated.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd
                    }
                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    let date = dd + '-' + mm + '-' + yyyy; //https://stackoverflow.com/questions/17354574/how-convert-unixtime-to-yy-mm-dd
                    var sTxt = `<dl id='list'><dt>Name:</dt><dd> ${response.name} </dd><dt>Date:</dt><dd> ${date} </dd><dt>Weather condition:</dt><dd>${response.weather[0].description}</dd>`;
                    let img = new Image();
                    img.src = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
                    
                    sTxt += `<dd> ${img.outerHTML} </dd><dt>Temperature:</dt>`;//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
                    let metric = (response.main.temp -273.15).toFixed(1);
                    let imperial = (1.8 * metric + 32).toFixed(1);
                    if ((metric > 35) || (metric < -5)) {
                        sTxt += "<dt id='warn'>Warning: Severe weather conditions</dt>";
                    }
                    sTxt += `<dd> ${metric}°C</dd><dd> ${imperial}F</dd><dt>Wind speed:</dt>`;
                    
                    let kph = ((response.wind.speed * Math.pow(60, 2)) / 1000).toFixed(1);
                    
                    if (kph > 50) {
                        sTxt += "<dt id='warn'>Warning: Severe winds</dt>";
                    }
                    
                    sTxt += "<dd>" + kph + " kph</dd><dd>" +
                    ((response.wind.speed * 0.000621371) * Math.pow(60, 2)).toFixed(1) + " mph</dd><dt>" + "Wind direction:</dt><dd>" + response.wind.deg + "°</dd>";
                    
                    apiUrl = `https:\/\/api.openweathermap.org/data/2.5/weather?q=  ${city}  ,uk&mode=xml&APPID=414c5f64311ce1d3548d02e08f7fe1a6`;
                    $.ajax({
                        url: apiUrl,
                        type: "GET",
                        async: false,
                        dataType: "xml",
                        success: function (response) {
                            
                            let direction = $(response).find('direction').attr('name');
                            sTxt += "<dd>" + direction + "</dd>";
                        },
                        
                        error: function (xhr, error) {
                            $("#info").append(error.toUpperCase() + ". HTTP status request to get wind direction failed" + xhr.status);
                            sTxt += "<dd>undefined</dd>";
                        }
                    });
                    
                    sTxt += "</dl>";
                    
                    $("#cityInfo").html("");
                    $("#cityInfo").append(sTxt);
                    if ($("#cityInfo").attr("hidden")) {
                        $("#cityInfo").show();
                    }
                },
                error: function (xhr, error) {
                    $("#info").append(error.toUpperCase() + ". HTTP status" + xhr.status +". Failed to fetch data");
                }
            });
        });
    });
});