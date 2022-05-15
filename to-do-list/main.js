let allList = [];
let filterList = [];
let taskInput = document.getElementById("task-input");
let inputButton = document.getElementById("input-button");
console.log(taskInput);
console.log(inputButton);
let modeTab = document.querySelectorAll(".task-bar div");
let mode = "all";
let underBar = document.getElementById("under-bar");
// underBar 초기 설정
underBar.style.left = modeTab[1].offsetLeft + "px";
underBar.style.width = modeTab[1].offsetWidth + "px";

//모드 바꾸기 + 언더바 변경
for (let i = 1; i < modeTab.length; i++) {
	modeTab[i].addEventListener("click", (e) => modeChange(e));
}
function modeChange(event) {
	mode = event.currentTarget.id;
	underBar.style.left = event.currentTarget.offsetLeft + "px";
	underBar.style.width = event.currentTarget.offsetWidth + "px";

	render();
}

// 할일 추가하면 리스트에 업데이트
taskInput.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		addTask();
	}
});
inputButton.addEventListener("click", addTask);
function addTask() {
	let task = {
		id: Math.random().toString(36).slice(2),
		text: taskInput.value,
		isDone: false,
	};
	allList.push(task);
	taskInput.value = "";
	render();
}

// UI에 할일 표시해주는 함수 Render(모드에 따라 List 전달이 다름)
function render() {
	resultHTML = "";
	renderList = allList;
	filterList = [];
	if (mode == "not-done") {
		allList.forEach((item) => {
			if (item.isDone == false) {
				filterList.push(item);
			}
		});
		renderList = filterList;
	} else if (mode == "done") {
		allList.forEach((item) => {
			if (item.isDone == true) {
				filterList.push(item);
			}
		});
		renderList = filterList;
	}
	renderList.forEach((item) => {
		if (item.isDone == false) {
			resultHTML += `<div class="task">
			<div class="task-text">${item.text}</div>
			<div class="task-button">
				<button onclick ="checkTask('${item.id}')" ><i class="fa-solid fa-check"></i></button>
				<button onclick ="deleteTask('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>`;
		} else {
			resultHTML += `<div class="task task-done">
		<div class="task-text">${item.text}</div>
		<div class="task-button">
			<button onclick ="checkTask('${item.id}')" ><i class="fa-solid fa-arrow-rotate-left"></i></button>
			<button onclick ="deleteTask('${item.id}')"><i class="fa-solid fa-trash-can"></i></button>
		</div>
	</div>`;
		}
	});
	document.getElementById("task-board").innerHTML = resultHTML;
}

// Check Delete 버튼 기능

function checkTask(id) {
	for (let i = 0; i < allList.length; i++) {
		if (allList[i].id == id) {
			allList[i].isDone = !allList[i].isDone;
		}
	}
	render();
}

function deleteTask(id) {
	for (let i = 0; i < allList.length; i++) {
		if (allList[i].id == id) {
			allList.splice(i, 1);
		}
	}
	render();
}
