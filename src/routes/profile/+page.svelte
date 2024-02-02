<script lang=ts>
    import { onMount} from 'svelte';
    import websocketStore from '../../stores/websocket.js';
    import Colorpicker from '$lib/Colorpicker.svelte';
    import Navigation from '$lib/Navigation.svelte';

onMount(() => {

    const getErrorMessageFormated = (message:string):string =>{
    return '<p class = "text-xl text-red-200 bg-black bg-opacity-30 rounded-xl p-2">'+ message + '</p>';
            
    }

    const getSuccesMessageFormated = (message:string):string =>{
        return '<p class = "text-xl text-green-200 bg-black bg-opacity-30 rounded-xl p-2">'+ message + '</p>';
    }

    let ws = $websocketStore;
    var style = getComputedStyle(document.body)
    let nameinput = document.getElementById('nameinput') as HTMLInputElement;
    var errordiv = document.getElementById('errordiv') as HTMLDivElement;
    ws.setPlayerName(localStorage.getItem("playername") || ws.getPlayerName());
    nameinput.value = ws.getPlayerName();

    nameinput.addEventListener('change', () => {
        if (nameinput.value.length < 3){
            nameinput.style.borderColor = "red";
            errordiv.innerHTML = getErrorMessageFormated("name must be at least 3 characters long");
            return;
        }
        if (nameinput.value.length > 15){
            nameinput.style.borderColor = "red";
            errordiv.innerHTML = getErrorMessageFormated("name must be at most 15 characters long").toString();
            return;
        }
        errordiv.innerHTML = getSuccesMessageFormated("name changed to " + nameinput.value);
        nameinput.style.borderColor = "green";

        ws.setPlayerName(nameinput.value);
        localStorage.setItem("playername", nameinput.value);
        console.log("name changed to " + nameinput.value);
    });



});



</script>
<div class = "flex mt-10">
    <div class = "block m-auto scrollBox bg-black bg-opacity-10 p-10 rounded-lg">


        <div class = flex><p class = "text-2xl text-white m-auto"> parameters </p></div>
        
        
        <div class = "mainbox hover:scale-[1.05] duration-100">
                <div class = flex>
                <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg mb-10 text-center ">Change your name here</h1>
                </div>
                <div class = block>
                    <div class = "flex">
                        <div class = "m-auto">
                            <input id = nameinput class = searchbar>
                            
                        </div>
                        

                    </div>

                    <div class = "m-auto text-center mt-2" id=errordiv>
                    </div>
                </div>

            </div>
        

        <div class = "mainbox">
            <div class = flex>
            <h1 class = "m-auto text-[50px] text-white p-1 rounded-lg my-10 text-center">Color theme</h1>
            </div>
            <div class = "flex">
                <div class = "m-auto">
                    <Colorpicker/>

                </div>
            </div>
        </div>

    <div class = "pb-[100px]"></div>

    </div>
</div>