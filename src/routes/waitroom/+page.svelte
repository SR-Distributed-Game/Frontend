<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import websocketStore from '../../stores/websocket.js';
    import { knownSockets } from '../../lib/Servers';
    
  
    onMount(() => {
      const joinButton = document.getElementById('joinButton');
      const createButton = document.getElementById('createButton');
      const ws = $websocketStore; 
      let searchservers = document.getElementById('searchservers') as HTMLSelectElement;
  
      searchservers.innerHTML = "";
      for(var sk in knownSockets){
        const opt = document.createElement("option");
        opt.value = sk;
        opt.text = sk;
        searchservers.add(opt, null);
      }
  
  
      if (joinButton) {
        joinButton.addEventListener('click', async () => {
        try {
          await ws.connectTo(searchservers.value);
          goto("/game");
        } catch (error) {
          console.error("Failed to connect:", error);
  
        }
      });
  
      }
    });
  
  </script>
  
  <div class = "flex">
  
    <div class = "mainbox mx-10">
      <div class = flex>
        <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Join a room</h1>
      </div>
        <div class = "flex">
          <div class = "m-auto">
  
            <input class = searchbar>
            <button id=joinButton class = "bg-opacity-35 bg-black  text-white p-2 rounded-lg hover:scale-105 ">Join</button>
          
        </div>
        </div>
      </div>
  
      <div class = "mainbox mx-10 ">
        <div class = flex>
          <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Create a room</h1>
        </div>
          <div class = "flex">
            <div class = "m-auto">
                <p class = "text-white text-2xl"> Create a room and share the link for other to join !</p>
                <button id=joinButton class = "bg-opacity-35 bg-black  text-white p-2 rounded-lg hover:scale-105"><i class = "fa fa-plus"> create </i></button>
            </div>
          </div>
        </div>
  
  
        
  
  
  </div>
  