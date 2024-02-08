<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import websocketStore from '../stores/websocket.js';
  import { knownSockets } from '../lib/Servers';
  import Navigation from "../lib/Navigation.svelte"
  
  const ws = $websocketStore; 
  let connError = false;
  onMount(() => {

    async function connect() {
      try {
        connError = true;
        await ws.connectTo(searchservers.value);
        connError = false;
        goto("/game");
        
      } catch (error) {
      }

    }

    const playbutton = document.getElementById('playbutton');
    const playbuttonError = document.getElementById('playbuttonError');

    let searchservers = document.getElementById('searchservers') as HTMLSelectElement;

    searchservers.innerHTML = "";
    for(var sk in knownSockets){
      const opt = document.createElement("option");
      opt.value = sk;
      opt.text = sk;
      searchservers.add(opt, null);
    }
    if (playbutton) {
      playbutton.addEventListener('click', async () => {
        connect();
    });

    }

    if (playbuttonError) {
      playbuttonError.addEventListener('click', async () => {
        connect();
    });
    }
  });

</script>


<Navigation/>

<div class = "flex">

  <div class = "mainbox mx-10">
    <div class = flex>
      <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Welcome to our multiplayer game !</h1>
    </div>
      <div class = "flex">
        <div class = "m-auto">

          <p class = "text-white text-center text-lg">in this game the goal is to catch fruit faster than other players ! join a room and become the biggest player !</p>
        </div>
      </div>
    </div>

    <div class = "mainbox mx-10 ">
      <div class = flex>
        <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Choose a server in the list and start to play !</h1>
      </div>
        <div class = "flex">
          <div class = "m-auto">

              <button id = playbutton class = "{!connError ? '' : 'hidden'} hover:text-green-300 playbutton bg-white bg-opacity-20 rounded-[50px] shadow-xl"><i class="fa fa-gamepad hover:animate-pulse  text-[10vh]" aria-hidden="true"><i class="fa text-[10vh]">play</i></i></button>
              
              <!-- here i want to display ony if connError -->
              <p class = "{connError ? '' : 'hidden'} bg-red-200 rounded-lg bg-opacity-50 text-2xl text-red-800 text-center">server connection error</p>
              <button id = playbuttonError class = "{connError ? '' : 'hidden'} playbutton bg-white bg-opacity-20 rounded-[50px] shadow-xl"><i class="fa fa-gamepad hover:animate-pulse text-red-300 text-[10vh]" aria-hidden="true"><i class="fa text-[10vh]">play</i></i></button>

          </div>
        </div>
      </div>
</div>
