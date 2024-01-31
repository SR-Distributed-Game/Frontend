<script lang=ts>
    
    import websocketStore from '../../stores/websocket.js';
    import { onMount, onDestroy} from 'svelte';
    import { Game } from '$lib/GameEngine/Game.js';
    import { sweetGame } from '$lib/implementedGames/SweetGame.js';

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
            let game = new sweetGame();


            p.setup = () => {


                p.frameRate(60);
                var newValue = Math.min(p.windowWidth/2, p.windowHeight/1.4);
                let canvas = p.createCanvas(newValue, newValue);

               
                canvas.addClass('rounded-lg');
                canvas.addClass('shadow-xl');
                canvas.parent('canvas-container');

               
                p.windowResized = () => {
                    var newValue = Math.min(p.windowWidth/2, p.windowHeight/1.4);
                    p.resizeCanvas(newValue, newValue);
                };

                game.Mstart(p); 

            };

            p.draw = () => {
                p.background(200);
                game.update(p); 
                game.draw(p);  
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

    <div class = " bg-black bg-opacity-30 p-2 rounded-xl m-auto text-white text-2xl" > move with keyboard arrow</div>

</div>
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

