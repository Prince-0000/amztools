/*----------------------------------------------
*
* [Main Scripts]
*
* Theme    : Leverage
* Version  : 2.1
* Author   : Codings
* Support  : codings.dev
* 
----------------------------------------------*/

/*----------------------------------------------

[ALL CONTENTS]

1. Preloader
2. Responsive Menu
3. Navigation 
4. Slides 
5. Particles
6. Progress Bar
7. Shuffle
8. Sign and Register Form
9. Multi-Step Form 
10. Simple Form
11. Recaptcha
12. Cookie Notice

----------------------------------------------*/

/*----------------------------------------------
1. Preloader
----------------------------------------------*/

var apiUrl = "https://softwarewallah.onrender.com/api";
// var apiUrl = "http://localhost:5001/api";

jQuery(function ($) {
  "use strict";

  let preloader = $(".preloader");

  setTimeout(function () {
    preloader.addClass("ready");
  }, preloader.data("timeout"));
});

/*----------------------------------------------
2. Responsive Menu
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  function navResponsive() {
    let navbar = $(".navbar .items");
    let menu = $("#menu .items");

    menu.html("");
    navbar.clone().appendTo(menu);

    $(".menu .icon-arrow-right")
      .removeClass("icon-arrow-right")
      .addClass("icon-arrow-down");

    $(".menu .nav-item.dropdown").each(function () {
      let children = $(this).children(".nav-link");
      // children.addClass("prevent");
    });
  }

  navResponsive();

  $(window).on("resize", function () {
    navResponsive();
  });

  $(".menu .dropdown-menu").each(function () {
    var children = $(this).children(".dropdown").length;
    $(this).addClass("children-" + children);
  });

  $(".menu .nav-item.dropdown").each(function () {
    var children = $(this).children(".nav-link");
    // children.addClass("prevent");
  });

  $(document).on("click", "#menu .nav-item .nav-link", function (e) {
    if ($(this).hasClass("prevent")) {
      e.preventDefault();
    }

    var nav_link = $(this);

    nav_link.next().toggleClass("show");

    if (nav_link.hasClass("smooth-anchor")) {
      $("#menu").modal("hide");
    }
  });
});

/*----------------------------------------------
3. Navigation
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  var position = $(window).scrollTop();
  var navbar = $(".navbar");
  var toTop = $("#scroll-to-top");

  $(document).ready(function () {
    if (position > 0) {
      navbar.addClass("navbar-sticky");
    }
    toTop.hide();
  });

  $(window).scroll(function () {
    navbar.removeAttr("data-aos");
    navbar.removeAttr("data-aos-delay");

    var scroll = $(window).scrollTop();

    if (!navbar.hasClass("relative")) {
      // Down
      if (scroll > position) {
        navbar.addClass("navbar-sticky");

        if (navbar.hasClass("navbar-fixed") || window.innerWidth <= 767) {
          navbar.removeClass("hidden").addClass("visible");
        } else {
          if ($(window).scrollTop() >= window.innerHeight) {
            navbar.removeClass("visible").addClass("hidden");
          }
        }

        toTop.fadeOut("fast");

        // Up
      } else {
        if (!navbar.hasClass("navbar-no-fixed")) {
          navbar.removeClass("hidden").addClass("visible");
        }

        // Top
        if ($(window).scrollTop() <= 100 && $(".navbar-holder").length == 0) {
          navbar.removeClass("navbar-sticky");
        } else {
          if (!navbar.hasClass("navbar-no-fixed")) {
            navbar.addClass("visible");
          }
        }

        if (position >= window.innerHeight && window.innerWidth >= 767) {
          toTop.fadeIn("fast");
        } else {
          toTop.fadeOut("fast");
        }
      }
      position = scroll;
    }
  });

  $(".nav-link").each(function () {
    if (this.hasAttribute("href")) {
      let href = $(this).attr("href");
      if (href.length > 1 && href.indexOf("#") != -1) {
        $(this).addClass("smooth-anchor");
      }
    }

    let body = $("body");

    if (this.hasAttribute("href") && !body.hasClass("home")) {
      let href = $(this).attr("href");
      if (href.length > 1 && href.indexOf("#") != -1) {
        $(this).removeClass("smooth-anchor");
        $(this).attr("href", "/" + href);
      }
    }
  });

  $(document).on("click", ".smooth-anchor", function (e) {
    e.preventDefault();

    let href = $(this).attr("href");
    let target = $.attr(this, "href");

    if ($(target).length > 0) {
      if (href.length > 1 && href.indexOf("#") != -1) {
        $("html, body").animate(
          {
            scrollTop: $(target).offset().top,
          },
          500
        );
      }
    }
  });

  $(".dropdown-menu").each(function () {
    let dropdown = $(this);

    dropdown.hover(
      function () {
        dropdown.parent().find(".nav-link").first().addClass("active");
      },
      function () {
        dropdown.parent().find(".nav-link").first().removeClass("active");
      }
    );
  });

  if ($(".navbar-holder").length > 0) {
    $(".navbar").addClass("navbar-sticky");
    $(".navbar-holder").css("min-height", $(".navbar-expand").outerHeight());
  }
});

/*----------------------------------------------
4. Slides
----------------------------------------------*/

