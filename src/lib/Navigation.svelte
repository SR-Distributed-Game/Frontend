
<script>
    import websocketStore from "../stores/websocket";
    import { onNavigate } from "$app/navigation";

    let playername = $websocketStore.getPlayerName();
    let ingame = false;
    onNavigate( () => {
        playername = $websocketStore.getPlayerName();
        
        if (window.location.pathname.includes("/game")) {
            ingame = true;
        }
        else {
            ingame = false;
        }

    });

</script>

<div class="  bg-[#0000002d] shadow-lg p-5">
    <div class="flex justify-between">
        
        <div class="flex space-x-12"> 

            {#if ingame}

                
                <h1 class="text-2xl text-white p-1 rounded-md ">GameDist logo</h1>

                <div class="bg-gray-800 w-px mx-2"></div>
                <h1 class="text-2xl text-white p-1 opacity-20"><i class="fa fa-home" aria-hidden="true"></i></h1>
                <i class="fa fa-address-card text-2xl text-white p-1 opacity-20" aria-hidden="true"></i>
            {:else}
            
            <a href = "/">
                
                <h1 class="text-2xl text-white p-1 rounded-md ">GameDist logo</h1>
            </a>
            <div class="bg-gray-800 w-px mx-2"></div>

            <a href = "/">
                <h1 class="text-2xl text-white p-1"><i class="fa fa-home hover:scale-[1.5] duration-75 hover:animate-pulse" aria-hidden="true"></i></h1>
            </a>

            <a href = /profile class="text-2xl text-white p-1"><i class="fa fa-address-card hover:scale-[1.5] duration-75 hover:animate-pulse" aria-hidden="true"></i></a>


                
            {/if}


     </div>

        <div id=serversection class="space-x-3 flex">
            
            <div class = flex>
                <p class = "text-xl text-white m-auto">Welcome back {playername} !</p>
            </div>

            <div class="bg-gray-800 w-px mx-2"></div>
            <div class="text-2xl flex text-white p-1 right-0"> 
                <div class = "pr-10">server</div> 
                <i class="fa fa-server m-auto" aria-hidden="true"></i>
            </div>
            <select id=searchservers class="searchbar m-auto"></select>
        </div>

    </div>
</div>
