const sli = document.getElementById('slide-container');
const des = document.getElementById('design-container');
const sli2 = document.querySelector('.slide');
const body = document.body;
const wrapper = document.getElementById('wrapper');

const dark = document.querySelector('.mode-toggle2');
const toggle = document.getElementById('mode-container');
const light = document.querySelector('.mode-toggle1');

const oneInvertElems = [
    document.querySelector('.show-items'),
    document.querySelector('.drop-progress'),
    document.querySelector('.circle'),
    document.querySelector('.triangle'),
    document.querySelector('.polygon'),
    document.querySelector('.reset-size'),
    document.querySelector('.reset-color'),
    document.getElementById('size-select')
];

const zeroInvertElems = [
    document.getElementById('body-toggle'),
    document.getElementById('other-toggle'),
    document.querySelector('.go-up'),
    document.getElementById('body-toggle'),
    document.querySelector('.pause-icon'),
    document.getElementById('phys-toggle'),
    document.querySelector('.drop-text'),
    document.querySelector('.color-text'),
    document.querySelector('.attract-text')
];

window.onbeforeunload = function (){
    window.scrollTo(0, 0);
};

if(localStorage.getItem('togMode')==='false'){
    light.classList.add('mode-opac');
    dark.style.animation = 'fader 0.3s forwards';
    body.classList.add('lighten');
    document.getElementById('what-toggle').style.filter = 'invert(0)'
    document.getElementById('item-container').style.backgroundColor = 'rgb(27, 27, 27)';
    document.getElementById('setting-drop').style.backgroundColor = 'rgb(27, 27, 27)';
    oneInvertElems.forEach(e => e.style.filter = 'invert(1)');
    zeroInvertElems.forEach(e => e.style.filter = 'invert(0)');
    document.querySelectorAll('[type=checkbox]').forEach(checkbox => {checkbox.classList.add('help')});
};

document.querySelector('.logo').addEventListener("click", function slideAnim (){

    sli2.classList.add('disabled');
    body.style.overflow = 'visible';
    sli2.classList.add('slide-anim'); 
    sli.classList.add('slide-anim2');
    
    const vis = window.getComputedStyle(des).visibility;

    if (vis === 'hidden') {
        sli2.classList.remove('slide-rever');
        sli.classList.remove('slide-rever2');
        setTimeout(() => {des.style.visibility = 'visible';
        des.style.animation = 'fader 0.5s'}, "600");
        physToggle.style.animation = 'faderOut 0.3s forwards';
        setTimeout(() => {physToggle.style.visibility = 'hidden';}, "300");
        desFade();
        
    } else {
        body.style.overflow = 'hidden';
        sli2.classList.add('slide-rever');
        sli.classList.add('slide-rever2');
        sli.style.pointerEvents = 'none'; 
        setTimeout(() => {sli2.classList.remove('disabled');
            sli.style.pointerEvents = ''; 
            sli2.classList.remove('slide-anim2');
            sli.classList.remove('slide-anim');}, "1000");
        des.style.removeProperty('animation');    
        des.style.animation = 'faderOut 0.3s forwards';
        setTimeout(() => {des.style.visibility = 'hidden'}, "300");
        physToggle.style.visibility = 'visible';
        setTimeout(() => {physToggle.style.animation = 'fader 0.3s forwards'}, "1000");
        
        window.scrollTo(0,0);
    }    
})

toggle.addEventListener("click", function (){
    if (light.classList.contains('mode-opac')){
        light.classList.remove('mode-opac');
        dark.style.animation = 'faderOut 0.3s forwards';
        body.classList.remove('lighten');
        document.getElementById('what-toggle').style.filter=''
        document.getElementById('what-toggle').classList.add('invert');
        document.getElementById('item-container').style.backgroundColor = '';
        document.getElementById('setting-drop').style.backgroundColor = '';
        oneInvertElems.forEach(e => e.style.filter = 'invert(0)');
        zeroInvertElems.forEach(e => e.style.filter = 'invert(1)');
        document.querySelectorAll('[type=checkbox]').forEach(checkbox => {checkbox.classList.remove('help')});
        localStorage.setItem('togMode', true)
    } 
    else { 
        light.classList.add('mode-opac');
        dark.style.animation = 'fader 0.3s forwards';
        body.classList.add('lighten');
        document.getElementById('what-toggle').style.filter=''
        document.getElementById('what-toggle').classList.remove('invert');
        document.getElementById('item-container').style.backgroundColor = 'rgb(27, 27, 27)';
        document.getElementById('setting-drop').style.backgroundColor = 'rgb(27, 27, 27)';
        oneInvertElems.forEach(e => e.style.filter = 'invert(1)');
        zeroInvertElems.forEach(e => e.style.filter = 'invert(0)');
        document.querySelectorAll('[type=checkbox]').forEach(checkbox => {checkbox.classList.add('help')});
        localStorage.setItem('togMode', false)
    }

});