jQuery(function ($) {
  setTimeout(function () {
    $(".no-slider .left").addClass("init");
    $(".no-slider .right").addClass("init");
  }, 1200);

  var animation = function (slider) {
    let image = $(slider + " .swiper-slide-active img");
    let title = $(slider + " .title");
    let description = $(slider + " .description");
    let btn = $(slider + " .btn");
    let nav = $(slider + " nav");

    image.toggleClass("aos-animate");
    title.toggleClass("aos-animate");
    description.toggleClass("aos-animate");
    btn.toggleClass("aos-animate");
    nav.toggleClass("aos-animate");

    setTimeout(function () {
      image.toggleClass("aos-animate");
      title.toggleClass("aos-animate");
      description.toggleClass("aos-animate");
      btn.toggleClass("aos-animate");
      nav.toggleClass("aos-animate");

      AOS.refresh();
    }, 100);

    if ($(".full-slider").hasClass("animation")) {
      $(".full-slider .left").addClass("off");
      $(".full-slider .left").removeClass("init");
      $(".full-slider .right").addClass("off");
      $(".full-slider .right").removeClass("init");

      setTimeout(function () {
        $(".full-slider .left").removeClass("off");
        $(".full-slider .right").removeClass("off");
      }, 200);

      setTimeout(function () {
        $(".full-slider .left").addClass("init");
        $(".full-slider .right").addClass("init");
      }, 1000);
    } else {
      $(".full-slider .left").addClass("init");
      $(".full-slider .right").addClass("init");
    }
  };

  var fullSlider = new Swiper(".full-slider", {
    autoplay: {
      delay: 10000,
    },
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false,
    pagination: {
      el: ".full-slider .swiper-pagination",
      clickable: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    on: {
      init: function () {
        animation(".full-slider");
        let pagination = $(".full-slider .swiper-pagination");
        pagination.hide();

        setTimeout(function () {
          pagination.show();
        }, 2000);
      },
      slideChange: function () {
        animation(".full-slider");
      },
      sliderMove: function () {
        let slider = $(".full-slider");
        if (slider.hasClass("animation")) {
          $(".full-slider .swiper-slide-next .left").addClass("off");
          $(".full-slider .swiper-slide-next .right").addClass("off");
          $(".full-slider .swiper-slide-prev .left").addClass("off");
          $(".full-slider .swiper-slide-prev .right").addClass("off");
        }
      },
    },
  });

  $(".mid-slider").each(function () {
    if ($(this).data("perview")) {
      var midPerView = $(this).data("perview");
    } else {
      midPerView = 3;
    }

    if ($(this).data("autoplay") && $(this).data("autoplay") == true) {
      var midAutoPlay = { delay: 5000 };
    } else {
      midAutoPlay = false;
    }

    var midSlider = new Swiper(this, {
      autoplay: midAutoPlay,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1023: {
          slidesPerView: midPerView,
          spaceBetween: 30,
        },
      },
      pagination: {
        el: ".mid-slider .swiper-pagination",
        clickable: true,
      },
    });
  });

  $(".mid-slider-simple").each(function () {
    if ($(this).data("perview")) {
      var midSimplePerView = $(this).data("perview");
    } else {
      midSimplePerView = 3;
    }

    if ($(this).data("autoplay") && $(this).data("autoplay") == true) {
      var midSimpleAutoPlay = { delay: 5000 };
    } else {
      midSimpleAutoPlay = false;
    }

    var midSliderSimple = new Swiper(this, {
      autoplay: midSimpleAutoPlay,
      loop: false,
      centerInsufficientSlides: true,
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1023: {
          slidesPerView: midSimplePerView,
          spaceBetween: 30,
        },
      },
      pagination: {
        el: ".mid-slider-simple .swiper-pagination",
        clickable: true,
      },
    });
  });

  var minSlider = new Swiper(".min-slider", {
    autoplay: {
      delay: 5000,
    },
    loop: false,
    centerInsufficientSlides: true,
    slidesPerView: 2,
    spaceBetween: 15,
    breakpoints: {
      424: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1023: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1199: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
    },
    pagination: false,
  });

  var noSlider = new Swiper(".no-slider", {
    autoplay: false,
    loop: false,
    keyboard: false,
    grabCursor: false,
    allowTouchMove: false,
    on: {
      init: function () {
        animation(".no-slider");
      },
    },
  });
});

