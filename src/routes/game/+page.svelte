<script lang=ts>
    
    import websocketStore from '../../stores/websocket.js';
    import { onMount, onDestroy} from 'svelte';
    import { Game } from '$lib/GameEngine/Game.js';
    import { sweetGameScene } from '$lib/implementedGames/SweetGameScene.js';

    const ws = $websocketStore;
    onMount(async () => {

        const p5module = await import('p5');
        const p5 = p5module.default;

        let quitButton = document.getElementById('quitButton');
        if (quitButton != null){
            quitButton.addEventListener('click', () => {
                window.location.assign("/");
            });
        }

        ws.getDispatcher().subscribe(Game.getInstance());
        const sketch = (p:any) => {
            let game:Game = Game.getInstance();
        
            game.setScene(new sweetGameScene());
            p.setup = () => {
                var newValue = Math.min(p.windowWidth/1.2, p.windowHeight/1.4);
                let canvas = p.createCanvas(p.windowWidth/1.2, newValue);
                canvas.addClass('rounded-lg');
                canvas.addClass('shadow-xl');
                canvas.parent('canvas-container');

                p.windowResized = () => {
                    var newValue = Math.min(p.windowWidth, p.windowHeight/1.4);
                    p.resizeCanvas(p.windowWidth/1.2, newValue);
                };
                game.Mstart(p); 
            };

            p.draw = () => {
                p.background("#101010");
                game.runFrame(p);  
            };
        };

        new p5(sketch);

    });

    onDestroy(() => {
        ws.getDispatcher().unsubscribe(Game.getInstance());
        ws.close();
    });
  
</script>


<div class = "flex mt-2" id=rules>

    <div class = " bg-black bg-opacity-30 p-2 rounded-xl m-auto text-white text-2xl" >move with keyboard arrow to eat</div>
    <div class = " bg-black bg-opacity-30 p-2 rounded-xl m-auto text-white text-2xl" >click to activate traps</div>
    <div class = "bg-black bg-opacity-40 rounded-lg p-2 flex m-auto hover:bg-red-800 hover:scale-105 duration-75" id=actions>
        <button id = quitButton class = "p-5  text-white  hover:scale-105 duration-75 hover:text-red-300"> disconnect <i class = "fa fa-sign-out "></i></button>  
    </div>

</div>
<div class = "flex mt-10">
    <div class = "m-auto" id=canvacontainer>
        <div id="canvas-container"></div>
    </div>
</div>

