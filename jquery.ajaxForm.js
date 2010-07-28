(function($) {
  $.fn.extend({
    ajaxForm: function(options) {
      options = options || {};

      this.each(function() {
        var $this = $(this).submit(function(e) {
          e.preventDefault();

          var data = $this.serializeArray();

          if (options.loading) {
            // exit if false is returned.
            if (options.loading.call($this, data) === false) {
              return;
            }
          }

          $.ajax({
            data: data,
            dataType: "json",
            type: "POST",
            url: $this.attr("action"),
            success: function(data, textStatus) {
              if (options.success) {
                options.success.call($this, data);
              }
            },
            error: function(xhr, textStatus, error) {
              if (options.error) {
                options.error.call($this, textStatus);
              }
            }
          });

          // When submitting a form programmatically, preventDefault()
          // doesn't work.
          return false;
        });
      });

      return this;
    }
  });

  $.ajaxSetup({
    "beforeSend": function(xhr) {
      xhr.setRequestHeader("Accept", "text/javascript");
    }
  });
})(jQuery);