/*----------------------------------------------
5. Particles
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  function particles(type, ID) {
    if (type === "default") {
      particlesJS(ID, {
        particles: {
          number: { value: 80, density: { enable: !0, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 },
          },
          opacity: {
            value: 0.25,
            random: !1,
            anim: { enable: !1, speed: 1, opacity_min: 0.1, sync: !1 },
          },
          size: {
            value: 5,
            random: !0,
            anim: { enable: !1, speed: 40, size_min: 0.1, sync: !1 },
          },
          line_linked: {
            enable: !0,
            distance: 150,
            color: "#ffffff",
            opacity: 0.25,
            width: 1,
          },
          move: {
            enable: !0,
            speed: 6,
            direction: "none",
            random: !1,
            straight: !1,
            out_mode: "out",
            attract: { enable: !1, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: 0, mode: "repulse" },
            onclick: { enable: !0, mode: "push" },
            resize: !0,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: { distance: 200 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: !0,
        config_demo: {
          hide_card: !1,
          background_color: "#b61924",
          background_image: "",
          background_position: "50% 50%",
          background_repeat: "no-repeat",
          background_size: "cover",
        },
      });
    }

    if (type === "bubble") {
      particlesJS(ID, {
        particles: {
          number: { value: 6, density: { enable: !0, value_area: 800 } },
          color: { value: "#182c50" },
          shape: {
            type: "polygon",
            stroke: { width: 0, color: "#000" },
            polygon: { nb_sides: 6 },
            image: { src: "img/github.svg", width: 100, height: 100 },
          },
          opacity: {
            value: 0.3,
            random: !0,
            anim: { enable: !1, speed: 1, opacity_min: 0.1, sync: !1 },
          },
          size: {
            value: 160,
            random: !1,
            anim: { enable: !0, speed: 10, size_min: 40, sync: !1 },
          },
          line_linked: {
            enable: !1,
            distance: 200,
            color: "#ffffff",
            opacity: 1,
            width: 2,
          },
          move: {
            enable: !0,
            speed: 8,
            direction: "none",
            random: !1,
            straight: !1,
            out_mode: "out",
            bounce: !1,
            attract: { enable: !1, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: !1, mode: "grab" },
            onclick: { enable: !1, mode: "push" },
            resize: !0,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: !0,
      });
    }

    if (type === "space") {
      particlesJS(ID, {
        particles: {
          number: { value: 160, density: { enable: !0, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 },
          },
          opacity: {
            value: 1,
            random: !0,
            anim: { enable: !0, speed: 1, opacity_min: 0, sync: !1 },
          },
          size: {
            value: 3,
            random: !0,
            anim: { enable: !1, speed: 4, size_min: 0.3, sync: !1 },
          },
          line_linked: {
            enable: !1,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: !0,
            speed: 1,
            direction: "none",
            random: !0,
            straight: !1,
            out_mode: "out",
            bounce: !1,
            attract: { enable: !1, rotateX: 600, rotateY: 600 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: !0, mode: "bubble" },
            onclick: { enable: !0, mode: "repulse" },
            resize: !0,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3,
            },
            repulse: { distance: 400, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: !0,
      });
    }
  }

  $(".particles").each(function () {
    let type = $(this).data("particle");
    let ID = $(this).attr("id");

    particles(type, ID);
  });
});

/*----------------------------------------------
6. Progress Bar
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  function initCounter(section, item, duration) {
    $(document).one("inview", item, function (event, inview) {
      if (inview) {
        $(item).each(function () {
          var percent = $(this).data("percent");
          var pcolor = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--primary-color");
          var scolor = getComputedStyle(
            document.documentElement
          ).getPropertyValue("--secondary-color");

          if ($(section).hasClass("odd")) {
            var tmode = "rgba(255, 255, 255, 0.075)";
          } else {
            var tmode = "rgba(0, 0, 0, 0.075)";
          }

          if ($(this).data("symbol")) {
            var custom_symbol = $(this).data("symbol");
          } else {
            var custom_symbol = "%";
          }

          if (
            $(section).hasClass("preloader") ||
            $(section).hasClass("skills")
          ) {
            var symbol = "<i>" + custom_symbol + "</i>";
          } else {
            var symbol = "";
          }

          if (section == ".counter.funfacts") {
            var height = 70;
          } else {
            var height = 120;
          }

          $(this)
            .radialProgress({
              value: percent / 100,
              size: height,
              thickness: 10,
              lineCap: "butt",
              emptyFill: tmode,
              animation: {
                duration: duration,
                easing: "radialProgressEasing",
              },
              fill: {
                gradient: [
                  [pcolor, 0.1],
                  [scolor, 1],
                ],
                gradientAngle: Math.PI / 4,
              },
            })
            .on("radial-animation-progress", function (event, progress) {
              $(this)
                .find("span")
                .html(Math.round(percent * progress) + symbol);
            });
        });
      }
    });
  }

  let preloader = $(".preloader");
  let preloader_timeout = preloader.data("timeout") - 300;

  initCounter(
    ".counter.preloader",
    ".counter.preloader .radial",
    preloader_timeout
  );
  initCounter(".counter.funfacts", ".counter.funfacts .radial", 5000);
  initCounter(".counter.skills", ".counter.skills .radial", 5000);
});

/*----------------------------------------------
7. Shuffle
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  $(".filter-section").each(function (index) {
    var count = index + 1;

    $(this)
      .find(".filter-items")
      .removeClass("filter-items")
      .addClass("filter-items-" + count);
    $(this)
      .find(".filter-item")
      .removeClass("filter-item")
      .addClass("filter-item-" + count);
    $(this)
      .find(".filter-sizer")
      .removeClass("filter-sizer")
      .addClass("filter-sizer-" + count);
    $(this)
      .find(".btn-filter-item")
      .removeClass("btn-filter-item")
      .addClass("btn-filter-item-" + count);

    var Shuffle = window.Shuffle;
    var defaultGroup = $(this).find(".btn-group").data("group-default");
    var Filter = new Shuffle(document.querySelector(".filter-items-" + count), {
      itemSelector: ".filter-item-" + count,
      sizer: ".filter-sizer-" + count,
      buffer: 1,
      group: defaultGroup,
    });

    $(".btn-filter-item-" + count).on("change", function (e) {
      var input = e.currentTarget;
      if (input.checked) {
        Filter.filter(input.value);
      }
    });
  });
});

/*----------------------------------------------
8. Sign and Register Form
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  $(document).on("click", 'a[data-target="#register"]', function () {
    $("#sign").modal("hide");
  });

  $(document).on("click", 'a[data-target="#sign"]', function () {
    $("#register").modal("hide");
  });
});

/*----------------------------------------------
9. Multi-Step Form
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  var timer;

  $(document).on("keyup", "#leverage-form .field-email", function () {
    clearTimeout(timer);

    let email = $("#leverage-form .field-email").val();
    let isValidEmail = validateEmail(email);

    if (isValidEmail) {
      $("#leverage-form .field-email").removeClass("invalid").addClass("valid");
    } else {
      $("#leverage-form .field-email").removeClass("valid").addClass("invalid");
    }

    timer = setTimeout(function () {
      // Your AJAX code for checking email validity goes here
    }, 1000);
  });

  function validateEmail(email) {
    // Basic email validation using regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  var current_fs, next_fs, previous_fs;
  var left, opacity, scale;
  var animating;

  function next(button, group, show, hide) {
    $(document).on("click", button, function () {
      var isValid = true; // Flag to track form validity

      $(group + " .form-control").each(function () {
        var minlength = $(this).data("minlength");

        if ($(this).val() == null || $(this).val() == "") {
          $(this).removeClass("valid").addClass("invalid");
          isValid = false; // Mark form as invalid if any field is empty
        } else if (Number(minlength) <= $(this).val().length) {
          $(this).removeClass("invalid").addClass("valid");
        } else {
          $(this).removeClass("valid").addClass("invalid");
          isValid = false; // Mark form as invalid if any field does not meet minimum length
        }
      });

      var checkbox_row = $(".checkbox-row");

      checkbox_row.each(function () {
        var checkbox_field = $(this).find(".form-control");

        if (checkbox_field.is(":checked")) {
          $(this).removeClass("no-checked").addClass("checked");
          checkbox_field.removeClass("invalid").addClass("valid");
        } else {
          $(this).removeClass("checked").addClass("no-checked");
          checkbox_field.removeClass("valid").addClass("invalid");
          isValid = false; // Mark form as invalid if any checkbox is not checked
        }
      });

      if (!$("#leverage-form .field-email").length) {
        $.valid_email = true;
      }

      if ($.valid_email === false) {
        $("#leverage-form .field-email")
          .removeClass("valid")
          .addClass("invalid");
        isValid = false; // Mark form as invalid if email is invalid
      }

      if (isValid) {
        // Proceed only if the form is valid
        if ($(".multi-step-form").data("steps") == 1) {
          var sendButton = "#step-next-1";
        } else if ($(".multi-step-form").data("steps") == 2) {
          var sendButton = "#step-next-2";
        } else {
          var sendButton = "#step-next-3";
        }

        if (button == sendButton) {
          $(".progressbar").addClass("complete");

          let height = $(".multi-step-form .success.message")
            .parents()
            .eq(1)
            .height();
          let message = $(".multi-step-form .success.message");
          message.css("height", height);
          message.addClass("active");

          $(".form-content").hide();

          $(".multi-step-form").submit();
        }

        if (animating) return false;

        animating = true;

        current_fs = $(this).parents().eq(1);
        next_fs = $(this).parents().eq(1).next();
        $(".multi-step-form .progressbar li")
          .eq($("fieldset").index(next_fs))
          .addClass("active");
        next_fs.show();

        current_fs.animate(
          {
            opacity: 0,
          },
          {
            step: function (now, mx) {
              scale = 1 - (1 - now) * 0.2;
              left = now * 50 + "%";
              opacity = 1 - now;

              current_fs.css({
                transform: "scale(" + scale + ")",
                position: "absolute",
              });

              next_fs.css({
                left: left,
                opacity: opacity,
              });
            },
            duration: 600,
            complete: function () {
              current_fs.hide();
              animating = false;
            },
            easing: "easeInOutBack",
          }
        );

        $(hide).hide();
        $(show).show();
      }
    });
  }

  function submissionDone() {
    if (leverage_form.hasClass("redirect-sending")) {
      window.location.href = leverage_form.data("redirect");
    } else {
      let wait = $(".multi-step-form .success.message .wait");
      let done = $(".multi-step-form .success.message .done");

      wait.hide();
      done.show();
    }
  }

  // Progressbar
  $(".multi-step-form .progressbar li").first().addClass("active");

  $(".multi-step-form .progressbar li").each(function (index) {
    $(".multi-step-form").attr("data-steps", index + 1);
  });

  // Step Image [ID]
  $(".multi-step-form .step-image").each(function (index) {
    $(this).attr("id", "step-image-" + (index + 1));

    if (index) {
      $("#step-image-2, #step-image-3, #step-image-4").hide();
    }
  });

  // Step Title [ID]
  $(".multi-step-form .step-title").each(function (index) {
    $(this).attr("id", "step-title-" + (index + 1));

    if (index) {
      $("#step-title-2, #step-title-3").hide();
    }
  });

  // Step Group [ID]
  $(".multi-step-form .step-group").each(function (index) {
    $(this).attr("id", "step-group-" + (index + 1));
  });

  // Step Next [ID]
  $(".multi-step-form .step-next").each(function (index) {
    $(this).attr("id", "step-next-" + (index + 1));
  });

  // Step Prev [ID]
  $(".multi-step-form .step-prev").each(function (index) {
    $(this).attr("id", "step-prev-" + (index + 2));
  });

  next(
    "#step-next-1",
    "#step-group-1",
    "#step-image-2, #step-title-2",
    "#step-image-1, #step-title-1"
  );
  next(
    "#step-next-2",
    "#step-group-2",
    "#step-image-3, #step-title-3",
    "#step-image-2, #step-title-2"
  );
  next("#step-next-3", "#step-group-3", "#step-image-4", "#step-image-3");

  function prev(button, show, hide) {
    $(document).on("click", button, function () {
      if (animating) return false;
      animating = true;

      current_fs = $(this).parents().eq(1);
      previous_fs = $(this).parents().eq(1).prev();

      $(".multi-step-form .progressbar li")
        .eq($("fieldset").index(current_fs))
        .removeClass("active");

      previous_fs.show();
      current_fs.animate(
        {
          opacity: 0,
        },
        {
          step: function (now, mx) {
            scale = 0.8 + (1 - now) * 0.2;
            left = (1 - now) * 50 + "%";
            opacity = 1 - now;

            current_fs.css({
              left: left,
            });

            previous_fs.css({
              transform: "scale(" + scale + ")",
              opacity: opacity,
            });
          },
          duration: 600,
          complete: function () {
            current_fs.hide();
            animating = false;
          },
          easing: "easeInOutBack",
        }
      );

      $(hide).hide();
      $(show).show();

      if (button == "#step-prev-3") {
        $(".multi-step-form .progressbar").removeClass("complete");
      }
    });
  }

  prev(
    "#step-prev-2",
    "#step-image-1, #step-title-1",
    "#step-image-2, #step-title-2"
  );
  prev(
    "#step-prev-3",
    "#step-image-2, #step-title-2",
    "#step-image-3, #step-title-3"
  );

  // Submission
  var leverage_form = $("#leverage-form");

  leverage_form.submit(function (e) {
    e.preventDefault();

    if ($('input[name="reCAPTCHA"]').length) {
      let reCAPTCHA = $('input[name="reCAPTCHA"]');

      grecaptcha.ready(function () {
        grecaptcha
          .execute(reCAPTCHA.data("key"), { action: "create_comment" })
          .then(function (token) {
            reCAPTCHA.val(token);
          });
      });
    }

    // var url = leverage_form.attr("action");
    var url = `${apiUrl}/auth/create-update`;
    console.log(leverage_form.serialize());

    $.ajax({
      type: "POST",
      url: url,
      data: leverage_form.serialize(),
      success: function () {
        submissionDone();
      },
    });
  });
});

/*----------------------------------------------
10. Simple Form
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  function sendForm(ID) {
    var form = $(ID);
    var input = $(ID + " .form-control");
    var btn = $(ID + " .btn");
    var alert = $(ID + " .form-alert");

    alert.hide();

    $(document).on("click", ID + " .btn", function () {
      $(this).addClass("effect-motion-bg");
      form.submit();
    });

    form.submit(function (e) {
      e.preventDefault();

      if ($('input[name="reCAPTCHA"]').length) {
        let reCAPTCHA = $('input[name="reCAPTCHA"]');

        grecaptcha.ready(function () {
          grecaptcha
            .execute(reCAPTCHA.data("key"), { action: "create_comment" })
            .then(function (token) {
              reCAPTCHA.val(token);
            });
        });
      }

      var url = form.attr("action");

      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        success: function (response) {
          try {
            JSON.parse(response);
            var obj = JSON.parse(response);

            if (obj.status == "success") {
              setTimeout(function () {
                btn.removeClass("effect-motion-bg");
                input.val("").removeClass("invalid").removeClass("valid");
                alert
                  .text(obj.info)
                  .removeClass("invalid")
                  .addClass("valid")
                  .fadeIn();
              }, 1200);
            } else if (obj.status == "invalid") {
              setTimeout(function () {
                btn.removeClass("effect-motion-bg");
                alert
                  .text(obj.info)
                  .removeClass("valid")
                  .addClass("invalid")
                  .fadeIn();
              }, 1200);

              input.each(function () {
                let input_name = $(this).attr("name");

                if (obj.fields[input_name] == true) {
                  $(ID + " .field-" + input_name)
                    .removeClass("valid")
                    .addClass("invalid");
                } else {
                  $(ID + " .field-" + input_name)
                    .removeClass("invalid")
                    .addClass("valid");
                }
              });
            } else {
              btn.removeClass("effect-motion-bg");
              input.val("").removeClass("invalid").removeClass("valid");
              alert
                .text(obj.info)
                .removeClass("valid")
                .addClass("invalid")
                .fadeIn();
            }
          } catch (e) {
            btn.removeClass("effect-motion-bg");
            input.val("").removeClass("invalid").removeClass("valid");
            alert
              .text("Sorry. We were unable to send your message.")
              .removeClass("valid")
              .addClass("invalid")
              .fadeIn();
          }
        },
      });
    });
  }

  sendForm("#leverage-simple-form");
  sendForm("#leverage-subscribe");
});

/*----------------------------------------------
11. Recaptcha
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  if ($('input[name="reCAPTCHA"]').length) {
    let siteKey = "6Lf-NwEVAAAAAPo_wwOYxFW18D9_EKvwxJxeyUx7"; // Put your site key here

    if (siteKey) {
      $('input[name="reCAPTCHA"]').attr("data-key", siteKey);
      grecaptcha.ready(function () {
        grecaptcha
          .execute(siteKey, { action: "create_comment" })
          .then(function (token) {
            $('input[name="reCAPTCHA"]').val(token);
          });
      });
    }
  }
});

/*----------------------------------------------
12. Cookie Notice
----------------------------------------------*/

