$(document).ready(function(){
	var timeElement = document.getElementsByTagName('time')[0];
	var progElement = document.getElementsByTagName('progress')[0];
	var lebalElement = document.getElementById('leb');
	var intervalId;
	var isSession = true;
	$("#minusBreak").click(function() {
		decrease(this.nextElementSibling);
	});
	$("#plusBreak").click(function() {
		increase(this.previousElementSibling);
	});
	$("#minusSession").click(function() {
		if (intervalId) {
			return;
		}
		decrease(this.nextElementSibling);
		timeElement.innerHTML = this.nextElementSibling.innerHTML;
	});
	$("#plusSession").click(function() {
		if (intervalId) {
			return;
		}
		increase(this.previousElementSibling);
		timeElement.innerHTML = this.previousElementSibling.innerHTML;
	});

	$("#clock").click(function() {
		if (intervalId) {
			document.getElementById('audi').pause();
			clearInterval(intervalId);
			intervalId = !intervalId;
		} else {
			var bre = parseInt(document.getElementById('bre').innerHTML);
			var ses = parseInt(document.getElementById('ses').innerHTML);
			var arr = timeElement.innerHTML.split(":");
			var miliseconds;
			if (arr.length < 2) {
				miliseconds = new Date().getTime() + arr[0]*60000 + 1000;
			} else {
				miliseconds = new Date().getTime() + arr[0]*60000 + arr[1]*1000 + 1000;
			}
			countDown(miliseconds, bre, ses);
		}
	});
	
	function countDown(miliseconds, bre, ses) {
		var deltaValue;
		var progValue = progElement.value;
		if (isSession) {
			document.getElementById('audi').play();
			deltaValue = 100/(ses*60);
		} else {
			document.getElementById('audi').pause();
			deltaValue = 100/(bre*60);
		}
		intervalId = setInterval(function() {
			var distance = miliseconds - new Date().getTime();
			if (distance < 1000) {
				clearInterval(intervalId);
				progElement.value = 0;
				isSession = !isSession;
				if (isSession) {
					miliseconds = new Date().getTime() + ses*60000+1000;
					lebalElement.innerHTML = "Session";
				} else {
					miliseconds = new Date().getTime() + bre*60000+1000;
					lebalElement.innerHTML = "Break";
				}
				countDown(miliseconds, bre, ses);
			}
			progValue += deltaValue;
			progElement.value = progValue;
			var minutes = Math.floor(distance/60000);
			var seconds = Math.floor((distance%60000)/1000);
			timeElement.innerHTML = minutes + ":" + seconds;
		}, 1000);
	}
});

function decrease(element) {
	var x = element.innerHTML;
	if (parseInt(x)<2) {
		return;
	}
	element.innerHTML = parseInt(x) - 1;	
}

function increase(element) {
	var x = element.innerHTML;
	if (parseInt(x)>59) {
		return;
	}
	element.innerHTML = parseInt(x) + 1;
}