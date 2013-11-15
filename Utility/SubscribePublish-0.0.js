var PublishSubscribe={
	publish:function(){//first argument is channel name, the others arguments is transfered to subscribe callback

		//convert arguments to array
		var args=Array.prototype.slice.call(arguments,0);
		
		var channel=args.shift();//get the publish channel

		var callbacks,channelQueue;
		if(!(callbacks=this._callbacks))return this;
		if(!(channelQueue=this._callbacks[channel]))return this;

		var i,len;
		for(i=0,len=channelQueue.length;i<len;i++){
			channelQueue[i].apply(this,args);
		}
		return this;
	},
	subscribe:function(channel,callback){
		var callbacks=this._callbacks||(this._callbacks={});
		(this._callbacks[channel] || (this._callbacks[channel]=[])).push(callback);
		return this;
	}
};

// PublishSubscribe.subscribe('nameUpdate',function(name){
// 	alert(name);
// });

// PublishSubscribe.publish('nameUpdate','wikty');