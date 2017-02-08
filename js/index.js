'use strict';

var Detail = Vue.component('Detail', {
  mounted: function mounted() {
    console.log(this);
    app.fetchWeather(this.current_zip);
  },

  watch: {
    '$route': function $route(to, from) {
      console.log(to.params.id);
      app.fetchWeather(to.params.id);
      //debugger;
    }
  },
  template: '<div>Zip Code {{ $route.params.id }}</div>'
});
var Zips = Vue.component('Zips', {
  template: '<div>Dallas Zip Codes Home page</div>'
});

var router = new VueRouter({
  routes: [{ path: '/detail/:id', component: Detail }, { path: '/', component: Zips }]
});

var app = new Vue({
  data: {
    zip_codes: ["75201", "75202", "75203", "75204", "75205", "75206", "75207", "75208", "75209", "75210", "75211", "75212", "75214", "75215", "75216", "75217", "75218", "75219", "75220", "75221", "75222", "75223", "75224", "75225", "75226", "75227", "75228", "75229", "75230", "75231", "75232", "75233", "75234", "75235", "75236", "75237", "75238", "75240", "75241", "75242", "75243", "75244", "75245", "75246", "75247", "75248", "75249", "75250", "75251", "75252", "75253", "75254", "75258", "75260", "75261", "75262", "75263", "75264", "75265", "75266", "75267", "75270", "75275", "75277", "75283", "75284", "75285", "75286", "75287", "75301", "75303", "75310", "75312", "75313", "75315", "75320", "75323", "75326", "75334", "75336", "75339", "75340", "75342", "75343", "75344", "75353", "75354", "75355", "75356", "75357", "75358", "75359", "75360", "75363", "75364", "75367", "75368", "75370", "75371", "75372", "75373", "75374", "75376", "75378", "75379", "75380", "75381", "75382", "75386", "75387", "75388", "75389", "75390", "75391", "75392", "75393", "75394", "75395", "75396", "75397", "75398"],
    weather_data: {},
    weather_main: "",
    weather_description: "",
    weather_icon: ""
  },
  router: router,
  filters: {
    addDetailToUrl: function addDetailToUrl(zip) {
      if (!zip) return '';
      var pattern = /\/detail\/(?:\d*\.)?\d+/g;
      var url = window.location.href;
      //console.log("url: "+url);
      var res = pattern.exec(url);
      var zipString = zip.toString();
      //console.log("res: " + res);
      var cleanUrl = url.replace(res, "");
      //console.log("cleanUrl: " + cleanUrl);
      var newUrl = cleanUrl + "detail/" + zipString;
      return newUrl;
    }
  },
  methods: {
    fetchWeather: function fetchWeather(zipCode) {
      var _this = this;

      //console.log(this);
      this.current_zip = zipCode;
      //debugger;
      console.log("zipCode: " + zipCode);
      this.$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + zipCode + '&appid=7849f8a515f08107f2ebe2323dc6a5cc').then(function (response) {
        _this.weather_data = response.body.weather[0];
        _this.weather_main = response.body.weather[0].main;
        _this.weather_description = response.body.weather[0].description;
        _this.weather_icon = "http://openweathermap.org/img/w/" + response.body.weather[0].icon + ".png";

        console.log(_this.weather_data);
      }, function (response) {
        console.log(err);
      });
    }
  }
}).$mount('#app');