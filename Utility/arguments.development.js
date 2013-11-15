//arg:objArray(must be a array,and include all of your arguments) is like this
// [{
// 	arg:elem,
// 	dataType:'object',
// 	required:true,
// },
// {
// 	arg:type,
// 	dataType:'string',
// 	required:false
// },{
// 	arg:callback,
// 	dataType:'function',
// 	required:false
// },
//{
//	arg:count,
//	dataType:'number'
//}
// ]
//Notice: attribute arg and dataTyep must be filled,the required default is false;
//typeof object:object,array,null,NaN
//typeof NaN Infinity is number
//dataType:string,number,object,function,undefined,boolean
function processArgs(objArray){
	var len=objArray.length;
	var temp=[];
	for(var i=0;i<len;i++){
		var item=objArray[i];
		
	}
}