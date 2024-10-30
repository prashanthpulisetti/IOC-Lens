import IocLens from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { type CyberPluginSettings, defaultSites, type searchSite } from "obsidian-cyber-utils";

export interface IocLensSettings extends CyberPluginSettings {
}

export const IOC_LENS_DEFAULT_SETTINGS: IocLensSettings = {
	validTld: [],
    searchSites: defaultSites
}

export class IocLensSettingTab extends PluginSettingTab {
	plugin: IocLens;

	constructor(app: App, plugin: IocLens) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
        
		new Setting(containerEl)
            .setName('Enabled Search Engines')
            .setHeading();
        this.plugin.settings.searchSites.forEach((site: searchSite) => {
            new Setting(containerEl)
                .setName(site.name)
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.searchSites[this.plugin.settings.searchSites.indexOf(site)].enabled)
                    .onChange(async (value) => {
                        this.plugin.settings.searchSites[this.plugin.settings.searchSites.indexOf(site)].enabled = value;
                        await this.plugin.saveSettings();
                    })
                )
        });
    }
}