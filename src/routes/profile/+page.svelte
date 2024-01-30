<script lang=ts>
    import { onMount} from 'svelte';
    import websocketStore from '../../stores/websocket.js';
    import Colorpicker from '$lib/Colorpicker.svelte';

onMount(() => {
    let ws = $websocketStore;
    let nameinput = document.getElementById('nameinput') as HTMLInputElement;
    ws.setPlayerName(localStorage.getItem("playername") || ws.getPlayerName());
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
<div class = "flex mt-10">
    <div class = "block m-auto scrollBox bg-black bg-opacity-10 p-10 rounded-lg">


        <div class = flex><p class = "text-2xl text-white m-auto"> parameters </p></div>
        
        
        <div class = "mainbox hover:scale-[1.05] duration-100">
                <div class = flex>
                <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg mb-10 text-center ">Change your name here</h1>
                </div>
                <div class = "flex">
                    <div class = "m-auto">
                        <input id = nameinput class = searchbar>

                    </div>
                </div>
            </div>
        

        <div class = "mainbox">
            <div class = flex>
            <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Color theme</h1>
            </div>
            <div class = "flex">
                <div class = "m-auto">
                    <Colorpicker/>

                </div>
            </div>
        </div>

    <div class = "pb-[100px]"></div>

    </div>
</div>