<script>

    export /**
* @type {number}
*/
    let status;
    let message = ''

     if(status >= 400 && status <= 499) {
        message = "Request Error"
     }

     else if(status >= 500 && status <= 599) {
        message = "Internal Server Error"
     }

</script>

<div class="flex flex-col items-center mt-[50vh]">
    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span class="block xl:inline">{status}</span>
        <span class="block xl:inline">{message}</span>
    </h1>
</div>  