jQuery(function ($) {
  "use strict";

  let cookieNotice = true;

  if (cookieNotice) {
    // Translate
    gdprCookieNoticeLocales.en = {
      description:
        "We use cookies to offer you a better browsing experience, personalise content and ads, to provide social media features and to analyse our traffic. Read about how we use cookies and how you can control them by clicking Cookie Settings. You consent to our cookies if you continue to use this website.",
      settings: "Cookie settings",
      accept: "Accept cookies",
      statement: "Our cookie statement",
      save: "Save settings",
      always_on: "Always on",
      cookie_essential_title: "Essential website cookies",
      cookie_essential_desc:
        "Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",
      cookie_performance_title: "Performance cookies",
      cookie_performance_desc:
        "These cookies are used to enhance the performance and functionality of our websites but are non-essential to their use. For example it stores your preferred language or the region that you are in.",
      cookie_analytics_title: "Analytics cookies",
      cookie_analytics_desc:
        "We use analytics cookies to help us measure how users interact with website content, which helps us customize our websites and application for you in order to enhance your experience.",
      cookie_marketing_title: "Marketing cookies",
      cookie_marketing_desc:
        "These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.",
    };

    gdprCookieNotice({
      locale: "en", // This is the default value
      timeout: 2000, // Time until the cookie bar appears
      expiration: 30, // This is the default value, in days
      domain: window.location.hostname, // If you run the same cookie notice on all subdomains, define the main domain starting with a .
      implicit: true, // Accept cookies on page scroll automatically
      statement: "https://softwarewala.com", // Link to your cookie statement page
      performance: ["JSESSIONID"], // Cookies in the performance category.
      analytics: ["ga"], // Cookies in the analytics category.
      marketing: ["SSID"], // Cookies in the marketing category.
    });
  }
});

