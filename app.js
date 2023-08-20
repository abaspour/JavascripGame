//--------------------------------------catch-----moose
const grid=document.querySelector('.grid')
const time=document.getElementById("time")
const resultClick=document.getElementById("resultClick")
let rightClick=0;
let nowTime=60

let childs=[]
let rand;
for(i=0;i<9;i++){
    child=document.createElement('div');
    child.setAttribute('class','child');
    child.setAttribute('id',i+1)
    child.addEventListener('mousedown',(e)=>{
        const click=e.target.getAttribute('id')
        if (rand===click-1) {
            rightClick++
            resultClick.innerText=rightClick
            alert ('horay')
        }
    })
    grid.appendChild(child)
}

const timerMose=setInterval(setMoose,500)
childs=document.querySelectorAll(".child");
    
function setMoose(){
    nowTime--;
    time.innerHTML=nowTime
    if (nowTime==0){
        clearInterval(timerMose);
        alert('end of time. score='+rightClick)
        rand=999; //mose is out of border
        return
    }
    rand=Math.floor(Math.random()*9)
    childs.forEach(child=>{
        child.classList.remove('moose')
    })
    childs[rand].classList.add('moose')
}
//----------------------------------------food
const cardArray = [
    {
      name: 'fries',
      img: 'pic/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'pic/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'pic/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'pic/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'pic/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'pic/hotdog.png'
    },
    {
      name: 'fries',
      img: 'pic/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'pic/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'pic/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'pic/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'pic/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'pic/hotdog.png'
    }
  ]

  cardArray.sort(() => 0.5 - Math.random())
  const gridFood=document.querySelector(".gridFood")
  const resultFood=document.getElementById('resultFood')
  let resultFoodVar=0;
  let foodNameClicks=[];
  let foodIdclicks=[];
  let foodElclicks=[];
  cardArray.forEach((card,key)=>{
    const cardChild=document.createElement('div');
    cardChild.setAttribute('class','food')
    cardChild.setAttribute('data-id',key)
    cardChild.addEventListener('click',(e)=>{
        const cardId =e.target.getAttribute('data-id')
        if (cardId=='x')
            return;
        foodIdclicks.push(cardId);
        foodNameClicks.push(cardArray[cardId].name)
        foodElclicks.push(e.target)
        setTimeout(flip(e.target,cardArray[cardId].img),5)
        if (foodIdclicks.length>1){
            setTimeout(()=>{
            
                if (foodIdclicks[0]==foodIdclicks[1]){
                    alert ('you click the same food')
                    setTimeout(flip(e.target,'./pic/blank.png'),500)
                    setTimeout(flip(foodElclicks[0],'./pic/blank.png'),500)
                } else if (foodNameClicks[0]==foodNameClicks[1]){
                    resultFoodVar++;
                    resultFood.innerText=resultFoodVar;
                    if(resultFoodVar>=6) {
                        alert ('hooray  you win ')
                    } else {
                        alert ('hooray ')
                    }
                    setTimeout(flip(e.target,'./pic/white.png'),500)
                    e.target.setAttribute('data-id','x')
                    setTimeout(flip(foodElclicks[0],'./pic/white.png'),500)
                    foodElclicks[0].setAttribute('data-id','x')
                  } else {
                    // alert ('sorry')
                    setTimeout(flip(e.target,'./pic/blank.png'),500)
                    setTimeout(flip(foodElclicks[0],'./pic/blank.png'),500)
    
                }
                foodNameClicks=[];
                foodIdclicks=[];
                foodElclicks=[];

            } ,500)
    
        }
     })
     function flip(target,filename){
       target.style.backgroundImage = "url('"+filename+"')"
    //    console.log('flip')
    //    console.log(target)
    //    console.log(filename)
    }
 //   cardChild.style.backgroundImage = "url('./pic/moose.jpg')"
    gridFood.appendChild(cardChild);
   })
   //--------------------------------------------------------------------
   class MyBallClass {
      constructor(ballBorder){
       this.ball=document.createElement('div');
       this.size=this.getRandomInt(4)*2+10;
       this.speed=this.getRandomInt(3)+2
       this.ball.style.width= this.size;
       this.ball.style.height=this.size;
       this.ball.style.backgroundColor=`rgb(${this.getRandomInt(255)},${this.getRandomInt(255)},${this.getRandomInt(255)})`;
       this.ball.style.borderRadius = '50%';
       this.ball.style.position='absolute'
       ballBorder.append(this.ball);
 
       this.borderWidth=ballBorder.clientWidth;
       this.borderHeight=ballBorder.clientHeight;
       this.posiX=this.getRandomInt(this.borderWidth);
       this.posiY=this.getRandomInt(this.borderHeight);
       this.xInc=(this.getRandomInt(2)==1) ? this.speed : -this.speed;
       this.yInc=(this.getRandomInt(2)==1) ? this.speed : -this.speed;
       this.timer;
       this.others=[];
     }
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

     moveBall() {
        this.ball.style.left=this.posiX;
        this.ball.style.top=this.posiY;

        for (i=0;i<this.others.length;i++){
          const difSize=Math.abs(this.others[i].size+this.size)/2-3
          if (this.others[i]!= this && Math.abs(this.others[i].posiX-this.posiX)<difSize && Math.abs(this.others[i].posiY-this.posiY)<difSize ){
            this.xInc=(this.getRandomInt(2)==1) ? this.speed : -this.speed;
            this.yInc=(this.getRandomInt(2)==1) ? this.speed : -this.speed;

            break;
          }
        }


        if(this.yInc==this.speed && this.posiY+this.size>=this.borderHeight)
        this.yInc=-this.speed;
        if(this.xInc==this.speed && this.posiX+this.size>=this.borderWidth)
        this.xInc=-this.speed;
        if(this.xInc==-this.speed && this.posiX-this.speed<=0)
        this.xInc=this.speed;
        if(this.yInc==-this.speed && this.posiY-this.speed<=0)
        this.yInc=this.speed;
        

        this.posiX +=this.xInc;
        this.posiY +=this.yInc;
    }    
    run(){
      this.timer=setInterval(()=>{
        this.moveBall()
   },this.getRandomInt(10)+10)
    }
    
    }

 
   const ballBorder=document.querySelector('.ball-border')
   const myInstBall=[];
   for (i=0;i<100;i++){
    const myInst=new MyBallClass(ballBorder);
    myInst.others=myInstBall;
    myInstBall.push(myInst);

    myInst.run();
   }
