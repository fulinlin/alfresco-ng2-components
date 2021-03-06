---
Added: v2.0.0
Status: Active
Last reviewed: 2018-04-16
---

# Task List component

Renders a list containing all the tasks matched by the parameters specified.

## Basic Usage

```html
<adf-tasklist 
    [appId]="'1'" 
    [state]="'open'" 
    [assignment]="'assignee'">
</adf-tasklist>
```

### Properties

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| appId | `number` |  | The id of the app.  |
| processInstanceId | `string` |  | The Instance Id of the process.  |
| processDefinitionKey | `string` |  | The Definition Key of the process.  |
| state | `string` |  | Current state of the process. Possible values are: `completed`, `active`.  |
| assignment | `string` |  | The assignment of the process. Possible values are: "assignee" (the current user is the assignee), candidate (the current user is a task candidate", "group_x" (the task is assigned to a group where the current user is a member, no value(the current user is involved). |
| sort | `string` |  | Define the sort order of the processes. Possible values are : `created-desc`, `created-asc`, `due-desc`, `due-asc` |
| name | `string` |  | Name of the tasklist.  |
| landingTaskId | `string` |  | Define which task id should be selected after reloading. If the task id doesn't exist or nothing is passed then the first task will be selected. |
| data | `any` |  | Data source object that represents the number and the type of the columns that you want to show. |
| selectionMode | `string` | `'single'` | Row selection mode. Can be none, `single` or `multiple`. For `multiple` mode, you can use Cmd (macOS) or Ctrl (Win) modifier key to toggle selection for multiple rows. |
| presetColumn | `string` |  | Custom preset column schema in JSON format.  |
| multiselect | `boolean` | `false` | Toggles multiple row selection, renders checkboxes at the beginning of each row  |
| page | `number` | `0` | The page number of the tasks to fetch.  |
| size | `number` | See description | The number of tasks to fetch. Default value: 25.  |

### Events

| Name | Type | Description |
| ---- | ---- | ----------- |
| rowClick | `EventEmitter<string>` | Emitted when a task in the list is clicked  |
| rowsSelected | `EventEmitter<any[]>` | Emitted when rows are selected/unselected  |
| success | `EventEmitter<any>` | Emitted when the task list is loaded  |
| error | `EventEmitter<any>` | Emitted when an error occurs.  |

## Details

This component displays lists of process instances both active and completed, using any defined process filter, and
renders details of any chosen instance.

### Setting the column schema

You can pass a [DataTableAdapter instance](../core/datatable-adapter.interface.md)
to set a column schema for the tasklist as shown below :

```ts
let data = new ObjectDataTableAdapter(
    // Row data
    [
        { id: 1, name: 'Name 1' },
        { id: 2, name: 'Name 2' }
    ],
    // Column schema
    [
        { 
            type: 'text', 
            key: 'id', 
            title: 'Id', 
            sortable: true 
        },
        {
            type: 'text', 
            key: 'name', 
            title: 'Name', 
            sortable: true
        }
    ]
);
```

```html
<adf-tasklist
    [data]="'data'">
</adf-tasklist>
```

Alternatively, you can use an HTML-based schema declaration:

```html
<adf-tasklist ...>
    <data-columns>
        <data-column key="name" title="NAME" class="full-width name-column"></data-column>
        <data-column key="created" title="Created" class="hidden"></data-column>
    </data-columns>
</adf-tasklist>
```

You can also set a static custom schema declaration in `app.config.json` as shown below:

```json
"adf-task-list": {
        "presets": {
            "customSchema": [
            {
                    "key": "name",
                    "type": "text",
                    "title": "name",
                    "sortable": true         
            }],
            "default": [
                {
                    "key": "name",
                    "type": "text",
                    "title": "name",
                    "sortable": true
            }],
        }
}
```

```html
<adf-tasklist 
    [appId]="'1'" 
    [presetColumn]="'customSchema'">
</adf-tasklist>
```

You can use an HTML-based schema and an `app.config.json` custom schema declaration at the same time:

```json
"adf-task-list": {
        "presets": {
            "customSchema": [
            {
                    "key": "id",
                    "type": "text",
                    "title": "Id",
                    "sortable": true         
            }],
            "default": [
                {
                    "key": "name",
                    "type": "text",
                    "title": "name",
                    "sortable": true
            }],
        }
}
```

<!-- {% raw %} -->

```html
<adf-tasklist
    [appId]="'1'" 
    [presetColumn]="'customSchema'">
    <data-columns>
        <data-column key="assignee" title="Assignee" class="full-width name-column">
            <ng-template let-entry="$implicit">
                    <div>{{getFullName(entry.row.obj.assignee)}}</div>
            </ng-template>
        </data-column>
    </data-columns>
</adf-tasklist>
```

<!-- {% endraw %} -->

### Pagination strategy

The Tasklist also supports pagination as shown in the example below:

```html
<adf-tasklist
    [appId]="'1'"
    [page]="page"
    [size]="size"
    #taskList>
</adf-tasklist>
<adf-pagination
    *ngIf="taskList"
    [target]="taskList"
    [supportedPageSizes]="supportedPages"
    #taskListPagination>
</adf-pagination>
```

### DataTableAdapter example

See the [DataTableAdapter](../core/datatable-adapter.interface.md) page for full details of the interface and its standard
implementation, ObjectDataTableAdapter. Below is an example of how you can set up the adapter for a
typical tasklist.

```json
[
 {"type": "text", "key": "id", "title": "Id"},
 {"type": "text", "key": "name", "title": "Name", "cssClass": "full-width name-column", "sortable": true},
 {"type": "text", "key": "formKey", "title": "Form Key", "sortable": true},
 {"type": "text", "key": "created", "title": "Created", "sortable": true}
]
```

### DataColumn Features

You can customize the styling of a column and also add features like tooltips and automatic translation of column titles. See the [DataColumn](../core/data-column.component.md) page for more information about these features.

## See also

-   [Data column component](../core/data-column.component.md)
-   [DataTableAdapter](../core/datatable-adapter.interface.md)
-   [Pagination component](../core/pagination.component.md)
