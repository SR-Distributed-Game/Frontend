<script lang="ts">
	import Navigation from "../lib/Navigation.svelte"
	import MFooter from "$lib/MFooter.svelte";
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
		$websocketStore.setPlayerName( localStorage.getItem("playername" ) as string );
	});

</script>



<Navigation/>

<slot/>

<MFooter/>