let designArray = document.querySelectorAll('.pop');
designArray.forEach(e => e.style.visibility = 'hidden');

window.addEventListener("scroll", desFade);

function desFade(){
    for (let i = 0; i < designArray.length; i++) {
        let element = designArray[i];
        let objInView = element.getBoundingClientRect().top - window.innerHeight/2 -100;
        if (objInView < 0) {
            element.classList.add('pop-anim');
            element.style.visibility = 'visible';     
        }
        else{
            break;        
        }          
    }   
};

window.addEventListener('scroll', scrollUp);

const chevronUp = document.querySelector('.go-up');

function scrollUp(){
    let scrollPos = window.scrollY;
    if (scrollPos >= 3000) {
        chevronUp.classList.add('go-upon');
    }
    else{
        chevronUp.classList.remove('go-upon');
    }
};

chevronUp.addEventListener('click', function () {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

document.querySelectorAll('.design').forEach(e => e.addEventListener("mouseover", function (){
    sli.classList.add('opac');
    toggle.classList.add('opac');
}));

document.querySelectorAll('.design').forEach(e => e.addEventListener("mouseout", function (){
    sli.classList.remove('opac');
    toggle.classList.remove('opac');
}));

const vid = document.getElementById('vid');
const insvid = document.querySelectorAll('.design');
const vidvis = window.getComputedStyle(vid).visibility;

// have to do this within an array of vids for the other designs (only one finished so far)
document.querySelector('.no1').addEventListener("click", function(){
    body.style.overflow = 'hidden';
    wrapper.style.pointerEvents = 'none';
    des.style.pointerEvents = 'none';
    vid.classList.add('disabled');
    document.getElementById('close').style.visibility = 'visible';
    document.getElementById('close').style.animation = 'fader 1s forwards';
    vid.play();
    vid.style.animation = 'fader 1s forwards';
    if(light.classList.contains('mode-opac')){
        body.classList.add('darken-light');
    }
    else{
        body.classList.add('darken');
    }
    wrapper.style.opacity = '25%'; 
    des.style.opacity = '25%';
    vid.style.visibility = 'visible';
    
});

document.getElementById('close').addEventListener("click", function closeVid(){
    body.style.overflow = 'visible';
    wrapper.style.pointerEvents = '';
    des.style.pointerEvents = '';
    body.classList.remove('darken');
    wrapper.style.opacity = '';
    des.style.opacity = '';
    document.getElementById('close').style.animation = 'faderOut 0.3s forwards'
    setTimeout(() => {document.getElementById('close').style.visibility = 'hidden';}, "300");
    vid.pause();
    vid.currentTime=0;
    vid.style.removeProperty('animation');
    vid.style.animation = 'faderOut 0.3s forwards'
    if(light.classList.contains('mode-opac')){
        body.classList.remove('darken-light');
    }
    else{
        body.classList.remove('darken');
    }
    setTimeout(() => {vid.style.visibility = 'hidden'}, "300");
    document.getElementById('close').style.animation = 'faderOut 0.3s forwards'
    setTimeout(() => {document.getElementById('close').style.visibility = 'hidden'}, "300");   
});

const physToggle = document.getElementById('what-toggle');

window.addEventListener("load", function (){
    physToggle.classList.add('invert');
setTimeout(() => {physToggle.style.animation = 'fader 1s forwards'; 
    physToggle.style.visibility = 'visible';
    physToggle.classList.add('rotate')}, "1000");  
});



physToggle.addEventListener("click", function matterEnable(){
    document.body.style.userSelect = 'none'
    sli.style.pointerEvents = 'none';
    toggle.style.pointerEvents = 'none';
    toggle.style.zIndex = 0;
    physToggle.style.animation = 'faderOut 0.3s forwards';
    setTimeout(() => {physToggle.style.visibility = 'hidden';
        document.querySelector('.reset-size').style.visibility = 'visible';
        document.querySelector('.reset-color').style.visibility = 'visible';
    }, "300");

    setTimeout(() => {document.querySelectorAll('#other-toggle').forEach(e => e.style.visibility = 'visible');
        document.querySelectorAll('#other-toggle').forEach(e => e.style.animation = 'fader 0.5s forwards');
    document.getElementById('body-toggle').style.visibility = 'visible';
    document.getElementById('body-toggle').style.animation = 'fader 0.5s forwards';
    document.querySelector('.pause-icon').style.visibility = 'visible';
    document.querySelector('.pause-icon').style.animation = 'fader 0.3s forwards';
    chevronItems.style.visibility = 'visible';}, "1000");

    const chevronItems = document.querySelector('.show-items');
    setTimeout(() => {
        chevronItems.classList.add('sefi-opac');
        document.querySelector('.pause-icon').style.animation = '';
    }, "1300");

    setTimeout(() => {document.getElementById('phys-toggle').style.animation = 'fader 0.3s forwards';
        document.getElementById('phys-toggle').style.visibility = 'visible';}, "1500");

    physToggle.style.transform = ''
    physToggle.classList.remove('rotate')
    sli.removeAttribute("class")

    document.getElementById('phys-toggle').addEventListener("click", function tipText(){
        document.querySelector('.arrow-text').classList.add('arrow-hover');
        document.getElementById('phys-toggle').removeEventListener("click", tipText);
        setTimeout(() => {document.querySelector('.arrow-text').classList.remove('arrow-hover');}, "7000");
    })

    Matter.use(MatterAttractors);

    let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vertices = Matter.Vertices
    Runner = Matter.Runner,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    element = document.body,
    Canvas = document.querySelector('.canvas-phys');


  let engine = Engine.create(),
  world = engine.world;

  let runner = Runner.create({
        // 600Hz delta = 1.666ms = 10upf @ 60fps (i.e. 10x default precision)
        delta: 1000 / (60 * 10),
        // 60fps minimum performance target (i.e. budget allows up to ~20ms execution per frame)
        maxFrameTime: 1000 / 60
    });
    
  Runner.run(runner,engine);
  
  let render = Render.create({
    element: document.body,
    engine: engine,
    canvas: Canvas,
    options: {
      background: 'transparent',
      wireframeBackground: 'transparent',
      wireframes: false,
      visible: false,
      width: element.clientWidth+40,
      height: element.clientHeight+40,
      pixelRatio: window.devicePixelRatio
    }
  });
    
  Render.run(render);

  const WIDTH = render.options.width;
  const HEIGHT = render.options.height;

  engine.gravity.y = 2;

  const emptyWalls ={
    isStatic: true,
    render: {
        fillStyle: 'none',
        strokeStyle: 'none',
        lineWidth: 0,
    }
}

window.addEventListener('resize', () => { 
    const width = element.clientWidth + 40;
    const height = element.clientHeight + 40;

    render.bounds.min.x = 0;
    render.bounds.min.y = 0;
    render.bounds.max.x = width;
    render.bounds.max.y = height;

    render.options.width = width;
    render.options.height = height;
    render.canvas.width = width;
    render.canvas.height = height;

    const bodies = Matter.Composite.allBodies(world);
    bodies.forEach(body => {
        Matter.Body.setPosition(body, {x: WIDTH/2, y:HEIGHT/2});
    });

    Body.setPosition(topWall, { x: width / 2, y: 0 });
    Body.setPosition(leftWall, { x: 0, y: height / 2 });
    Body.setPosition(rightWall, { x: width, y: height / 2 });
    Body.setPosition(bottomWall, { x: width / 2, y: height });
    
    Body.setVertices(topWall, Vertices.fromPath(`L 0 0 L ${width} 0 L ${width} ${thick} L 0 ${thick}`));
    Body.setVertices(leftWall, Vertices.fromPath(`L 0 0 L ${thick} 0 L ${thick} ${height} L 0 ${height}`));
    Body.setVertices(rightWall, Vertices.fromPath(`L 0 0 L ${thick} 0 L ${thick} ${height} L 0 ${height}`));
    Body.setVertices(bottomWall, Vertices.fromPath(`L 0 0 L ${width} 0 L ${width} ${thick} L 0 ${thick}`));

    Matter.Render.setPixelRatio(render, window.devicePixelRatio); 
});
   
  const thick = 50;
  let attraChck = document.getElementById('attract-check').checked;

  let topWall = Bodies.rectangle(WIDTH/2, 0, WIDTH, thick, emptyWalls)
  leftWall = Bodies.rectangle(0, HEIGHT/2, thick, HEIGHT, emptyWalls)
  rightWall = Bodies.rectangle(WIDTH, HEIGHT/2, thick, HEIGHT, emptyWalls)
  bottomWall = Bodies.rectangle(WIDTH/2, HEIGHT, WIDTH, thick, emptyWalls)

  let logo =  {
    w: 100,
    h: 105,
    elem1: document.querySelector("#slide-container"),
    body: Matter.Bodies.rectangle(WIDTH/2, HEIGHT/2, 95, 105, {
        plugin: {
            attractors: [
               function (bodyA, bodyB) {
                    if (attraChck === true) {
                        return{
                            x: (bodyA.position.x - bodyB.position.x) * 1e-5,
                            y: (bodyA.position.y - bodyB.position.y) * 1e-5,
                        };
                    }else{
                        return;
                    }      
                }
            ]
        },
        chamfer: 1,
        density: 0.02,
        frictionAir: 0.01,
        restitution: 0.3,
        render: {
            fillStyle: 'none',
            strokeStyle: 'none',
            lineWidth: 0,
        }
        
    }),
    
    render() {
        const logoAng = this.body.angle;
        const {x, y} = this.body.position;
        this.elem1.style.top = `${y-20}px`;
        this.elem1.style.bottom = `${y}px`;
        this.elem1.style.left = `${x-20}px`;
        this.elem1.style.transform = `rotate(${logoAng}rad)`;
      },
  };

  let mode = {
    w:25,
    h:25,
    elem: document.querySelector("#mode-container"),
    body: Matter.Bodies.circle(70, 75, 25, {
        restitution: 0.6,
        friction: 0.0001,
        frictionAir: 0.000001,
        density: 0.001,
        inertia: Infinity,
        render: {
            fillStyle: 'none',
            strokeStyle: 'none',
            lineWidth: 0,
        }
    }), 
    
    render() {
        const {x, y} = this.body.position;
        this.elem.style.top = `${y-75}px`;
        this.elem.style.bottom = `${y}px`;
        this.elem.style.left = `${x-51}px`;
    },
  };

Matter.Composite.add(engine.world, [topWall, leftWall, rightWall, bottomWall, logo.body, mode.body]);

function speedReset() {
    const bodies = Matter.Composite.allBodies(world);
    bodies.forEach(body => {
        let speLog = Matter.Body.getSpeed(body);
        if (speLog > 400) {
            Matter.Body.setSpeed(body, 200);
            Matter.Body.setAngularSpeed(body, 0);
            Matter.Body.setPosition(body, {x: WIDTH/2, y:HEIGHT/2});
        } });   
    requestAnimationFrame(speedReset);   
}  
speedReset();

function forceUp() {
    Body.applyForce(logo.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 0, y: -100});
    Body.applyForce(mode.body, {x: mode.body.position.x, y: mode.body.position.y}, {x: 0, y: -0.1});
    if (engine.gravity.y === 10) {
        Body.applyForce(logo.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 0, y: -200});
        Body.applyForce(mode.body, {x: mode.body.position.x, y: mode.body.position.y}, {x: 0, y: -0.3});
    }

    const bodies = Matter.Composite.allBodies(world);
    bodies.forEach(body => {
        if (body != mode.body) {
            Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: -1});
            if (engine.gravity.y === 10) {
                Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: -2});
            } 
        }
    });
};

