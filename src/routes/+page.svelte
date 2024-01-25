
<script>

    import { SpringSocketServer } from '../lib/connectionManager.ts';
    import { onMount } from 'svelte';

    onMount(() => {
        let springSocketServer = new SpringSocketServer(); 
        let sendButton = document.getElementById('sendButton');
            if (sendButton != null){
                sendButton.addEventListener('click', () => {
                springSocketServer.send("hello je suis un messsage");
            });
        }

    });
    
</script>

<div class = "flex">
    <button id = sendButton class = "m-auto p-5 bg-slate-600 mt-10 rounded-xl text-white"> send message</button>
    <input> </input>
</div>
