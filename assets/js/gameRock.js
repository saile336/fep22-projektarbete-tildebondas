console.log("gameRock.js init")

if (sessionStorage.getItem("finishedSetup") != "true") {
    alert("ERROR finishedSetup != \"true\"; Homepage skipped or new tab opened. Do not do this.")
    window.open("../homepage/index.html", "_self");
}

document.body.style.backgroundImage = "url(../assets/images/rockPapperScissors/backgroundHouse.png)";

amount = parseInt(localStorage.getItem("amount"));

let bet = 0;

if (localStorage.getItem("amount") <= 0) {
    alert("Money gone! Sucks to be you!");
    sessionStorage.removeItem("finishedSetup");
    window.open("../homepage/index.html", "_self");
}

else {
    do {
        bet = parseInt(window.prompt("how much would you like to bet? You still have " + amount));
    } while (isNaN(bet) || bet > amount || bet < 1);
}

const getData = () => [
    {
        name: 'papper',
        img: '../assets/images/rockPapperScissors/minePapper.png',
        win: 'cobblestone',
        lose: 'shear',
        tie: 'papper'

    },
    {
        name: 'cobblestone',
        img: '../assets/images/rockPapperScissors/mineRock.png',
        win: 'shear',
        lose: 'papper',
        tie: 'cobblestone'
    },
    {
        name: 'shear',
        img: '../assets/images/rockPapperScissors/mineScissros.png',
        win: 'papper',
        lose: 'cobblestone',
        tie: 'shear'
    }
]

//the object of all the assets
const choice = getData();

const playerChoices = document.querySelector('.playerChoices');
const choiceComputer = document.querySelector('.choiceComputer');
const choiceP = document.querySelector('.choice');



//Selects the html




let i = 0;

const generator = () => {


    const boxGame = document.createElement('div');
    const assetGame = document.createElement('img');


    choice.forEach(item => {
        const box = document.createElement('div');
        const asset = document.createElement('img');
        box.classList = 'box';
        asset.classList = 'asset';

        asset.src = item.img;

        asset.setAttribute('name', item.name);
        asset.setAttribute('win', item.win);
        asset.setAttribute('data-i', i);

        playerChoices.appendChild(box);
        box.appendChild(asset);


        asset.addEventListener('click', (evt) => {
            computerCard(evt);
            playerChoice(evt);
            gameCheck();

            playerChoices.classList.add('clicked');

        })

        i++;

    })
    //generates the choices
}




const randome = Math.floor(Math.random() * 3);

const randomeish = Math.floor(Math.random() * 7);

const playerChoice = (evt) => {

    const boxP = document.createElement('div');
    const assetP = document.createElement('img');

    boxP.classList = 'boxC';
    assetP.classList = 'assetC';
    assetP.classList = 'check2';

    const clicked = evt.target.getAttribute('data-i');


    assetP.src = choice[clicked].img
    assetP.setAttribute('win', choice[clicked].win);
    assetP.setAttribute('tie', choice[clicked].tie);
    assetP.setAttribute('lose', choice[clicked].lose);

    choiceP.appendChild(boxP);
    boxP.appendChild(assetP);
    //displays your choice
}

const computerCard = (evt) => {


    if (randomeish < 2) {
        const boxC = document.createElement('div');
        const assetC = document.createElement('img');

        boxC.classList = 'boxC';
        assetC.classList = 'assetC';
        assetC.classList = 'check1';

        const clicked = evt.target.getAttribute('data-i');

        if (choice[clicked] === choice[0] ){

            assetC.src = choice[2].img

        assetC.setAttribute('name', choice[2].name);

        }
        if (choice[clicked] === choice[1] ){

            assetC.src = choice[0].img

        assetC.setAttribute('name', choice[0].name);

        }
        if (choice[clicked] === choice[2] ){

            assetC.src = choice[1].img

        assetC.setAttribute('name', choice[1].name);

        }



        choiceComputer.appendChild(boxC);
        boxC.appendChild(assetC);
        
        //rigs the game so that 2/6 of the time the computer auotmaticly wins
        
    }else{

        const boxC = document.createElement('div');
        const assetC = document.createElement('img');

        boxC.classList = 'boxC';
        assetC.classList = 'assetC';
        assetC.classList = 'check1';



        assetC.src = choice[randome].img;

        assetC.setAttribute('name', choice[randome].name);


        choiceComputer.appendChild(boxC);
        boxC.appendChild(assetC);
    }
    //randomes the computers choice
}





const gameCheck = () => {


    const check1 = document.querySelector('.check1');
    const check2 = document.querySelector('.check2');



    if (check1.getAttribute('name')
        === check2.getAttribute('win')) {
        console.log("win");
        console.log(amount);
        localStorage.setItem('amount', amount + bet * 2);

        document.querySelector("#moneyNumber").innerText = localStorage.getItem("amount");

        document.querySelector('#score').innerHTML = ("You won " + bet * 2);

    }
    else if (check1.getAttribute('name')
        === check2.getAttribute('tie')) {
        console.log("tie");
        console.log(amount);
        document.querySelector('#score').innerHTML = ("tie, but you still have " + amount);


    }
    else if (check1.getAttribute('name')
        === check2.getAttribute('lose')) {
        console.log("lose");
        console.log(amount);
        document.querySelector('#score').innerHTML = ("You lost " + bet);

        localStorage.setItem('amount', amount - bet);

        document.querySelector("#moneyNumber").innerText = localStorage.getItem("amount");
    }

    //checks if you won, tie or lost


}

document.querySelector('#playAgain').addEventListener('click', () => {
    window.location.reload();
})
//Reload the game
generator();

