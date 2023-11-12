let mouseDown = false;
let mousePosition = {x:0,y:0}
const moveMouse = (e) => {
    mousePosition = {
        x: e.clientX,
        y: e.clientY
    }
}

window.addEventListener('mousemove', (e)=>moveMouse(e));
window.addEventListener('mousedown', ()=>mouseDown=true);
window.addEventListener('mouseup', ()=>mouseDown=false);

const mouseMove = (element) => {
  if(mouseDown){
    element.classList.add('mouse-over')
  }

}
const mouseLeave = (element) => {
  element.classList.remove('mouse-over') 
}

Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
}

const moveHand = (hand) => {
  if(mouseDown && hand.classList.contains('mouse-over')){
    const arm = hand.parentElement;
    const shoulder = arm.querySelector('.arm__shoulder')
  
    const {y: mouseY, x: mouseX} = mousePosition;
    const shoulderRect = shoulder.getBoundingClientRect();

    const armY = (shoulderRect.y + shoulderRect.bottom)/2;
    const armX = (shoulderRect.x + shoulderRect.right)/2;

    let radians = (Math.atan2(armY - mouseY,  armX - mouseX));
    if(arm.classList.contains('right')){
        radians += Math.PI;
    }

    const degrees = Math.degrees(radians);
    arm.style.rotate = `${degrees}deg`;
  }
}

document.querySelectorAll(".js-hand").forEach(
    (hand)=>{
      hand.addEventListener('mousemove', ()=>mouseMove(hand))
      window.addEventListener('mouseup', ()=> mouseLeave(hand))
      setInterval(()=>moveHand(hand), 10)
    }
)
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const moveEye = (eye) => {
    const {x: mouseX, y: mouseY} = mousePosition;
    const FOLLOW_SPEED = 0.05;
    const eyeRect = eye.getBoundingClientRect();
    const x = clamp(( mouseX - (eyeRect.x + eyeRect.right)/2)*FOLLOW_SPEED, -eyeRect.width+10, eyeRect.width-10);
    const y = clamp((mouseY - (eyeRect.y + eyeRect.bottom)/2)*FOLLOW_SPEED, -eyeRect.height+10, eyeRect.height-10);

    eye.style.transform = `translate(${x}px, ${y}px)`;
}

document.querySelectorAll(".js-eye").forEach(
    (eye)=>window.addEventListener('mousemove', ()=>moveEye(eye))
)


const hatButton = document.querySelector('.js-button')
let intervalIP;

let danceFrequency = 300;

document.querySelector('.js-speed-range').addEventListener("input",(e)=>{
  const {value} = e.target;
  document.querySelector('.js-speed-indicator').innerText = value;
  danceFrequency = value*100;
})

hatButton.addEventListener("click",()=>{ 
  if(!hatButton.classList.contains("clicked")){
    hatButton.classList.add("clicked")

    const refreshIP = () => {
      document.querySelector('.js-display').innerText = "DANCE TIME";
      document.querySelectorAll('.js-hand')
      .forEach((hand)=>{
        const arm = hand.parentElement;
        arm.style.rotate = `${Math.random()*360}deg`;
      })
    }
    
    const refreshAntenna = () => {
      if(document.querySelector('.js-antenna').classList.contains('connection')){
        clearInterval(intervalIP)
        document.querySelectorAll('.js-hand').forEach((hand)=>hand.classList.remove('disabled'))
        document.querySelector('.js-speed-range').disabled = false;
        document.querySelector('.js-display').innerText = "click the button";
      }else{
        intervalIP = setInterval(refreshIP, danceFrequency)
        document.querySelectorAll('.js-hand').forEach((hand)=>hand.classList.add('disabled'))
        document.querySelector('.js-speed-range').disabled = true;
      }
    }

    refreshAntenna()

    document.querySelectorAll('.js-antenna').forEach((element)=>
      {
        element.classList.toggle('connection');
        element.style.setProperty('--dance-frequency', danceFrequency+'ms');
      }
    )

    

    
    setTimeout(()=>hatButton.classList.remove("clicked"), 300)
  }

})
