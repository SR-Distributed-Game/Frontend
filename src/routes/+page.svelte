<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import websocketStore from '../stores/websocket.js';
  import { knownSockets } from '../lib/Servers';
  

  onMount(() => {
    const connectButton = document.getElementById('connectButton');
    const ws = $websocketStore; 
    let searchservers = document.getElementById('searchservers') as HTMLSelectElement;


    const sel = document.getElementById("existingList");

    for(var sk in knownSockets){
      const opt = document.createElement("option");
      opt.value = sk;
      opt.text = sk;
      searchservers.add(opt, null);
    }

  


    if (connectButton) {
      connectButton.addEventListener('click', async () => {
      try {
        await ws.connectTo(searchservers.value);
        // Navigate after successful connection
        goto("/game");
      } catch (error) {
        console.error("Failed to connect:", error);
        // Handle connection failure (e.g., show error message)
      }
    });

    }
  });

</script>


<div class = "flex">

  <div class = "mainbox">
    <div class = flex>
      <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Welcome to our multiplayer game !</h1>
    </div>
      <div class = "flex">
        <div class = "m-auto">

          <p class = "text-white text-center text-lg">in this game the goal is to catch fruit faster than other players ! join a room and become the biggest player !</p>
        </div>
      </div>
    </div>

    <div class = "mainbox">
      <div class = flex>
        <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Choose a server in the list and start to play !</h1>
      </div>
        <div class = "flex">
          <div class = "m-auto">
  
            <button id = connectButton class = " buttonconnect">Play</button>
          </div>
        </div>
      </div>
</div>
