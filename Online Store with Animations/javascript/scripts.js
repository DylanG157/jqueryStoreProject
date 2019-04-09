// ==========================================Start of the Cart Sytem==================================

//Main variable to record what the user has chosen
var helmetsChoice =[]

//This is used to create new orders
var helmet = function(name , price, count){
  this.name = name;
  this.price = price;
  this.count = count;
}

function productAdd(){
  //This gets the data from the button
  var helmetInfo = document.querySelector('button[type="submit"]'); //Gets the information from the order buttons ready to pull the data from it
  var helmetName = helmetInfo.getAttribute("data-value"); //Gets the products name that the user has selected
  var helmetPrice = parseInt(helmetInfo.getAttribute("data-value2"));//Gets the products price
  var count = 1; //place holder 
  var totalCost = totalCart();
  // this checks if there is already an item of the same name , if not it create one , if it does it adds one to the count 
  var arrayHelmets = helmetsChoice;
  for (var i in arrayHelmets){
    if(arrayHelmets[i].name === helmetName){  //Will looop throught the array and will check if there is already a product of that name in the cart
      arrayHelmets[i].count += count; //Will add one product per click of the order button
      console.log(saveCart()) //This will save the information to a local session 
      totalCostAlert();
      navCart() //Will update the number of items in the cart in the navBar display
      return;
    }
  }
  var helmetChoice = new helmet(helmetName, helmetPrice ,1);//Will create a new entry into the main array 
  helmetsChoice.push(helmetChoice);
  console.log(saveCart())
  navCart() //Will update the number of items in the cart in the navBar display
  totalCostAlert();
}

//This is used to clear the cart by resetting the main variable helmetsChoice
function clearCart(){
  helmetsChoice =[];
  console.log(saveCart())
  navCart();
}
//Used to create a list of our cart
function listCart(){
  var cartCopy = [];
  for (var i in helmetsChoice){
    var helmet = helmetsChoice[i];
    var helmetCopy = {};
    for (var p in helmet){
      helmetCopy[p] = helmet[p]
    }
    cartCopy.push(helmetCopy);
  }
  return cartCopy;
}

//Used to save the cart information to the local Storage 
function saveCart(){
  localStorage.setItem("helmetsChoice",JSON.stringify(helmetsChoice));
}


function removeItemFromCart(name){  //to remove one item
  for (var i in helmetsChoice){
    if (helmetsChoice[i].name === name){
      helmetsChoice[i].count --;
      if (helmetsChoice[i].count === 0){
        helmetsChoice.splice(i, 1);
      }
      break;
    }
  }
  saveCart() // To save
  displayCart()//To update the display
  navCart();//To update the nav cart (the number)
}

function removeItemFromCartAll(name){ //remove all of an item
  for (var i in helmetsChoice){
    if (helmetsChoice[i].name === name){
      helmetsChoice.splice(i, 1);
      break;
    }
  }
  saveCart()
  displayCart()
  navCart();
}


//Working out the total
function countCart(){
  var totalCount = 0;
  for (var i in helmetsChoice){
    totalCount += helmetsChoice[i].count;
  }
  return totalCount;
}

function totalCart(){
  var totalCost = 0;
  for (var i in helmetsChoice){
    totalCost += parseInt(helmetsChoice[i].price) * parseInt(helmetsChoice[i].count);
  }
  return totalCost;
}

function totalItems(){
  var totalCount = 0;
  for (var i in helmetsChoice){
    totalCount += helmetsChoice[i].count;
  }
  return totalCount;

}

//To load the Data from localStorage 
var helmetsChoice = JSON.parse(localStorage.getItem("helmetsChoice"))


//coupons
function coupon(){
  var couponList = ["2345AB"] //coupon code
  var arrayLength = couponList.length;
  var discountAmmount = 0;
  var couponCode = document.getElementById('couponInput').value;
  for (var i = 0; i < arrayLength; i++){  //to loop through the coupon list to see if the code exists 
    if (couponList[i] === couponCode && discountAmmount >= 0){
      discountAmmount += 20
    }else if (couponList[i] != couponCode) {
      break;
    }
  } 
  return discountAmmount;
}