//-------------------------------------'Stone', 'Scissors', 'Paper'----------------- 
const result=document.getElementById("result")
const yourChoice=document.getElementById("you")
const computerChoice=document.getElementById("computer")

const choises=[ 'Stone', 'Scissors', 'Paper']
function computerChoise(){
    const rand=Math.floor(Math.random()*3)
    return choises[rand] 
}

const buttons=document.getElementById('buttons')
choises.forEach(choice => {
    const child=document.createElement('button');
    child.innerHTML=choice
    child.addEventListener('click',(e)=>{
        const your=e.target.innerHTML
        yourChoice.innerText=your
        const computer=computerChoise()
        computerChoice.innerHTML=computer
        computeresult(your,computer)
    })
    buttons.appendChild(child);
});

function computeresult(your,computer){
  switch (your + computer) {
    case 'ScissorsPaper':
    case 'StoneScissors':
    case 'PaperStone':
      result.innerHTML = "YOU WIN!"
      break
    case 'PaperScissors':
    case 'ScissorsStone':
    case 'StonePaper':
      result.innerHTML = "YOU LOSE!"
      break
    case 'PaperPaper':
    case 'ScissorsScissors':
    case 'StoneStone':
      result.innerHTML = "ITS A DRAW!"
    break
  }
}

   
  