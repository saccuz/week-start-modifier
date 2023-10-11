/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import Shell from 'gi://Shell';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

const DateMenu = Main.panel.statusArea.dateMenu;
let handId = null;

export default class WeekCalendarModifier extends Extension {
    enable() {
        this._settings = this.getSettings();

        DateMenu._calendar._weekStart = 1; // Monday
        DateMenu._calendar._onSettingsChange();

        handId = this._settings.connect('changed::day', (settings, key) => {
            DateMenu._calendar._weekStart = settings.get_int(key);
            DateMenu._calendar._onSettingsChange();
        });
    }

    disable() {
        DateMenu._calendar._weekStart = Shell.util_get_week_start();
        DateMenu._calendar._onSettingsChange();
        if (handId) {
            this._settings.disconnect(handId);
            handId = null;
        }
        this._settings = null;
    }
}