//This code is used to display the information in the cart.html page
function displayCart(){
  var cartArray = listCart();
  var totalCostBeforeCoupon = totalCart();
  var couponValue = coupon();
  var totalCostAfterCoupon = totalCostBeforeCoupon - (totalCostBeforeCoupon * couponValue / 100)
  var totalCostVat = totalCostAfterCoupon + (totalCostAfterCoupon * 0.15); //This is used to include the Vat
  var output = "";
  for (var i in cartArray){
    output += "<tr><th>" + cartArray[i].name+ "</th><th>"+ cartArray[i].price+ "</th>"  + "<th>" + cartArray[i].count + "</th>" +"<th>"+  "<button class=\" btn btn-outline-primary\" onclick=removeItemFromCart(\""+ cartArray[i].name + "\")>Remove One Item</button>" + "</th>" + "<th>"+  "<button class=\"btn btn-outline-warning\" onclick=removeItemFromCartAll(\""+ cartArray[i].name + "\")>Remove All Of Item</button>" + "</th>"
  }
  document.getElementById("cartTable").innerHTML = output;
  document.getElementById("totalAmmount").innerHTML ="R" + totalCostAfterCoupon;  
  document.getElementById("vatAmmount").innerHTML ="R" + totalCostVat;  
}
//This is used everytime you have to alert the cost when an object is added to the cart
function totalCostAlert(){
  var totalCost = totalCart();
  var totalCostVat = totalCost + (totalCost * 0.15);
  alert("Your current total is R" +totalCostVat + " Including Vat");
}
//This is the code used to update the number next to the cart in the navbar
function navCart(){
  var totalCount = totalItems();
  document.getElementById("navCart").innerHTML = totalItems();
}

//To generate random string for the reference number
function makestring() {
  var string = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 15; i++)
    string += possible.charAt(Math.floor(Math.random() * possible.length));
  return string;
}
//This is to alert
function succesfull(){
  var total = totalCart();
  var totalFinal = total + (total * 0.15);
  var randomString = makestring();
  document.getElementById("collectionAmmount").innerHTML ="R" + totalFinal;
  document.getElementById("referenceNumber").innerHTML =randomString;
  alert("Your order went through successfully, Your total Cost is R" + totalFinal)
}

//to print the collection page
function printArea() {
   window.print();
}
//delivery recepit

var deliveryChoice = [];
//this is used to save the uses choice of delivery type
var deliveryPicked = function(name){
  this.name = name;
}
//Global variable to store the uses chose of delivery
var deliveryChoice1 = [];

function saveDeliveryChoice(){
  //This gets the data from the button
  var deliveryData = document.getElementById('deliveryOption').value;
  var deliveryChoice = new deliveryPicked(deliveryData);
  deliveryChoice1.push(deliveryChoice);
  navCart()
  console.log(saveChoice()) //Used to save the users choice
  window.location.href = "deliverypicked.html";

}
function saveChoice(){ //Used to save the users choice
  localStorage.setItem("deliveryChoice1",JSON.stringify(deliveryChoice1));
  console.log()
}
//Used to load the users delivery choice
var deliveryChoice2 = JSON.parse(localStorage.getItem("deliveryChoice1"))

// This code is to output the data to the dilveryPicked.html page 
function deliveryOutput(){
  var total = totalCart();
  var totalCost = total + (total * 0.15);
  var randomString = makestring();
  var deliveryCost = 0;
  var dataHolder =deliveryChoice2[0].name;

  if (dataHolder === "Bronze Package"){
    deliveryCost = 10;
  }else if (dataHolder === "Silver Package"){
    deliveryCost = 50;
  }else if (dataHolder === "Gold Package"){
    deliveryCost = 100;
  }
  var totalFinal = totalCost + deliveryCost;
  document.getElementById("deliveryHolder1").innerHTML = dataHolder;
  document.getElementById("deliveryCost").innerHTML =" R" + deliveryCost;
  document.getElementById("deliveryTotalCost").innerHTML =" R" + totalFinal;
  document.getElementById("deliveryReferenceNumber").innerHTML = randomString;

  alert("Your order went through succesfully, Your total cost plus delivery is R" + totalFinal + " with Delivery." )
}

//This is to create an alert when you enter in your address for delivery 
function addressInput(){
  var address = document.getElementById("addressInput").value;
  if (address === ""){
    alert("Please enter in your address");
  }else {
    alert("Your Purchase will be sent to " + address);
  }
}

// ==========================================End of the Cart Sytem==================================



// ==========================================Start of the Simple-Text rotator==================================

