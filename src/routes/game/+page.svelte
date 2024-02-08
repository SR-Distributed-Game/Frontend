<script lang=ts>
    
    import websocketStore from '../../stores/websocket.js';
    import { onMount, onDestroy} from 'svelte';
    import { Game } from '$lib/GameEngine/Game.js';
    import { sweetGameScene } from '$lib/implementedGames/SweetGameScene.js';
    import { LeaderboardLogic } from '$lib/LeaderboardLogic.js';
    import { gameRequest } from '$lib/gameRequest.js';
    import { gameRequestFactory } from '$lib/gameRequestFactory.js';

    const ws = $websocketStore;
    onMount(async () => {

        const p5module = await import('p5');
        const p5 = p5module.default;

        const joinrequest = gameRequestFactory.getJoinRoomRequest();
        joinrequest.Metadata.clientID = ws.getClientID();
        ws.send(joinrequest);
        
        let quitButton = document.getElementById('quitButton');

        if (quitButton != null){
            quitButton.addEventListener('click', () => {
                window.location.assign("/");
            });
        }

        ws.getDispatcher().subscribe(Game.getInstance());
        ws.getDispatcher().subscribe(LeaderboardLogic.getInstance());
        const sketch = (p:any) => {
            let game:Game = Game.getInstance();
        
            game.setScene(new sweetGameScene());
            p.setup = () => {
                let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('canvas-container');

                p.windowResized = () => {
                    var newValue = Math.min(p.windowWidth, p.windowHeight);
                    p.resizeCanvas(p.windowWidth, p.windowHeight);
                };
                game.Mstart(p); 
            };

            p.draw = () => {
                p.background("#101010");
                game.runFrame(p);  
            };
        };

        new p5(sketch);

        let endGame = () => {
            Game.getInstance().end();
            window.location.assign("/");
        }
    });

    onDestroy(() => {
        Game.getInstance().end();
        ws.getDispatcher().unsubscribe(Game.getInstance());
        ws.getDispatcher().unsubscribe(LeaderboardLogic.getInstance());
        ws.close();

    });



</script>


<div class = "flex" id=rules>

    <div class = "bg-black bg-opacity-40 rounded-lg p-2 flex hover:bg-red-800 hover:scale-105 duration-75 absolute right-10 top-10" id=actions>
        <a href =/ id = quitButton class = "p-5  text-white  hover:scale-105 duration-75 hover:text-red-300"> disconnect <i class = "fa fa-sign-out "></i></a>  
    </div>

</div>

<div id="canvas-container"></div>
