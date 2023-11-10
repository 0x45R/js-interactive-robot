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

const mouseEnter = (element) => element.classList.add('mouse-over')
const mouseLeave = (element) => element.classList.remove('mouse-over') 

const moveHand = (hand) => {
    if(mouseDown && hand.classList.contains('mouse-over')){
        const arm = hand.parentElement;
        const shoulder = arm.querySelector('.arm__shoulder')
        const {y: mouseY, x: mouseX} = mousePosition;
        const armY = (shoulder.getBoundingClientRect().y + shoulder.getBoundingClientRect().bottom)/2;
        const armX = (shoulder.getBoundingClientRect().x + shoulder.getBoundingClientRect().right)/2;

        let radians = (Math.atan2(armY - mouseY,  armX - mouseX));
        if(arm.classList.contains('right')){
            radians += Math.PI;
        }
        arm.style.rotate = `${radians}rad`;
    }
}

document.querySelectorAll(".js-hand").forEach(
    (hand)=>{
        hand.addEventListener('mouseenter', ()=>mouseEnter(hand))
        hand.addEventListener('mouseleave', ()=> mouseLeave(hand))
        setInterval(()=>moveHand(hand), 10)
    }
)
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const moveEye = (eye) => {
    const {x: mouseX, y: mouseY} = mousePosition;
    const FOLLOW_SPEED = 0.1;
    const eyeRect = eye.getBoundingClientRect();
    const x = clamp((mouseX - (eyeRect.x + eyeRect.right)/2)*FOLLOW_SPEED, -eyeRect.width+10, eyeRect.width-10);
    const y = clamp((mouseY - (eyeRect.y + eyeRect.bottom)/2)*FOLLOW_SPEED, -eyeRect.height+10, eyeRect.height-10);

    eye.style.transform = `translate(${x}px, ${y}px)`;
}

document.querySelectorAll(".js-eye").forEach(
    (eye)=>window.addEventListener('mousemove', ()=>moveEye(eye))
)