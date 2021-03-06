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

import { AlfrescoApiService, FormValues } from '@alfresco/adf-core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TaskDetailsModel } from '../../task-list';
import { ProcessFilterParamRepresentationModel } from '../models/filter-process.model';
import { ProcessDefinitionRepresentation } from '../models/process-definition.model';
import { ProcessInstanceVariable } from '../models/process-instance-variable.model';
import { ProcessInstance } from '../models/process-instance.model';
import { ProcessListModel } from '../models/process-list.model';
import 'rxjs/add/observable/throw';

declare let moment: any;

@Injectable()
export class ProcessService {

    constructor(private alfrescoApiService: AlfrescoApiService) {
    }

    /**
     * Get process instances for a filter and optionally a process definition.
     * @param requestNode Filter for instances
     * @param processDefinitionKey Limits returned instances to a process definition
     */
    getProcessInstances(requestNode: ProcessFilterParamRepresentationModel, processDefinitionKey?: string): Observable<ProcessListModel> {
        return Observable.fromPromise(this.alfrescoApiService.getInstance().activiti.processApi.getProcessInstances(requestNode))
            .map((res: any) => {
                if (processDefinitionKey) {
                    const filtered = res.data.filter(process => process.processDefinitionKey === processDefinitionKey);
                    res.data = filtered;
                    return res;
                } else {
                    return res;
                }
            }).catch(err => this.handleProcessError(err));
    }

    /**
     * Fetches the Process Audit information as a pdf
     * @param processId ID of the target process
     */
    fetchProcessAuditPdfById(processId: string): Observable<Blob> {
        return Observable.fromPromise(this.alfrescoApiService.getInstance().activiti.processApi.getProcessAuditPdf(processId))
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Fetches the Process Audit information in a json format.
     * @param processId ID of the target process
     */
    fetchProcessAuditJsonById(processId: string): Observable<any> {
        return Observable.fromPromise(this.alfrescoApiService.getInstance().activiti.processApi.getProcessAuditJson(processId))
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Gets Process Instance metadata.
     * @param processInstanceId ID of the target process
     */
    getProcess(processInstanceId: string): Observable<ProcessInstance> {
        return Observable.fromPromise(this.alfrescoApiService.getInstance().activiti.processApi.getProcessInstance(processInstanceId))
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Gets task instances for a process instance.
     * @param processInstanceId ID of the process instance
     * @param state Task state filter (can be "active" or "completed")
     */
    getProcessTasks(processInstanceId: string, state?: string): Observable<TaskDetailsModel[]> {
        let taskOpts = state ? {
                processInstanceId: processInstanceId,
                state: state
            } : {
                processInstanceId: processInstanceId
            };
        return Observable.fromPromise(this.alfrescoApiService.getInstance().activiti.taskApi.listTasks(taskOpts))
            .map(this.extractData)
            .map(tasks => tasks.map((task: any) => {
                task.created = moment(task.created, 'YYYY-MM-DD').format();
                return task;
            }))
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Gets process definitions associated with an app.
     * @param appId ID of a target app
     */
    getProcessDefinitions(appId?: number): Observable<ProcessDefinitionRepresentation[]> {
        let opts = appId ? {
                latest: true,
                appDefinitionId: appId
            } : {
                latest: true
            };
        return Observable.fromPromise(
            this.alfrescoApiService.getInstance().activiti.processApi.getProcessDefinitions(opts)
        )
            .map(this.extractData)
            .map(processDefs => processDefs.map((pd) => new ProcessDefinitionRepresentation(pd)))
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Starts a process based on a process definition, name, form values or variables.
     * @param processDefinitionId Process definition ID
     * @param name Process name
     * @param outcome Process outcome
     * @param startFormValues Values for the start form
     * @param variables Array of process instance variables
     */
    startProcess(processDefinitionId: string, name: string, outcome?: string, startFormValues?: FormValues, variables?: ProcessInstanceVariable[]): Observable<ProcessInstance> {
        let startRequest: any = {
            name: name,
            processDefinitionId: processDefinitionId
        };
        if (outcome) {
            startRequest.outcome = outcome;
        }
        if (startFormValues) {
            startRequest.values = startFormValues;
        }
        if (variables) {
            startRequest.variables = variables;
        }
        return Observable.fromPromise(
            this.alfrescoApiService.getInstance().activiti.processApi.startNewProcessInstance(startRequest)
        )
            .map((pd) => new ProcessInstance(pd))
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Cancels a process instance.
     * @param processInstanceId ID of process to cancel
     */
    cancelProcess(processInstanceId: string): Observable<void> {
        return Observable.fromPromise(
            this.alfrescoApiService.getInstance().activiti.processApi.deleteProcessInstance(processInstanceId)
        )
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Gets the variables for a process instance.
     * @param processInstanceId ID of the target process
     */
    getProcessInstanceVariables(processInstanceId: string): Observable<ProcessInstanceVariable[]> {
        return Observable.fromPromise(
            this.alfrescoApiService.getInstance().activiti.processInstanceVariablesApi.getProcessInstanceVariables(processInstanceId)
        )
            .map((processVars: any[]) => processVars.map((pd) => new ProcessInstanceVariable(pd)))
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Creates or updates variables for a process instance.
     * @param processInstanceId ID of the target process
     * @param variables Variables to update
     */
    createOrUpdateProcessInstanceVariables(processInstanceId: string, variables: ProcessInstanceVariable[]): Observable<ProcessInstanceVariable[]> {
        return Observable.fromPromise(
            this.alfrescoApiService.getInstance().activiti.processInstanceVariablesApi.createOrUpdateProcessInstanceVariables(processInstanceId, variables)
        )
            .catch(err => this.handleProcessError(err));
    }

    /**
     * Deletes a variable for a process instance.
     * @param processInstanceId ID of the target process
     * @param variableName Name of the variable to delete
     */
    deleteProcessInstanceVariable(processInstanceId: string, variableName: string): Observable<void> {
        return Observable.fromPromise(
            this.alfrescoApiService.getInstance().activiti.processInstanceVariablesApi.deleteProcessInstanceVariable(processInstanceId, variableName)
        )
            .catch(err => this.handleProcessError(err));
    }

    private extractData(res: any) {
        return res.data || {};
    }

    private handleProcessError(error: any) {
        return Observable.throw(error || 'Server error');
    }
}
