var app = angular.module('mainApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
.controller('MainController',['$scope', '$window', '$http', '$timeout', function($scope, $window,$http, $timeout){
    $window.onscroll = function(){
        //alert('view scroll');
    };
    $scope.instance='';
    $scope.message = "controller active";
    var sound = { src: "audio/days_are_gone.mp3", id: "default"};
    $scope.sounds = [
        {src: "audio/days_are_gone.mp3", id: 'days-are-gone'},
        {src: "audio/01_belly_ache.mp3", id: "01-belly-ache"},
        {src: "audio/02_rebel_leaf.mp3", id: "02-rebel-leaf"},
        {src: "audio/03_stubborn.mp3", id: "03-stubborn"},
        {src: "audio/04_my_eyes.mp3", id: "04-my-eyes"},
        {src: "audio/05_suburban_redneck.mp3", id: "05-suburban-redneck"},
        {src: "audio/06_seven_years_old.mp3", id: "07-seven-years-old"},
        {src: "audio/07_no_one_else.mp3", id: "07-no-one-else"},
        {src: "audio/08_fresh_meat.mp3",id: "08-fresh-meat"},
        {src: "audio/09_god_bless.mpr3", id: "09-god-bless"},
        {src: "audio/10_fingers.mp3", id: "10-fingers"},
        {src: "audio/11_snow_day.mp3", id: "11-snow-day"}
    ];
    $scope.soundsDisplay = [
        {src: "audio/days_are_gone.mp3", id: 'days-are-gone', display: 'Days are Gone'},
        {src: "audio/01_belly_ache.mp3", id: "01-belly-ache", display: 'Belly Ache'},
        {src: "audio/02_rebel_leaf.mp3", id: "02-rebel-leaf", display: 'Rebel Leaf'},
        {src: "audio/03_stubborn.mp3", id: "03-stubborn", display: 'Stubborn'},
        {src: "audio/04_my_eyes.mp3", id: "04-my-eyes", display: 'My Eyes'},
        {src: "audio/05_suburban_redneck.mp3", id: "05-suburban-redneck", display: 'Suburban Redneck'},
        {src: "audio/06_seven_years_old.mp3", id: "07-seven-years-old", display: "Seven Years Old"},
        {src: "audio/07_no_one_else.mp3", id: "07-no-one-else", display: "No One Else"},
        {src: "audio/08_fresh_meat.mp3",id: "08-fresh-meat", display: "Fresh Meat"},
        {src: "audio/09_god_bless.mpr3", id: "09-god-bless", display: "God Bless the USA"},
        {src: "audio/10_fingers.mp3", id: "10-fingers", display: "Fingers"},
        {src: "audio/11_snow_day.mp3", id: "11-snow-day", display: "Snow Day"}
    ];
    var soundId = "default";
    $scope.init = function(){
        if (!createjs.Sound.initializeDefaultPlugins()) {return;}
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerSounds($scope.sounds);


        //console.log(createjs.Sound.registerSounds($scope.sounds));
        $http.get('/showdates').then(function(response){
            if(!response){
                console.log('no repsonse :(');
                return;
            }
            $scope.showDates = response.data;
            for(var i = 0; i < $scope.showDates.length; i++){
                var timeString = $scope.showDates[i].date.substring($scope.showDates[i].date.indexOf("T") + 1, $scope.showDates[i].date.indexOf("T") + 6);
                var hours = parseInt(timeString.substring(0,2));
                if(hours > 12){
                    hours -=12;
                    timeString = hours.toString() + timeString.substring(2) + 'PM';
                }
                $scope.showDates[i].dateDisplay = {
                    month_day: $scope.showDates[i].date.substring($scope.showDates[i].date.indexOf('-') + 1, $scope.showDates[i].date.indexOf('T')),
                    year: $scope.showDates[i].date.substring(0, $scope.showDates[i].date.indexOf('-')),
                    time: timeString
                }
            }
            console.log($scope.showDates);
            console.log();
        });

    };
    $scope.playSound = function(soundId, index){
        //createjs.Sound.play(sound.id, {loop:-1});
        //createjs.Sound.play($scope.sounds[index].id, {loop:-1});
        console.log(index);
        if($scope.instance==''){
            console.log(soundId);

                $scope.instance = createjs.Sound.play($scope.sounds[index].id, {loop:-1});
                console.log($scope.instance);


        }else
                //console.log($scope.instance.src);
                $scope.instance.paused ? $scope.instance.paused = false : $scope.instance.paused = true;
                //$scope.instance.paused = true;
            //    console.log();
                var num = soundId.substring(0, soundId.indexOf('-'));
                //console.log('sub' + $scope.instance.src.substring($scope.instance.src.indexOf('/')+1,$scope.instance.src.indexOf('.')));
                if($scope.instance.src.indexOf(num)<0){
                    $scope.instance.paused = true;
                    $scope.instance = createjs.Sound.play($scope.sounds[index].id, {loop:-1});
                }else{}


            console.log($scope.instance);
    };
}]);
app.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: true});
    $routeProvider
    .when('/dates', {
        templateUrl: 'partials/dates',
        controller: 'DatesController'
      })
      .when('/booking', {
        templateUrl: 'partials/booking',
        controller: 'BookingController'
      })
      .when('/pics',{
        templateUrl: 'partials/pics',
        controller: 'PicsController'
      })
      .when('/about',{
        templateUrl: 'partials/about',
        controller: 'AboutController'
    }).when('/music',{
      templateUrl: 'partials/music',
      controller: 'MusicController'
    }).otherwise({
        redirectTo: '/about'
    });
}]);
app.controller('DatesController',['$scope', function($scope){
    $scope.message = "dates controller active";
}]);
app.controller('BookingController',['$scope', function($scope){
    $scope.message = "booking controller active";
}]);
app.controller('PicsController',['$scope', function($scope){
    $scope.message = "pics controller active";
}]);
app.controller('AboutController',['$scope', function($scope){
    $scope.members = [
        {
            name: "Big Cat",
            aka: "Aaron Sutton",
            weapon_of_choice: "vocal chords, rhythem guitar",
            img_src: "images/aaron.jpg",
            description: "Big Cat is bold, beautiful, and independent.  You don't wanna mess with him.  After spending years in the cat pound, he's back and in his own, struttin' his stuff.  HIS house, HIS rules, boy."
        },{
            name: "Show Girl #1",
            aka: "Josh Oursler",
            weapon_of_choice: "bass",
            img_src: "images/josh.jpg",
            description:  "You might as well call him DRT.  His bouncy bass grooves will make ya feel good.  He might have a beard, he might not.  But one thing's for certain: he's about to have a kid.  Grats, Showgirl #1."
        },{
            name: "Show Girl #2",
            aka: "Blake Huffman",
            weapon_of_choice: "drum sticks, twizzlers",
            img_src: "",
            description: "Travis Barker from the suburbs.  Show Girl #2 shreds the heads unlike anyone in the tristate area.  You'll never catch him slippin', as he's always tight as you want 'em when it comes to his complex and creative fills."
        },{
            name: "Show Girl #3",
            aka: "Chris Coffing",
            weapon_of_choice: "lead gittir",
            img_src: "images/male_call.jpg",
            description: "He basically just reads and plays the piano all day.  Huge nerd.  His technical riffs assult you, but you know that your whole life you've been longing for this.  Will he ever get a job?  Time will tell."
        }
    ];
}]);
app.controller('MusicController',['$scope', function($scope){
    $scope.message = "music controller active";
}]);
var position = $(window).scrollTop();
function scrolled(){
    var scroll = $(window).scrollTop();
    if(scroll > position)
        alert('down');
    //alert('scrolled');
    angular.element("#main-header").addClass('header-after-scroll');
    angular.element("#top-bar").addClass('top-after-scroll');
    angular.element('#header-container').addClass('header-container-after-scroll').addClass('col-md-7');
    angular.element('#bottom-section').addClass('bottom-after-scroll');
}
