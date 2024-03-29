/* connecting html elements to js */
const form = document.querySelector('form');
const todoList = document.querySelector('#list');


/* before the window renders, check to see if local storage has an item called "todo"
if it does, parse and save that item into an array. Then loop through the array and 
create a new li for each item in the array. Append that new li to original todoList */
let savedToDo = localStorage.getItem('todos');


/* must add ending. if list is empty, it will result in a "not iterable error" without || [] */
const savedToDoParsed = JSON.parse(savedToDo) || [];

for(let i=0; i < savedToDoParsed.length; i++){
    let li = document.createElement('li');
    li.textContent = savedToDoParsed[i];
    const itemButton = document.createElement('button');
    itemButton.innerText = 'remove';
    
    li.append(itemButton);
    todoList.append(li);
    
    
    itemButton.addEventListener('click',function(e){
        e.target.parentElement.remove();
        
        savedToDoParsed.splice(savedToDoParsed.indexOf(i),1);
        localStorage.setItem('todos',JSON.stringify(savedToDoParsed));
        
    });

    li.addEventListener('click',function(){
        if(li.classList != 'completed'){
            li.style.textDecoration = 'line-through';
        }else{
            li.style.textDecoration = 'none';
        }
        
        /* everytime newItem is clicked the class 'completed' is toggled on and off */
        li.classList.toggle('completed'); 
    }); 
   
}


/* listen for a submit, do not refresh after submit */
form.addEventListener('submit',function(e){
    e.preventDefault();
    /* catching input from user */
    const newItemInput = document.querySelector('#newToDo');
    const newItem = document.createElement('li');
    newItem.innerText = newItemInput.value;
    itemText = newItem.innerText;
    const itemButton = document.createElement('button');
    itemButton.innerText = 'remove';
    newItem.append(itemButton);
    todoList.append(newItem);
    /* create a variable that is an array from local storage under the label 'todos'.
    we are parsing the array to be able to add new items. 
    if that array doesnt exist(ie ||) then return an empty array */
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    console.log(Array.isArray(todos));
    todos.push(itemText);
    /* all of a sudden todos.push is not a function >:(  ) */
    /* todos.push(itemText); */
    localStorage.setItem('todos',JSON.stringify(todos));
    
    itemButton.addEventListener('click',function(e){
        e.target.parentElement.remove();
       
        localStorage.setItem('todos',JSON.stringify(todos));
        

    });
    newItem.addEventListener('click',function(){
        if(newItem.classList != 'completed'){
            newItem.style.textDecoration = 'line-through';
        }else{
            newItem.style.textDecoration = 'none';
        }
        
        /* everytime newItem is clicked the class 'completed' is toggled on and off */
        newItem.classList.toggle('completed');
    });

    /* reset form in order to have placeholder show after every submission */
   form.reset();

});






/* to clear local storage:
localStorage.clear(); */
