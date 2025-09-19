(function($) {

  $(document).ready(function() {
    $('body').addClass('js');
    var $menu = $('#menu'),
      $menulink = $('.menu-link');
    
    $menulink.click(function() {
      $menulink.toggleClass('active');
      $menu.toggleClass('active');
      return false;
    });
  });

  videoPopup();

  $('.owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    responsive:{
      0:{
        items:1
      },
      550:{
        items:2
      },
      750:{
        items:3
      },
      1000:{
        items:4
      },
      1200:{
        items:5
      }
    }
  });

  $(".Modern-Slider").slick({
    autoplay:true,
    autoplaySpeed:10000,
    speed:600,
    slidesToShow:1,
    slidesToScroll:1,
    pauseOnHover:false,
    dots:true,
    pauseOnDotsHover:true,
    cssEase:'fade',
    // fade:true,
    draggable:false,
    prevArrow:'<button class="PrevArrow"></button>',
    nextArrow:'<button class="NextArrow"></button>', 
  });

  $("div.features-post").hover(
    function() {
      $(this).find("div.content-hide").slideToggle("medium");
    },
    function() {
      $(this).find("div.content-hide").slideToggle("medium");
    }
  );

  $("#tabs").tabs();

})(jQuery);

$(document).ready(function() {
  // Initialize jQuery UI Tabs
  $("#tabs").tabs();

  // Carousel logic
  let currentTab = 0;
  const totalTabs = $("#tabs ul li").length;
  const intervalTime = 5000; // Time in milliseconds (5 seconds)

  function switchTab() {
    currentTab = (currentTab + 1) % totalTabs; // Cycle through tabs
    $("#tabs").tabs("option", "active", currentTab);
  }

  // Start the carousel
  let carousel = setInterval(switchTab, intervalTime);

  // Pause carousel on tab hover and resume on leave
  $("#tabs").hover(
    function() {
      clearInterval(carousel); // Pause carousel
    },
    function() {
      carousel = setInterval(switchTab, intervalTime); // Resume carousel
    }
  );

  // Optional: Allow manual tab clicking to reset the carousel
  $("#tabs ul li a").click(function() {
    clearInterval(carousel); // Stop the carousel
    currentTab = $(this).parent().index(); // Update current tab
    carousel = setInterval(switchTab, intervalTime); // Restart carousel
  });
});

$(document).ready(function() {
  // Initialize jQuery UI Tabs
  $("#tabs").tabs();

  // Carousel logic
  let currentTab = 0;
  const totalTabs = $("#tabs ul li").length;
  const intervalTime = 5000; // Time in milliseconds (5 seconds)

  function switchTab() {
    currentTab = (currentTab + 1) % totalTabs; // Cycle through tabs
    $("#tabs").tabs("option", "active", currentTab);
  }

  // Start the carousel
  let carousel = setInterval(switchTab, intervalTime);

  // Pause carousel on tab hover and resume on leave
  $("#tabs").hover(
    function() {
      clearInterval(carousel); // Pause carousel
    },
    function() {
      carousel = setInterval(switchTab, intervalTime); // Resume carousel
    }
  );

  // Optional: Allow manual tab clicking to reset the carousel
  $("#tabs ul li a").click(function() {
    clearInterval(carousel); // Stop the carousel
    currentTab = $(this).parent().index(); // Update current tab
    carousel = setInterval(switchTab, intervalTime); // Restart carousel
  });



});