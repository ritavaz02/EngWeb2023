exports.tasksListPage = function(taskList, d, task){
    
    const yetToBeDoneList = []
    const alreadyDoneList = []

    for(let i=0; i < taskList.length ; i++){
        if (taskList[i].done === "0")
            yetToBeDoneList.push(taskList[i]) 
        else
        {
            console.log(taskList[i])
            alreadyDoneList.push(taskList[i])
        } 
    }
    
    
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Tasks Management</title>
            <style>

                /* Add margin to the first div */
                .first-div {
                  margin-bottom: 5px;
                }

                /* Position the split row as a flexbox */
                .split-row {
                  display: flex;
                  margin-left: 20px;
                  margin-right: 20px;
                  margin-bottom: 20px;
                }

                /* Style the left and right columns */
                .split-left {
                  flex: 1;
                  padding-right: 10px;
                }

                .split-right {
                  flex: 1;
                  padding-left: 10px;
                }
            </style>
        </head>
        <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tasks</h1>
            </header>
            <div class="first-div">
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Insertion Form</legend>
                        <label>Build Date</label>
                        <input class="w3-input w3-round" type="text" name="deadline" value="${task.deadline}"/>
                        <label>Who</label>
                        <input class="w3-input w3-round" type="text" name="who" value="${task.who}"/>
                        <label>Description</label>
                        <input class="w3-input w3-round" type="text" name="description" value="${task.description}"/>
                        <input type="hidden" name="id" value="done" />
                    </fieldset>  
                    <br/>
                    <button class="w3-btn w3-teal w3-mb-2" method="POST" href="/tasks/registo/">Register</button>
                </form>
            </div>
            <div class="split-row">
                <div class="split-left">
                    <h3>Tasks yet to be done</h3>
                    <table class="w3-table-all">
                        <tr><th>Deadline</th><th>Who</th><th>Description</th><th>Actions</th></tr>
            `
    for(let i=0; i < yetToBeDoneList.length ; i++){
        pagHTML += `
                <tr>
                    <td>${yetToBeDoneList[i].deadline}</td>
                    <td>${yetToBeDoneList[i].who}</td>
                    <td>${yetToBeDoneList[i].description}</td>
                    <td>
                        [<a href="/tasks/edit/${taskList[i].id}">Edit</a>]
                        [<a href="/tasks/done/${taskList[i].id}">Done</a>]
                    </td>
                </tr>
        `
    }

    pagHTML += `
                </table>
            </div>
            <div class="split-right">
                <h3>Tasks Already Done</h3>
                <table class="w3-table-all">
                    <tr>
                        <th>Deadline</th><th>Who</th><th>Description</th>
                    </tr>`
                    

    for(let i=0; i < alreadyDoneList.length ; i++){
        pagHTML += `
                <tr>
                    <td>${alreadyDoneList[i].deadline}</td>
                    <td>${alreadyDoneList[i].who}</td>
                    <td>${alreadyDoneList[i].description}</td>
                </tr>
        `
    }


    pagHTML += `
                    </table>
                    </div>
                </div>
                <footer class="w3-container w3-teal">
                    <h5>Generated in ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `
    return pagHTML
}