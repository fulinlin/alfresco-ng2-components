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

import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'adf-task-standalone',
    templateUrl: './task-standalone.component.html',
    styleUrls: ['./task-standalone.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TaskStandaloneComponent {

    @Input()
    taskName: string;

    @Input()
    isCompleted: boolean = false;

    @Input()
    hasCompletePermission: boolean = true;

    @Input()
    hideCancelButton: boolean = true;

    @Output()
    cancel: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    complete: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    onCancelButtonClick(): void {
        this.cancel.emit();
    }

    onCompleteButtonClick(): void {
        this.complete.emit();
    }

    hasCompleteButton(): boolean {
        return this.hasCompletePermission && !this.isCompleted;
    }

    hasCancelButton(): boolean {
        return !this.hideCancelButton && !this.isCompleted;
    }
}