function forceDown() {
    Body.applyForce( logo.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 0, y: 100});
    Body.applyForce( mode.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 0, y: 0.1});
    if (engine.gravity.y === 10) {
        Body.applyForce( logo.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 0, y: 200});
        Body.applyForce( mode.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 0, y: 0.3});
    }

    const bodies = Matter.Composite.allBodies(world);
    bodies.forEach(body => {
        if (body != mode.body) {
            Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: 1});
            if (engine.gravity.y === 10) {
                Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: 2});
            } 
        }
    });
};

function forceLeft() {
    Body.applyForce( logo.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: -100, y: 0});
    Body.applyForce( mode.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: -0.1, y: 0});
    if (engine.gravity.y === 10) {
        Body.applyForce( logo.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: -200, y: 0});
        Body.applyForce( mode.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: -0.3, y: 0});
    }

    const bodies = Matter.Composite.allBodies(world);
    bodies.forEach(body => {
        if (body != mode.body) {
            Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: -1, y: 0});
            if (engine.gravity.y === 10) {
                Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: -2, y: 0});
            } 
        }
    });
}

function forceRight() {
    Body.applyForce( logo.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 100, y: 0});
    Body.applyForce( mode.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 0.1, y: 0});
    if (engine.gravity.y === 10) {
        Body.applyForce( logo.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 200, y: 0});
        Body.applyForce( mode.body, {x: logo.body.position.x, y: logo.body.position.y}, {x: 0.3, y: 0});
    }

    const bodies = Matter.Composite.allBodies(world);
    bodies.forEach(body => {
        if (body != mode.body) {
            Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 1, y: 0});
            if (engine.gravity.y === 10) {
                Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 2, y: 0});
            } 
        }
    });
}


