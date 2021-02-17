const form = document.getElementById("form");　// フォーム情報をとる
const input = document.getElementById("input");// 実際に入力された値を取得
const ul = document.getElementById("ul") //ulタグで出力する
const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
  todos.forEach(todo => {
    add(todo);
  })
}
form.addEventListener("submit", function(event) { //formでサブミットされた際に
 event.preventDefault();　//デフォルトで更新しない
 console.log(input.value) //input.valueで実際に入力されたデータを取得
 add(); //最後に出力するための関数を記入
}); 

function add(todo){
let todoText = input.value;
if(todo){
  todoText = todo.text;
}
if (todoText){ //暗黙的型変換
  const li = document.createElement("li");
  li.innerText = todoText; 
  li.classList.add("list-group-item");

  if (todo && todo.completed){
    li.classList.add("text-decoration-line-through");
  }
  li.addEventListener("contextmenu", function(event){
    event.preventDefault();
    li.remove();
    saveData();
  }); //右クリックけんち
  li.addEventListener("click", function(){
  li.classList.toggle("text-decoration-line-through"); //toggleは切り替え
  saveData();
  });
  ul.appendChild(li);
  input.value = "";
  saveData();
};
}
function saveData(){
const lists = document.querySelectorAll("li"); //全てのタグを取得
let todos = [];
lists.forEach(list => {
  let todo = {
    text: list.innerText,
    completed: list.classList.contains("text-decoration-line-through")
  };
  todos.push(todo)
});
localStorage.setItem("todos", JSON.stringify(todos)) //jsonに変換
}