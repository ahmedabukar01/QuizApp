const number1 = document.querySelector('#num1');
const number2 = document.querySelector('#num2');
let submit = document.querySelector('#form');
let start=document.querySelector('#form1');
let inputValue = document.querySelector('.inputText');
let scoreNum=0;
let wrongNum=0;
let correctNum=0;
let resultPopup=false;
let exit=0;
let oldNum2=0;
let numOfDataType=0;
let numOfRandom=500;
let name='';

function typedata(){
    numOfDataType=Math.floor(Math.random()*4);
    console.log(numOfDataType);
    switch(numOfDataType){
        case 0:document.querySelector('#type').textContent='+';
                break;
        case 1:document.querySelector('#type').textContent='-';
                break;
        case 2:document.querySelector('#type').textContent='x';
                break;
        case 3:document.querySelector('#type').textContent='/';
                break;
    }
}
function random(limit){
    typedata();
    return Math.floor(Math.random()*limit);
}

function display(num){
    number1.innerHTML=random(num);
    number2.innerHTML=+random(num);
}
function checkLength(x,y){
    var num1=x.innerText;
    var num2=y.innerText;
    if(numOfDataType<=1){
        if(num1.length>num2.length){
            oldNum2=num2;
            number2.innerText+=0;
        }else if(num1.length<num2.length){
            number1.innerText+=0;
        }
    }
    else{
        
        if(num1.length<num2.length){
            number1.innerText+=0;
        }
        switch(num2.length){
            case 4: number2.innerText=+Math.floor(num2/100);
                    break;
            case 3: number2.innerText=' '+Math.floor(num2/10);
                    number2.style.paddingLeft='7px';
                    break;
            case 2: number2.innerText=' '+oldNum2;
                    number2.style.paddingLeft='7px';
                    break;
            case 1: switch(num1.length){
                case 2: number2.style.paddingLeft='13px';
                        console.log('its two numbers');
                        break;
                case 3: number2.style.paddingLeft='10px';
                        console.log('its one number');
                        break;
            }
        }

    }
    
}
function cssStyleClr(){
    number2.style.paddingLeft='0px';
}
start.addEventListener('submit',i=>{
    document.location.reload();
})
submit.addEventListener('submit',(x)=>{
    x.preventDefault();
    cssStyleClr();
    if(exit<5){
        console.log(inputValue);
        checkAnswer(inputValue.value);
        ++exit;
    }
    else{
        status();
        finish();
        //document.location.reload();
    }
    
})

function popup(){
    let close = document.querySelector('.popup-text button');
    let popWrapper = document.querySelector('.popup-wrapper');
    let submit = document.querySelector('.popup-form');
    let input = document.querySelector('.popup-form input[type="text"]');

    close.addEventListener('click',x=>{
        popWrapper.style.display='none';
    })

    submit.addEventListener('submit',x=>{
        x.preventDefault();
        name=input.value;
        input.value='';
        popWrapper.style.display='none';
        
    })
}
popup();

function checkAnswer(ans){
    let n1 = number1.innerText;
    let n2 = number2.innerText;
    let correct=0
    switch(numOfDataType){
        case 0: correct = parseInt(n1)+parseInt(n2);
                console.log(correct);
                break;
        case 1: correct = parseInt(n1)-parseInt(n2);
                console.log(correct);
                break;
        case 2: correct = parseInt(n1)*parseInt(n2);
                console.log(correct);
                break;
        case 3: correct = Math.floor(parseInt(n1)/parseInt(n2));
                console.log(correct);
                        if(n2==0){
                            correct='';
                        }
                break;
    }
    if(ans==correct){
        score();
        next();
        clear();
    }else{
            wrong();
            next();
            clear();
    }
}
function wrong(){
    wrongNum++;
    document.querySelector('#wrong').innerText=wrongNum;
}
function score(){
    scoreNum+=20;
    correctNum++;
    document.querySelector('#score').innerText=scoreNum;
    document.querySelector('#correct').innerText=correctNum;
}
function next(){
        display(500);
        checkLength(number1,number2);
    

}
function clear(){
    document.querySelector('#form input[type="text"]').value='';
}
function finish(){
    document.querySelector('#num1').style.opacity='0';
    document.querySelector('#num2').style.opacity='0';
    document.querySelector('#type').style.opacity='0';
    document.querySelector('input[type="text"]').style.readOnly='true';
}

function status(){
    if(!resultPopup){
        resultPopup=true;
        document.querySelector('.winner-wrapper').style.display='block';
    let h1 =document.querySelector('.winner-wrapper h1');
    let feeling = document.querySelector('.feeling');
    let hisName = document.querySelector('.name');
    let message = document.querySelector('.message');
    let hisScore= document.querySelector('#marks');
    let myClass = document.querySelector('.win-text');
    let back = document.querySelector('.winner-wrapper a');
    back.addEventListener('click',x=>{
        document.querySelector('.winner-wrapper').style.display='none';
    })

    hisName.innerText=name;
    hisScore.innerText=scoreNum+'%';
    if(scoreNum<50){
        h1.innerText='Lost';
        feeling.innerText='Sorry !';
        message.innerText='You failed this Quiz, you have ';
        myClass.classList='lost-text';

    }
    else{
        h1.innerText='Winner';
        feeling.innerText='Congragulation ';
        message.innerText='You passed this Quiz With ';
        myClass.classList='win-text';

    }

    }
    
}

display(numOfRandom);
checkLength(number1,number2);

clear();