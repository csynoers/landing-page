// version 0.1
;(function($){
  window.lp = window.lp || {};
  window.lp.video = window.lp.video || {};
  $(document).ready(function(){lp.video.main.start();});

  lp.video.main = (function(){

    var MobileBreakpoint = 'mobile'
      , DesktopBreakpoint = 'desktop';

    var _isMobileViewport = function() {
      var mediaQuery ='screen and (max-width: 600px)';
      return window.matchMedia(mediaQuery).matches;
    };

    var _getVideoElements = function(id) {
      var $container = $('#' + id);
      return {
        iframes: $container.find('iframe'),
        objects: $container.find('object')
      };
    };

    var _setSizeByNodes = function($nodes, size) {
      $.each($nodes, function(_, $node) {
        if(size.width) {
          $node.attr('width', size.width);
        }

        if(size.height) {
          $node.attr('height', size.height);
        }
      });
    };

    var _resizeIframe = function($video, size) {
      _setSizeByNodes([$video], size);
    };

    var _resizeObject = function($video, size) {
      _setSizeByNodes([$video, $video.find('embed')], size);
    };

    var resizeStratagies = {
      iframes: _resizeIframe,
      objects: _resizeObject
    };

    var _getCurrentBreakpoint = function() {
      return _isMobileViewport() ? MobileBreakpoint : DesktopBreakpoint;
    };

    var _getDefaultBreakpoint = function() {
      return DesktopBreakpoint;
    }

    var _getSizeForBreakPoint = function(videoObj) {
      return videoObj.dimensions[_getCurrentBreakpoint()] ||
        videoObj.dimensions[_getDefaultBreakpoint()];
    };

    var _resizeVideoElements = function(id, videoObj) {
      var videos         = _getVideoElements(id),
      size               = _getSizeForBreakPoint(videoObj);

      $.each(videos, function(key, collection){
        $.each(collection, function(_, $video){
          resizeStratagies[key]($($video), size);
        });
      });
    };

    var _resizeVideoElementsByBreakpoint = function() {
      $.each(window.lp.video.videos, _resizeVideoElements);
    };

    var _start = function() {
      _resizeVideoElementsByBreakpoint();
    };

    return {
      start: _start
    };
  })();
})(lp.jQuery);
