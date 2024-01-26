
<script lang=ts>
    import websocketStore from '../../stores/websocket.js';
    import { onMount, onDestroy} from 'svelte';
    import * as PIXI from 'pixi.js';

    let app: PIXI.Application;
    let canvasContainer: HTMLDivElement;

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
                quit();
                window.location = "/";
            });
        }        

        app = new PIXI.Application({ 
            backgroundColor: 0x1099bb 
        });
    
        //add a circle
        let circle = new PIXI.Graphics();
        circle.beginFill(0x9966FF);
        circle.drawCircle(0, 0, 10);
        circle.endFill();
        circle.name = "circle";
        circle.addChild(new PIXI.Text(ws.getPlayerName()));
  
    
        app.ticker.add(() => {
            var mousepos = (app.renderer.events as any).rootPointerEvent.global;
            // circle at mouse position where mouse is
            circle.rotation += 0.1;
            circle.transform.position.x = mousepos.x;
            circle.transform.position.y = mousepos.y;

            ws.send(mousepos.x + " " + mousepos.y);
            let c = new PIXI.Graphics();
            c.beginFill(0x996600);
            c.transform.position.x = Math.random()*canvasContainer.clientWidth;
            c.transform.position.y = Math.random()*canvasContainer.clientHeight;
    
    
        });


        let quit = () => {
            ws.close();
            app.destroy(true);
            
        }
  
        app.stage.addChild(circle);
        
        (app.view as unknown as HTMLDivElement).classList.add("rounded-lg", "shadow-xl");

        canvasContainer.appendChild(app.view as unknown as Node);
        onDestroy(() => {
            quit();
        });


    });
  
  
</script>



<div class = "flex mt-10">

    <div class = "m-auto">
        <div bind:this={canvasContainer}></div>  

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

