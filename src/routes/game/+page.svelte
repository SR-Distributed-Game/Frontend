<script lang=ts>
    
    import websocketStore from '../../stores/websocket.js';
    import { onMount, onDestroy} from 'svelte';
    import { Game } from '$lib/GameEngine/Game.js';
    import { sweetGameScene } from '$lib/implementedGames/SweetGameScene.js';
    import { LeaderboardLogic } from '$lib/LeaderboardLogic.js';
    import Leaderboard from '$lib/Leaderboard.svelte';
    import { gameRequestFactory } from '$lib/gameRequestFactory.js';
    const ws = $websocketStore;

    onMount(async () => {

        const joinrequest = gameRequestFactory.getJoinRoomRequest();
        joinrequest.Metadata.clientID = ws.getClientID();
        ws.send(joinrequest)

        const updateLeaderboard = () => {
            let leaderboard = LeaderboardLogic.getInstance().asHTMLList();
            let leaderboardDiv = document.getElementById('leaderboard');
            leaderboardDiv!.innerHTML = leaderboard;
        }

        let quitButton = document.getElementById('quitButton');
        if (quitButton != null){
            quitButton.addEventListener('click', () => {
                const leaveRequest = gameRequestFactory.getLeavingRoomRequest();
                leaveRequest.Metadata.clientID = ws.getClientID();
                ws.send(leaveRequest);
                window.location.assign("/");
            });
        }

        ws.getDispatcher().subscribe(LeaderboardLogic.getInstance());
        LeaderboardLogic.getInstance().addupdateLeaderboardListener(() => {updateLeaderboard();});
    });

    onDestroy(() => {

        ws.getDispatcher().unsubscribe(LeaderboardLogic.getInstance());
        ws.close();
    });
  
</script>


<div class = "flex mt-2" id=rules>

    <div class = "bg-black bg-opacity-40 rounded-lg p-2 flex m-auto hover:bg-red-800 hover:scale-105 duration-75" id=actions>
        <button id = quitButton class = "p-5  text-white  hover:scale-105 duration-75 hover:text-red-300"> disconnect <i class = "fa fa-sign-out "></i></button>
    </div>



</div>

<Leaderboard></Leaderboard>
