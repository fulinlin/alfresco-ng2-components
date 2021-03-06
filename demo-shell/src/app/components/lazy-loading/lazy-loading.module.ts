import { NgModule } from '@angular/core';
import { CoreModule, TranslationService } from '@alfresco/adf-core';

import { LazyLoadingRoutes } from './lazy-loading.routes';
import { LazyLoadingComponent } from './lazy-loading.component';

@NgModule({
    imports: [
        CoreModule.forChild(),
        LazyLoadingRoutes
    ],
    declarations: [
        LazyLoadingComponent
    ]
})
export class LazyLoadingModule {
    constructor(translation: TranslationService) {
    }
}