// $(document).ready(function () {
//   var current_fs, next_fs, prev_fs;

//   $(".step-next-custom").click(function (e) {
//     e.preventDefault();
//     current_fs = $(this).closest("fieldset");
//     next_fs = current_fs.next();

//     current_fs.hide();
//     next_fs.show();
//   });

//   $(".step-prev-custom").click(function (e) {
//     e.preventDefault();
//     current_fs = $(this).closest("fieldset");
//     prev_fs = current_fs.prev();

//     current_fs.hide();
//     prev_fs.show();
//   });
// });
$(document).ready(function () {
  function sendAjaxRequest(url, formData, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      success: successCallback,
      error: errorCallback,
    });
  }

  $(".buy-next-btn").on("click", function (e) {
    e.preventDefault();
    let isValid = true;
    let leverage_form = $(this).closest("form"); // Get the form element
    let $button = $(this); // Store reference to the button

    leverage_form.find(".step1 input").each(function () {
      let value = $(this).val();
      let type = $(this).attr("type");
      let name = $(this).attr("name");

      if (value === "") {
        isValid = false;
        $(this).addClass("is-invalid");
      } else {
        $(this).removeClass("is-invalid");

        // Additional validation for email
        if (type === "email") {
          let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            $(this).addClass("is-invalid");
          } else {
            $(this).removeClass("is-invalid");
          }
        }

        // Additional validation for phone number (10 digits)
        if (name === "phoneNumber") {
          let phoneRegex = /^\d{10}$/;
          if (!phoneRegex.test(value)) {
            isValid = false;
            $(this).addClass("is-invalid");
          } else {
            $(this).removeClass("is-invalid");
          }
        }
      }
    });

    if (isValid) {
      let url = `${apiUrl}/auth/create-update`;
      let formData = leverage_form.serialize();

      sendAjaxRequest(
        url,
        formData,
        function (response) {
          // Move to the next step if the AJAX request is successful
          $button.closest(".step-group").hide().next(".step-group").show();

          // Show the message from the server response
          // alert(response.message);
        },
        function (xhr) {
          // Handle error if needed
          let errorMessage =
            xhr.responseJSON && xhr.responseJSON.message
              ? xhr.responseJSON.message
              : "Something went wrong!";
          alert(errorMessage);
          console.error(
            "An error occurred while submitting the form:",
            errorMessage
          );
        }
      );
    }
  });

  $(".step-prev-custom").on("click", function (e) {
    e.preventDefault();
    // Move to the previous step
    $(this).closest(".step-group").hide().prev(".step-group").show();
  });
});

