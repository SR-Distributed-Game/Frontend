<script lang=ts>
    import { createEventDispatcher } from 'svelte';
    import websocketStore from "../stores/websocket";
    const dispatch = createEventDispatcher();

    let color = $websocketStore.getClientColor(); // Default color

    function handleColorChange(event:any) {
        color = event.target.value;
        $websocketStore.setClientColor(color);
        var plInfo = JSON.parse(localStorage.getItem("playerInfo")+"");
        plInfo.color = color+"";
        console.log(plInfo);
        localStorage.setItem("playerInfo",JSON.stringify(plInfo));
        dispatch('colorChange', { color });
    }
</script>

<div>
    <input type="color" bind:value={color} on:change={handleColorChange} class="color-picker-input p-5 rounded-xl" />
</div>