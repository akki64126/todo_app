var addtask;
var close_modal;
var save_task;
var id = 0;
var task_div;
var del_button;
var count_name = 0;
var count_desc = 0;
var current = localStorage.getItem("start") || true

fetch("../data.json")
    .then(response => {
   return response.json();
    })
    .then(jsondata => 
        {
            if(current==true){
                for (var i = 0;i<jsondata.length;i++)
                    localStorage.setItem(i,JSON.stringify(jsondata[i]))
                    current = false;
                    localStorage.setItem("start",current);}
            var arr = [];
            task_div = document.getElementById("task_list");
            
            addtask = () => {
                let modal = document.getElementById("input_popup");
                modal.style.display = "block";
            }
            close_modal = () => {
                let modal = document.getElementById("input_popup");
                modal.style.display = "none";
            }
            save_task = () => {
                var task_name = document.getElementById("task_name").value;
                var task_description = document.getElementById("task_desc").value;
                for(var i = 0;i<task_name.length;i++){
                    if(task_name[i]!=' ')
                    count_name ++;
                }
                for(var i = 0;i<task_description.length;i++){
                    if(task_description[i]!=' ')
                        count_desc ++;
                }
                if (task_name === '' || task_description === ''||count_name===0 || count_desc===0) {
                    alert("The fields cant be empty");
                } else {
                    var len = localStorage.length
                    id = localStorage.getItem("lastData") || len
                    arr.push({ id: id, task: {title: task_name, desc: task_description}, check: false });
                    var stringdata = JSON.stringify(arr[arr.length - 1]);
                    localStorage.setItem(id, stringdata);
                    localStorage.setItem("lastData", Number(id) +1)
                    document.getElementById("task_name").value = "";
                    document.getElementById("task_desc").value = "";
                    close_modal();
                }
                location.reload();
                }
                Object.keys(localStorage).sort().forEach((id)=>{
                    if(id!="lastData"&&id!="start"){
                        var retrieveddata = localStorage.getItem(id);
                        var parseddata = JSON.parse(retrieveddata);
                        var checked = parseddata.check
                        if(checked)
                            task_div.innerHTML += '<button value="'+parseddata.id+'" id = "del_id" onclick="del_task(event)" class="del_btn">DEL</button><input value = "' + parseddata.id + '" type="checkbox" checked = "" onclick = "check_btn(event)" id = "checkbox" class="done_btn" ><div class="tasks"><a style="text-decoration:none"  href="../taskpage/taskpage.html?id=' + parseddata.id + '">' + parseddata.task.title + '</a></div>'
                        else{
                            task_div.innerHTML += '<button value="'+parseddata.id+'" id = "del_id" onclick="del_task(event)" class="del_btn">DEL</button><input value = "' + parseddata.id + '" type="checkbox" unchecked = "" onclick = "check_btn(event)" id = "checkbox" class="done_btn" ><div class="tasks"><a style="text-decoration:none"  href="../taskpage/taskpage.html?id=' + parseddata.id + '">' + parseddata.task.title + '</a></div>'
                        }
                    }
                }) 
                del_task = (event) =>{
                    const val = event.target.value
                    localStorage.removeItem(val)
                    location.reload()
                    if(Object.keys(localStorage).length==1)
                        localStorage.setItem("lastData",0)
                }
                check_btn = (event)=>{
                    var check_val = event.target.value
                    localStorage.setItem(check_val,JSON.stringify({...JSON.parse(localStorage.getItem(check_val)),check:event.target.checked}))
                }   
        });