!function($){
  
  var defaults = {
    animation: "dissolve",
    separator: ",",
    speed: 2000
  };
  
  $.fx.step.textShadowBlur = function(fx) {
    $(fx.elem).prop('textShadowBlur', fx.now).css({textShadow: '0 0 ' + Math.floor(fx.now) + 'px black'});
  };
  
  $.fn.textrotator = function(options){
    var settings = $.extend({}, defaults, options);
    
    return this.each(function(){
      var el = $(this)
      var array = [];
      $.each(el.text().split(settings.separator), function(key, value) { 
        array.push(value); 
      });
      el.text(array[0]);
      
      // animation option
      var rotate = function() {
        switch (settings.animation) { 
          case 'dissolve':
            el.animate({
              textShadowBlur:20,
              opacity: 0
            }, 500 , function() {
              index = $.inArray(el.text(), array)
              if((index + 1) == array.length) index = -1
              el.text(array[index + 1]).animate({
                textShadowBlur:0,
                opacity: 1
              }, 500 );
            });
          break;
          
          case 'flip':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({
              "-webkit-transform": " rotateY(-180deg)",
              "-moz-transform": " rotateY(-180deg)",
              "-o-transform": " rotateY(-180deg)",
              "transform": " rotateY(-180deg)"
            })
            
          break;
          
          case 'flipUp':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({
              "-webkit-transform": " rotateX(-180deg)",
              "-moz-transform": " rotateX(-180deg)",
              "-o-transform": " rotateX(-180deg)",
              "transform": " rotateX(-180deg)"
            })
            
          break;
          
          case 'flipCube':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({
              "-webkit-transform": " rotateY(180deg)",
              "-moz-transform": " rotateY(180deg)",
              "-o-transform": " rotateY(180deg)",
              "transform": " rotateY(180deg)"
            })
            
          break;
          
          case 'flipCubeUp':
            if(el.find(".back").length > 0) {
              el.html(el.find(".back").html())
            }
          
            var initial = el.text()
            var index = $.inArray(initial, array)
            if((index + 1) == array.length) index = -1
            
            el.html("");
            $("<span class='front'>" + initial + "</span>").appendTo(el);
            $("<span class='back'>" + array[index + 1] + "</span>").appendTo(el);
            el.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({
              "-webkit-transform": " rotateX(180deg)",
              "-moz-transform": " rotateX(180deg)",
              "-o-transform": " rotateX(180deg)",
              "transform": " rotateX(180deg)"
            })
            
          break;
          
          case 'spin':
            if(el.find(".rotating").length > 0) {
              el.html(el.find(".rotating").html())
            }
            index = $.inArray(el.text(), array)
            if((index + 1) == array.length) index = -1
            
            el.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(array[index + 1]).show().css({
              "-webkit-transform": " rotate(0) scale(1)",
              "-moz-transform": "rotate(0) scale(1)",
              "-o-transform": "rotate(0) scale(1)",
              "transform": "rotate(0) scale(1)"
            })
          break;
          
          case 'fade':
            el.fadeOut(settings.speed, function() {
              index = $.inArray(el.text(), array)
              if((index + 1) == array.length) index = -1
              el.text(array[index + 1]).fadeIn(settings.speed);
            });
          break;
        }
      };
      setInterval(rotate, settings.speed);
    });
  }
  
}(window.jQuery);

// ==========================================End of the Simple text-rotator Code==================================

// ==========================================Start of jquery gallery code==================================

;(function ( $, window, document, undefined ) {

    function Slideshow(element, options) {
        //Variables declaration
        this.element = element;
        this.intervalID = null;
        this.current = 0;
        this.items = $(this.element).children();
        this.navBar;
        this.navPrev;
        this.navNext;
        this.trigger;
        this.defaults = {
          interval: 2000,
          width: 500,
          height: 350
        }
        //Merge configured options to defaults
        this.config = $.extend(this.defaults, options);
        //Initialize Slideshow
        this.init();
    }

    Slideshow.prototype = {

        init: function() {
          //Set controls & config
          this.setup();
          //Set event handler
          this.handleEvent();
          //Start animation
          this.start();
        },
        setup: function() {
          //Append controls
          this.navBar = $('<ul>').addClass('gallery-navbar').appendTo(this.element);
          this.items.each(function(index){
            $('<li>').addClass(index === 0 ? 'active' : '').attr('data-nav','select').attr('data-index',index).appendTo(this.navBar);
          }.bind(this));

          this.navPrev = $('<div>').addClass('gallery-control fade prev').attr('data-nav','prev').appendTo(this.element);
          this.navNext = $('<div>').addClass('gallery-control fade next').attr('data-nav','next').appendTo(this.element);

          this.trigger = $('<div>').addClass('gallery-control trigger fade pause').attr('data-nav','trigger').appendTo(this.element);

          //Hide controls
          $(this.element).find('.fade').hide();

          //Modify defaults
          $(this.element).css('width', this.config.width).css('height', this.config.height);
        },
        handleEvent: function() {
          //Click event
          //Detect what item is clicked inside the gallery
          $(this.element).on('click', function(event) {

            var dataNav = $(event.target).attr('data-nav');
            var dataIndex = $(event.target).attr('data-index');

            if(dataNav){

              //Call functions depending on item clicked
              if(dataNav === 'trigger'){
                if(this.intervalID){
                  this.stop();
                }else{
                  this.start();
                }
              }else{
                this.showItem(dataNav, dataIndex);
                this.stop();
              }

              //Style item
              this.setTrigger();
            }

          }.bind(this));

          //Mouseover/mouseout event
          $(this.element).on('mouseover', function() {
            $(this.element).find('.fade').fadeIn();
          }.bind(this));

          $(this.element).on('mouseleave', function() {
            $(this.element).find('.fade').fadeOut();
          }.bind(this));


        },
        setTrigger: function() {
          if(this.intervalID){
            this.trigger.removeClass('play').addClass('pause');
          }else{
            this.trigger.removeClass('pause').addClass('play');
          }
        },
        start: function() {
          this.intervalID = setInterval(this.showItem.bind(this), this.config.interval);
        },
        stop: function() {
          clearInterval(this.intervalID);
          this.intervalID = null;
        },
        setCurrent(nav,index) {
          switch(nav) {
            case 'select':
              this.current = index;
              break;
            case 'prev':
              this.current === 0 ? this.current = this.items.length-1 : this.current-- ;
              break;
            case 'next':
            default:
              this.current === this.items.length-1 ? this.current = 0 : this.current++ ;
            break;
          }
        },
        showItem: function(nav,index) {
          this.setCurrent(nav,index);
          this.items.hide().eq(this.current).fadeIn();
          this.navBar.children().removeClass('active').eq(this.current).addClass('active');
        }
    };

    //Prevent  multiple instantiations
    $.fn.slideshow = function ( options ) {
      return this.each(function () {
        var instance = "plugin_jQuerySimpleGallerySlideshow";
        if (!$.data(this, instance)) {
            $.data(this, instance, new Slideshow( this, options ));
        }
      });
    };

})( jQuery, window, document );

