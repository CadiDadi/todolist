// ASYNCHRONOUS - Wipe out <div> containing all Todos, then recall 'get' function to retrieve and render the updated list of todos
const clearer = document.getElementById('list-container')

function getData(){
    axios.get('https://api.vschool.io/scott/todo').then(function(response){
        listTodos(response.data)
        console.log(response)
    })
    .catch(err => console.log(err))
}
function editFormContent(button) {
    if (button.textContent === "Edit") {
        button.textContent = "Submit"
    } else {
        button.textContent =" Edit"
    }
}
function listTodos(arr){
    for(var i = 0; i < arr.length; i++){
        var todoId = arr[i]._id
        var todoContainer = document.createElement('div')
            todoContainer.classList.add('todo')
            todoContainer.style.backgroundColor = '#e5e5e5'
            todoContainer.style.borderStyle = 'solid'
            todoContainer.style.padding = "0px 5px 0px 5px"
            todoContainer.style.margin = '5px'
        var title = document.createElement('h3')
            title.textContent = `Title: ${arr[i].title}`
            title.style.borderStyle = 'solid'
            title.style.borderWidth = '1px'
            title.style.padding = "1px 5px"
            title.style.margin = '10px 3px 5px 3px'
        var description = document.createElement('h5')
            description.textContent = `Description: ${arr[i].description}`
            description.style.borderStyle = 'dotted'
            description.style.borderWidth = '1px'
            description.style.padding = "5px"
            description.style.margin = '1px 10px 1px 20px'
        var priceHolder = document.createElement('h5')
            priceHolder.textContent = `Price: $${arr[i].price}`
            priceHolder.style.borderStyle = 'dotted'
            priceHolder.style.borderWidth = '1px'
            priceHolder.style.padding = "5px"
            priceHolder.style.margin = '1px 10px 1px 20px'
            if(!arr[i].price){
                priceHolder.style.display = 'none'
            }
        var imageHolder = document.createElement('img')
            imageHolder.setAttribute('src', arr[i].imgUrl)
            imageHolder.style.height = '70px'
            imageHolder.style.width = '70px'
            imageHolder.style.padding = "5px"
            imageHolder.style.margin = '1px 0px 1px 100px'
            if(!arr[i].imgUrl){
                imageHolder.style.display = 'none'
            }
        var checkbox = document.createElement('input')
            checkbox.type = "checkbox" 
            checkbox.id = todoId 
            checkbox.addEventListener("change", function(event){
                event.preventDefault()
                let completeObj = {}
                completeObj.completed = this.checked
                console.log(checkbox.id)
                axios.put(`https://api.vschool.io/scott/todo/${this.id}`, completeObj).then(function(response){
                    // ASYNCHRONOUS - Wipe out <div> containing all Todos, then recall 'get' function to retrieve and render the updated list of todos
                    clearer.innerHTML = ""
                    getData()
                })
            })
        var label = document.createElement('label')
            label.style.color = '#00ff'
            label.style.fontSize = '14px'
            label.appendChild(document.createTextNode('  completed'))
            if(arr[i].completed === true){                  
                checkbox.checked = true
                todoContainer.style.backgroundColor = '#3f3'
                imageHolder.style.display = 'none'
                description.style.display = 'none'
                priceHolder.style.display = 'none'
            } 
        var deleteButton = document.createElement('button')
            deleteButton.textContent = "Delete Task"
            deleteButton.id = todoId 
            deleteButton.style.margin = '4px'
            deleteButton.style.backgroundColor = '#ff0000' 
            deleteButton.addEventListener("click", function(event){
                event.preventDefault()
                axios.delete(`https://api.vschool.io/scott/todo/${this.id}`).then(function(response){
                    // ASYNCHRONOUS - Wipe out <div> containing all Todos, then recall 'get' function to retrieve and render the updated list of todos
                    clearer.innerHTML = ""
                    getData()
                })
            })
        var editButton = document.createElement('button')
            editButton.textContent = "Edit"
            editButton.todoId = todoId
            editButton.style.margin = '1px 10px 1px 10px'
            editButton.style.backgroundColor = '#00ffff'       
        var editTitle = document.createElement('input')
            editTitle.type = 'text'
            editTitle.value = arr[i].title
            editTitle.classList.add('hide')
        var editDescription = document.createElement("input")
            editDescription.type = 'text'
            editDescription.value = arr[i].description
            editDescription.classList.add('hide')        
        var editPrice = document.createElement("input")
            editPrice.type = 'text'
            editPrice.value = arr[i].price
            editPrice.classList.add('hide')
        var editImage = document.createElement('input')
            editImage.type = 'text'
            editImage.value = arr[i].imgUrl
            editImage.classList.add('hide')
        editButton.addEventListener("click", function(){            
            title.classList.toggle('hide')
            editTitle.classList.toggle('hide')
            if (!editTitle.classList.contains('hide')) {
                editTitle.style.display = "h1"
                editTitle.placeholder = "Enter Title"
            } else {
                editTitle.style.display = "none"
            }
            description.classList.toggle('hide')
            editDescription.classList.toggle('hide')
            if (!editDescription.classList.contains('hide')) {
                editDescription.style.display = "block"
                editDescription.placeholder = "Enter Description"
            } else {
                editDescription.style.display = "none"
            }
            priceHolder.classList.toggle('hide')
            editPrice.classList.toggle('hide')
            if (!editPrice.classList.contains('hide')) {
                editPrice.style.display = "block"
                editPrice.placeholder = "Enter price"
            } else {
                editPrice.style.display = "none"
            }
            var editToDo = {}  
                editToDo.title = editTitle.value
                editToDo.description = editDescription.value
                editToDo.price = editPrice.value
            axios.put(`https://api.vschool.io/scott/todo/${this.todoId}`, editToDo).then(function(response){
                console.log(response.data)
            })
            editFormContent(editButton)
            //ASYNCHRONOUS - DOESNT WORK
            // clearer.innerHTML = ""
            // getData()
        })
        // Put elementS on the DOM
            todoContainer.appendChild(title)
            todoContainer.appendChild(editTitle)
            todoContainer.appendChild(description)
            todoContainer.appendChild(editDescription)
            todoContainer.appendChild(priceHolder)
            todoContainer.appendChild(editPrice)
            todoContainer.appendChild(checkbox)
            todoContainer.appendChild(label)
            todoContainer.appendChild(editButton)
            todoContainer.appendChild(deleteButton)
            todoContainer.appendChild(imageHolder)
            document.getElementById('list-container').appendChild(todoContainer)

            // var editContainer = document.createElement('div')
            // editContainer.classList.add('edit')
            // editContainer.style.backgroundColor = "#e5e5e5"
            // editContainer.style.borderStyle = 'dotted'
            // editContainer.style.padding = "0px 5px 0px 5px"
            // editContainer.style.margin = '5px'

            // editContainer.appendChild(editTitle)
            // editContainer.appendChild(editDescription)
            // editContainer.appendChild(editPrice)
            // // editContainer.appendChild(editButton)
            // document.getElementById('edit-container').appendChild(editContainer
    }
}
var todoForm = document.addTodoForm
todoForm.addEventListener("submit", function(event){
    event.preventDefault()
    // const clearer = document.getElementById('list-container')
    // When the user submits, Grab the user inputS
        var title = todoForm.title.value
    // A user should be able to give the item a description
        var description = todoForm.description.value
    // A user should be able to give the item a price.
        var price = todoForm.price.value
        var imageUrl = todoForm.imageUrl.value
    // Put the inputS in an object
        var newTodo = {}
        newTodo.title = title
        newTodo.description = description
        newTodo.price = price
        newTodo.imgUrl = imageUrl
    // Send a Post request
        axios.post('https://api.vschool.io/scott/todo', newTodo).then(function(response){
            // ASYNCHRONOUS - Wipe out <div> containing all Todos, then recall 'get' function to retrieve and render the updated list of todos
            clearer.innerHTML = ""
            getData()
        })
        .catch(function(err){
            console.log(err)
        })
})

getData()   