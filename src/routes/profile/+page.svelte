<script lang=ts>
    import { onMount} from 'svelte';
    import websocketStore from '../../stores/websocket.js';
onMount(() => {


    let ws = $websocketStore;
    let nameinput = document.getElementById('nameinput') as HTMLInputElement;
    
    nameinput.value = ws.getPlayerName();

    nameinput.addEventListener('change', () => {
        if (nameinput.value.length < 3){
            alert("name must be at least 3 characters long");
            return;
        }
        ws.setPlayerName(nameinput.value);
        localStorage.setItem("playername", nameinput.value);
        console.log("name changed to " + nameinput.value);
    });

});

</script>

<div class = flex>
    <div class = "mainbox m-auto">
        <div class = flex>
        <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Change your name here</h1>
        </div>
        <div class = "flex">
            <div class = "m-auto">
                <input id = nameinput class = searchbar>

            </div>
        </div>
    </div>

</div>