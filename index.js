const heads = ["username", "phone", "age","active"]

const addTask = document.querySelector("#userForm")
const updateUserForm=document.querySelector('#update_user')
const userTable=document.querySelector('.userTable')

const readDataFromStorage = (itemKey="user",resType="json") =>{
    let data = localStorage.getItem(itemKey)
    if(resType=="json") {
        try{
            data = JSON.parse(data)||[]
        }
        catch(e){
            data = []
        }
    }
    return data
}
const writeDataToStorage = (data,itemKey="user")=> localStorage.setItem(itemKey, JSON.stringify(data))
if(addTask)
    addTask.addEventListener("submit", (e)=>{
        e.preventDefault()
        const user = {}
        heads.forEach(h=> user[h]= addTask.elements[h].value)
        const data = readDataFromStorage()
        data.push(user)
        writeDataToStorage(data)
})
if(updateUserForm){
    updateUserForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        const user = {}
        heads.forEach(h=> user[h]= updateUserForm.elements[h].value)
        const data = readDataFromStorage()
        // some code to update
        writeDataToStorage(data)
    })
}

const prepareTable=(d,index)=>{
    const tr=document.createElement("tr")
    userTable.appendChild(tr)
    const id = document.createElement('td')
    const username = document.createElement("td")
    const age = document.createElement("td")
    const phone = document.createElement("td")
    const active=document.createElement("td")

    const p1 = document.createElement("p")
    const p2 = document.createElement("p")
    const p3 = document.createElement("p")
    const p4 = document.createElement("p")
    tr.append(id,username,phone,age,active)
    const btn= document.createElement("button")
    const btndelete= document.createElement("button")
    btn.addEventListener('click',function redirect(){
        location.href='update.html'
    })
    btndelete.addEventListener('click',function del(){
        deleteUser(this)
    })
 
    p1.innerText=index
    p2.innerText = d.username
    p3.innerText = d.phone
    p4.innerText = d.age
    btn.innerText = d.active ? "active" : "unActive"
    btndelete.innerText="Delete"
    id.appendChild(p1)
    username.appendChild(p2)
    phone.appendChild(p3)
    age.appendChild(p4)
    active.appendChild(btn)
    active.appendChild(btndelete)
    
}
if(username && age && phone ){
    const data = readDataFromStorage()
    data.forEach((d,index)=>{
        prepareTable(d,index)
    })
}
let userStorage = readDataFromStorage()
const deleteUser = (btn) => {
    let el = btn.parentNode.parentNode;
    const index = [...el.parentElement.children].indexOf(el);
    userStorage.splice(index, 1);
    localStorage.setItem("user", JSON.stringify(userStorage));
    el.remove();
  };
