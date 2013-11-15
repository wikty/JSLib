var Sprite = function(options) {
	var imagePath = options.imagePath;
	var imageWidth = options.imageWidth;
	var spriteWidth = options.spriteWidth;
	var spriteHeight = options.spriteHeight;
	var drawTarget = options.drawTarget;
	drawTarget.style.position = 'relative'; //make sure sprite can position absolute
	var spriteOffsetX = options.spriteOffsetX;
	var spriteOffsetY = options.spriteOffsetY;
	var lastSpriteHeight = options.lastSpriteHeight;
	var elem = document.createElement('div');
	var elemStyle = elem.style;
	elemStyle.position = 'absolute';
	elemStyle.width = spriteWidth + 'px';
	elemStyle.height = spriteHeight + 'px';
	//dont default show index(0) sprite,define -imageWidth show nothing
	//and you can also adjust repeat mode
	elemStyle.background = 'url(' + options.imagePath + ') no-repeat ' + (-imageWidth) + 'px 0px';
	drawTarget.appendChild(elem);
	var animateStack = [];
	var fadeWork = {
		fadeInWork: function(params) {
			//default interval=40,fade in will use 2 seconds
			var interval = params.interval;
			var callbackFunc = params.callback.func;
			var callbackParams = params.callback.params;
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
					if (callbackFunc) {
						callbackFunc(callbackParams);
					}
				}
			}, interval);
		},
		fadeOutWork: function(params) {
			//default interval=40,fade in will use 2 second
			var interval = params.interval;
			var callbackFunc = params.callback.func;
			var callbackParams = params.callback.params;
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
					if (callbackFunc) {
						callbackFunc(callbackParams);
					}
				}
			}, interval);
		}
	};
	var that = {
		draw: function(x, y) {
			elemStyle.left = x + 'px';
			elemStyle.top = y + 'px';
		},
		quickSprite: function(index) {
			//only for sprite with same width and height in the pictrue
			if (!spriteOffsetY) {
				var vertOffset = -Math.floor((index * spriteWidth) / imageWidth) * spriteHeight;
				var horizOffset = -((index * spriteWidth) % imageWidth);
				elemStyle.backgroundPosition = horizOffset + 'px ' + vertOffset + 'px';
			} else {
				this.switchSprite(index);
			}
		},
		switchSprite: function(index) {
			var vertOffset;
			var horizOffset;
			if (!spriteOffsetX && spriteOffsetY) {
				horizOffset = -(index * spriteWidth) % imageWidth;
				vertOffset = -Math.floor((index * spriteWidth) / imageWidth) * spriteHeight - spriteOffsetY;
			}
			else if (spriteOffsetX && spriteOffsetY && lastSpriteHeight) {
				var specialHeight = spriteHeight;
				var row = 1;
				while (specialHeight < lastSpriteHeight) {
					row++;
					specialHeight += spriteHeight;
				}
				var col = parseInt((imageWidth - spriteOffsetX) / spriteWidth);
				if (index >= row * col) {
					index -= row * col;
					horizOffset = -((index * spriteWidth) % imageWidth);
					vertOffset = -Math.floor((index * spriteWidth) / imageWidth) * spriteHeight - (spriteOffsetY + specialHeight);
				}
				else {
					vertOffset = -Math.floor(index / col) * spriteHeight - spriteOffsetY;
					horizOffset = -(index % col) * spriteWidth - spriteOffsetX;
				}
			}
			elemStyle.backgroundPosition = horizOffset + 'px ' + vertOffset + 'px';
		},
		fadeInSequence: function(interval) {
			animateStack.push({ func: fadeWork.fadeInWork, params: { interval: interval, callback: { func: null, params: null}} });
		},
		fadeOutSequence: function(interval) {
			animateStack.push({ func: fadeWork.fadeOutWork, params: { interval: interval, callback: { func: null, params: null}} });
		},
		render: function() {
			var len = animateStack.length;
			for (var i = 0; i < len - 1; i++) {
				animateStack[i].params.callback.func = animateStack[i + 1].func;
				animateStack[i].params.callback.params = animateStack[i + 1].params;
			}
			animateStack[i].params.callback.func = function() {
				animateStack = [];
				//animateStack.splice(0, animateStack.length);
			};
			animateStack[i].params.callback.params = {};
			animateStack[0].func(animateStack[0].params);
		},
		setAttributes: function(params) {
			if (params.drawTarget) {
				this.restatus();
				drawTarget = params.drawTarget;
				drawTarget.style.position = 'relative';
				elem = document.createElement('div');
				elemStyle = elem.style;
				elemStyle.position = 'absolute';
				elemStyle.width = spriteWidth + 'px';
				elemStyle.height = spriteHeight + 'px';
				elemStyle.backgroundImage = 'url(' + imagePath + ')';
				drawTarget.appendChild(elem);
			}
			if (params.spriteWidth) {
				spriteWidth = params.spriteWidth;
				elemStyle.width = spriteWidth + 'px';
			}
			if (params.spriteHeight) {
				spriteHeight = params.spriteHeight;
				elemStyle.height = spriteHeight + 'px';
			}
			if (params.imagePath) {
				imagePath = params.imagePath;
				elemStyle.backgroundImage = 'url(' + imagePath + ')';
			}
			if (params.imageWidth) {
				imageWidth = params.imageWidth;
			}
			if (params.spriteOffsetX) {
				spriteOffsetX = params.spriteOffsetX;
			}
			if (params.spriteOffsetY) {
				spriteOffsetY = params.spriteOffsetY;
			}
			if (params.lastSpriteHeight) {
				lastSpriteHeight = params.lastSpriteHeight;
			}
		},
		getAttributes: function(name) {
			if (typeof name == 'string') {
				switch (name) {
					case 'imagePath':
						return imagePath;
					case 'imageWidth':
						return imageWidth;
					case 'spriteWidth':
						return spriteWidth;
					case 'spriteHeight':
						return spriteHeight;
					case 'spriteOffsetX':
						return spriteOffsetX;
					case 'spriteOffsetY':
						return spriteOffsetY;
					case 'lastSpriteHeight':
						return lastSpriteHeight;
					case 'drawTarget':
						return drawTarget;
					default:
				}
			}
			return options;
		},
		toArea: function(params) {
			spriteHeight = params.spriteHeight;
			spriteWidth = params.spriteWidth;
			spriteOffsetX = params.spriteOffsetX;
			spriteOffsetY = params.spriteOffsetY;
			lastSpriteHeight = params.lastSpriteHeight;
			elemStyle.width = spriteWidth + 'px';
			elemStyle.height = spriteHeight + 'px';
			elemStyle.backgroundPosition = -spriteOffsetX + 'px ' + (-spriteOffsetY) + 'px';
		},
		show: function() {
			elemStyle.display = 'block';
			elemStyle.visibility = 'visible';
		},
		hide: function() {
			elemStyle.display = 'none';
			//elemStyle.visibility='hidden';
		},
		remove: function() {
			drawTarget.removeChild(elem);
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
		toggle: function(params) {
			//params{interval,howLong,lowOpacity,hightOpacity,startIndex,endIndex}
			//if howLong=inFinity or netgative,toggle will forever execute
			//if howLong is undefined ,toggle will be executed 1 minutie
			if (typeof params == 'undefined') {
				params = {};
			}
			var interval = params.interval;
			var lowOpacity = params.lowOpacity;
			var highOpacity = params.highOpacity;
			var howLong = params.howLong;
			var startIndex = params.startIndex;
			var endIndex = params.endIndex;
			var canChangeSprite = (typeof startIndex == 'number' && typeof endIndex == 'number');
			if (canChangeSprite) {
				var spriteIndex = startIndex;
			}
			interval = (isNaN(parseInt(interval, 10))) ? 40 : parseInt(interval, 10);
			lowOpacity = (isNaN(parseFloat(lowOpacity, 10))) ? 0 : parseFloat(lowOpacity, 10);
			highOpacity = (isNaN(parseFloat(highOpacity, 10))) ? 1 : parseFloat(highOpacity, 10);
			howLong = (isNaN(parseInt(howLong, 10))) ? 60000 : parseInt(howLong, 10);
			var opacity;
			var status = false; // false will fadeOut and true will fadeIn
			if (typeof elemStyle.opacity == 'string') {
				if (elem.currentStyle) {
					opacity = elem.currentStyle.opacity;
				}
				else {
					opacity = window.getComputedStyle(elem).opacity;
				}
			}
			else if (typeof elemStyle.filter == 'string') {
				opacity = elemStyle.filter; //example:alpha(opacity=90)
				opacity = parseInt(opacity.substr(opacity.indexOf('opacity=') + 'opacity='.length, 3));
				opacity /= 100;
			}
			else {
				throw new Error('SimpleSprite::toggle 1');
			}
			if (isFinite(howLong) || howLong < 0) {
				setInterval(function() {
					if ((opacity - 0.0001) <= lowOpacity) {
						status = true;
					}
					if ((opacity + 0.0001) >= highOpacity) {
						status = false;
					}
					if (status) {
						opacity += 0.02;
					}
					if (!status) {
						opacity -= 0.02;
					}
					if (typeof elemStyle.opacity == 'string') {
						elemStyle.opacity = opacity;
					}
					else if (typeof elemStyle.filter == 'string') {
						elemStyle.filter = 'alpha(opacity=' + opacity * 100 + ')';
					}
					else {
						throw new Error('SimpleSprite::toggle 1');
					}

					if (canChangeSprite) {
						if (spriteIndex == endIndex) {
							spriteIndex = startIndex;
						}
						that.quickSprite(spriteIndex);
						spriteIndex++;
					}
				}, interval);
			}
			else {
				var endTime = (new Date().getTime()) + howLong;
				var htime = setInterval(function() {
					if ((new Date().getTime()) < endTime) {
						if ((opacity - 0.0001) <= lowOpacity) {
							status = true;
						}
						if ((opacity + 0.0001) >= highOpacity) {
							status = false;
						}
						if (status) {
							opacity += 0.02;
						}
						if (!status) {
							opacity -= 0.02;
						}
						if (typeof elemStyle.opacity == 'string') {
							elemStyle.opacity = opacity;
						}
						else if (typeof elemStyle.filter == 'string') {
							elemStyle.filter = 'alpha(opacity=' + opacity * 100 + ')';
						}
						else {
							throw new Error('SimpleSprite::toggle 1');
						}
					}
					else {
						clearInterval(htime);
					}

					if (canChangeSprite) {
						if (spriteIndex == endIndex) {
							spriteIndex = startIndex;
						}
						that.quickSprite(spriteIndex);
						spriteIndex++;
					}
				}, interval);
			}
		},
		restatus: function() {
			spriteOffsetX = null;
			spriteOffsetY = null;
			lastSpriteHeight = null;
		}
	};
	return that;
};