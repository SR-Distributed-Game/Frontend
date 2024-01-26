<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import websocketStore from '../stores/websocket.js';

  

  onMount(() => {
    const connectButton = document.getElementById('connectButton');
    const ws = $websocketStore; 
    let searchservers = document.getElementById('searchservers') as HTMLInputElement;
    if (connectButton) {
      connectButton.addEventListener('click', async () => {
      try {
        await ws.connectTo(searchservers.value);
        // Navigate after successful connection
        goto('/game');
      } catch (error) {
        console.error("Failed to connect:", error);
        // Handle connection failure (e.g., show error message)
      }
    });

    }
  });

</script>


<div class = "flex">
  <div class = "m-auto">
    <input id = searchservers class = "searchbar">
    <button id = connectButton class = " buttonconnect">Connect</button>
  </div>
</div>
