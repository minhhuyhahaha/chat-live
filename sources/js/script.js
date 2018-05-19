var request = document.getElementById("request");
var mediaRecorder;
var socket = io();
function showStream(stream, element_id) {
	var video = document.getElementById(element_id);
	video.srcObject = stream;
}



//Nhận dữ liệu
var video1 = document.getElementById("play1");
var video2 = document.getElementById("play2");
video2.style = "display: none";
var i = false;
socket.on('stream', function (chunks) {
	var blob = new Blob([chunks], { 'type' : 'video/webm' });
	if(i){
		video1.src = URL.createObjectURL(blob);
	} else {
		video2.src = URL.createObjectURL(blob);
	}
	i = !i;
});
video2.onpause = function(){
	video2.style = "display: none";
	video1.style = "";
}
video1.onpause = function() {
	video1.style = "display: none";
	video2.style = "";
}





function handleSuccess(stream) {
	showStream(stream,"my_stream")
	quay(stream);
}

request.onclick = function() {
	navigator.mediaDevices.getUserMedia({video: true, audio: true}).
	then(handleSuccess).catch();
}

function quay(stream){
	mediaRecorder = new MediaRecorder(stream, { audioBitsPerSecond : 6000,
		videoBitsPerSecond : 100000});
	mediaRecorder.start();
	setInterval(sendata,2000);

	mediaRecorder.ondataavailable = function(e) {
		socket.emit('stream',e.data);
	}
}


function sendata() {
	mediaRecorder.stop();
	mediaRecorder.start();
}
