"use strict";
/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var datatable_cell_component_1 = require("./datatable-cell.component");
var LocationCellComponent = (function (_super) {
    __extends(LocationCellComponent, _super);
    function LocationCellComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayText = '';
        return _this;
    }
    /** @override */
    LocationCellComponent.prototype.ngOnInit = function () {
        if (!this.value && this.column && this.column.key && this.row && this.data) {
            var path = this.data.getValue(this.row, this.column);
            if (path && path.name && path.elements) {
                this.value = path;
                this.displayText = path.name.split('/').pop();
                if (!this.tooltip) {
                    this.tooltip = path.name;
                }
                var parent_1 = path.elements[path.elements.length - 1];
                this.link = [this.column.format, parent_1.id];
            }
        }
    };
    __decorate([
        core_1.Input()
    ], LocationCellComponent.prototype, "link", void 0);
    __decorate([
        core_1.Input()
    ], LocationCellComponent.prototype, "displayText", void 0);
    LocationCellComponent = __decorate([
        core_1.Component({
            selector: 'adf-location-cell',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n        <ng-container>\n            <a href=\"\" [title]=\"tooltip\" [routerLink]=\"link\">\n                {{ displayText }}\n            </a>\n        </ng-container>\n    ",
            encapsulation: core_1.ViewEncapsulation.None,
            host: { class: 'adf-location-cell' }
        })
    ], LocationCellComponent);
    return LocationCellComponent;
}(datatable_cell_component_1.DataTableCellComponent));
exports.LocationCellComponent = LocationCellComponent;
