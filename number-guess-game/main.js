let inputNumber = document.getElementById("input_id");
let buttonGo = document.getElementById("go_id");
let buttonReset = document.getElementById("reset_id");
let resultShow = document.getElementById("result_id");
let chanceShow = document.getElementById("chance_id");
let hintShow = document.getElementById("hint_id");
let mainPicture = document.querySelector(".main_image");
let gameOver = false;
let chance = 5;
let ans;
let max = 100;
let min = 1;
let history = [];

randomNum();

buttonGo.addEventListener("click", play);
buttonReset.addEventListener("click", reset);
inputNumber.addEventListener("focus", function () {
	inputNumber.value = "";
});

function randomNum() {
	ans = Math.ceil(Math.random() * 100);
	console.log("정답:", ans);
}

function reset() {
	randomNum();
	chance = 5;
	chanceShow.textContent = `남은기회:${chance}회`;
	resultShow.textContent = "이곳에 결과가 출력됩니다.";
	gameOver = false;
	inputNumber.value = "";
	buttonGo.disabled = false;
	history = [];
	hintShow.textContent = `1~100 사이에 정답이 있습니다`;
	max = 100;
	min = 1;
	mainPicture.src =
		"https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F22631C4D563BAE22116C65";
}

function play() {
	if (history.includes(inputNumber.value)) {
		resultShow.textContent = "이미 입력한 숫자입니다.";
		mainPicture.src =
			"http://file3.instiz.net/data/file3/2018/08/14/9/f/7/9f7919bc1d5f201a47e1959e19a91578.gif";
		return;
	}
	if (inputNumber.value > 100 || inputNumber.value < 1) {
		hintShow.textContent = "1~100사이의 값을 입력하세요.";

		mainPicture.src =
			"http://file3.instiz.net/data/file3/2018/08/14/9/f/7/9f7919bc1d5f201a47e1959e19a91578.gif";
		return;
	}
	if (inputNumber.value > max || inputNumber.value < min) {
		resultShow.textContent = "멍청한 선택입니다.";

		mainPicture.src =
			"http://file3.instiz.net/data/file3/2018/08/14/9/f/7/9f7919bc1d5f201a47e1959e19a91578.gif";
		return;
	}
	chance--;
	if (ans > inputNumber.value) {
		resultShow.textContent = "Up";
		if (min < inputNumber.value) {
			min = Number(inputNumber.value) + 1;
			hintShow.textContent = `${min}~${max} 사이에 정답이 있습니다`;

			mainPicture.src =
				"https://cliply.co/wp-content/uploads/2021/07/392107350_SWIPE_UP_400px.gif";
		}
	} else if (ans < inputNumber.value) {
		resultShow.textContent = "Down";
		if (max > inputNumber.value) {
			max = Number(inputNumber.value) - 1;
			hintShow.textContent = `${min}~${max} 사이에 정답이 있습니다`;
			mainPicture.src =
				"https://www.jimphicdesigns.com/downloads/imgs-mockup/green-arrow-outline-pointing-down-animation.gif";
		}
	} else {
		resultShow.textContent = "Congratulation";
		chanceShow.textContent = `${chance}회 남기고 성공하셨습니다!`;
		gameOver = true;
		hintShow.textContent = `정답은 ${inputNumber.value}입니다. `;
		mainPicture.src =
			"https://i.pinimg.com/originals/fd/1b/0b/fd1b0b9d7f6f9539a89d66c708d91cfe.gif";
	}
	if (gameOver) {
		buttonGo.disabled = true;
		return;
	}
	chanceShow.textContent = `남은기회:${chance}회`;
	if (chance < 1) {
		buttonGo.disabled = true;
		mainPicture.src =
			"https://media4.giphy.com/media/dkuZHIQsslFfy/giphy.gif?cid=ecf05e47fiyzttmhluwr4pmodpscxl9etfxl4p7wsdeug368&rid=giphy.gif&ct=g";
	}

	history.push(inputNumber.value);
}