// ==========================================End of jquery gallery code==================================


// ==========================================Start of the cover video Code==================================
var coverVid = function (elem, width, height) {

  // call sizeVideo on load
  sizeVideo();

  // debounce for resize function
  function debounce(fn, delay) {
    var timer = null;

    return function () {
      var context = this,
        args = arguments;

      window.clearTimeout(timer);

      timer = window.setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  // call sizeVideo on resize
  window.addEventListener('resize', debounce(sizeVideo, 50));

  // Set necessary styles to position video "center center"
  elem.style.position = 'absolute';
  elem.style.top = '50%';
  elem.style.left = '50%';
  elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
  elem.style['-ms-transform'] = 'translate(-50%, -50%)';
  elem.style.transform = 'translate(-50%, -50%)';

  // Set overflow hidden on parent element
  elem.parentNode.style.overflow = 'hidden';

  // Get image defined on poster attribute of video
  var posterImage = elem.getAttribute('poster');

  // Remove poster to disable
  elem.removeAttribute('poster');

  // Set poster image as a background cover image on parent element
  elem.parentNode.style.backgroundImage = 'url(' + posterImage + ')';
  elem.parentNode.style.backgroundSize = 'cover';
  elem.parentNode.style.backgroundPosition = 'center center';

  // Define the attached selector
  function sizeVideo() {

    // Get parent element height and width
    var parentHeight = elem.parentNode.offsetHeight;
    var parentWidth = elem.parentNode.offsetWidth;

    // Get native video width and height
    var nativeWidth = width;
    var nativeHeight = height;

    // Get the scale factors
    var heightScaleFactor = parentHeight / nativeHeight;
    var widthScaleFactor = parentWidth / nativeWidth;

    // Based on highest scale factor set width and height
    if (widthScaleFactor > heightScaleFactor) {
      elem.style.height = 'auto';
      elem.style.width = parentWidth+'px';
    } else {
      elem.style.height = parentHeight+'px';
      elem.style.width = 'auto';
    }
  }

  // Check for video support
  var supportsVideo = (typeof(elem.canPlayType) != 'undefined') ? true : false;

  // Check if mobile
  var isMobile = false;
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    isMobile = true;

  // Remove video if not supported or mobile
  if (!supportsVideo || isMobile) {
    elem && elem.parentNode && elem.parentNode.removeChild(elem);
  }
};

if (window.jQuery) {
  jQuery.fn.extend({
    'coverVid': function () {
      coverVid(this[0], arguments[0], arguments[1]);
      return this;
    }
  });
}

// ==========================================End of the cover video Code==================================


// ==========================================Start of document .ready function  calling==================================
$(document).ready(function(){

  //This is used to activate the fake loader , I put it first to make sure this loads as quick as possible.
  $("#fakeLoader").fakeLoader(
        {
          timeToHide:1200, //Time in milliseconds for fakeLoader disappear
          zIndex:999, // Default zIndex
          spinner:"spinner2",//Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7' 
          bgColor:"#af0a0a", //Hex, RGB or RGBA colors
        }
    );

  //This code is used for the sticky navBar
  var stickyElement = $(".sticky"),
      stickyClass = "sticky-pin",
      stickyPos = stickyElement.offset().top, //Distance from the top of the window.
      stickyHeight;

  //Create a negative margin to prevent content 'jumps':
  stickyElement.after('<div class="jumps-prevent"></div>');
  function jumpsPrevent() {
    stickyHeight = stickyElement.innerHeight();
    stickyElement.css({"margin-bottom":"-" + stickyHeight + "px"});
    stickyElement.next().css({"padding-top": + stickyHeight + "px"}); 
  };
  jumpsPrevent(); //Run.

  //Function trigger:
  $(window).resize(function(){
    jumpsPrevent();
  });

  //Sticker function:
  function stickerFn() {
    var winTop = $(this).scrollTop();
    //Check element position:
    winTop >= stickyPos ?
      stickyElement.addClass(stickyClass):
      stickyElement.removeClass(stickyClass) //Boolean class switcher.
  };
  stickerFn(); //Run.

  

  // This is used to activate the coverVideo feature above the navBar 
  $('.masthead-video').coverVid(1920, 1080);

  //This is used to activate the rotating text plugin 

  $(".rotate").textrotator({
  animation: "flip", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
  separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
  speed: 2000 // How many milliseconds until the next word show.
  });

  //This is used to activate the gallery plugin
  $(function() {
  $('.gallery-slideshow').slideshow({
    // default: 2000
    interval:3000,
    // default: 500
    width:'100%' ,
    // default: 350
    height: 500
    });

  });

// *************This script will be used for the timeline**********
// used to create the entries of the timeline
  var events = [
            {
              date: 'Q1 - 2018',
              content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
            },
            {
              date: 'Q2 - 2018',
              content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
            },
            {
              date: 'Q3 - 2018',
              content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
            },
            {
              date: 'Q4 - 2018',
              content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
            },
                {
                    date: 'Q1 - 2019',
                    content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
                },
                {
                    date: 'Q2 - 2019',
                    content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
                },
                {
                    date: 'Q3 - 2019',
                    content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small><small>Consectetur adipisicing elit</small>'
                },
                {
                    date: 'Q4 - 2019',
                    content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
                },
                {
                    date: 'Q1 - 2020',
                    content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
                },
                {
                    date: 'Q2 - 2020',
                    content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
                },
                {
                    date: 'Q3 - 2020',
                    content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
                },
                {
                    date: 'Q4 - 2020',
                    content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
                },
            {
              date: 'Q1 - 2021',
              content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
            },
            {
              date: 'Q2 - 2021',
              content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
            },
            {
              date: 'Q3 - 2021',
              content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
            },
            {
              date: 'Q4 - 2021',
              content: 'Lorem ipsum dolor sit amet<small>Consectetur adipisicing elit</small>'
            }
          ];
  // Used to launch the time line effect 
  $('#my-timeline').roadmap(events, {
                eventsPerSlide: 6,
                slide: 1,
                prevArrow: '<i class="fas fa-arrow-left"></i>',
                nextArrow: '<i class="fas fa-arrow-right"></i>'
            });

  //Function trigger for the sticky scroll nav bar
  $(window).scroll(function(){
    stickerFn();
  });

  var speed = 5000;
    
    var run = setInterval(rotate, speed);
    var slides = $('.slide');
    var container = $('#slides ul');
    var elm = container.find(':first-child').prop("tagName");
    var item_width = container.width();
    var previous = 'prev'; //id of previous button
    var next = 'next'; //id of next button
    slides.width(item_width); //set the slides to the correct pixel width
    container.parent().width(item_width);
    container.width(slides.length * item_width); //set the slides container to the correct total width
    container.find(elm + ':first').before(container.find(elm + ':last'));
    resetSlides();
    
    
    //if user clicked on prev button
    
    $('#buttons a').click(function (e) {
        //slide the item
        
        if (container.is(':animated')) {
            return false;
        }
        if (e.target.id == previous) {
            container.stop().animate({
                'left': 0
            }, 1500, function () {
                container.find(elm + ':first').before(container.find(elm + ':last'));
                resetSlides();
            });
        }
        
        if (e.target.id == next) {
            container.stop().animate({
                'left': item_width * -2
            }, 1500, function () {
                container.find(elm + ':last').after(container.find(elm + ':first'));
                resetSlides();
            });
        }
        
        //cancel the link behavior            
        return false;
        
    });
    
    //if mouse hover, pause the auto rotation, otherwise rotate it    
    container.parent().mouseenter(function () {
        clearInterval(run);
    }).mouseleave(function () {
        run = setInterval(rotate, speed);
    });
    
    
    function resetSlides() {
        //and adjust the container so current is in the frame
        container.css({
            'left': -1 * item_width
        });
    }

    //***************List of animation.css effects**************
    
    animationHover('.fas','bounce'); //cart bounce
    animationHover('#formSubmit','rubberBand') //form submit button
    animationHover('#navHeading','heartBeat') //Main Nav Heading button
    animationHover('#introHeader','tada') //Intro Header 
    animationHover('#navButtonAnimate','heartBeat') //Nav button
    animationHover('#navButtonAnimate1','heartBeat') //Nav button
    animationHover('#navButtonAnimate2','heartBeat') //Nav button
    animationHover('#navButtonAnimate3','heartBeat') //Nav button
    animationHover('#aboutHeader','swing') //About Header
    animationHover('#generalInformationHeader','bounce') //general Information Header
    animationHover('#contactUsHeader','bounceInDown') //Contact Us header
    animationHover('.informationContainerMain','bounceInRight') //General information container
    animationHover('.introContainerA','bounceInLeft')// Intro container  
    animationHover('#helmets','bounceInLeft')// Modal Add to cart 
    animationHover('#clearCartButton','flash')// clear cart button
    animationHover('#deliveryButton','bounce')// delivery Button 
    animationHover('#couponButton','rubberBand')// submit coupon code
    animationHover('#couponInput','swing')// coupon input
    animationHover('#deliveryContainer1Heading','swing')// delivery type selection page
    animationHover('#deliveryContainer2AHeading','flip')// delivery type selection page
    animationHover('#deliveryContainer1B','jackInTheBox')// delivery button
    animationHover('#deliveryContainer2B','pulse')// collection button
    animationHover('#collectionContainer','bounceInRight')
    animationHover('#deliveryreceipt','bounceInDown')///delivery container
    animationHover('#addressSubmitButton','flip')///delivery container

  

    function animationHover(element, animation){
    element = $(element);
    element.hover(
    function() {
      element.addClass('animated ' + animation);
    },
    function(){
      //wait for animation to finish before removing classes
      window.setTimeout( function(){
        element.removeClass('animated ' + animation);
      }, 2000);
    }
  );

    animationClick('#formName','jello') //form name input
    animationClick('#formEmail','jello') //form email input
    animationClick('#formNumber','jello') //form Number input
    animationClick('#addressInput','shake')///delivery container



    //to animate on click
    function animationClick(element, animation){
    element = $(element);
    element.click(
    function() {
      element.addClass('animated ' + animation);
      //wait for animation to finish before removing classes
      window.setTimeout( function(){
          element.removeClass('animated ' + animation);
      }, 2000);
    }
  );
};

    
};

// ==========================================Calculator code==================================

//Calculator
const calculator = {
  displayValue: '0', //This value is the default display value , will show zero in the start.
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.getElementById('calculatorScreen'); //Links to the html document and gets the display
  display.value = calculator.displayValue;//then gets the value from displayValue
}

updateDisplay();

const keys = document.getElementById('calculatorKeys');
keys.addEventListener('click', (keyPress) =>{
  const {target} = keyPress;
  if (!target.matches('button')){
    return;
  }

  if(target.classList.contains('operator')){
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('decimal')){
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('all-clear')){
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

function inputDigit(digit) {
  const {displayValue, waitingForSecondOperand} = calculator;
  //Only overwirte 'displayValue' if the current value is '0' otherwise append to it
  if (waitingForSecondOperand === true){
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(point){
  if (calculator.waitingForSecondOperand === true) return;

  if (!calculator.displayValue.includes(point)){
    calculator.displayValue += point;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};
  
  // to reset the calculator
function resetCalculator(){
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}
// End of Calculator code

//to close to the calculator
function closeCalculator() {
  var displayContainer = document.getElementById("mainContainer1");
  if (displayContainer.style.display === "none") {
    displayContainer.style.display = "block";
  } else {
    displayContainer.style.display = "none";
  }
}


});


//a timer will call this function, and the rotation will begin

function rotate() {
    $('#next').click();
}

// ==========================================End of document .ready function  calling==================================

// ==========================================Start of the Fake Loader Code==================================

(function ($) {
 
    $.fn.fakeLoader = function(options) {

        //Defaults
        var settings = $.extend({
            timeToHide:1200, // Default Time to hide fakeLoader
            pos:'fixed',// Default Position
            top:'0px',  // Default Top value
            left:'0px', // Default Left value
            width:'100%', // Default width 
            height:'100%', // Default Height
            zIndex: '999',  // Default zIndex 
            bgColor: '#2ecc71', // Default background color
            spinner:'spinner7', // Default Spinner
            imagePath:'' // Default Path custom image
        }, options);

        //Customized Spinners
        var spinner01 = '<div class="fl spinner1"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>';
        var spinner02 = '<div class="fl spinner2"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
        var spinner03 = '<div class="fl spinner3"><div class="dot1"></div><div class="dot2"></div></div>';
        var spinner04 = '<div class="fl spinner4"></div>'; 
        var spinner05 = '<div class="fl spinner5"><div class="cube1"></div><div class="cube2"></div></div>'; 
        var spinner06 = '<div class="fl spinner6"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'; 
        var spinner07 = '<div class="fl spinner7"><div class="circ1"></div><div class="circ2"></div><div class="circ3"></div><div class="circ4"></div></div>'; 

        //The target
        var el = $(this);

        //Init styles
        var initStyles = {
            'position':settings.pos,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left
        };

        //Apply styles
        el.css(initStyles);

        //Each 
        el.each(function() {
            var a = settings.spinner;
            //console.log(a)
                switch (a) {
                    case 'spinner1':
                            el.html(spinner01);
                        break;
                    case 'spinner2':
                            el.html(spinner02);
                        break;
                    case 'spinner3':
                            el.html(spinner03);
                        break;
                    case 'spinner4':
                            el.html(spinner04);
                        break;
                    case 'spinner5':
                            el.html(spinner05);
                        break;
                    case 'spinner6':
                            el.html(spinner06);
                        break;
                    case 'spinner7':
                            el.html(spinner07);
                        break;
                    default:
                        el.html(spinner01);
                    }

                //Add customized loader image

                if (settings.imagePath !='') {
                    el.html('<div class="fl"><img src="'+settings.imagePath+'"></div>');
                }
                centerLoader();
        });

        //Time to hide fakeLoader
        setTimeout(function(){
            $(el).fadeOut();
        }, settings.timeToHide);

        //Return Styles 
        return this.css({
            'backgroundColor':settings.bgColor,
            'zIndex':settings.zIndex
        });

 
    }; // End Fake Loader
 

        //Center Spinner
        function centerLoader() {

            var winW = $(window).width();
            var winH = $(window).height();

            var spinnerW = $('.fl').outerWidth();
            var spinnerH = $('.fl').outerHeight();

            $('.fl').css({
                'position':'absolute',
                'left':(winW/2)-(spinnerW/2),
                'top':(winH/2)-(spinnerH/2)
            });

        }

        $(window).load(function(){
                centerLoader();
              $(window).resize(function(){
                centerLoader();
              });
        });


}(jQuery));

// ==========================================End of the Fake Loader Code==================================

// ==========================================Start of the cover video Code==================================
var coverVid = function (elem, width, height) {

  // call sizeVideo on load
  sizeVideo();

  // debounce for resize function
  function debounce(fn, delay) {
    var timer = null;

    return function () {
      var context = this,
        args = arguments;

      window.clearTimeout(timer);

      timer = window.setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  // call sizeVideo on resize
  window.addEventListener('resize', debounce(sizeVideo, 50));

  // Set necessary styles to position video "center center"
  elem.style.position = 'absolute';
  elem.style.top = '50%';
  elem.style.left = '50%';
  elem.style['-webkit-transform'] = 'translate(-50%, -50%)';
  elem.style['-ms-transform'] = 'translate(-50%, -50%)';
  elem.style.transform = 'translate(-50%, -50%)';

  // Set overflow hidden on parent element
  elem.parentNode.style.overflow = 'hidden';

  // Get image defined on poster attribute of video
  var posterImage = elem.getAttribute('poster');

  // Remove poster to disable
  elem.removeAttribute('poster');

  // Set poster image as a background cover image on parent element
  elem.parentNode.style.backgroundImage = 'url(' + posterImage + ')';
  elem.parentNode.style.backgroundSize = 'cover';
  elem.parentNode.style.backgroundPosition = 'center center';

  // Define the attached selector
  function sizeVideo() {

    // Get parent element height and width
    var parentHeight = elem.parentNode.offsetHeight;
    var parentWidth = elem.parentNode.offsetWidth;

    // Get native video width and height
    var nativeWidth = width;
    var nativeHeight = height;

    // Get the scale factors
    var heightScaleFactor = parentHeight / nativeHeight;
    var widthScaleFactor = parentWidth / nativeWidth;

    // Based on highest scale factor set width and height
    if (widthScaleFactor > heightScaleFactor) {
      elem.style.height = 'auto';
      elem.style.width = parentWidth+'px';
    } else {
      elem.style.height = parentHeight+'px';
      elem.style.width = 'auto';
    }
  }

  // Check for video support
  var supportsVideo = (typeof(elem.canPlayType) != 'undefined') ? true : false;

  // Check if mobile
  var isMobile = false;
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    isMobile = true;

  // Remove video if not supported or mobile
  if (!supportsVideo || isMobile) {
    elem && elem.parentNode && elem.parentNode.removeChild(elem);
  }
};

if (window.jQuery) {
  jQuery.fn.extend({
    'coverVid': function () {
      coverVid(this[0], arguments[0], arguments[1]);
      return this;
    }
  });
}

// ==========================================Start of jquery gallery code==================================

;(function ( $, window, document, undefined ) {

    function Slideshow(element, options) {
        //Variables declaration
        this.element = element;
        this.intervalID = null;
        this.current = 0;
        this.items = $(this.element).children();
        this.navBar;
        this.navPrev;
        this.navNext;
        this.trigger;
        this.defaults = {
          interval: 2000,
          width: 500,
          height: 350
        }
        //Merge configured options to defaults
        this.config = $.extend(this.defaults, options);
        //Initialize Slideshow
        this.init();
    }

    Slideshow.prototype = {

        init: function() {
          //Set controls & config
          this.setup();
          //Set event handler
          this.handleEvent();
          //Start animation
          this.start();
        },
        setup: function() {
          //Append controls
          this.navBar = $('<ul>').addClass('gallery-navbar').appendTo(this.element);
          this.items.each(function(index){
            $('<li>').addClass(index === 0 ? 'active' : '').attr('data-nav','select').attr('data-index',index).appendTo(this.navBar);
          }.bind(this));

          this.navPrev = $('<div>').addClass('gallery-control fade prev').attr('data-nav','prev').appendTo(this.element);
          this.navNext = $('<div>').addClass('gallery-control fade next').attr('data-nav','next').appendTo(this.element);

          this.trigger = $('<div>').addClass('gallery-control trigger fade pause').attr('data-nav','trigger').appendTo(this.element);

          //Hide controls
          $(this.element).find('.fade').hide();

          //Modify defaults
          $(this.element).css('width', this.config.width).css('height', this.config.height);
        },
        handleEvent: function() {
          //Click event
          //Detect what item is clicked inside the gallery
          $(this.element).on('click', function(event) {

            var dataNav = $(event.target).attr('data-nav');
            var dataIndex = $(event.target).attr('data-index');

            if(dataNav){

              //Call functions depending on item clicked
              if(dataNav === 'trigger'){
                if(this.intervalID){
                  this.stop();
                }else{
                  this.start();
                }
              }else{
                this.showItem(dataNav, dataIndex);
                this.stop();
              }

              //Style item
              this.setTrigger();
            }

          }.bind(this));

          //Mouseover/mouseout event
          $(this.element).on('mouseover', function() {
            $(this.element).find('.fade').fadeIn();
          }.bind(this));

          $(this.element).on('mouseleave', function() {
            $(this.element).find('.fade').fadeOut();
          }.bind(this));


        },
        setTrigger: function() {
          if(this.intervalID){
            this.trigger.removeClass('play').addClass('pause');
          }else{
            this.trigger.removeClass('pause').addClass('play');
          }
        },
        start: function() {
          this.intervalID = setInterval(this.showItem.bind(this), this.config.interval);
        },
        stop: function() {
          clearInterval(this.intervalID);
          this.intervalID = null;
        },
        setCurrent(nav,index) {
          switch(nav) {
            case 'select':
              this.current = index;
              break;
            case 'prev':
              this.current === 0 ? this.current = this.items.length-1 : this.current-- ;
              break;
            case 'next':
            default:
              this.current === this.items.length-1 ? this.current = 0 : this.current++ ;
            break;
          }
        },
        showItem: function(nav,index) {
          this.setCurrent(nav,index);
          this.items.hide().eq(this.current).fadeIn();
          this.navBar.children().removeClass('active').eq(this.current).addClass('active');
        }
    };

    //Prevent  multiple instantiations
    $.fn.slideshow = function ( options ) {
      return this.each(function () {
        var instance = "plugin_jQuerySimpleGallerySlideshow";
        if (!$.data(this, instance)) {
            $.data(this, instance, new Slideshow( this, options ));
        }
      });
    };

})( jQuery, window, document );

// ==========================================End of jquery gallery code==================================

// ==========================================Calculator code==================================

//Calculator
const calculator = {
  displayValue: '0', //This value is the default display value , will show zero in the start.
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.getElementById('calculatorScreen'); //Links to the html document and gets the display
  display.value = calculator.displayValue;//then gets the value from displayValue
}

updateDisplay();

const keys = document.getElementById('calculatorKeys');
keys.addEventListener('click', (keyPress) =>{
  const {target} = keyPress;
  if (!target.matches('button')){
    return;
  }

  if(target.classList.contains('operator')){
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('decimal')){
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains('all-clear')){
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

function inputDigit(digit) {
  const {displayValue, waitingForSecondOperand} = calculator;
  //Only overwirte 'displayValue' if the current value is '0' otherwise append to it
  if (waitingForSecondOperand === true){
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(point){
  if (calculator.waitingForSecondOperand === true) return;

  if (!calculator.displayValue.includes(point)){
    calculator.displayValue += point;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};
  
  // to reset the calculator
function resetCalculator(){
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}
// End of Calculator code

//to close to the calculator
function closeCalculator() {
  var displayContainer = document.getElementById("mainContainer1");
  if (displayContainer.style.display === "none") {
    displayContainer.style.display = "block";
  } else {
    displayContainer.style.display = "none";
  }
}