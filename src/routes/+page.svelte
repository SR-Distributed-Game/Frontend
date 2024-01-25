
<script>

    import { SpringSocketServer } from '../lib/connectionManager.ts';
    import { onMount } from 'svelte';

    onMount(() => {
        let springSocketServer = new SpringSocketServer(); 
        springSocketServer.send("hello je suis un messsage");
    });
    
</script>

<div class = "flex">

    <div class = "m-auto bg-slate-700"> wow je suis la frame principale</div>

</div>
