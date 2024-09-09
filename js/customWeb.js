jQuery.noConflict()
;(function ($) {
  'use strict'
  $(function () {
    var $window = $(window),
      $document = $(document),
      $body = $('body')
    var isMobile = {
      Android: function () {
        return navigator.userAgent.match(/Android/i)
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i)
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i)
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i)
      },
      any: function () {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        )
      },
    }
    if (!('placeholder' in document.createElement('input'))) {
      $('form').on('submit', function () {
        $(this)
          .find('[placeholder]')
          .each(function () {
            var $input = $(this)
            if ($input.val() == $input.attr('placeholder')) {
              $input.val('')
            }
          })
      })
      $('[placeholder]')
        .on('focus', function () {
          var $input = $(this)
          if ($input.val() == $input.attr('placeholder')) {
            $input.val('')
            $input.removeClass('placeholder')
          }
        })
        .on('blur', function () {
          var $input = $(this)
          if (
            $input.val() == '' ||
            $input.val() == $input.attr('placeholder')
          ) {
            $input.addClass('placeholder')
            $input.val($input.attr('placeholder'))
          }
        })
        .blur()
    }
    var $els = $('[class*="jackrose-animation-"]')
    if ($body.hasClass('jackrose-enable-animations') && !isMobile.any()) {
      $els.one('inview', function () {
        $(this).addClass('jackrose-animate')
      })
    } else {
      $els.addClass('jackrose-no-animate')
    }
    if ($('.header-section').hasClass('header-floating')) {
      var detectFloatingHeader = function () {
        if (
          $window.scrollTop() >=
          $('.header-anchor').offset().top - $body.offset().top
        ) {
          $('.header-section')
            .addClass('floating')
            .css('top', $body.offset().top)
        } else {
          $('.header-section').removeClass('floating').css('top', '')
        }
      }
      detectFloatingHeader()
      $window.on('resize', detectFloatingHeader)
      $window.on('scroll', detectFloatingHeader)
    }
    $body.on('click', '.toggle', function (e) {
      e.preventDefault()
      $('.toggle.active').not(this).removeClass('active')
      $(this).toggleClass('active')
    })
    $('a[href="#"]').on('click', function (e) {
      e.preventDefault()
    })
    $('.header-navigation ul a, a.anchor-link').on('click', function (e) {
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname &&
        location.search == this.search
      ) {
        var $target = $(this.hash),
          target_top,
          speed
        $target = $target.length
          ? $target
          : $('[name=' + this.hash.slice(1) + ']')
        target_top =
          $target.offset().top -
          $('.header-section').innerHeight() -
          $body.offset().top
        speed = Math.abs($window.scrollTop() - target_top) / 2.5
        if ($target.length) {
          $('html, body').animate({ scrollTop: target_top }, speed)
          $('.header-navigation-toggle').removeClass('active')
          return false
        }
      }
    })
    $('[data-jackrose-background-parallax]').each(function (i, el) {
      var $el = $(el),
        $img = $(document.createElement('img')),
        $bg,
        data = JSON.parse($el.attr('data-jackrose-background-parallax'))
      $bg = $el.find('.section-background')
      if ($bg.length < 1) {
        $bg = $(document.createElement('div'))
          .addClass('section-background')
          .prependTo($el)
      }
      $img
        .attr('src', data.src)
        .attr('width', data.width)
        .attr('height', data.height)
        .attr('data-stellar-ratio', data.ratio)
        .attr('alt', '')
        .css({ opacity: 0 })
        .appendTo($bg)
    })
    var resizeBackground = function () {
      $('.section-background video, .section-background img').each(function (
        i,
        el
      ) {
        var $el = $(el),
          $section = $el.parent(),
          el_w =
            $el.attr('width') ||
            (el.tagName == 'VIDEO' ? el.videoWidth : el.naturalWidth),
          el_h =
            $el.attr('height') ||
            (el.tagName == 'VIDEO' ? el.videoHeight : el.naturalHeight),
          section_w = $section.outerWidth(),
          section_h = $section.outerHeight(),
          scale_w = section_w / el_w,
          scale_h = section_h / el_h,
          scale = scale_w > scale_h ? scale_w : scale_h,
          new_el_w,
          new_el_h,
          offset_top,
          offset_left
        if (scale * el_w < 0) {
          scale = 0 / el_w
        }
        new_el_w = scale * el_w
        new_el_h = scale * el_h
        offset_left = ((new_el_w - section_w) / 2) * -1
        offset_top = ((new_el_h - section_h) / 2) * -1
        $el.css({
          width: new_el_w,
          height: new_el_h,
          'margin-top': offset_top,
          'margin-left': offset_left,
          opacity: 1,
        })
      })
    }
    $window.on('resize', function () {
      clearTimeout(this.resizeBackgroundTimeout)
      this.resizeBackgroundTimeout = setTimeout(resizeBackground, 50)
    })
    $window.on('pageStart', resizeBackground)
    if (isMobile.any()) {
      $('.section-background video.disable-video-mobile').remove()
    }
    var navigationMaxHeight = function () {
      $('.header-navigation > div > ul').css(
        'max-height',
        0.8 *
          ($window.height() -
            $('.header-section').innerHeight() -
            $body.offset().top)
      )
    }
    navigationMaxHeight()
    $window.on('resize', navigationMaxHeight)
    if ($('.hero-logo').length > 0) {
      var fadeOutHeroLogo = function () {
        var $logo = $('.hero-logo'),
          scroll = $window.scrollTop(),
          target = $logo.offset().top + 0.7 * $logo.outerHeight()
        $logo.css('opacity', 1 - (scroll / target).toFixed(2))
      }
      fadeOutHeroLogo()
      $window.on('scroll', fadeOutHeroLogo)
      $window.on('resize', fadeOutHeroLogo)
    }
    if ($.fn.countdown) {
      $('.jackrose-sow-countdown').each(function (i, el) {
        var $el = $(el),
          target = $el.attr('data-jackrose-target'),
          $fragments = $el.children()
        $el
          .countdown(target, { elapse: true })
          .on('update.countdown', function (e) {
            $fragments.each(function (j, fragment) {
              var $fragment = $(fragment),
                format = $fragment.attr('data-jackrose-format'),
                singular = $fragment.attr('data-jackrose-singular'),
                plural = $fragment.attr('data-jackrose-plural')
              $fragment.find('big').html(e.strftime('%' + format))
              $fragment
                .find('small')
                .html(
                  e.strftime(
                    '%!' + format + ':' + singular + ',' + plural + ';'
                  )
                )
            })
          })
      })
    }
    if ($.fn.lightGallery) {
      $('.lightgallery.jackrose-sow-gallery-grid-items').each(function (i, el) {
        var $el = $(el)
        $el.lightGallery({
          selector: '.jackrose-sow-gallery-grid-item > a',
          download: false,
        })
      })
    }
    if ($.fn.isotope) {
      $('.jackrose-sow-gallery-grid').each(function (i, el) {
        var $el = $(el),
          $grid = $el.find('.jackrose-sow-gallery-grid-items'),
          $filter = $el.find('.jackrose-sow-gallery-grid-filters')
        $grid.imagesLoaded(function () {
          $grid.isotope({
            itemSelector: '.jackrose-sow-gallery-grid-item',
            transitionDuration: '1s',
          })
        })
        $filter.on('click', 'a', function (e) {
          e.preventDefault()
          var $el = $(this)
          $el.siblings().removeClass('active')
          $el.addClass('active')
          $grid.isotope({ filter: $el.attr('data-filter') })
        })
      })
    }
    if ($('.jackrose-sow-maplibre').length > 0) {  
      var resizeMapLibre = function () {
        $('.jackrose-sow-maplibre').css(
          'max-height',
          0.8 * (
            $window.height() -
            $('.header-section').innerHeight() -
            $body.offset().top
          )
        );
      };
  
      $window.on('resize', function () {
        resizeMapLibre();
      });
  
      resizeMapLibre();
    }
    if ($('.jackrose-sow-rsvp-form'.length > 0)) {  
      const $el = $('.jackrose-sow-countdown');
      const date = new Date($el.attr('data-jackrose-target'));
      date.setDate(date.getDate() - 29);
      date.setHours(0, 0, 0, 0);
      
      if (new Date() > date) { // new Date() > date
        $('.jackrose-sow-rsvp-form').remove(0);
        $('.so-widget-jackrose-sow-rsvp-form').html(`<div style="font-size: 22px; font-weight: bold; text-align: center; margin: auto;">Lo siento, el tiempo de reserva ha finalizado.</div>`);
      }else{
        $('.jackrose-sow-section-heading-limitDate').html('Tienes hasta el ' + date.toLocaleDateString('es-ES')); 
      }
    }
    if ($.fn.flickity) {
      $window.on('pageStart', function () {
        $('.hero-slider').each(function () {
          var $el = $(this),
            autoplay = parseInt($el.attr('data-jackrose-autoplay'))
          $el
            .flickity({
              setGallerySize: false,
              draggable: false,
              wrapAround: true,
              autoPlay:
                autoplay > 0 && $el.children().length > 1 ? autoplay : false,
              pauseAutoPlayOnHover: false,
              prevNextButtons: false,
              pageDots: $el.children().length > 1 ? true : false,
              selectedAttraction: 0.2,
              friction: 0.8,
            })
            .on('cellSelect', function () {
              var data = $(this).data('flickity'),
                $cells = $el.find('.hero-slide')
              $cells.each(function (i, cell) {
                var $video = $(cell).find('video')
                if ($video.length > 0) {
                  if (cell == data.selectedElement) {
                    $video.get(0).play()
                  } else {
                    $video.get(0).pause()
                  }
                }
              })
            })
            .trigger('cellSelect')
        })
        $('.jackrose-sow-quote').each(function () {
          var $el = $(this),
            autoplay = parseInt($el.attr('data-jackrose-autoplay'))
          $el.flickity({
            wrapAround: true,
            autoPlay:
              autoplay > 0 && $el.children().length > 1 ? autoplay : false,
            pauseAutoPlayOnHover: false,
            prevNextButtons: false,
            pageDots: $el.children().length > 1 ? true : false,
            selectedAttraction: 0.2,
            friction: 0.8,
          })
        })
      })
    }
    if ($.fn.sakura && $('#hero-effect').length > 0 && !isMobile.any()) {
      $window.on('pageStart', function () {
        var $el = $('#hero-effect'),
          effect = $el.attr('data-jackrose-effect')
        $el.sakura('start', {
          className: 'sakura hero-effect-item ' + effect,
          maxSize: effect == 'snow' ? 7 : 14,
          minSize: effect == 'snow' ? 4 : 9,
          newOn: effect == 'snow' ? 200 : 300,
        })
      })
    }
    if ($.fn.stellar) {
      $window.stellar('destroy')
      if (!isMobile.any()) {
        $window.stellar({
          verticalOffset: function () {
            return $body.offset().top
          },
          positionProperty: 'transform',
          responsive: true,
          hideDistantElements: false,
          horizontalScrolling: false,
        })
      } else {
        $.stellar = function () {
          return
        }
      }
    }
    if ($('#preloader').length > 0) {
      Pace.on('hide', function () {
        $('#preloader').addClass('jackrose-preloader-done')
        $window.trigger('pageStart')
      })
      Pace.on('start', function () {
        var fixPace99Bug = setInterval(function () {
          var $pace = $('#preloader .pace-progress'),
            progress = $pace.attr('data-progress')
          if ('99' === progress) {
            clearInterval(fixPace99Bug)
            $pace.stop()
          }
        }, 100)
      })
    } else {
      $window.trigger('pageStart')
    }
    $window.trigger('scroll')
  })
})(jQuery)
