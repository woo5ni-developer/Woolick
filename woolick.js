(function($){

  $.fn.woolick = function(opts){

    return this.each(function(){

      var options = $.extend({}, $.fn.woolick.defaults, opts || {});

      var $el = $(this);
      var pos = options.pos;
      var infinite = options.infinite;
      var index = options.index;

      var item = $el.find('.slide');
      var count = $el.children().length;
      var slideWidth = parseInt(item.outerWidth(true));
      var totalWidth = slideWidth*count;
      var prev = $el.siblings('#prev');
      var next = $el.siblings('#next');

      function initialize() {
        $el.width(totalWidth);
      }
      initialize()

      prev.on('click',function(e) {
        shiftSlide(1)
        e.preventDefault();
      });

      next.on('click',function(e) {
        shiftSlide(-1)
        e.preventDefault();
      });

      

      function shiftSlide(direction) {
        if ($el.hasClass('transition')) return;

        if(infinite === true){
          setTimeout(function(){
            if (direction === 1) {
              $('.slide:first').before($('.slide:last'));
            } else if (direction === -1) {
              $('.slide:last').after($('.slide:first'));
            }
            $el.removeClass('transition');
            $el.css('transform','translateX(0px)'); 
          },700)
        }

        if(pos === 'horizontal'){
          // $(document).off('mouseup')
          $el.addClass('transition').stop().animate().css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
        }
      }
    });

  };

    $.fn.woolick.defaults = {
      index:0,
      pos:'horizontal',
      infinite:true,
    }

})(jQuery);