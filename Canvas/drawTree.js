//you should assgin to angle=-Math.PI/2;
//return the canvas with a tree image
//Usage example:
// var canvas=drawTree(640,480,12,60,12);
function drawTree(canvasWidth,canvasHeight,branchWidth,branchHeight,treeDepth){

	function inner(ctx, startX, startY, length, width, angle, depth) {
		var maxAngle = Math.PI / 2;
		var maxBranch = 3;
		var endX = startX + Math.cos(angle) * length;
		var endY = startY + Math.sin(angle) * length;
		ctx.lineCap = 'round';
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.closePath();
		if (depth <= 2) {
			ctx.strokeStyle = 'rgb(0,' + ((Math.random() * 64 + 128) >> 0) + ',0)';
		}
		else {
			ctx.strokeStyle = 'rgb(' + ((Math.random() * 64 + 64) >> 0) + ',50,25)';
		}
		ctx.stroke();
		width *= 0.7;
		depth -= 1;
		if (depth == 0)return;
		var subBranches = (Math.random() * (maxBranch - 1)) + 1;
		for (var i = 0; i < subBranches; i++) {
			var newAngle = angle + maxAngle * Math.random() - maxAngle / 2;
			var newLength = length * (0.3 * Math.random() + 0.7);
			inner(ctx, endX, endY, newLength, width, newAngle, depth);
		}
	}
	var bottomPadding=10;//px
	var canvas=document.createElement('canvas');
	if(typeof canvasWidth !='number')throw new Error('drawTree arg:canvasWidth must be a number');
	if(typeof canvasHeight !='number')throw new Error('drawTree arg:canvasHeight must be a number');
	if(typeof treeDepth !='number')throw new Error('drawTree arg:treeDepth must be a number');
	canvasWidth=parseInt(canvasWidth);
	canvasHeight=parseInt(canvasHeight);
	canvas.width=canvasWidth;
	canvas.height=canvasHeight;
	treeDepth=parseInt(treeDepth);

	var context=canvas.getContext('2d');
	inner(context,Math.floor(canvasWidth/2),canvasHeight-bottomPadding,branchHeight,branchWidth,-Math.PI/2,treeDepth);
	return canvas;
}