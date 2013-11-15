//options{imagePath,imageWidth,spriteWidth,spriteHeight,drawTarget}
var SimpleSprite = function(options) {
	var imageWidth = options.imageWidth;
	var imagePath = options.imagePath;
	var spriteWidth = options.spriteWidth;
	var spriteHeight = options.spriteHeight;
	var drawTarget = options.drawTarget;
	drawTarget.style.position = 'relative';
	var elem = document.createElement('div');
	var elemStyle = elem.style;
	elemStyle.position = 'absolute';
	elemStyle.width = spriteWidth + 'px';
	elemStyle.height = spriteHeight + 'px';
	//dont default show index(0) sprite,define -imageWidth show nothing
	//and you can also adjust repeat mode
	elemStyle.background = 'url(' + options.imagePath + ') no-repeat ' + (-imageWidth) + 'px 0px';
	drawTarget.appendChild(elem);
	var that = {
		draw: function(x, y) {
			elemStyle.left = x + 'px';
			elemStyle.top = y + 'px';
		},
		quickSprite: function(index) {
			var vertOffset = -Math.floor((index * spriteWidth) / imageWidth) * spriteHeight;
			var horizOffset = -((index * spriteWidth) % imageWidth);
			elemStyle.backgroundPosition = horizOffset + 'px ' + vertOffset + 'px';
		},
		fadeIn: function(interval) {
			//default interval=40,fade in will use 2 seconds
			if (elemStyle.display == 'none' || elemStyle.visibility == 'hidden') {
				var opacity = 0;
				if (typeof elemStyle.opacity == 'string') {
					elemStyle.opacity = 0;
				}
				else if (typeof elemStyle.filter == 'string') {
					elemStyle.filter = 'alpha(opacity=' + 0 + ')';
				}
				else {
					throw new Error('SimpleSprite::fadeIn 1'); //indicate usage is wrong
				}
				elemStyle.display = 'block';
				elemStyle.visibility = 'visible';
				//notice NaN can not use ==,should isNaN
				interval = (isNaN(parseInt(interval, 10))) ? 40 : parseInt(interval, 10);
				var htime = setInterval(function() {
					if (opacity <= 1) {
						opacity += 0.02;
						if (typeof elemStyle.opacity == 'string') {
							elemStyle.opacity = opacity;
						}
						else if (typeof elemStyle.filter == 'string') {
							elemStyle.filter = 'alpha(opacity=' + opacity * 100 + ')';
						}
						else {
							throw new Error('SimpleSprite::fadeIn 1'); //indicate usage is wrong
						}
					}
					else {
						clearInterval(htime);
					}
				}, interval);
			}
		},
		fadeOut: function(interval) {
			//default interval=40,fade in will use 2 second
			if (elemStyle.display != 'none' && elemStyle.visibility != 'hidden') {
				var opacity = 1;
				interval = (isNaN(parseInt(interval, 10))) ? 40 : parseInt(interval, 10);
				var htime = setInterval(function() {
					if (opacity >= 0) {
						opacity -= 0.02;
						if (typeof elemStyle.opacity == 'string') {
							elemStyle.opacity = opacity;
						}
						else if (typeof elemStyle.filter == 'string') {
							elemStyle.filter = 'alpha(opacity=' + opacity * 100 + ')';
						}
						else {
							throw new Error('SimpleSprite::fadeOut 1');
						}
					}
					else {
						clearInterval(htime);
						elemStyle.display = 'none';
					}
				}, interval);
			}
		},
		show: function() {
			elemStyle.display = 'block';
			elemStyle.visibility = 'visible';
		},
		hide: function() {
			//elemStyle.visibility = 'hidden';
			elemStyle.display = 'none';
		},
		detachSprite: function() {
			drawTarget.removeChild(elem);
		},
		attachSprite: function() {
			drawTarget.appendChild(elem);
		}
	};
	return that;
};