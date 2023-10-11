import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';


export default class ExamplePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {

        const days = [
            ['Sunday', _('Sunday')],
            ['Monday', _('Monday')],
            ['Tuesday', _('Tuesday')], 
            ['Wednesday', _('Wednesday')],
            ['Thursday', _('Thursday')],
            ['Friday', _('Friday')],
            ['Saturday', _('Saturday')],
        ];

        // Create a preferences page, with a single group
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const group = new Adw.PreferencesGroup({
            title: _('Starting day of the week'),
        });
        page.add(group);

        let stringList = new Gtk.StringList();
        days.forEach((it) => {
            stringList.append(it[1]);
        });

        // Create a new preferences row
        const row = new Adw.ComboRow({
            title: _('Day'),
            subtitle: _('Select the day on which the week start'),
            model: stringList
        });
        group.add(row);

        // Create a settings object and bind the row to the `day` key
        window._settings = this.getSettings();
        window._settings.bind('day', row, 'selected', Gio.SettingsBindFlags.DEFAULT);
    }
}