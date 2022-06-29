<script context="module">
    import { variables } from "../../lib/variables";

    // @ts-ignore
    export async function load({ params, fetch }) {
        const slug = params.slug
        const url = `${variables.FIND_DATA}${slug}`

        const res = await fetch(url)

        if(res.ok) {
            const data = await res.json()

            return {
                props: { data }
            }
        }

        return {
            status: res.status,
            error: new Error(`Cannot find request for slug ${slug}`)
        }
    }
</script>

<script>
    // @ts-ignore
    import NotFound from "../../components/ErrorScreens/NotFound.svelte";
    import Claim from "../../components/Claim/Claim.svelte";

    export /**
    * @type {{ alias: any; redirect_to: any; type: any; filename: any; }}
    */
     let data;  

    let props = {}

    if(data.type === "LINK" || data.type === "FILE") {
        props["alias"] = data.alias
    }

</script>

{#if data.type === "LINK" || data.type === "FILE"}
    <Claim {...props}/>
{:else}
    <NotFound />
{/if}