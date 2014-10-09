(function() {
  var datetime;

  datetime = {
    "datetime": {
      activateForm: function() {
        var input_elt, options, output, overrideOptions, that, _defaults;
        that = this;
        _defaults = {
          dateFormat: "yy-mm-dd",
          timeFormat: "HH:mm:ss",
          parse: 'loose',
          onClose: function() {
            return that.update();
          }
        };
        overrideOptions = $(this.element[0]).data('datetimepicker-options');
        options = $.extend({}, _defaults, overrideOptions);
        output = jQuery(document.createElement('form')).addClass('form_in_place').attr('action', 'javascript:void(0);').attr('style', 'display:inline');
        input_elt = jQuery(document.createElement('input')).attr('type', 'text').attr('name', this.attributeName).attr('value', this.sanitizeValue(this.display_value));
        if (this.inner_class !== null) {
          input_elt.addClass(this.inner_class);
        }
        output.append(input_elt);
        this.element.html(output);
        this.setHtmlAttributes();
        this.element.find('input')[0].select();
        this.element.find("form").bind('submit', {
          editor: this
        }, BestInPlaceEditor.forms.input.submitHandler);
        this.element.find("input").bind('keyup', {
          editor: this
        }, BestInPlaceEditor.forms.input.keyupHandler);
        return this.element.find('input').datetimepicker(options).datepicker('show');
      },
      getValue: function() {
        return this.sanitizeValue(this.element.find("input").val());
      },
      submitHandler: function(event) {
        return event.data.editor.update();
      },
      keyupHandler: function(event) {
        if (event.keyCode === 27) {
          return event.data.editor.abort();
        }
      }
    }
  };

  $.extend(BestInPlaceEditor.forms, datetime);

}).call(this);
