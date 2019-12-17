var converstionType = 0;
var canvas, canvas2;
var ctx, ctx2;

function main(){
	canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
	if(!ctx){
		console.log('Failed to get 2D drawing context');
		return;
	}

	canvas2 = document.getElementById('canvas2');
  ctx2 = canvas2.getContext('2d');

	if(!ctx2){
		console.log('Failed to get 2D drawing context for second canvas');
		return;
	}
    var img1 = new Image();
		img1.onload = function () {
		canvas.width  = ctx.width  = img1.width;
		canvas.height = ctx.height = img1.height;
		ctx.drawImage(img1, 0, 0);
		conversionType = 0;
		convertImage();
	};

	img1.src = 'nk534.jpg';
}

function convertImage(){

	var imgData = ctx.getImageData(0, 0, ctx.width, ctx.height);

	canvas2.width  = ctx2.width  = ctx.width;
	canvas2.height = ctx2.height = ctx.height;
	ctx2.font = "30px Arial";
	ctx2.fillStyle = "yellow";

	switch(conversionType){
	case 100: GreyAverage(imgData.data); break;
	case 101: Luma(imgData.data); break;
	case 102: Luminance(imgData.data); break;
	case 103: DeSaturation(imgData.data); break;
	case 104: GreyScaleMax(imgData.data); break;
	case 105: GreyScaleMin(imgData.data); break;
	case 106: RedAsGrey(imgData.data); break;
	case 107: GreenAsGrey(imgData.data); break;
	case 108: BlueAsGrey(imgData.data); break;
	case 109: OnlyRed(imgData.data); break;
	case 110: OnlyGreen(imgData.data); break;
	case 111: OnlyBlue(imgData.data); break;
	case 112: GreenAndBlue(imgData.data); break;
	case 113: RedAndBlue(imgData.data); break;
	case 114: RedAndGreen(imgData.data); break;
	case 115: GrayScaleNum(imgData.data, 4); break;
	case 116: GrayScaleNum(imgData.data, 16); break;
	case 117: GrayScaleNum(imgData.data, 32); break;
	case 118: GrayScaleNum(imgData.data, 50); break;
	case 119: LimitRGB(imgData.data, 4); break;
	case 120: LimitRGB(imgData.data, 8); break;
	case 121: LimitRGB(imgData.data, 16); break;
	case 122: LimitRGB(imgData.data, 50); break;

	}
	ctx2.putImageData(imgData, 0, 0);
}

function applyFilter(type) {
	conversionType = type;
	convertImage();
}

function GreyAverage(pixelData) {
	var avgValue;
	for(var i = 0; i < pixelData.length; i += 4) {
		avgValue = (pixelData[i] + pixelData[i+1] + pixelData[i+2]) / 3;
		pixelData[i] = avgValue;
		pixelData[i+1] = avgValue;
		pixelData[i+2] = avgValue;
	}
}

function Luma(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		temp = (pixelData[i]*0.2125 + pixelData[i+1]*0.7152 + pixelData[i+2]*0.0722);
		pixelData[i] = temp;
		pixelData[i+1] = temp;
		pixelData[i+2] = temp;
	}
}

function Luminance(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		temp = (pixelData[i]*0.299 + pixelData[i+1]*0.587 + pixelData[i+2]*0.114);
		pixelData[i] = temp;
		pixelData[i+1] = temp;
		pixelData[i+2] = temp;
	}
}

function DeSaturation(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		temp = (Math.max(pixelData[i], pixelData[i+1], pixelData[i+2])
					+ Math.min(pixelData[i], pixelData[i+1], pixelData[i+2])) / 2;
		pixelData[i] = temp;
		pixelData[i+1] = temp;
		pixelData[i+2] = temp;
	}
}

function GreyScaleMax(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		temp = (Math.max(pixelData[i], pixelData[i+1], pixelData[i+2]));
		pixelData[i] = temp;
		pixelData[i+1] = temp;
		pixelData[i+2] = temp;
	}
}

function GreyScaleMin(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		temp = (Math.min(pixelData[i], pixelData[i+1], pixelData[i+2]));
		pixelData[i] = temp;
		pixelData[i+1] = temp;
		pixelData[i+2] = temp;
	}
}

function RedAsGrey(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i+1] = pixelData[i];
		pixelData[i+2] = pixelData[i];
	}
}


function GreenAsGrey(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i] = pixelData[i+1];
		pixelData[i+2] = pixelData[i+1];
	}
}

function BlueAsGrey(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i] = pixelData[i+2];
		pixelData[i+1] = pixelData[i+2];
	}
}

function OnlyRed(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i+1] = 0;
		pixelData[i+2] = 0;
	}
}

function OnlyGreen(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i] = 0;
		pixelData[i+2] = 0;
	}
}

function OnlyBlue(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i] = 0;
		pixelData[i+1] = 0;
	}
}

function GreenAndBlue(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i] = 0;
	}
}

function RedAndBlue(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i+1] = 0;
	}
}

function RedAndGreen(pixelData) {
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i+2] = 0;
	}
}

//grey filters
function GrayScaleNum(pixelData, numShades) {
	var groupSize = 256 / (numShades - 1);
	var averageGrey;
	var grey;

	for(var i = 0; i < pixelData.length; i+=4) {
		averageGrey = (pixelData[i] + pixelData[i+1] + pixelData[i+2]) / 3;
		grey = Math.round((averageGrey / groupSize) + 0.5, 0) * groupSize;
		pixelData[i] = grey;
		pixelData[i+1] = grey;
		pixelData[i+2] = grey;
	}
}

//num of colours
function LimitRGB(pixelData, numShades) {
	var groupSize = 256 / (numShades - 1);
	for(var i = 0; i < pixelData.length; i+=4) {
		pixelData[i] = Math.round((pixelData[i] / groupSize) + 0.5, 0) * groupSize;
		pixelData[i+1] = Math.round((pixelData[i+1] / groupSize) + 0.5, 0) * groupSize;
		pixelData[i+2] = Math.round((pixelData[i+2] / groupSize) + 0.5, 0) * groupSize;
	}
}