async function phonePay(price, toolId, name, email, phone) {
  try {
    const payload = {
      tool_id: toolId,
      price: price,
      name: name ?? $("#user-name").val(),
      email: email ?? $("#user-email").val(),
      phone: phone ?? $("#user-phone").val(),
    };

    const response = await fetch(`${apiUrl}/payment/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data", data);

    // Open the payment URL in a new tab
    window.open(data.url, "_blank");
  } catch (error) {
    console.error("Error:", error);
  }
}
async function payPal(price, toolId, name, email, phone) {
  try {
    const payload = {
      tool_id: toolId,
      price: price,
      name: name ?? $("#user-name").val(),
      email: email ?? $("#user-email").val(),
      phone: phone ?? $("#user-phone").val(),
    };

    const response = await fetch(`${apiUrl}/payment/paypal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data", data);

    // Open the payment URL in a new tab
    window.open(data.url, "_blank");
  } catch (error) {
    console.error("Error:", error);
  }
}

//tools

$(document).ready(function () {
  const modal = $("#buyModal");
  let planPrice; // Declare planPrice in the outer scope
  let priceUSD;

  // Function to fetch tool data from the API
  const fetchTools = async () => {
    try {
      const response = await fetch(`${apiUrl}/subscription/tool`);
      const data = await response.json();
      console.log("subscriptions tools", data);
      return data;
    } catch (error) {
      console.error("Error fetching tools:", error);
      return [];
    }
  };

  // Function to show the modal
  const buyTool = (button) => {
    const tool = JSON.parse($(button).attr("data-tool"));
    console.log("tool", tool);

    let selectedPlan = tool?.plans?.[0];
    planPrice = selectedPlan?.priceINR; // Initialize planPrice with the first plan's price
    priceUSD = selectedPlan?.priceUSD;

    const currency = "₹";
    const dollar = "$";

    modal.modal("show");
    const buyToolElement = $(".buy-tool");

    const buyInnerHtml = `
      <div style="width: 100%; margin-bottom: 20px;">
          <div class="text-center row mb-3">
              ${tool?.plans
                ?.map(
                  (item) => `
                  <button type="button" data-plan='${JSON.stringify(
                    item
                  )}' class="badge tag p-3 col plan-button">
                      ${item.duration}
                  </button>
              `
                )
                .join("")}
          </div>
          <div class="card rounded no-hover">
              <div style="margin-inline: auto;" class="card-image">
                  <img class="img-fluid" id="modalImage" src="./assets/images/${
                    tool?.serviceImage
                  }" alt="${tool?.serviceName}" />
              </div>
              <div class="card-body text-center pb-0">
                  <div class="ad-title m-auto w-100">
                      <span class="badge tag p-3" id="modalPriceINR">${currency} ${planPrice} </span>
                  </div>
                  <div class="ad-title m-auto w-100">
                      <span class="badge tag p-3" id="modalPriceUSD"> ${dollar} ${priceUSD}</span>
                  </div>
              </div>
          </div>
          <div style="gap: 10px;" class="text-center d-flex align-items-center  mt-3">
          <button type="button" class="btn primary-button w-100 step-next-checkout-razorpay">Pay INR</button>
          <button type="button" class="btn primary-button w-100 step-next-checkout-paypal">Pay USD</button>
      </div>

          <div class="text-center mt-3">
              <button type="button" class="btn primary-button w-100 step-prev-custom"><i class="icon-arrow-left-circle"></i> Prev</button>
          </div>
      </div>
  `;

    buyToolElement.html(buyInnerHtml);

    // Attach click event to plan buttons
    $(".plan-button").on("click", function () {
      setPrice(this);
    });

    // Attach click event to Prev button
    $(".step-prev-custom").on("click", function () {
      buyToolElement.hide().prev(".step-group").show();
    });

    // // Attach click event to Checkout button
    // $(".step-next-checkout").on("click", function () {
    //   phonePay(planPrice, tool._id); // Pass the updated planPrice to phonePay
    // });

    // Attach click event to Razorpay button
    $(".step-next-checkout-razorpay").on("click", function () {
      phonePay(planPrice, tool._id); // Pass the updated planPrice to handleRazorpayPayment
    });

    // Attach click event to PayPal button
    $(".step-next-checkout-paypal").on("click", function () {
      // handlePayPalPayment(priceUSD, tool._id); // Pass the updated priceUSD to handlePayPalPayment
      payPal(priceUSD, tool._id); // Pass the updated planPrice to handleRazorpayPayment
    });
  };

  const setPrice = (button) => {
    const plan = JSON.parse($(button).attr("data-plan"));
    console.log("plan", plan);
    planPrice = plan?.priceINR; // Update planPrice when a plan is selected
    priceUSD = plan?.priceUSD;

    $("#modalPriceINR").text(`₹${planPrice} `);
    $("#modalPriceUSD").text(`$${priceUSD} `);
  };

  // Function to create HTML elements for each tool
  const createToolElement = (tool) => {
    const toolElement = $("<div>", { class: "col-md-4 mb-4 single-tool" });
    toolElement.html(`
            <div class="rounded bundleCard">
                <div class="card-image">
                    <img class="img-fluid card-img" src="./assets/images/${
                      tool.serviceImage
                    }" alt="${tool?.serviceName}" />
                </div>
                <div class="card-body text-center pb-0">
                    <div class="ad-title m-auto w-100">
                        <span class="badge tag p-3 card-price">₹ ${
                          tool.plans?.[0]?.priceINR
                        } </span>
                         <span class="badge tag p-3 card-price">$ ${
                           tool.plans?.[0]?.priceUSD
                         } </span>
                    </div>
                    <button data-tool='${JSON.stringify(
                      tool
                    )}' class="btn mx-auto primary-button smooth-anchor mt-2 w-100 buy-button">
                        <i class="icon-arrow-right-circle"></i>
                        Buy
                    </button>
                </div>
            </div>
        `);

    // Attach click event to the buy button
    toolElement.find(".buy-button").on("click", function () {
      buyTool(this);
    });

    return toolElement;
  };

  // Function to render tools in the HTML
  const renderTools = async () => {
    const tools = await fetchTools();
    const toolsContainer = $(".all-tools");
    tools.forEach((tool) => {
      const toolElement = createToolElement(tool);
      toolsContainer.append(toolElement);
    });

    renderToolsDropdown(tools);
  };

  // Function to render tools in the dropdown menu
  const renderToolsDropdown = (tools) => {
    const toolsDropdownContainer = $("#toolsDropdownContainer");
    tools.forEach((tool) => {
      const dropdownItem = $("<a>", {
        class: "list-group-item list-group-item-action dropdown-tool",
        href: "#",
        "data-tool": JSON.stringify(tool),
        text: tool.serviceName,
        css: {
          flex: "1 0 300px",
          border: "1px solid",
        },
      });

      // Attach click event to open modal with tool details
      dropdownItem.on("click", function (e) {
        e.preventDefault();
        buyTool(this);
      });

      toolsDropdownContainer.append(dropdownItem);
    });
  };

  // Call renderTools to fetch and display tools
  renderTools();
});

