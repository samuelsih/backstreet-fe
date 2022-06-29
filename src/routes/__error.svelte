<script context="module">
    // @ts-ignore
    export function load({ status }) {
        return {
            props: {
                status
            }
        };
    }
  </script>
  
<script>
    import NotFound from "../components/ErrorScreens/NotFound.svelte";
    import Default from "../components/ErrorScreens/Default.svelte";

    export /**
* @type {number}
*/
     let status;
</script>
  
{#if status == 404}
    <NotFound />
{:else}
    <Default {status} />
{/if}