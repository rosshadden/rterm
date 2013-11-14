window.rterm = (function() {
	"use strict";

	var keys = KeyboardJS;

	var rterm = {
		init: function(element) {
			var CACHE = {
				$term: $(element).addClass("rterm")
				, $stdout: $("<ul class='stdout'></ul>").appendTo(element)
				, $stdin: $("<div class='stdin' data-path='~' data-caret='⮀'>").appendTo(element)
			}

			var isFocused = true;

			CACHE.$term
				.off()
				.on("click", function(event) {
					isFocused = true;
				})

			$("body")
				.off(".rterm")
				.on("keypress", function(event) {
					if (isFocused) {
						var char = String.fromCharCode(event.which)
						var input = CACHE.$stdin.html()

						if (!/^[\n\r]$/.test(char)) {
							if (char === " ") char = "&nbsp;"
							CACHE.$stdin.html(input + char)
						}
					}
				})

			keys.on("enter", function() {
				var input = CACHE.$stdin.html();
				if (/^\s*$/.test(input)) input = "&nbsp;"
				CACHE.$stdin.html("")
				CACHE.$stdout.append("<li>" + input + "</li>")
				CACHE.$stdout[0].scrollTop = CACHE.$stdout[0].scrollHeight
			})
			keys.on("backspace", function() {
				var input = CACHE.$stdin.html();
				CACHE.$stdin.html(input.slice(0, -1))
			})
		}
	};

	return rterm;
})();
