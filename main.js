// 유저가 값을 입력한다
// + 버튼을 클릭하면 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// delete 버튼을 클릭하면 할일이 리스트에서 삭제된다.
// check 버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이 간다.
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝나는 걸로 간주하고 밑줄 보여주기
// 3. false이면 안 끝난걸로 간주하고 그대로
// 진행중, 완료 탭을 누르면 언더바가 이동한다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let underLine = document.getElementById("under-line");
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = "all"; // 초기값 all, render() 함수의 if mode == "all"

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress",(event)=>{
    if(event.keyCode === 13){
        addTask();
    }
})

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let list = []; 
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
          <div class="task-done">${list[i].taskContent}</div>
          <div>
              <button class="redoBtn" onclick="toogleComplete('${list[i].id}')"></button>
              <button class="deleteBtn" onclick="deleteTask('${list[i].id}')"></button>
          </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button class="chkBtn" onclick="toogleComplete('${list[i].id}')"></button>
            <button class="deleteBtn" onclick="deleteTask('${list[i].id}')"></button>
        </div>
    </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toogleComplete(id) {
  // 값 없데이트
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // 스위치처럼 왔다갔다
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter()
  //render(); // ui 없데이트도 해주기
  //  console.log(taskList)
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter()
}

function filter(event) {
    if(event){
        mode = event.target.id;
        underLine.style.left = event.currentTarget.offsetLeft + "px"; // 왼쪽 시작점
        underLine.style.width = event.currentTarget.offsetWitdh + "px";
        underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight - 5 + "px";
        console.log("클릭됨", event.target.id);
    }
    
  filterList = [];

if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
}
render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 16);
}
