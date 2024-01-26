
<script lang=ts>
    import websocketStore from '../../stores/websocket.js';

    import { onMount, onDestroy,getContext } from 'svelte';
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
      app = new PIXI.Application({ 
  
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
        c.drawCircle(0, 0, 10);
        c.endFill();
        c.name = "circle" + app.stage.children.length;
        c.addChild(new PIXI.Text(c.name));
  
        app.stage.addChild(c);
  
  
      });
      
  
      app.stage.addChild(circle);
      (app.view as unknown as HTMLDivElement).classList.add("rounded-lg", "shadow-xl", "mt-10");
      canvasContainer.appendChild(app.view as unknown as Node);
  
  
      onDestroy(() => {
        app.destroy(true);
        ws.close();
      });
    });
  
  
  </script>
  
  <div class = "flex">
    <div class = "m-auto">
      <div class = "m-auto " bind:this={canvasContainer}></div>
      <button id = sendButton class = "m-auto p-5 bg-slate-600 mt-10 rounded-xl text-white"> send message</button>
    </div>
  </div>
  