// Register
$(document).ready(function () {
  const registerForm = $("#registerForm");
  const registerButton = $("#registerButton");
  const wait = $(".registerLoading");
  const registerFailed = $(".registerFailed");
  const done = $(".registerSuccess");
  const refreshButton = $(".registerSuccess a.btn");
  const registerMessage = $("#registerMessage");

  registerForm.on("input", () => {
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phoneNumber = $("#phoneNumber").val().trim();
    const password = $("#password").val().trim();

    if (name && email && phoneNumber && password) {
      registerButton.removeAttr("disabled").removeClass("disabled");
    } else {
      registerButton.attr("disabled", true);
    }
  });

  registerButton.on("click", async () => {
    wait.css("display", "flex");

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phoneNumber = $("#phoneNumber").val().trim();
    const password = $("#password").val().trim();

    //   let isValidEmail = validateEmail(email);

    //   if (isValidEmail) {
    //     $("#registerForm .field-email").removeClass("invalid").addClass("valid");
    //   } else {
    //     $("#registerForm .field-email").removeClass("valid").addClass("invalid");
    //   }

    // function validateEmail(email) {
    //   // Basic email validation using regex
    //   let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   return emailRegex.test(email);
    // }

    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        registerForm.css("display", "none");
        done.css("display", "block");
        registerMessage.text("Registration successful!");
      } else {
        // Handle error
        registerMessage.text(data.message || "Registration failed");
        registerFailed.css("display", "block");
        registerForm.css("display", "none");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      wait.css("display", "none");
    }
  });

  refreshButton.on("click", () => {
    window.location.reload();
  });
});

//contact form
$(document).ready(function () {
  $("#contact-form").submit(function (e) {
    e.preventDefault(); // Prevent default form submission
    let formData = $(this).serialize(); // Serialize form data

    // AJAX request to submit form data
    $.ajax({
      type: "POST",
      url: `${apiUrl}/contacts`, // Change the URL to your endpoint
      data: formData,
      success: function (response) {
        // Handle success response
        alert(response.message);
        console.log(response); // Log the response to console
        // Display success message or redirect
      },
      error: function (xhr) {
        // Handle error response
        console.error(
          "An error occurred while submitting the form:",
          xhr.responseText
        ); // Log the error to console
        let errorMessage =
          xhr.responseJSON && xhr.responseJSON.message
            ? xhr.responseJSON.message
            : "Something went wrong!";
        alert(errorMessage);
        console.error(
          "An error occurred while submitting the form:",
          errorMessage
        );
        // Display error message or handle error
      },
    });
  });
});

