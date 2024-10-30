<script lang="ts">
	import type { ParsedIndicators } from "obsidian-cyber-utils";
    import IocList from './IocList.svelte'
    //let indicators: ParsedIndicators[] = [];
    let {indicators = [] as ParsedIndicators[]} = $props();
</script>

<h4>Extracted Indicators</h4>
{#each indicators as indicatorList}
    {#if indicatorList.items.length > 0}
        <IocList indicatorList={indicatorList}/>
    {/if}
{/each}

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
        scale: 0.7;
    }
</style>