document.querySelector('.forceup-icon').addEventListener('click', forceUp);
document.querySelector('.forcedown-icon').addEventListener('click', forceDown);
document.querySelector('.forceleft-icon').addEventListener('click', forceLeft);
document.querySelector('.forceright-icon').addEventListener('click', forceRight);

document.addEventListener("keydown", function(event){
    if (event.key === "ArrowUp") {
        forceUp();
    }
    else if(event.key === "ArrowDown"){
        forceDown();
    }
    else if(event.key === "ArrowLeft"){
        forceLeft();
    }
    else if(event.key === "ArrowRight"){
        forceRight();
    }
    else if(event.key === "r"){
        matterReset();
    }
    else if(event.key === "g"){
        matterGravity();
    }
    else if(event.key === 'p'){
        matterPause();
    }
})

/*const bodies = [
...[...document.querySelectorAll("svg path")].map(path => {
    const trash = Matter.Bodies.fromVertices(
      100, 80, Matter.Svg.pathToVertices(path), {}, true
    );
    Matter.Body.scale(trash, 0.2, 0.2);
    return trash;
  })
];
Matter.Composite.add(engine.world, bodies);*/

let mouse = Mouse.create(document.body);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 1,
    render: {
      visible: false
    }
  }
});

mouse.element.removeEventListener("wheel", mouse.mousewheel);

