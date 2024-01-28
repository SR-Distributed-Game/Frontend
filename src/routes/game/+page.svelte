
<script lang=ts>
    import websocketStore from '../../stores/websocket.js';
    import { onMount, onDestroy} from 'svelte';
    import * as PIXI from 'pixi.js';
    import { Game } from '$lib/GameEngine/Game.js';
    import p5  from 'p5';
    import { sweetGame } from '$lib/implementedGames/SweetGame.js';

    const ws = $websocketStore;

    onMount(() => {
        let sendButton = document.getElementById('sendButton');
        if (sendButton != null){
            sendButton.addEventListener('click', () => {
                ws.send("hello je suis un messsage");
            });
        }

        let quitButton = document.getElementById('quitButton');
        if (quitButton != null){
            quitButton.addEventListener('click', () => {
                window.location = "/";
            });
        }        

        ws.getDispatcher().subscribe(Game.getInstance());
        const sketch = (p:any) => {
            let game = new sweetGame();


            p.setup = () => {
                game.start(p); // Initialize the game
                let canvas = p.createCanvas(400, 400);
                //add a class to the canvas element
                canvas.addClass('rounded-lg');
                canvas.addClass('shadow-xl');
                canvas.parent('canvas-container');
            };

            p.draw = () => {
                p.background(200);
                game.update(p); // Pass p5 instance to update
                game.draw(p);   // Pass p5 instance to draw
            };
        };

        new p5(sketch);

    });
  
</script>


<div class = "flex mt-10">

    <div class = "m-auto" id=canvacontainer>
        <div id="canvas-container"></div>
    </div>

    <div class = "bg-black bg-opacity-40 rounded-lg p-5 block m-auto" id=actions>
        <div class = flex>
            <p class = "text-xl text-white">actions</p>
        </div>

        <div class="bg-gray-800 h-px my-2"></div>

        <div class = "flex ">
            <button id = quitButton class = "p-5 text-[50px] text-white m-auto hover:scale-105 duration-75 hover:text-red-300"> <i class = "fa fa-sign-out "></i></button>  
        </div>

        <div class="bg-gray-800 h-px my-2"></div>

        <div class = flex>
            <button id = sendButton class = "p-5 text-[50px] text-white m-auto hover:scale-105 duration-75 hover:text-green-300 ">send</button>
        </div>
    </div>


</div>

