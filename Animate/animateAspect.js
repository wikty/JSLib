function animateAspect(elem) {
	function getStyle(elem, which) {
		if (elem.currentStyle) {
			return elem.currentStyle[which];
		}
		else {
			return window.getComputedStyle(elem)[which];
		}
	}
	var intervalTime = 20;
	var moveStep = 5;//px, can be adjusted
	var cloneElem = elem.cloneNode(true);
	var origX = parseInt(getStyle(elem, 'left'), 10);
	var origY = parseInt(getStyle(elem, 'top'), 10);
	var origWidth = parseInt(getStyle(elem, 'width'), 10);
	var origHeight = parseInt(getStyle(elem, 'height'), 10);
	elem.style.display = 'none';
	var tileWidth = parseInt(origWidth / 2);
	var tileHeight = parseInt(origHeight / 2);
	var tileNum = 4;
	var howLongH = tileWidth * 5;//can be adjusted
	var howLongV = tileHeight * 5;// can be adjusted
	var tile = null;
	var tiles = [];
	var clone = null;
	var clones = [];
	var bodyElem=document.getElementsByTagName('body')[0];
	for (var i = 0; i < tileNum; i++) {
		tile = document.createElement('div');
		var tileStyle = tile.style;
		tileStyle.position='absolute';
		tileStyle.width = tileWidth + 'px';
		tileStyle.height = tileHeight + 'px';
		tileStyle.overflow = 'hidden'; //key code
		clone = cloneElem.cloneNode(true);
		var cloneStyle=clone.style;
		cloneStyle.position='absolute';
		switch (i) {
			case 0:
				tileStyle.left = origX - howLongH + 'px';
				tileStyle.top = origY+'px';
				cloneStyle.left='0px';
				cloneStyle.top='0px';
				break;
			case 1:
				tileStyle.left = origX+tileWidth + 'px';
				tileStyle.top = origY - howLongV + 'px';
				cloneStyle.left='-'+tileWidth+'px';
				cloneStyle.top='0px';
				break;
			case 2:
				tileStyle.left = origX + tileWidth +howLongH+ 'px';
				tileStyle.top = origY + tileHeight + 'px';
				cloneStyle.left='-'+tileWidth+'px';
				cloneStyle.top='-'+tileHeight+'px';
				break;
			case 3:
				tileStyle.left = origX + 'px';
				tileStyle.top = origY +tileHeight+ howLongV + 'px';
				cloneStyle.left='0px';
				cloneStyle.top='-'+tileHeight+'px';
				break;
		}
		tile.appendChild(clone);
		tiles[i] = tile;
		clones[i] = clone;
		bodyElem.appendChild(tile);
	}
	var currentTile = {
		tile: tiles[0],
		index: 0
	};
	var htime = setInterval(function() {
		var x;
		var y;
		if (currentTile.tile) {
			tile = currentTile.tile;
			tileStyle = tile.style;
			switch (currentTile.index) {
				case 0:
					x = parseInt(tileStyle.left) + moveStep;
					if (x < origX) {
						tileStyle.left = x + 'px';
					}
					else {
						currentTile.tile = tiles[1];
						currentTile.index = 1;
					}
					break;
				case 1:
					y = parseInt(tileStyle.top) + moveStep;
					if (y < origY) {
						tileStyle.top = y + 'px';
					}
					else {
						currentTile.tile = tiles[2];
						currentTile.index = 2;
					}
					break;
				case 2:
					x = parseInt(tileStyle.left) - moveStep;
					if (x > origX + tileWidth) {
						tileStyle.left = x + 'px';
					}
					else {
						currentTile.tile = tiles[3];
						currentTile.index = 3;
					}
					break;
				case 3:
					y = parseInt(tileStyle.top) - moveStep;
					if (y > origX + tileHeight) {
						tileStyle.top = y + 'px';
					}
					else {
						currentTile.tile = null;
						currentTile.index = -1;
					}
					break;
			}
		}
		else {
			delete cloneElem;
			clones = null;
			for(var i=0;i<tiles.length;i++){
				bodyElem.removeChild(tiles[i]);
			}
			elem.style.display = 'block';
			clearInterval(htime);
		}
	}, intervalTime);
}