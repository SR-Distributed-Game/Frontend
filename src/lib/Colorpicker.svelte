<script lang=ts>
    import { onMount} from 'svelte';
    import websocketStore from '../stores/websocket.js';
onMount(() => {


    let ws = $websocketStore;
    let nameinput = document.getElementById('nameinput') as HTMLInputElement;
    ws.setPlayerName(localStorage.getItem("playername") || "player");
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


<div>
    je suis un colorpicker
</div>