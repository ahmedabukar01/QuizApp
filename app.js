const number1 = document.querySelector('#num1');
const number2 = document.querySelector('#num2');
let submit = document.querySelector('#form');
let start=document.querySelector('#form1');
let inputValue = document.querySelector('input[type="text"]');
let scoreNum=0;
let wrongNum=0;
let correctNum=0;
let exit=0;
let oldNum2=0;
let numOfDataType=0;
let numOfRandom=500;

function typedata(){
    numOfDataType=Math.floor(Math.random()*4);
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
                        break;
                case 3: number2.style.paddingLeft='10px';
            }
        }

    }
    
}
function cssStyleClr(){
    number2.style.paddingLeft='0px';
}
start.addEventListener('submit',i=>{
})
submit.addEventListener('submit',(x)=>{
    x.preventDefault();
    cssStyleClr();
    if(exit<6){
        checkAnswer(inputValue.value);
        exit++;
    }
    else{
        finish();
        //document.location.reload();
    }
    
})
function checkAnswer(ans){
    let n1 = number1.innerText;
    let n2 = number2.innerText;
    let correct=0
    switch(numOfDataType){
        case 0: correct = parseInt(n1)+parseInt(n2);
                break;
        case 1: correct = parseInt(n1)-parseInt(n2);
                break;
        case 2: correct = parseInt(n1)*parseInt(n2);
                break;
        case 3: correct = Math.floor(parseInt(n1)/parseInt(n2));
                        if(!correct){
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
    scoreNum+=10;
    correctNum++;
    document.querySelector('#score').innerText=scoreNum;
    document.querySelector('#correct').innerText=correctNum;
}
function next(){
        display(500);
        checkLength(number1,number2);
    

}
function clear(){
    document.querySelector('input[type="text"]').value='';
}
function finish(){
    document.querySelector('#num1').style.opacity='0';
    document.querySelector('#num2').style.opacity='0';
    document.querySelector('#type').style.opacity='0';
    document.querySelector('input[type="text"]').style.readOnly='true';
}
display(numOfRandom);
checkLength(number1,number2);

clear();