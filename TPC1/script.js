// number of the mini game that is being played now
let game = 0

// get the set of cells
const cells = document.getElementsByClassName("cell");


// gets the correct game
function clickSquare(i)
{
    if(game===0)
        checkFlower(i);
    else
        checkGod(i);
}

// get a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// fills the table for the first game - the flower game
function fillTable() {
    
    // flowers images and descrptions
    images = [["images/blue.png","Blue flower"],
           ["images/flor.png","Pink flower"],
           ["images/flor2.png","Red flower"],
           ["images/iris.png","Purple flower"],
           ["images/girassol.png","Yellow flower"],
           ["images/rosa.png","Red flower"],
           ["images/margarida.png","White flower"],
           ["images/tulipa.PNG","Orange flower"]];

    i=0;

    // fill the cells with the images
    while(images.length > 0)
    {
        if(i===4)
        {
            // put the question on the center cell
            const p = document.createElement("p");
            p.textContent=" Which one is iris?";
            cells[i].appendChild(p);
        }
        else 
        {
            const cell = cells[i];
            pos = getRandomInt(images.length);
            let img = document.createElement("img");
            img.src = images[pos][0];
            img.alt = images[pos][1];
            let c = document.createElement("center");
            c.appendChild(img);
            cell.appendChild(c);
            images.splice(pos, 1);
        }
        i++;
    }

    // remove the title "Click me to find out!"
    let t = document.getElementsByClassName("title");
    t[1].remove();
}    

// check if the flower selected is the iris
function  checkFlower(i) {
    
    // get the cell selected
    const cell = cells[i];
    
    // check if is the iris flower by comparing the descritpion of the image on the cell
    if(cell.innerHTML.includes("Purple flower"))
    {
        // the flower selected is an iris, open the puzzle
        game = 1;
        puzzleGod();
    }
    else
    {
        // the flower selected is not an iris, try again message appears
        cells[4].textContent = "Wrong Flower! Try again ...";
    }
}

const imagesGod = [["images/deusa1.jpg","0"],
           ["images/deusa2.jpg","1"],
           ["images/deusa3.jpg","2"],
           ["images/deusa4.jpg","3"],
           ["images/deusa5.jpg","4"],
           ["images/deusa6.jpg","5"],
           ["images/deusa7.jpg","6"],
           ["images/deusa8.jpg","7"],
           ["images/deusa9.jpg","8"]];

// create the puzzle of the image of the god of iris
function puzzleGod() {
    
    i=0;
    const images = imagesGod.slice();
    while(images.length > 0)
    {
        const cell = cells[i];
        pos = getRandomInt(images.length);
        let img = document.createElement("img");
        img.src = images[pos][0];
        img.alt = images[pos][1];
        cell.innerHTML=null;
        let c = document.createElement("center");
        c.appendChild(img);
        cell.appendChild(c);
        images.splice(pos, 1);
        i++;
    }

    const info = document.getElementsByClassName("info");
    info[0].innerHTML = "Complete the puzzle. Click in two images to change positions between them."

    if(checkIfPuzzleIsCorrect())
    {
        console.log("congrats");
    }
}

function checkIfPuzzleIsCorrect()
{
    i=0;
    check = true;
    while(check && i<9)
    {
        if(cells[i].innerHTML.includes(i)===false)
            check=false;
        i++;
    }
    return check;
}

let changeCell = null;

function checkGod(i)
{
    // get the cell selected
    const cell = cells[i];
    
    // check if there is a cell saved
    if(changeCell===null)
    {
        // save the cell
        changeCell = cell;
        console.log("cell saved");
    }
    else
    {
        // there is a cell saved, change img between cells
        let aux = cell.innerHTML;
        cell.innerHTML = changeCell.innerHTML;
        changeCell.innerHTML = aux;
        changeCell=null;
        if(checkIfPuzzleIsCorrect())
        {
            console.log("congrats");
            const t = document.getElementsByClassName("table");
            t[0].remove()
            const info = document.getElementsByClassName("info");
            info[0].innerHTML = "IRIS was the goddess of the rainbow and the messenger of the Olympian gods. She was often described as the handmaiden and personal messenger of Hera."
            var img = document.createElement("img");
            img.src = "images/iris2.jpg";
            let c = document.createElement("center");
            c.appendChild(img);
            document.body.appendChild(c);
            let p = document.createElement("p");
            p.style = style="color: #575976; font-family: cursive; margin-left: 20px; font-size: 30px; text-align: center; cursor: pointer;"
            p.textContent = "Thank you for playing! I hope you enjoyed knowing all the things iris is connected to!"
            let cent = document.createElement("center");
            cent.appendChild(p);
            document.body.appendChild(cent);
        }
    }
    
}