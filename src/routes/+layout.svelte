<script lang="ts">
	import { onMount } from'svelte';
	import websocketStore from "../stores/websocket";
	import '../app.css';
	import { SpringSocketServer } from "$lib/connectionManager";
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
    
	/** @type {import('./$types').LayoutData} */
	export let socketserver:SpringSocketServer = SpringSocketServer.getInstance();

	const socket = writable();
	$: socket.set(socketserver);

	setContext('ws', socket);

	onMount(() => {
		var playerInfo = {
			bestPos:"0/0",
			bestScore: 0,
			lastScore: 0,
			color : "#1c6283"
		}
		if (localStorage.getItem("playerInfo") === null) {
			localStorage.setItem("playerInfo",JSON.stringify(playerInfo));
		}
		
		document.documentElement.style.setProperty('--theme-color', JSON.parse(localStorage.getItem("playerInfo")+"").color);

		if( localStorage.getItem("playername") === null ) {
			localStorage.setItem("playername", "Player" + Math.floor(Math.random() * 1000) );
		}
		$websocketStore.setPlayerName( localStorage.getItem("playername" ) as string );
	});

	

</script>



<slot/>

<!-- <MFooter/>-->