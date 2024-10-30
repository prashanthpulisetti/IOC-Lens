import { WorkspaceLeaf } from 'obsidian';
import { CyberPlugin } from 'obsidian-cyber-utils';

import { IOC_LENS_DEFAULT_SETTINGS, type IocLensSettings, IocLensSettingTab } from 'src/settings';
import { DEFAULT_VIEW_TYPE, IndicatorSidebar } from 'src/iocLensView.svelte';

// Remember to rename these classes and interfaces!



export default class IocLens extends CyberPlugin {
	settings: IocLensSettings;
	validTld: string[] | null | undefined;
	sidebarContainers: Map<string, WorkspaceLeaf> | undefined;

	async onload() {
		await this.loadSettings();
		this.registerView(DEFAULT_VIEW_TYPE, (leaf) => new IndicatorSidebar(leaf, this));

		const ribbonIconEl = this.addRibbonIcon('scan-eye', 'Activate IOC Lens', (evt: MouseEvent) => {
			this.activateView(DEFAULT_VIEW_TYPE);
		});

		this.addCommand({
			id: 'activate-ioc-lens-view',
			name: 'Activate IOC Lens',
			callback: () => {
				this.activateView(DEFAULT_VIEW_TYPE);
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new IocLensSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, IOC_LENS_DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}