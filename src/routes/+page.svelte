
<script lang=ts>

    import { SpringSocketServer } from '../lib/connectionManager.ts';
    import { onMount, onDestroy } from 'svelte';
    import * as PIXI from 'pixi.js';  

  let app: PIXI.Application;
  let canvasContainer: HTMLDivElement;


  onMount(() => {
    let springSocketServer = new SpringSocketServer(); 
        let sendButton = document.getElementById('sendButton');
            if (sendButton != null){
                sendButton.addEventListener('click', () => {
                springSocketServer.send("hello je suis un messsage");
            });
        }
    app = new PIXI.Application({ 
      width: 800, 
      height: 600, 
      backgroundColor: 0x1099bb 
    });

    //add a circle
    let circle = new PIXI.Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, 10);
    circle.endFill();
    circle.name = "circle";
    circle.addChild(new PIXI.Text("hello world"));
    
    app.ticker.add(() => {
      console.log("state", );
      var mousepos = (app.renderer.events as any).rootPointerEvent.global;
      // circle at mouse position where mouse is
      circle.rotation += 0.1;
      circle.transform.position.x = mousepos.x;
      circle.transform.position.y = mousepos.y;
      if (springSocketServer.getState() != 0)
      springSocketServer.send(mousepos.x + " " + mousepos.y);


    });
    

    app.stage.addChild(circle);
    (app.view as unknown as HTMLDivElement).classList.add("rounded-lg", "shadow-xl", "mt-10");
    canvasContainer.appendChild(app.view as unknown as Node);


    onDestroy(() => {
      app.destroy(true);
      springSocketServer.close();
    });
    // Votre logique de jeu ou graphique ici
  });


</script>

<div class = "flex">
  <div class = "m-auto">
    <div class = "m-auto " bind:this={canvasContainer}></div>
    <button id = sendButton class = "m-auto p-5 bg-slate-600 mt-10 rounded-xl text-white"> send message</button>
  </div>
</div>
