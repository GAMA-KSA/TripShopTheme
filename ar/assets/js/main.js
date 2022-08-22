(function ($) {
    "use strict";
    /*=================================
        JS Index Here
    ==================================*/
    /*
      01. On Load Function
      02. Preloader
      03. Mobile Menu Active
      04. Sticky fix
      05. Scroll To Top
      06. Set Background Image
      07. Hero Slider Active 
      08. Popup Sidemenu   
      09. Search Box Popup
      10. Magnific Popup
      11. Section Position
      12. Filter
      13. Date Time Picker
      14. Counter Up
      15. Indicator
      16. Slick Refresh
      17. VS Tab
      18. Circle Progress
      19. Price Slider
      00. Woocommerce Toggle
      00. Right Click Disable
      00. Inspect Element Disable
    */
    /*=================================
        JS Index End
    ==================================*/
    /*

    /*---------- 01. On Load Function ----------*/
    $(window).on('load', function () {
        $('.preloader').fadeOut();
    });



    /*---------- 02. Preloader ----------*/
    if ($('.preloader').length > 0) {
        $('.preloaderCls').each(function () {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.preloader').css('display', 'none');
            })
        });
    };

    /*---------- 03. Mobile Menu Active ----------*/
    $.fn.vsmobilemenu = function (options) {
        var opt = $.extend({
            menuToggleBtn: '.as-menu-toggle',
            bodyToggleClass: 'as-body-visible',
            subMenuClass: 'as-submenu',
            subMenuParent: 'as-item-has-children',
            subMenuParentToggle: 'as-active',
            meanExpandClass: 'as-mean-expand',
            appendElement: '<span class="as-mean-expand"></span>',
            subMenuToggleClass: 'as-open',
            toggleSpeed: 400,
        }, options);

        return this.each(function () {
            var menu = $(this); // Select menu

            // Menu Show & Hide
            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                // collapse submenu on menu hide or show
                var subMenu = '.' + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css('display', 'none')
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    };
                });
            };

            // Class Set Up for every submenu
            menu.find('li').each(function () {
                var submenu = $(this).find('ul');
                submenu.addClass(opt.subMenuClass);
                submenu.css('display', 'none');
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev('a').append(opt.appendElement);
                submenu.next('a').append(opt.appendElement);
            });

            // Toggle Submenu
            function toggleDropDown($element) {
                if ($($element).next('ul').length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).next('ul').slideToggle(opt.toggleSpeed);
                    $($element).next('ul').toggleClass(opt.subMenuToggleClass);
                } else if ($($element).prev('ul').length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).prev('ul').slideToggle(opt.toggleSpeed);
                    $($element).prev('ul').toggleClass(opt.subMenuToggleClass);
                };
            };

            // Submenu toggle Button
            var expandToggler = '.' + opt.meanExpandClass;
            $(expandToggler).each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });

            // Menu Show & Hide On Toggle Btn click
            $(opt.menuToggleBtn).each(function () {
                $(this).on('click', function () {
                    menuToggle();
                })
            })

            // Hide Menu On out side click
            menu.on('click', function (e) {
                e.stopPropagation();
                menuToggle()
            })

            // Stop Hide full menu on menu click
            menu.find('div').on('click', function (e) {
                e.stopPropagation();
            });

        });
    };

    $('.as-menu-wrapper').vsmobilemenu();


    /*---------- 04. Sticky fix ----------*/
    var lastScrollTop = '';
    var scrollToTopBtn = '.scrollToTop';

    function stickyMenu($targetMenu, $toggleClass, $parentClass) {
        var st = $(window).scrollTop();
        var height = $targetMenu.css('height');
        $targetMenu.parent().css('min-height', height);
        if ($(window).scrollTop() > 800) {
            $targetMenu.parent().addClass($parentClass);

            if (st > lastScrollTop) {
                $targetMenu.removeClass($toggleClass);
            } else {
                $targetMenu.addClass($toggleClass);
            };
        } else {
            $targetMenu.parent().css('min-height', '').removeClass($parentClass);
            $targetMenu.removeClass($toggleClass);
        };
        lastScrollTop = st;
    };
    $(window).on("scroll", function () {
        stickyMenu($('.sticky-active'), "active", "will-sticky");
        if ($(this).scrollTop() > 500) {
            $(scrollToTopBtn).addClass('show');
        } else {
            $(scrollToTopBtn).removeClass('show');
        }
    });


    /*---------- 05. Scroll To Top ----------*/
    $(scrollToTopBtn).each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, lastScrollTop / 3);
            return false;
        });
    })


    /*---------- 06.Set Background Image ----------*/
    if ($('[data-bg-src]').length > 0) {
        $('[data-bg-src]').each(function () {
            var src = $(this).attr('data-bg-src');
            $(this).css('background-image', 'url(' + src + ')');
            $(this).removeAttr('data-bg-src').addClass('background-image');
        });
    };


    /*----------- 07. Hero Slider Active ----------*/
    $('.as-hero-carousel').each(function () {
        var vsHslide = $(this);

        // Get Data From Dom
        function d(data) {
            return vsHslide.data(data)
        }

        vsHslide.layerSlider({
            allowRestartOnResize: true,
            maxRatio: (d('maxratio') ? d('maxratio') : 1),
            type: (d('slidertype') ? d('slidertype') : 'responsive'),
            pauseOnHover: (d('pauseonhover') ? true : false),
            navPrevNext: (d('navprevnext') ? true : false),
            hoverPrevNext: (d('hoverprevnext') ? true : false),
            hoverBottomNav: (d('hoverbottomnav') ? true : false),
            navStartStop: (d('navstartstop') ? true : false),
            navButtons: (d('navbuttons') ? true : false),
            loop: ((d('loop') === false) ? false : true),
            autostart: (d('autostart') ? true : false),
            height: (d('height') ? d('height') : 1080),
            responsiveUnder: (d('responsiveunder') ? d('responsiveunder') : 1220),
            layersContainer: (d('container') ? d('container') : 1220),
            showCircleTimer: (d('showcircletimer') ? true : false),
            skinsPath: 'layerslider/skins/',
            thumbnailNavigation: ((d('thumbnailnavigation') === false) ? false : true)
        });
    });



    /*----------- 08. Global Slider ----------*/
    $('.as-carousel').each(function () {
        var asSlide = $(this);

        // Collect Data 
        function d(data) {
            return asSlide.data(data);
        }

        // Custom Arrow Button
        var prevButton = '<button type="button" class="slick-prev"><i class="' + d('prev-arrow') + '"></i></button>',
            nextButton = '<button type="button" class="slick-next"><i class="' + d('next-arrow') + '"></i></button>';

        // Function For Custom Arrow Btn 
        $('[data-slick-next]').each(function () {
            $(this).on('click', function (e) {
                e.preventDefault()
                $($(this).data('slick-next')).slick('slickNext');
            })
        })

        $('[data-slick-prev]').each(function () {
            $(this).on('click', function (e) {
                e.preventDefault()
                $($(this).data('slick-prev')).slick('slickPrev');
            })
        })

        // Check for arrow wrapper
        if (d('arrows') == true) {
            if (!asSlide.closest('.arrow-wrap').length) {
                asSlide.closest('.container').parent().addClass('arrow-wrap')
            }
        }


        asSlide.slick({
            dots: (d('dots') ? true : false),
            fade: (d('fade') ? true : false),
            arrows: (d('arrows') ? true : false),
            speed: (d('speed') ? d('speed') : 1000),
            asNavFor: (d('asnavfor') ? d('asnavfor') : false),
            autoplay: ((d('autoplay') == false) ? false : true),
            infinite: ((d('infinite') == false) ? false : true),
            slidesToShow: (d('slide-show') ? d('slide-show') : 1),
            adaptiveHeight: (d('adaptive-height') ? true : false),
            centerMode: (d('center-mode') ? true : false),
            autoplaySpeed: (d('autoplay-speed') ? d('autoplay-speed') : 8000),
            centerPadding: (d('center-padding') ? d('center-padding') : '0'),
            focusOnSelect: ((d('focuson-select') == false) ? false : true),
            pauseOnFocus: (d('pauseon-focus') ? true : false),
            pauseOnHover: (d('pauseon-hover') ? true : false),
            variableWidth: (d('variable-width') ? true : false),
            vertical: (d('vertical') ? true : false),
            verticalSwiping: (d('vertical') ? true : false),
            prevArrow: (d('prev-arrow') ? prevButton : '<button type="button" class="slick-prev"><i class="fal fa-arrow-right"></i></button>'),
            nextArrow: (d('next-arrow') ? nextButton : '<button type="button" class="slick-next"><i class="fal fa-arrow-left"></i></button>'),
            rtl: ($('html').attr('dir') == 'rtl') ? true : false,
            responsive: [{
                    breakpoint: 1600,
                    settings: {
                        arrows: (d('xl-arrows') ? true : false),
                        dots: (d('xl-dots') ? true : false),
                        slidesToShow: (d('xl-slide-show') ? d('xl-slide-show') : d('slide-show')),
                        centerMode: (d('xl-center-mode') ? true : false),
                        centerPadding: 0
                    }
        }, {
                    breakpoint: 1400,
                    settings: {
                        arrows: (d('ml-arrows') ? true : false),
                        dots: (d('ml-dots') ? true : false),
                        slidesToShow: (d('ml-slide-show') ? d('ml-slide-show') : d('slide-show')),
                        centerMode: (d('ml-center-mode') ? true : false),
                        centerPadding: 0
                    }
        }, {
                    breakpoint: 1200,
                    settings: {
                        arrows: (d('lg-arrows') ? true : false),
                        dots: (d('lg-dots') ? true : false),
                        slidesToShow: (d('lg-slide-show') ? d('lg-slide-show') : d('slide-show')),
                        centerMode: (d('lg-center-mode') ? d('lg-center-mode') : false),
                        centerPadding: 0
                    }
        }, {
                    breakpoint: 992,
                    settings: {
                        arrows: (d('md-arrows') ? true : false),
                        dots: (d('md-dots') ? true : false),
                        slidesToShow: (d('md-slide-show') ? d('md-slide-show') : 1),
                        centerMode: (d('md-center-mode') ? d('md-center-mode') : false),
                        centerPadding: 0
                    }
        }, {
                    breakpoint: 768,
                    settings: {
                        arrows: (d('sm-arrows') ? true : false),
                        dots: (d('sm-dots') ? true : false),
                        slidesToShow: (d('sm-slide-show') ? d('sm-slide-show') : 1),
                        centerMode: (d('sm-center-mode') ? d('sm-center-mode') : false),
                        centerPadding: 0
                    }
        }, {
                    breakpoint: 576,
                    settings: {
                        arrows: (d('xs-arrows') ? true : false),
                        dots: (d('xs-dots') ? true : false),
                        slidesToShow: (d('xs-slide-show') ? d('xs-slide-show') : 1),
                        centerMode: (d('xs-center-mode') ? d('xs-center-mode') : false),
                        centerPadding: 0
                    }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
        });

    });

    /*----------- Custom Animaiton For Slider ----------*/
    $('[data-ani-duration]').each(function () {
        var durationTime = $(this).data('ani-duration');
        $(this).css('animation-duration', durationTime);
    });

    $('[data-ani-delay]').each(function () {
        var delayTime = $(this).data('ani-delay');
        $(this).css('animation-delay', delayTime);
    });

    $('[data-ani]').each(function () {
        var animaionName = $(this).data('ani');
        $(this).addClass(animaionName);
        $('.slick-current [data-ani]').addClass('as-animated');
    });

    $('.as-carousel').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $(slick.$slides).find('[data-ani]').removeClass('as-animated');
        $(slick.$slides[currentSlide]).find('[data-ani]').addClass('as-animated');
    })


    /*----------- 09. Ajax Contact Form ----------*/
    var form = '.ajax-contact';
    var invalidCls = 'is-invalid';
    var $email = '[name="email"]';
    var $validation = '[name="name"],[name="email"],[name="subject"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $('.form-messages');

    function sendContact() {
        var formData = $(form).serialize();
        var valid;
        valid = validateContact();
        if (valid) {
            jQuery.ajax({
                    url: $(form).attr('action'),
                    data: formData,
                    type: "POST"
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass('error');
                    formMessages.addClass('success');
                    // Set the message text.
                    formMessages.text(response);
                    // Clear the form.
                    $(form + ' input:not([type="submit"]),' + form + ' textarea').val('');
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass('success');
                    formMessages.addClass('error');
                    // Set the message text.
                    if (data.responseText !== '') {
                        formMessages.html(data.responseText);
                    } else {
                        formMessages.html('Oops! An error occured and your message could not be sent.');
                    }
                });
        };
    };

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(',')
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + ' ' + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls)
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls)
                    valid = true;
                };
            };
        };
        unvalid($validation);

        if (!$($email).val() || !$($email).val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
            $($email).addClass(invalidCls)
            valid = false;
        } else {
            $($email).removeClass(invalidCls)
            valid = true;
        };
        return valid;
    };

    $(form).on('submit', function (element) {
        element.preventDefault();
        sendContact();
    });





    /*---------- 08. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
        // Sidebar Popup
        $($sideMunuOpen).on('click', function (e) {
            e.preventDefault();
            $($sideMenu).addClass($toggleCls);
        });
        $($sideMenu).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls)
        });
        var sideMenuChild = $sideMenu + ' > div';
        $(sideMenuChild).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).addClass($toggleCls)
        });
        $($sideMenuCls).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls);
        });
    };
    popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');


    /*---------- 09. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        $($searchOpen).on('click', function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });
        $($searchBox).on('click', function (e) {
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
        $($searchBox).find('form').on('click', function (e) {
            e.stopPropagation();
            $($searchBox).addClass($toggleCls);
        });
        $($searchCls).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    };
    popupSarchBox('.popup-search-box', '.searchBoxToggler', '.searchClose', 'show');


    /*----------- 10. Magnific Popup ----------*/
    /* magnificPopup img view */
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* magnificPopup video view */
    $('.popup-video').magnificPopup({
        type: 'iframe'
    });

    /* magnificPopup video view */
    $('.popup-content').magnificPopup({
        type: 'inline',
        midClick: true,
    });


    /*---------- 11. Section Position ----------*/
    // Interger Converter
    function convertInteger(str) {
        return parseInt(str, 10)
    }

    $.fn.sectionPosition = function (mainAttr, posAttr) {
        $(this).each(function () {
            var section = $(this);

            function setPosition() {
                var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
                    posData = section.attr(mainAttr), // where to position
                    posFor = section.attr(posAttr), // On Which section is for positioning  
                    topMark = 'top-half', // Pos top
                    bottomMark = 'bottom-half', // Pos Bottom
                    parentPT = convertInteger($(posFor).css('padding-top')), // Default Padding of  parent
                    parentPB = convertInteger($(posFor).css('padding-bottom')); // Default Padding of  parent

                if (posData === topMark) {
                    $(posFor).css('padding-bottom', parentPB + sectionHeight + 'px');
                    section.css('margin-top', "-" + sectionHeight + 'px');
                } else if (posData === bottomMark) {
                    $(posFor).css('padding-top', parentPT + sectionHeight + 'px');
                    section.css('margin-bottom', "-" + sectionHeight + 'px');
                }
            }
            setPosition(); // Set Padding On Load
        })
    }

    var postionHandler = '[data-sec-pos]';
    if ($(postionHandler).length) {
        $(postionHandler).imagesLoaded(function () {
            $(postionHandler).sectionPosition('data-sec-pos', 'data-pos-for');
        });
    }

    /* Negative margin space --------------------------*/

    $.fn.sectionSpace = function (mainAttr, posAttr) {
        $(this).each(function () {
            var section = $(this);

            function setSpace() {
                var posData = section.attr(mainAttr), // where to position
                    posFor = section.attr(posAttr), // On Which section is for positioning  
                    topMark = "margin-top", // Pos top
                    bottomMark = "margin-bottom", // Pos Bottom
                    dataMt = section.data('margin-top'),
                    dataMb = section.data('margin-bottom'),
                    parentPT = convertInteger($(posFor).css('padding-top')), // Default Padding of  parent
                    parentPB = convertInteger($(posFor).css('padding-bottom')); // Default Padding of  parent

                if (posData === topMark) {
                    $(posFor).css('padding-bottom', parentPB + convertInteger(dataMt) + 'px');
                    section.css('margin-top', "-" + convertInteger(dataMt) + 'px').css({
                        'position': 'relative',
                        'z-index': '3'
                    });
                } else if (posData === bottomMark) {
                    $(posFor).css('padding-top', parentPT + convertInteger(dataMb) + 'px');
                    section.css('margin-bottom', "-" + convertInteger(dataMb) + 'px').css({
                        'position': 'relative',
                        'z-index': '3'
                    });
                }
            }
            setSpace(); // Set Padding On Load
        })
    }

    var spaceHandler = '[data-sec-space]';
    if ($(spaceHandler).length) {
        $(spaceHandler).imagesLoaded(function () {
            $(spaceHandler).sectionSpace('data-sec-space', 'data-pos-space');
        });
    }

    /*----------- 12. Filter ----------*/
    $('.filter-active').imagesLoaded(function () {
        var $filter = '.filter-active',
            $filterItem = '.filter-item',
            $filterMenu = '.filter-menu-active';

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: '*',
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1
                }
            });

            // filter items on button click
            $($filterMenu).on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });

            // Menu Active Class 
            $($filterMenu).on('click', 'button', function (event) {
                event.preventDefault();
                $(this).addClass('active');
                $(this).siblings('.active').removeClass('active');
            });
        };
    });


    /*----------- 13. Date Time Picker ----------*/
    // Only Date Picker
    $('.date-pick').datetimepicker({
        timepicker: false,
        datepicker: true,
        format: 'd-m-y',
        step: 10
    });

    // Only Time Picker
    $('.time-pick').datetimepicker({
        datepicker: false,
        format: 'H:i',
        step: 30
    });


    /*----------- 14. Counter Up ----------*/
    $('.counter-number').counterUp({
        delay: 10,
        time: 1000
    });

    /*----------- 15. Indicator ----------*/
    // Indicator
    $.fn.indicator = function () {
        var $menu = $(this),
            $linkBtn = $menu.find('a'),
            $btn = $menu.find('button');
        // Append indicator
        $menu.append('<span class="indicator"></span>');
        var $line = $menu.find('.indicator');
        // Check which type button is Available
        if ($linkBtn.length) {
            var $currentBtn = $linkBtn;
        } else if ($btn.length) {
            var $currentBtn = $btn
        }
        // On Click Button Class Remove
        $currentBtn.on('click', function (e) {
                e.preventDefault();
                $(this).addClass('active');
                $(this).siblings('.active').removeClass('active');
                linePos()
            })
            // Indicator Position
        function linePos() {
            var $btnActive = $menu.find('.active'),
                $height = $btnActive.css('height'),
                $width = $btnActive.css('width'),
                $top = $btnActive.position().top + 'px',
                $left = $btnActive.position().left + 'px';
            $line.css({
                top: $top,
                left: $left,
                width: $width,
                height: $height,
            })
        }

        // if ($menu.hasClass('as-slider-tab')) {
        //   var linkslide = $menu.data('asnavfor');
        //   $(linkslide).on('afterChange', function (event, slick, currentSlide, nextSlide) {
        //     setTimeout(linePos, 10)
        //   });
        // }
        linePos()
    }

    // Call On Load
    if ($('.tab-menu1').length) {
        $('.tab-menu1').indicator();
    }
    // Call On Load
    if ($('.tab-menu2').length) {
        $('.tab-menu2').indicator();
    }

    /*----------- 16. Slick Refresh ----------*/
    // Set position when click on bootstrap Tab
    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.as-carousel').slick('setPosition');
    })

    /*---------- 17. VS Tab ----------*/
    $.fn.vsTab = function (options) {
        var opt = $.extend({
            sliderTab: false,
            tabButton: 'button'
        }, options);

        $(this).each(function () {
            var $menu = $(this);
            var $button = $menu.find(opt.tabButton);

            // Append indicator
            $menu.append('<span class="indicator"></span>');
            var $line = $menu.find('.indicator');

            // On Click Button Class Remove and indecator postion set
            $button.on('click', function (e) {
                e.preventDefault();
                var cBtn = $(this);
                cBtn.addClass('active').siblings().removeClass('active');
                if (opt.sliderTab) {
                    $(slider).slick('slickGoTo', cBtn.data('slide-go-to'));
                } else {
                    linePos();
                }
            })

            // Work With slider
            if (opt.sliderTab) {
                var slider = $menu.data('asnavfor'); // select slider

                // Select All button and set attribute
                var i = 0;
                $button.each(function () {
                    var slideBtn = $(this);
                    slideBtn.attr('data-slide-go-to', i)
                    i++

                    // Active Slide On load > Actived Button
                    if (slideBtn.hasClass('active')) {
                        $(slider).slick('slickGoTo', slideBtn.data('slide-go-to'));
                    }

                    // Change Indicator On slide Change
                    $(slider).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                        $menu.find(opt.tabButton + '[data-slide-go-to="' + nextSlide + '"]').addClass('active').siblings().removeClass('active');
                        linePos();
                    });
                })

            };

            // Indicator Position
            function linePos() {
                var $btnActive = $menu.find(opt.tabButton + '.active'),
                    $height = $btnActive.css('height'),
                    $width = $btnActive.css('width'),
                    $top = $btnActive.position().top + 'px',
                    $left = $btnActive.position().left + 'px';

                $line.get(0).style.setProperty('--height-set', $height);
                $line.get(0).style.setProperty('--width-set', $width);
                $line.get(0).style.setProperty('--pos-y', $top);
                $line.get(0).style.setProperty('--pos-x', $left);

                if ($($button).first().position().left == $btnActive.position().left) {
                    $line.addClass('start').removeClass('center').removeClass('end');
                } else if ($($button).last().position().left == $btnActive.position().left) {
                    $line.addClass('end').removeClass('center').removeClass('start');
                } else {
                    $line.addClass('center').removeClass('start').removeClass('end');
                }
            }
            linePos();
        })
    }

    // Call On Load
    if ($('.testi-card-tab').length) {
        $('.testi-card-tab').vsTab({
            sliderTab: true,
            tabButton: '.tab-btn'
        });
    }

    /*---------- 18. Circle Progress ----------*/
    function animateElements() {
        $('.progressbar').each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find('.circle').attr('data-percent');
            var percentage = parseInt(percent, 10) / parseInt(100, 10);
            var animate = $(this).data('animate');
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data('animate', true);
                $(this).find('.circle').circleProgress({
                    startAngle: -Math.PI / 2,
                    value: percent / 100,
                    size: 135,
                    thickness: 7,
                    emptyFill: "#434653",
                    fill: {
                        color: '#E81C2E'
                    }
                }).on('circle-animation-progress', function (event, progress, stepValue) {
                    $(this).find('.circle-num').text((stepValue * 100).toFixed(0) + "%");
                }).stop();
            }
        });
    }

    // Show animated elements
    animateElements();
    $(window).scroll(animateElements);

    /*----------- Progress Bar Animation ----------*/
    $('.progress-bar').waypoint(function () {
        $('.progress-bar').css({
            animation: "animate-positive 1.8s",
            opacity: "1"
        });
    }, {
        offset: '75%'
    });

    /*----------- 19. Price Slider ----------*/
    $(".price_slider").slider({
        range: true,
        min: 10,
        max: 100,
        values: [10, 75],
        slide: function (event, ui) {
            $(".from").text("$" + ui.values[0]);
            $(".to").text("$" + ui.values[1]);
        }
    });
    $(".from").text("$" + $(".price_slider").slider("values", 0));
    $(".to").text("$" + $(".price_slider").slider("values", 1));

    /*----------- 00. Woocommerce Toggle ----------*/
    // Ship To Different Address
    $('#ship-to-different-address-checkbox').on('change', function () {
        if ($(this).is(':checked')) {
            $('#ship-to-different-address').next('.shipping_address').slideDown();
        } else {
            $('#ship-to-different-address').next('.shipping_address').slideUp();
        }
    });

    // Login Toggle
    $('.woocommerce-form-login-toggle a').on('click', function (e) {
        e.preventDefault();
        $('.woocommerce-form-login').slideToggle();
    })

    // Coupon Toggle
    $('.woocommerce-form-coupon-toggle a').on('click', function (e) {
        e.preventDefault();
        $('.woocommerce-form-coupon').slideToggle();
    })

    // Woocommerce Shipping Method
    $('.shipping-calculator-button').on('click', function (e) {
        e.preventDefault();
        $(this).next('.shipping-calculator-form').slideToggle();
    })

    // Woocommerce Payment Toggle
    $('.wc_payment_methods input[type="radio"]:checked').siblings('.payment_box').show();
    $('.wc_payment_methods input[type="radio"]').each(function () {
        $(this).on('change', function () {
            $('.payment_box').slideUp();
            $(this).siblings('.payment_box').slideDown();
        })
    })

    // Woocommerce Rating Toggle
    $('.rating-select .stars a').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            $(this).siblings().removeClass('active');
            $(this).parent().parent().addClass('selected');
            $(this).addClass('active');
        });
    })

    // Quantity Plus Minus ---------------------------

    $('.quantity-plus').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        })
    });

    $('.quantity-minus').each(function () {
        $(this).on('click', function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });
    })


    /*----------- 00. Right Click Disable ----------*/
    /* window.addEventListener('contextmenu', function (e) {
    // do something here... 
    e.preventDefault();
  }, false);
*/

    /*----------- 00. Inspect Element Disable ----------*/
    /*document.onkeydown = function (e) {
      if (event.keyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
      }
    }*/
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

})(jQuery);
