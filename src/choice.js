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
	
		// var	thiz = $(this.element),
		// 	selection = thiz.children(),
		// 	cont = thiz.wrap('<div class="Choice" />').parent(),
		// 	input = $('<input />').attr({"name" : thiz.attr("name"), "type" : "hidden"}).appendTo(cont),
		// 	list = $(cont).append('<ul class="ListChoice" />').find('ul').hide(),
		// 	current = cont.prepend('<span class="ChoiceCurrent" />').find('span'),
		// 	firstValue = selection.eq(0).val() || selection.eq(0).text(),
		// 	firstText = selection.eq(0).text();

		// thiz.remove();

		// current.text(firstText);
		// $(input).val(firstValue);

		// selection.each(function(index){
		// 	if(!$(this).attr("selected")) {
		// 		$(list).append('<li data-item="' + index + ' ">' + $(this).text() + '</li>');
		// 	} else {
		// 		$(list).append('<li data-item="' + index + ' ">' + $(this).text() + '</li>');
		// 		current.text($(this).text());
		// 		$(input).val($(this).val() || $(this).text());
		// 	}
		// });

		// current.click(function(){
		// 	list.toggle();
		// });

		// list.find('li').click(function(){
		// 	var 	id = $(this).data("item"),
		// 		value = selection.eq(id).val() || selection.eq(id).text(),
		// 		text = selection.eq(id).text();
		// 	$(input).val(value);
		// 	current.text(text);
		// 	list.hide();
		// });

		// $(document).on('mouseup', function (e){
		//     if (cont.has(e.target).length === 0) cont.find(list).hide();
		// });

		init : function() {
				this.el.hide();
				this.children = this.el.children(),
				this.container = this.el.wrap('<div class="ChoiceJS" />').parent(),
				this.hiddenInput = $('<input />').prop({ 'name' : this.el.prop('name'), 'type' : 'hidden' }).appendTo(this.container),
				this.list = $('<ul class="ChoiceList" />').appendTo(this.container),
				this.current = $('<div />').prop('class', 'ChoiceCurrent').prependTo(this.container);

				this.children.each($.proxy(this.item, this));
		},

		item : function(index, val) {
			var item = $('<li />').text(val.value);
			if($(val).prop('selected')) this.set(val);
			item.prop('data-index', index).appendTo(this.list);
		},

		set : function(val) {
			this.current.text(val.value);
			this.hiddenInput.val( val.value || val.innerText )
		}

	};



	$.fn[pluginName] = function () {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) $.data(this, 'plugin_' + pluginName, new Plugin( this ));
		});
	};

}(jQuery, window, document));