Matter.Mouse.setOffset(mouse, {x: 20, y: 20})

Matter.Composite.add(engine.world, mouseConstraint)

render.mouse = mouse;

(function rerender() {
    logo.render();
    mode.render();
    //Matter.Engine.update(engine);//
    requestAnimationFrame(rerender);
})();

document.querySelector(".back-icon").addEventListener("click", function(){
    window.top.location = window.top.location;
})

let cooldown = false;

function matterReset(){
    
    if (cooldown) {
        return;
    }

    cooldown = true;
    setTimeout(() => {cooldown = false;}, '500')

    Matter.Composite.clear(engine.world, false);
    toggle.style.animation = 'faderOut 0.2s forwards';
    sli.style.animation = 'faderOut 0.2s forwards';
    setTimeout(() => {World.add(engine.world, [logo.body, mode.body]);
        Matter.Composite.add(engine.world, [topWall, leftWall, rightWall, bottomWall]);
        Matter.Composite.add(engine.world, mouseConstraint);
        Matter.Body.setPosition(mode.body, {x: WIDTH/2, y:HEIGHT/2});
        Matter.Body.setPosition(logo.body, {x: WIDTH/2, y:HEIGHT/2});
        Matter.Body.setSpeed(mode.body, 0);
        Matter.Body.setSpeed(logo.body, 0);
        Matter.Body.setAngularSpeed(logo.body, 0);
        Matter.Body.setAngle(logo.body, 0);
        toggle.style.animation = 'fader 0.2s forwards';
        sli.style.animation = 'fader 0.2s forwards';
    }, '300') 
};

document.querySelector(".reset-icon").addEventListener("click", matterReset);

function matterGravity(){
    document.querySelector('.gravity-icon').classList.add('gravity-pic');

    switch (engine.gravity.y) {
        case 10:
            engine.gravity.y=0;
            document.querySelector('.gravity-pic').style.backgroundImage = 'url(icons/gravitymeter-0.png)';
            break;
        
        case 0:
            engine.gravity.y=2;
            document.querySelector('.gravity-pic').style.backgroundImage = 'url(icons/gravitymeter-1.png)';
            break;
        
        case 2:
            engine.gravity.y=10;
            document.querySelector('.gravity-pic').style.backgroundImage = 'url(icons/gravitymeter-2.png)';
            break;
    }
};
document.querySelector('.gravity-icon').addEventListener("click", matterGravity);

function matterPause() {
    if (wrapper.classList.contains('opac')) {
        const bodies = Matter.Composite.allBodies(world);
        bodies.forEach(body => {
            if (body != topWall && body != leftWall && body != rightWall && body != bottomWall) {
                body.isStatic = false;
            }
        });
        document.querySelector('.pause-icon').classList.remove('play-icon');
        wrapper.classList.remove('opac');
        wrapper.style.pointerEvents = '';
        if(light.classList.contains('mode-opac')){
            body.classList.remove('darken-light');
            
        }
        else{
            body.classList.remove('darken');
        }
    }
    
    else{
        const bodies = Matter.Composite.allBodies(world);
            bodies.forEach(body => {
                body.isStatic = true;
        });
        document.querySelector('.pause-icon').classList.add('play-icon')
        wrapper.classList.add('opac');
        wrapper.style.pointerEvents = 'none';
        if(light.classList.contains('mode-opac')){
            body.classList.add('darken-light');
            
        }
        else{
            body.classList.add('darken');
        }
    }
}

document.querySelector('.pause-icon').addEventListener('click', matterPause);

const ranWrapper = document.getElementById('range-wrapper');

document.querySelector('.setting-icon').addEventListener("click", function(){
    
    if (ranWrapper.classList.contains('opac')) {
        const bodies = Matter.Composite.allBodies(world);
        bodies.forEach(body => {
            if (body != topWall && body != leftWall && body != rightWall && body != bottomWall) {
                body.isStatic = false;
            }
        });
        chevronItems.style.pointerEvents = ''
        document.querySelector('.pause-icon').classList.remove('opac');
        document.querySelector('.pause-icon').style.pointerEvents = '';
        document.querySelector('.reset-size').style.animation = 'faderOut 0.2s forwards';
        document.querySelector('.reset-size').style.pointerEvents = 'none';
        document.querySelector('.reset-color').style.animation = 'faderOut 0.2s forwards';
        document.querySelector('.reset-color').style.pointerEvents = 'none'
        document.getElementById('setting-drop').style.animation = 'faderSlideUp 0.2s forwards';
        setTimeout(() => {document.getElementById('setting-drop').style.visibility = 'hidden';
            document.getElementById('attract-check').style.display = 'none'
            document.querySelector('.drop-slider').style.opacity = '0';
            document.getElementById('setting-drop').style.animation = '';
        }, 200)
        ranWrapper.classList.remove('opac');
        if(light.classList.contains('mode-opac')){
            body.classList.remove('darken-light');
        }
        else{
            body.classList.remove('darken');
        }
    }else{
        const bodies = Matter.Composite.allBodies(world);
        bodies.forEach(body => {
            body.isStatic = true;
        });
        chevronItems.style.pointerEvents = 'none'
        document.querySelector('.pause-icon').classList.add('opac');
        document.querySelector('.pause-icon').style.pointerEvents = 'none';
        document.getElementById('attract-check').style.display = ''
        document.getElementById('setting-drop').style.visibility = 'visible'
        document.querySelector('.drop-slider').style.opacity = '1';
        document.getElementById('setting-drop').style.animation = 'faderSlideDown 0.3s forwards'
        setTimeout(() => {document.getElementById('setting-drop').style.animation = ''}, 300)
        ranWrapper.classList.add('opac');
        if(light.classList.contains('mode-opac')){
            body.classList.add('darken-light');
            
        }
        else{
            body.classList.add('darken');
        }
    }
});

