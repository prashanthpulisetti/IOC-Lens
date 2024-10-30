import IocLens from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { type CyberPluginSettings } from "obsidian-cyber-utils";

import { defaultSites, type searchSite } from "./sites";

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
        defaultSites.forEach((site: searchSite) => {
        		const settingSite = this.plugin.settings.searchSites.find(obj => obj.name === site.name);
        		const enabled = settingSite?.enabled ?? site.enabled;	
            new Setting(containerEl)
                .setName(site.name)
                .setDesc(site.description ? site.description : "")
                .addToggle(toggle => toggle
                    .setValue(enabled)
                    .onChange(async (value) => {
                    		const index = this.plugin.settings.searchSites.findIndex(obj => obj.name === site.name);
                    		if (index >= 0) {
                    			this.plugin.settings.searchSites[index] = {...site, enabled: value};
                    		} else {
                    			this.plugin.settings.searchSites.push({...site, enabled: value});
                    		}
                        await this.plugin.saveSettings();
                    })
                )
        });
    }
}