//bundle modal

// $(document).ready(function () {
//   // Hide all prices initially

//   const Prices = {
//     INR: {
//       "1 Month": 1500,
//       "6 Month": 5000,
//       "12 Month": 7000,
//     },
//     USD: {
//       "1 Month": 18,
//       "6 Month": 60,
//       "12 Month": 84,
//     },
//   };

//   $(".one-month-price, .six-month-price, .tw-month-price").hide();

//   // Show the one-month price by default
//   $(".one-month-price").show();
//   $(".one-month").addClass("active");

//   // Handle button clicks
//   $(".one-month, .six-month, .tw-month").click(function () {
//     // Remove active class from all buttons
//     $(".one-month, .six-month, .tw-month").removeClass("active");

//     // Add active class to the clicked button
//     $(this).addClass("active");

//     // Hide all prices
//     $(".one-month-price, .six-month-price, .tw-month-price").hide();

//     // Show the selected price
//     if ($(this).hasClass("one-month")) {
//       $(".one-month-price").show();
//     } else if ($(this).hasClass("six-month")) {
//       $(".six-month-price").show();
//     } else if ($(this).hasClass("tw-month")) {
//       $(".tw-month-price").show();
//     }
//   });

//   // Handle button click for checkout to go to the next step group
//   $(".bundle-checkout").click(function () {
//     // Hide the current step group
//     // $(".step-group.buy-tool").hide();

//     phonePay();

//     // Show the next step group
//     // $(".step-group.temp-checkout").show();
//   });

//   // Handle "prev" button click to go back to the previous step group
//   $(".step-prev-custom").click(function () {
//     // Hide the current step group
//     $(this).closest(".step-group").hide();

//     // Show the previous step group
//     $(this).closest(".step-group").prev(".step-group").show();
//   });
// });

$(document).ready(function () {
  // Hide all prices initially

  const Prices = {
    INR: {
      "1 Month": 1500,
      "6 Month": 5000,
      "12 Month": 7000,
    },
    USD: {
      "1 Month": 18,
      "6 Month": 60,
      "12 Month": 84,
    },
  };

  $(".one-month-price, .six-month-price, .tw-month-price").hide();

  // Show the one-month price by default
  $(".one-month-price").show();
  $(".one-month").addClass("active");

  // Handle button clicks
  $(".one-month, .six-month, .tw-month").click(function () {
    // Remove active class from all buttons
    $(".one-month, .six-month, .tw-month").removeClass("active");

    // Add active class to the clicked button
    $(this).addClass("active");

    // Hide all prices
    $(".one-month-price, .six-month-price, .tw-month-price").hide();

    // Show the selected price
    if ($(this).hasClass("one-month")) {
      $(".one-month-price").show();
    } else if ($(this).hasClass("six-month")) {
      $(".six-month-price").show();
    } else if ($(this).hasClass("tw-month")) {
      $(".tw-month-price").show();
    }
  });

  // Handle button click for checkout to go to the next step group
  $(".bundle-phonepay").click(function () {
    // Determine the selected plan
    let selectedPlan = "";
    if ($(".one-month").hasClass("active")) {
      selectedPlan = "1 Month";
    } else if ($(".six-month").hasClass("active")) {
      selectedPlan = "6 Month";
    } else if ($(".tw-month").hasClass("active")) {
      selectedPlan = "12 Month";
    }

    const username = $("#user-name1").val();
    const email = $("#user-email1").val();
    const phoneNumber = $("#user-phone1").val();

    // Get the selected currency (assumed to be USD for this example)
    const selectedCurrency = "INR"; // You can change this based on your requirement
    const selectedPrice = Prices[selectedCurrency][selectedPlan];

    // Call phonePay with the selected price
    phonePay(selectedPrice, "bundle", username, email, phoneNumber);

    // Hide the current step group (if needed)
    // $(".step-group.buy-tool").hide();

    // Show the next step group (if needed)
    // $(".step-group.temp-checkout").show();
  });
  // Handle button click for checkout to go to the next step group
  $(".bundle-paypal").click(function () {
    // Determine the selected plan
    let selectedPlan = "";
    if ($(".one-month").hasClass("active")) {
      selectedPlan = "1 Month";
    } else if ($(".six-month").hasClass("active")) {
      selectedPlan = "6 Month";
    } else if ($(".tw-month").hasClass("active")) {
      selectedPlan = "12 Month";
    }

    const username = $("#user-name1").val();
    const email = $("#user-email1").val();
    const phoneNumber = $("#user-phone1").val();

    // Get the selected currency (assumed to be USD for this example)
    const selectedCurrency = "USD"; // You can change this based on your requirement
    const selectedPrice = Prices[selectedCurrency][selectedPlan];

    // Call phonePay with the selected price
    payPal(selectedPrice, "bundle", username, email, phoneNumber);

    // Hide the current step group (if needed)
    // $(".step-group.buy-tool").hide();

    // Show the next step group (if needed)
    // $(".step-group.temp-checkout").show();
  });

  // Handle "prev" button click to go back to the previous step group
  $(".step-prev-custom").click(function () {
    // Hide the current step group
    $(this).closest(".step-group").hide();

    // Show the previous step group
    $(this).closest(".step-group").prev(".step-group").show();
  });
});

//counter
$(document).ready(function () {
  $(document).ready(function () {
    $(".animated-counter").each(function () {
      var $this = $(this);
      var countTo = parseInt($this.text(), 10);

      $this.text("0"); // Start from 0

      $this.prop("Counter", 0).animate(
        {
          Counter: countTo,
        },
        {
          duration: 3000,
          easing: "swing",
          step: function (now) {
            $this.text(Math.ceil(now) + "+");
          },
        }
      );
    });
  });
});