wrapper.addEventListener("click", function(event){ 
  if (!document.getElementById('body-toggle').contains(event.target) && (!chevronItems.contains(event.target)) && (!itemCont.contains(event.target)) && (!document.getElementById('setting-drop').contains(event.target))) {
    ranWrapper.style.pointerEvents = '';
    document.querySelector('.pause-icon').classList.remove('opac');
    document.querySelector('.pause-icon').style.pointerEvents = '';
    chevronItems.style.pointerEvents = 'none'
    setTimeout(() => {chevronItems.style.pointerEvents = ''}, 300)
    chevronItems.classList.remove('it-disabled');
    chevronItems.classList.remove('show-items-clicked');
    chevronItems.classList.remove('full-opac');
    chevronItems.classList.add('sefi-opac');
    itemCont.classList.remove('itemgoUp');
    settIcon.style.pointerEvents = '';
    settIcon.classList.remove('opac');
    const bodies = Matter.Composite.allBodies(world);
        bodies.forEach(body => {
            if (body != topWall && body != leftWall && body != rightWall && body != bottomWall) {
                body.isStatic = false;
            }
            
    });
    document.querySelector('.reset-size').style.animation = 'faderOut 0.2s forwards';
    document.querySelector('.reset-size').style.pointerEvents = 'none';
    document.querySelector('.reset-color').style.animation = 'faderOut 0.2s forwards';
    document.querySelector('.reset-color').style.pointerEvents = 'none'
    document.getElementById('setting-drop').style.animation = 'faderSlideUp 0.2s forwards'
    setTimeout(() => {document.getElementById('setting-drop').style.visibility = 'hidden';
        document.getElementById('attract-check').style.display = 'none'
        document.querySelector('.drop-slider').style.opacity = '0';
        document.getElementById('setting-drop').style.animation = ''; 
    }, 200)
    ranWrapper.classList.remove('opac');
    if(light.classList.contains('mode-opac')){
        body.classList.remove('darken-light');
            
    }
    else{
        body.classList.remove('darken');
    }
    }
});

const dropSlider = document.querySelector('.drop-slider');
const dropProgress = document.querySelector('.drop-progress');
const dropThumb = document.querySelector('.drop-thumb');

const dropColor = document.querySelector('.color-slider');
const colorProgress = document.querySelector('.color-progress');
const colorThumb = document.querySelector('.color-thumb');

flag1 = false;
flag2 = false;

document.querySelector('.reset-color').addEventListener('click', function resetColor(){
    document.querySelector('.reset-color').style.animation = 'faderOut 0.2s forwards';
    document.querySelector('.reset-color').style.pointerEvents = 'none'
    flag1 = true;
    document.querySelector('.color-progress').style.background = 'linear-gradient(45deg, purple, rgb(22, 22, 194))';
    document.querySelector('.slide').style.background = 'linear-gradient(45deg, purple, rgb(22, 22, 194))';
    dropColor.value = 110;
    colorSlider(); 
});

document.querySelector('.reset-size').addEventListener('click', function resetColor(){
    document.querySelector('.reset-size').style.animation = 'faderOut 0.2s forwards';
    document.querySelector('.reset-size').style.pointerEvents = 'none'
    flag2 = true;
    dropSlider.value = 10;
    rangeSlider();
    matterSizer();
});

function rangeSlider() {
    const sizeValue = (dropSlider.value / dropSlider.max) * 94 + '%';
    dropProgress.style.width = sizeValue;
    dropThumb.style.left = sizeValue;
}

function colorSlider(){
    const colorValue = (dropColor.value / dropColor.max) * 94 +4 + '%'; 
    colorProgress.style.width = colorValue;
    colorThumb.style.left = (dropColor.value / dropColor.max) * 93 + '%';
}

let preValue = 1;

