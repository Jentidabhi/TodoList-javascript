(function () {

    let inputElm = document.getElementById('inputValue');
    let btnAddtodo = document.getElementById('btnAddtodo');
    let btnRemovetodo = document.querySelector('remove');
    let mainElement = document.querySelector('.todo-list-result');
    let emptyList = mainElement.querySelector('.empty-list')


    const getTodoLocalList = () => {
        return JSON.parse(localStorage.getItem('myTodo'));
    }

    let localTodoList = getTodoLocalList() || [];

    const addTodoListlocalstorage = (localTodoList) => {
        return localStorage.setItem('myTodo', JSON.stringify(localTodoList))
    }


    const dynemicLocalData = (curElm) => {

        const myElement = document.createElement('li');
        myElement.classList.add('list-item');
        myElement.innerHTML = `
            <span class="text">${curElm}</span>
            <button class="remove">REMOVE</button>`;

        emptyList.remove();
        mainElement.append(myElement);

    }

    const addTodoList = (e) => {

        e.preventDefault();

        let inputValue = inputElm.value.trim();

        inputElm.value = '';

        if (!localTodoList.includes(inputValue) && inputValue != '') {
            localTodoList.push(inputValue);
            localTodoList = [...new Set(localTodoList)];
            localStorage.setItem('myTodo', JSON.stringify(localTodoList))

            dynemicLocalData(inputValue);
        }

    }

    const removeTodoList = (e) => {
        let todoRemove = e.target;
        let todoListContent = todoRemove.previousElementSibling.innerText;
        let parentElm = todoRemove.parentElement;
        //console.log(todoListContent);

        localTodoList = localTodoList.filter((curTodo) => {
            console.log(todoListContent.toLowerCase());
            return curTodo.toLowerCase() !== todoListContent.toLowerCase();
        });
        console.log(localTodoList);

        addTodoListlocalstorage(localTodoList);
        parentElm.remove();
        //mainElement.insertAdjacentHTML('beforeend', '<li class="empty-list">Please Add to list</li>');



    }

    const showTodoList = () => {
        localTodoList.forEach((curElm) => {
            return dynemicLocalData(curElm);
        })
    }

    showTodoList();

    mainElement.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('remove')) {
            removeTodoList(e);
        }
    })
    btnAddtodo.addEventListener('click', addTodoList);

})();