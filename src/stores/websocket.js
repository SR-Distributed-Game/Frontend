// src/stores/websocket.js
import { writable } from 'svelte/store';
import { SpringSocketServer } from '$lib/connectionManager';

const websocketStore = writable(SpringSocketServer.getInstance());


export default websocketStore;