function matterSizer(){
    const value = dropSlider.value / 10 
    const scaleForm = value/preValue
    Body.scale(logo.body, scaleForm, scaleForm);
    preValue = value;

    document.querySelector("#slide-container").style.scale = (dropSlider.value / dropSlider.max) * 250 + '%';
}

function matterColor(){
    let value = dropColor.value
    let color = 'hsl(' + value + ', 100%, 50%)';
    document.querySelector('.color-progress').style.background = color;
    document.querySelector('.slide').style.background = color;
}

dropColor.addEventListener("input", function(){
    matterColor();
    colorSlider();
    if (flag1 === true) {
        dropColor.value = 110;
        colorSlider();
        flag1 = false;
    }
    if (dropColor.value != '110') {
        document.querySelector('.reset-color').style.pointerEvents = '';
        document.querySelector('.reset-color').style.animation = 'fader 0.2s forwards';
    }
})

dropSlider.addEventListener('input', function(){
    rangeSlider();
    matterSizer();
    if (flag2 === true) {
        dropSlider.value = 10;
        rangeSlider();
        matterSizer()
        flag2 = false;
    }
    if(dropSlider.value != '10'){
        document.querySelector('.reset-size').style.pointerEvents = '';
        document.querySelector('.reset-size').style.animation = 'fader 0.2s forwards';
    }
})

dropSlider.addEventListener("mouseover", function(){
    dropProgress.style.animation = 'fader 0.3s forwards';
});

dropSlider.addEventListener("mouseleave", function(){
    dropProgress.style.animation = 'faderOut 0.3s forwards';
});

dropColor.addEventListener("mouseover", function(){
    colorProgress.style.animation = 'fader 0.3s forwards';
});

dropColor.addEventListener("mouseleave", function(){
    colorProgress.style.animation = 'faderOut 0.3s forwards';
});

const itemCont = document.getElementById('item-container')
const settIcon = document.querySelector('.setting-icon')

chevronItems.addEventListener('click', function(){
    if (chevronItems.classList.contains('show-items-clicked')) {
        chevronItems.style.pointerEvents = 'none'
        setTimeout(() => {chevronItems.style.pointerEvents = ''}, 300)
        chevronItems.classList.remove('it-disabled');
        chevronItems.classList.remove('show-items-clicked');
        ranWrapper.classList.remove('opac');
        chevronItems.classList.remove('full-opac');
        chevronItems.classList.add('sefi-opac');
        document.querySelector('.pause-icon').classList.remove('opac');
        document.querySelector('.pause-icon').style.pointerEvents = '';
        settIcon.classList.remove('opac');
        settIcon.style.pointerEvents = '';
        ranWrapper.style.pointerEvents = '';
        itemCont.classList.remove('itemgoUp');
        if(light.classList.contains('mode-opac')){
            body.classList.remove('darken-light');    
        }
        else{
            body.classList.remove('darken');
        }

    }else{
        chevronItems.classList.add('it-disabled');
        chevronItems.classList.add('show-items-clicked');
        chevronItems.classList.remove('sefi-opac');
        chevronItems.classList.add('full-opac');
        ranWrapper.classList.add('opac');
        document.querySelector('.pause-icon').classList.add('opac');
        document.querySelector('.pause-icon').style.pointerEvents = 'none';
        settIcon.classList.add('opac');
        settIcon.style.pointerEvents = 'none';
        ranWrapper.style.pointerEvents = 'none';
        itemCont.classList.add('itemgoUp');
        if(light.classList.contains('mode-opac')){
            body.classList.add('darken-light');
            
        }
        else{
            body.classList.add('darken');
        }
    }

});

const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
const circle = document.querySelector('.circle-inner');
const triangle = document.querySelector('.triangle-inner');
const poly = document.querySelector('.poly-inner');

let cirSize = 30;
let triSize = 30;
let polySize = 30;

plus.addEventListener('click', function(){
    if(circleChck.checked === true){circle.classList.remove('shape-shrink');}
    if(triangleChck.checked === true){triangle.classList.remove('shape-shrink');}
    if(polyChck.checked === true){poly.classList.remove('shape-shrink');} 

    if(circleChck.checked === true){circle.classList.add('shape-grow'); cirSize = 100}
    if(triangleChck.checked === true){triangle.classList.add('shape-grow'); triSize = 100}
    if(polyChck.checked === true){poly.classList.add('shape-grow'); polySize = 100}
});

minus.addEventListener('click', function(){
    if (circle.classList.contains('shape-grow')) {
        if(circleChck.checked === true){circle.classList.remove('shape-grow'); cirSize = 50;}
        if(triangleChck.checked === true){triangle.classList.remove('shape-grow'); triSize = 50;}
        if(polyChck.checked === true){poly.classList.remove('shape-grow'); polySize = 50;}
        
    }
    else{
        if(circleChck.checked === true){circle.classList.add('shape-shrink'); cirSize = 8;}
        if(triangleChck.checked === true){triangle.classList.add('shape-shrink'); triSize = 8}
        if(polyChck.checked === true){poly.classList.add('shape-shrink'); polySize = 8}
    }   
});

