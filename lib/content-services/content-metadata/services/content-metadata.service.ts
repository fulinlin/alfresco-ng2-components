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

import { Injectable } from '@angular/core';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';
import { BasicPropertiesService } from './basic-properties.service';
import { Observable } from 'rxjs/Observable';
import { GroupedPropertiesService } from './grouped-properties.service';
import { CardViewItem } from '@alfresco/adf-core';
import { CardViewGroup } from '../interfaces/content-metadata.interfaces';
import { ContentMetadataConfigService } from './config/content-metadata-config.service';

@Injectable()
export class ContentMetadataService {

    constructor(
        private basicPropertiesService: BasicPropertiesService, 
        private groupedPropertiesService: GroupedPropertiesService,
        private contentMetadataConfigService: ContentMetadataConfigService
    ) {}

    getBasicProperties(node: MinimalNodeEntryEntity): Observable<CardViewItem[]> {
        return Observable.of(this.basicPropertiesService.getProperties(node));
    }

    getGroupedProperties(node: MinimalNodeEntryEntity, presetName: string = 'default'): Observable<CardViewGroup[]> {
        this.contentMetadataConfigService.use(presetName);
        return this.groupedPropertiesService.getProperties(node);
    }

    // private transformByPreset(preset: PresetConfig, propertiesGroups: CardViewGroup[]) {
    //     if (this.contentMetadataConfigService.isIndifferent(preset)) {
    //         return propertiesGroups;
    //     }

    //     else if (this.contentMetadataConfigService.isAspectOriented(preset)) {
    //         const aspectNames = Object.keys(preset);
    //         return aspectNames.map((aspectName) => propertiesGroups[aspectName] );
    //     }

    //     else if (this.contentMetadataConfigService.isLayoutOriented(preset)) {
    //         console.log('Not supported yet');
    //         return [];
    //     }   
    // }
}
