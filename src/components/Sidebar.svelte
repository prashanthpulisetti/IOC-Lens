<script lang="ts">
	import type { ParsedIndicators } from "obsidian-cyber-utils";
    import IocList from './IocList.svelte'
	import { App, Modal } from "obsidian";
    
    export let indicators: ParsedIndicators[];
    export let app: App;

    function helpButton() {
        const helpModal = new Modal(app);
        helpModal.setTitle("ⓘ IOC Lens help");
        helpModal.setContent(`Configure which search pivot buttons appear in the "IOC Lens" tab of Obsidian's settings.`);
        helpModal.open();
    }
</script>

<h4>IOC Lens</h4>
{#each indicators as indicatorList}
    {#if indicatorList.items.length > 0}
        <IocList indicatorList={indicatorList}/>
    {/if}
{/each}

<button
    class="help-button"
    on:click={helpButton}
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
</style>