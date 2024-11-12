<script lang="ts">
	import type { ParsedIndicators } from "obsidian-cyber-utils";
    import IocList from './IocList.svelte'
    
    export let indicators: ParsedIndicators[];

    $: hasIndicators = indicators.some(list => list.items.length > 0);
</script>

<h4>IOC Lens</h4>
{#if hasIndicators}
    {#each indicators as indicatorList}
        {#if indicatorList.items.length > 0}
            <IocList indicatorList={indicatorList}/>
        {/if}
    {/each}
{:else}
    <div class="empty-state">
        No indicators found. IOC Lens will extract IP addresses, domains, and file hashes.
    </div>
{/if}
<button
    class="help-button"
>
    ⓘ
</button>

<style>
    .help-button {
        position: fixed;
        bottom: 2rem;
        right: 1rem;
        scale: 0.8;
    }
    
    .empty-state {
        text-align: center;
        padding: 2rem;
        color: var(--text-muted);
        font-style: italic;
    }
    
    .empty-state {
        text-align: center;
        padding: 2rem;
        color: var(--text-muted);
        font-style: italic;
    }
</style>