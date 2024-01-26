<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import websocketStore from '../stores/websocket.js';

  

  onMount(() => {
    const connectButton = document.getElementById('connectButton');
    const ws = $websocketStore; // Accessing the WebSocket instance from the store
    let searchservers = document.getElementById('searchservers') as HTMLInputElement;
    if (connectButton) {
      connectButton.addEventListener('click', () => {
        const connected = ws.connectTo(searchservers.value);
        if (connected) {
          goto('/game'); // Redirect to '/game' upon successful connection
        }
      });
    }
  });

  onDestroy(() => {
    // Optionally, handle any cleanup here if necessary
  });
</script>


<div class = "flex">
  <div class = "m-auto">
    <input id = searchservers class = "searchbar">
    <button id = connectButton class = " buttonconnect">Connect</button>
  </div>
</div>
