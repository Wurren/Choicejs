/*
* Choicejs - A jQuery plugin for prettifying your HTML select input
* @author: Warren Haskins - @warrenhaskins
* @url: https://github.com/Wurren/Choicejs
* @documentation: https://github.com/Wurren/Choicejs
* @published: 12/04/2012
* @license Creative Commons Attribution Non-Commercial Share Alike 3.0 Licence
*  http://creativecommons.org/licenses/by-nc-sa/3.0/
*/

;(function ( $, window, document, undefined ) {
    
	var 	pluginName = 'choice';

	function Plugin( element ) {
		this.el = $(element);
		this.init();
	}

	Plugin.prototype = {

		init : function() {

			this.el.hide();
			this.children = this.el.children(),
			this.container = this.el.wrap('<div class="ChoiceJS" />').parent(),
			this.hiddenInput = $('<input />').prop({ 'name' : this.el.prop('name'), 'type' : 'hidden' }).appendTo(this.container),
			this.list = $('<ul class="ChoiceList" />').appendTo(this.container).hide(),
			this.current = $('<div />').prop('class', 'ChoiceCurrent').prependTo(this.container);

			this.children.each($.proxy(this.item, this));

			var that = this;

			this.list.width(this.container.width());

			$(document).on('mouseup', function (e){
				if (that.container.has(e.target).length === 0) that.list.hide();
			});

			this.current.on('click', function(){
				that.list.toggle();
			});

			this.current.one('click', function() {
				var	i = that.list.children(),
					h = $(i[0]).innerHeight() * 3;
				if(i.length > 3) that.list.height(h);
			});

			this.list.on('click', 'li', $.proxy(this.change, this));

		},

		item : function(index, val) {
			var item = $('<li />').text(val.innerText);
			if($(val).prop('selected')) this.selected(val);
			var data = {
				'index' : index,
				'value' : val.value || val.innerText,
				'text'  : val.innerText
			}
			item.data('ChoiceJS', data).appendTo(this.list);
		},

		selected : function(val) {
			this.current.text(val.innerText);
			this.hiddenInput.val( val.value || val.innerText )
		},

		change : function(val) {
			var val = $(val.target).data('ChoiceJS');
			this.current.text(val.text);
			this.hiddenInput.val(val.value);
			this.list.toggle();
		}

	};



	$.fn[pluginName] = function () {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) $.data(this, 'plugin_' + pluginName, new Plugin( this ));
		});
	};

}(jQuery, window, document));