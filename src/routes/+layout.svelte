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

		if (localStorage.getItem("bestScore") === null) {
			localStorage.setItem("bestScore","0");
		}

		if( localStorage.getItem("playername") === null ) {
			localStorage.setItem("playername", "Player" + Math.floor(Math.random() * 1000) );
		}
		$websocketStore.setPlayerName( localStorage.getItem("playername" ) as string );
	});

	

</script>



<slot/>

<!-- <MFooter/>-->