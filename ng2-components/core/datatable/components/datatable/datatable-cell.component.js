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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DataTableCellComponent = (function () {
    function DataTableCellComponent() {
    }
    DataTableCellComponent.prototype.ngOnInit = function () {
        if (!this.value && this.column && this.column.key && this.row && this.data) {
            this.value = this.data.getValue(this.row, this.column);
            if (!this.tooltip) {
                this.tooltip = this.value;
            }
        }
    };
    __decorate([
        core_1.Input()
    ], DataTableCellComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input()
    ], DataTableCellComponent.prototype, "column", void 0);
    __decorate([
        core_1.Input()
    ], DataTableCellComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input()
    ], DataTableCellComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input()
    ], DataTableCellComponent.prototype, "tooltip", void 0);
    DataTableCellComponent = __decorate([
        core_1.Component({
            selector: 'adf-datatable-cell',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n        <ng-container>\n            <span [title]=\"tooltip\" class=\"adf-datatable-cell-value\">{{value}}</span>\n        </ng-container>",
            encapsulation: core_1.ViewEncapsulation.None,
            host: { class: 'adf-datatable-cell' }
        })
    ], DataTableCellComponent);
    return DataTableCellComponent;
}());
exports.DataTableCellComponent = DataTableCellComponent;
