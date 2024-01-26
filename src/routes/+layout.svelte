<script lang="ts">
	import Navigation from "../lib/Navigation.svelte"
	import '../app.css';
	import { SpringSocketServer } from "$lib/connectionManager";

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	/** @type {import('./$types').LayoutData} */
	export let socketserver:SpringSocketServer = SpringSocketServer.getInstance();

	// Create a store and update it when necessary...
	const socket = writable();
	$: socket.set(socketserver);

	// ...and add it to the context for child components to access
	setContext('ws', socket);

</script>

<Navigation/>

<slot/>