const circleOut = document.querySelector('.circle');
const circleChck = document.getElementById('circle-check')
const triangleOut = document.querySelector('.triangle');
const triangleChck = document.getElementById('triangle-check')
const polyOut = document.querySelector('.polygon');
const polyChck = document.getElementById('poly-check')

circleOut.classList.add('full-opac');
circleChck.classList.add('full-opac');
triangleOut.classList.add('full-opac');
triangleChck.classList.add('full-opac');
polyOut.classList.add('full-opac');
polyChck.classList.add('full-opac');
circleChck.checked = true;
triangleChck.checked = true;
polyChck.checked = true;

function circleShow(){
    if (circleOut.classList.contains('full-opac')) {
        circleOut.classList.remove('full-opac');
        circleChck.classList.remove('full-opac');
        circleChck.checked = false;
    }
    else{
        circleOut.classList.add('full-opac');
        circleChck.classList.add('full-opac');
        circleChck.checked = true;
    }
};

circleChck.addEventListener('click', circleShow);

function triangleShow(){
    if (triangleOut.classList.contains('full-opac')) {
        triangleOut.classList.remove('full-opac');
        triangleChck.classList.remove('full-opac');
        triangleChck.checked = false;
    }
    else{
        triangleOut.classList.add('full-opac');
        triangleChck.classList.add('full-opac');
        triangleChck.checked = true;
    }
};

triangleChck.addEventListener('click', triangleShow);

function polyShow(){
    if (polyOut.classList.contains('full-opac')) {
        polyOut.classList.remove('full-opac');
        polyChck.classList.remove('full-opac');
        polyChck.checked = false;
    }
    else{
        polyOut.classList.add('full-opac');
        polyChck.classList.add('full-opac');
        polyChck.checked = true;
    }
};

polyChck.addEventListener('click', polyShow);

document.getElementById('attract-check').addEventListener('click', function(){
    if (attraChck === true) {
        document.getElementById('attract-check').classList.remove('full-opac');
        attraChck = false;
    }
    else{
        document.getElementById('attract-check').classList.add('full-opac');
        attraChck = true;
    }
    document.getElementById('attract-check').checked = attraChck;
});

function addHide(){
    if (circleOut.classList.contains('full-opac') || triangleOut.classList.contains('full-opac') || polyOut.classList.contains('full-opac')) {
        document.getElementById('size-select').classList.remove('opac');
        document.getElementById('size-select').style.pointerEvents = '';
        document.querySelector('.generate').classList.remove('opac');
        document.querySelector('.generate').style.pointerEvents = '';
    }
    else{
        document.getElementById('size-select').classList.add('opac');
        document.getElementById('size-select').style.pointerEvents = 'none';
        document.querySelector('.generate').classList.add('opac');
        document.querySelector('.generate').style.pointerEvents = 'none';
    }  
}addHide();

circleChck.addEventListener('click', addHide);
triangleChck.addEventListener('click', addHide);
polyChck.addEventListener('click', addHide);

document.querySelector('.generate').addEventListener('click', function(){
    let cCheck = circleChck.checked;
    let tCheck = triangleChck.checked;
    let pCheck = polyChck.checked;

    if (cCheck === true) {  
        if (cirSize === 8) {
            let cirStack = Matter.Composites.stack(WIDTH/2-100, 0, 8, 8, 0, 0, function(x, y) {
                return Bodies.circle(x, y, cirSize,{
                    density: 0.01,
                });
            });
            Matter.Composite.add(engine.world, cirStack);

        }else{
            let cir = Bodies.circle(WIDTH/2, 0, cirSize);
            Matter.Composite.add(engine.world, cir); 
        }
    }
    
    if (tCheck === true) {
        if (triSize === 8) {
            let triStack = Matter.Composites.stack(WIDTH/2-100, 0, 8, 8, 0, 0, function(x, y) {
                return Bodies.polygon(x, y, 3, triSize, {
                    density: 0.01,
                });
            });
            Matter.Composite.add(engine.world, triStack);
        } else {
            let tri = Bodies.polygon(WIDTH/2-100, 30, 3, triSize);
            Matter.Composite.add(engine.world, tri); 
        }
    }
    
    if (pCheck === true) {
        if (polySize === 8) {
            let polyStack = Matter.Composites.stack(WIDTH/2+100, 0, 8, 8, 0, 0, function(x, y) {
                return Bodies.polygon(x, y, 5, polySize, {
                    density: 0.01,
                });
            });
            Matter.Composite.add(engine.world, polyStack);
        } else {
            let polyg = Bodies.polygon(WIDTH/2+100, 30, 5, polySize);
            Matter.Composite.add(engine.world, polyg); 
        }
    }
});

});
