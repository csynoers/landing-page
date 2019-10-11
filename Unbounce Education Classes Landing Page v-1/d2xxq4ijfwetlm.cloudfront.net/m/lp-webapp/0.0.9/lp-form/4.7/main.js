// version 4.7
;(function(){
  window.module = window.module || {};
  window.module.lp = window.module.lp || {};
  window.module.lp.form = window.module.lp.form || {};
  window.module.lp.form.data = null;

  window.lp = window.lp || {};
  lp.form = lp.form || {};
  lp.form.main = lp.form.main || {};

  lp.jQuery(document).ready(function(){ lp.form.main.start(); });

  lp.form.main = (function(){
    var formContainer,
    formButton,
    errorContainer,
    errorLabelContainer,
    formSelector;

    var start = function(){
      if(window.module.lp.form.data) {
        setupSelectors();
        initialize();
        handleForm();
      }
    };

    var setupSelectors = function() {
      formSelectors();
      errorSelectors();
    };

    var formSelectors = function() {
      formContainer       = '#'+window.module.lp.form.data.formContainerId;
      formButton          = '#'+window.module.lp.form.data.formButtonId;
      formSelector        = formContainer + ' form';
    };

    var errorSelectors = function() {
      errorContainer      = '#'+window.module.lp.form.data.errorContainerId;
      errorLabelContainer = errorContainer + ' ul';
    };

    var handleForm = function() {
      copyURLParamsToFields();
      formSubmitHandler();
      adjustFormLabelHeight();
      adjustSelectBoxWidthForIE8();
    };

    var formSubmitHandler = function() {
      lp.jQuery('form').keypress(function(e) {
        if(e.which === 13 && e.target.nodeName.toLowerCase() !== 'textarea') {
          e.preventDefault();
          lp.jQuery('div.lp-pom-form form').submit();
        }
      });
    };

    var positionErrors = function() {
      var errorWidth = lp.jQuery(errorContainer).outerWidth(true);
      var formWidth = lp.jQuery(formContainer).outerWidth(true);
      if(formWidth + errorWidth < lp.jQuery(window).width()) {
        positionErrorsOnMonitors(formWidth);
      } else {
        positionErrorsSmallScreens();
      }
    };

    var positionErrorsOnMonitors = function(formWidth) {
      var formOffset = lp.jQuery(formContainer).offset();
      var docWidth = lp.jQuery(document).width();
      var left =  (docWidth - (formOffset.left + formWidth + 16)) < 280 ? formOffset.left - 296 : formOffset.left + formWidth + 16;
      var container = lp.jQuery(errorContainer);
      container.css({
        left: left + "px",
        top: Math.max(formOffset.top, lp.jQuery(document).scrollTop()+4) + "px",
        width: "280px"
      });

      window.onscroll = function() {
        handlePositioning(formOffset, container);
      };
    };

    var handlePositioning = function(formPosition, container) {
      var errorElTop = container.offset().top;
      var formElBottom = Math.round(errorElTop + container.innerHeight());
      var formHeight = lp.jQuery(formContainer).innerHeight();
      var formBottom = formPosition.top + formHeight;

      if(formBottom < formElBottom && formPosition.top < lp.jQuery(document).scrollTop()) {
        container.css({position: 'absolute'});
      } else if(formPosition.top < lp.jQuery(document).scrollTop()) {
        container.css({position: 'absolute', top: lp.jQuery(document).scrollTop()});
      } else {
        container.css({position: 'absolute', top: formPosition.top});
      }
    };

    //Small screen error positioning is so that the error will display properly on mobile
    //devices.
    var positionErrorsSmallScreens = function() {
      lp.jQuery(errorContainer).css({
        position: "fixed",
        left: "0px",
        right: "0px",
        top: "0px"
      });
    };

    var getScrollBarWidth = function() {
      var inner = document.createElement('p');
      inner.style.width = "100%";
      inner.style.height = "200px";

      var outer = document.createElement('div');
      outer.style.position = "absolute";
      outer.style.top = "0px";
      outer.style.left = "0px";
      outer.style.visibility = "hidden";
      outer.style.width = "200px";
      outer.style.height = "150px";
      outer.style.overflow = "hidden";
      outer.appendChild (inner);

      document.body.appendChild (outer);
      var w1 = inner.offsetWidth;
      outer.style.overflow = 'scroll';
      var w2 = inner.offsetWidth;
      if (w1 === w2) { w2 = outer.clientWidth; }

      document.body.removeChild (outer);

      return (w1 - w2);
    };

    var getParamsForSuccessModal = function(urlParams) {
      return urlParams ? urlParams.replace(/\?/g, '&') : '';
    };

    var getOperatorToUseFromUrl = function(url) {
      return new RegExp(/\?/).test(url) ? '&' : '?';
    };

    var buildSuccessModalUrl = function(data, form) {
      return data.url + getOperatorToUseFromUrl(data.url) +
        lp.jQuery(form).serialize() + getParamsForSuccessModal(window.location.search);
    };

    var isMobileAllowed = function(data) {
      var mediaQuery ='screen and (max-width: 600px)';
      return window.matchMedia(mediaQuery).matches && data.size.mobile;
    };

    var getModalSize = function(data) {
      var version = isMobileAllowed(data) ? 'mobile':'desktop';

      if (data.size[version]) {
        return {
          width  : data.size[version].width,
          height : data.size[version].height
        };
      }

      return {
        width  : data.size.width,
        height : data.size.height
      };
    };

    var showSuccessModal = function(data, form) {
      var url = buildSuccessModalUrl(data, form);
      lp.jQuery.ubpoverlay({
        href: url,
        padding:0,
        type: 'iframe',
        onOverlayClick: false,
        width: getModalSize(data).width,
        height: getModalSize(data).height,
        onComplete: function() {
          if (data.size.height > lp.jQuery('#ubpoverlay-content').height()) {
            var content = lp.jQuery('#ubpoverlay-content')[0];
            var outer = lp.jQuery('#ubpoverlay-outer')[0];
            content.style.width = (data.size.width + getScrollBarWidth()) + 'px';
            outer.style.width = (data.size.width + getScrollBarWidth()) + 'px';
          }
        }
      });
    };

    var formFilter =  function(param){
      return ('pageId' === param.name ||
              'pageVariant' === param.name ||
              /^ubafs-\w+/.test(param.name)
             ) ? null : param;
    };

    var getSuccessURL = function(url, form) {
      /* TODO: Refactor */
      /* jshint unused:vars */
      var parameterList = '';

      if( window.module.lp.form.data.passParams ) {
        var regex      = /\?/
          , operator   = regex.test( url ) ? '&' : '?'
          , serialized = lp.jQuery('form').serializeArray();

        parameterList = operator + lp.jQuery.param(lp.jQuery.map(serialized,formFilter));
      }
      return  url + parameterList;
    };

    var enableForm = function() {
      lp.jQuery(formButton).removeClass('disabled');
    };

    var disableForm = function() {
      lp.jQuery(formButton).addClass('disabled');
    };

    var isFormDisabled = function() {
      return lp.jQuery(formButton).hasClass('disabled');
    };

    var getFormAction = function(form) {
      var action = form.getAttribute('action');
      if (typeof action === 'object' && action.nodeType === 1) {
        var parent = action.parentNode;
        var node = parent.removeChild(action);
        action = getFormAction(form);
        parent.appendChild(node);
      }
      return action;
    };

    var setFormAction = function(form, url) {
      var action = form.getAttribute('action');
      if (typeof action === 'object' && action.nodeType === 1) {
        var parent = action.parentNode;
        var node = parent.removeChild(action);
        action = setFormAction(form, url);
        parent.appendChild(node);
      }
      form.setAttribute('action', url);
    };

    var stripEmailField = function(validationRules) {
      lp.jQuery.each(validationRules, function(key, value){
        if(value.email) {
          validationRules[key] = {
            required: {
              depends: function(){
                if(/\W$/.test(lp.jQuery(this).val())) {
                  lp.jQuery(this).val(lp.jQuery.trim(lp.jQuery(this).val()));
                }
                return value.required;
              }
            },
            email: true
          };
        }
      });
      return validationRules;
    };

    var phoneValidator = function(type) {
      lp.jQuery.validator.addMethod('phone', function(value, element) {
        value = value.replace(/([. \-()+])/g, '');
        if(type === 'uk') {
          return this.optional(element) || value.length > 9 &&
            value.match(/^((44?(0)?)|(0))([0-9]{3,4}){3}$/);
        } else if(type === 'australian') {
          return this.optional(element) || (value.length  > 5 && value.length < 16) &&
            value.match(/^((0|61)(2|4|3|7|8)){0,1}[0-9]{2}[0-9]{2}[0-9]{1}[0-9]{3}$/);
        } else if(type === 'generic') {
          return this.optional(element) || (value.length > 5 && value.length < 16) && !isNaN(value);
        } else {
          //North American
          return this.optional(element) || (value.length > 9) && value.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
        }
        // BUG phoneValidators is not defined anywhere in this project!
        return phoneValidators[type](value, element, this.optional);
      }, 'Please specify a valid phone number');
    };

    var setValidateRules = function(validationData) {
      var validationType = validationData.validationType;
      var validationRules = ['generic', 'australian', 'uk', 'north-american'];
      if((validationType && lp.jQuery.inArray(validationType, validationRules) > -1)) {
        phoneValidator(validationType);
      }
    };

    var notFormPostOrRedirect = function() {
      var action = window.module.lp.form.data.confirmAction;
      return lp.jQuery.inArray(action, ['url', 'post']) === -1;
    };

    var initialize = function() {

      positionErrors();

      setValidateRules(window.module.lp.form.data);

      lp.jQuery(formSelector).validate( {
        rules: stripEmailField(window.module.lp.form.data.validationRules),
        messages: window.module.lp.form.data.validationMessages,
        errorContainer: errorContainer,
        errorLabelContainer: errorLabelContainer,
        wrapper: 'li',
        onFocusOut: positionErrors,
        invalidHandler: positionErrors,
        focusInvalid:false,
        submitHandler: function(form) {
          if (isFormDisabled()) {
            return;
          }

          disableForm();

          lp.jQuery.ajax({
            url: getFormAction(lp.jQuery(form).get(0))+'&lp-form-submit-method=ajax',
            type: 'POST',
            data: lp.jQuery(form).serialize(),
            debug:true,
            error: function() {
              alert(window.module.lp.form.data.errorMessage ||
                    'We\'re sorry the form could not be submitted because something went wrong. Please try again.');
            },
            success: function(data) {
              if (data.protected_assets) {
                window.module.lp.form.responseData = {
                  protectedAssets: data.protected_assets
                };
              }
              var $form = lp.jQuery('#'+window.module.lp.form.data.formContainerId+' form');
              switch (window.module.lp.form.data.confirmAction) {
                case 'url':
                  var url = getSuccessURL( window.module.lp.form.data.confirmData, form );
                window.location.href = url.replace(/\+/g, '%20');
                break;
                case 'message':
                  alert(window.module.lp.form.data.confirmData);
                break;
                case 'modal':
                  showSuccessModal(window.module.lp.form.data.confirmData, form);
                break;
                case 'post':
                  $form.unbind();
                setFormAction($form.get(0), window.module.lp.form.data.confirmData);
                $form.submit();
                break;
              }
            },
            complete: function() {
              if(notFormPostOrRedirect()) {
                enableForm();
                form.blur();
                form.reset();
              }
            }
          });
        }
      });
    };

    var copyURLParamsToFields = function() {
      var params = window.lp.form.main.getUrlParams();
      var form = lp.jQuery('#'+window.module.lp.form.data.formContainerId+' form');
      var field;
      var excludeFields = ['pageid', 'pagevariant'];
      for (var param in params) {
        field = lp.jQuery(form).find('input[name='+param+']')[0] || lp.jQuery(form).find('textarea[name='+param+']')[0];
        var isExcludedField = lp.jQuery.inArray( excludeFields, param.toLowerCase() );
        if (typeof field !== 'undefined' && isExcludedField === -1 ) {
          if (field.type === 'text' || field.type === 'hidden' || field.type === 'textarea') {
            field.value = decodeURLParam(params[param]);
          }
        }
      }
    };

    var decodeURLParam =  function(param) {
      try {
        return decodeURIComponent(param);
      } catch(e) {
        // incoming URL parameters might be ASCII encoded. Force them to UTF-8.
        /* global unescape */
        return decodeURIComponent(encodeURIComponent(unescape(param)));
      }
    };

    //Handle ie8 select box not large enough issue as noted by lp-2467
    var adjustSelectBoxWidthForIE8 = function() {
      if(lp.jQuery.browser.msie && parseInt(lp.jQuery.browser.version,10) < 9) {
        var el;
        lp.jQuery('select').each(function(){
          el = lp.jQuery(this);
          el.data('origWidth', el.outerWidth());
        }).mousedown(function(){
          lp.jQuery(this).css('width', 'auto');
        }).bind("blur change", function(){
          el = lp.jQuery(this);
          el.css('width', el.data('origWidth'));
        });
      }
    };

    //Adjust Label width to make up for font size differences in browsers.
    var adjustLabelHeight = function(e, designHeight) {
      if(e.offsetHeight > designHeight) {
        var adjust = 1;
        var maxAdjust = 30;
        var w = parseInt(e.style.width, 10);
        while(lp.jQuery(e).height() > designHeight && maxAdjust > adjust) {
          e.style.width = (w + adjust) + 'px';
          adjust++;
        }
      }
    };

    var getWindowLocation = function(){
      return window.location.href;
    };

    var getUrlParams = function(){
      var params = {};
      var loc = this.getWindowLocation();
      var hashes = loc.slice(loc.indexOf('?') + 1).split('&');

      var i;
      for (i = 0; i < hashes.length; i++) {
        var hash_data = hashes[i].split('='),
            key       = hash_data[0],
            value     = hash_data[1] || '';

        if (!params.hasOwnProperty(key)) {
          params[key] = value;
        }
        else if (Array.isArray(params[key])) {
          params[key].push(value);
        }
        else {
          params[key] = [params[key], value];
        }
      }
      return params;
    };

    var adjustFormLabelHeight = function() {
      lp.jQuery(".lp-pom-form label").each(function(i, e) {
        if(e.style.height) {
          var designHeight = parseInt(e.style.height, 10);
          e.style.height = 'auto';
          adjustLabelHeight(e, designHeight);
        }
      });
    };

    return {
      getOperatorToUseFromUrl  : getOperatorToUseFromUrl,
      getParamsForSuccessModal : getParamsForSuccessModal,
      formFilter               : formFilter,
      buildSuccessModalUrl     : buildSuccessModalUrl,
      getWindowLocation        : getWindowLocation,
      getUrlParams             : getUrlParams,
      getModalSize             : getModalSize,
      start                    : start
    };

  })();

})();
