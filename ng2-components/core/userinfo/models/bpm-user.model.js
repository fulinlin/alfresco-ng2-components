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
Object.defineProperty(exports, "__esModule", { value: true });
var BpmUserModel = (function () {
    function BpmUserModel(obj) {
        if (obj) {
            this.apps = obj.apps;
            this.capabilities = obj.capabilities;
            this.company = obj.company;
            this.created = obj.created;
            this.email = obj.email;
            this.externalId = obj.externalId;
            this.firstName = obj.firstName;
            this.lastName = obj.lastName;
            this.fullname = obj.fullname;
            this.fullNameDisplay = obj ? this.formatValue(obj.firstName).trim() + ' ' + this.formatValue(obj.lastName).trim() : null;
            this.groups = obj.groups;
            this.id = obj.id;
            this.lastUpdate = obj.lastUpdate;
            this.latestSyncTimeStamp = obj.latestSyncTimeStamp;
            this.password = obj.password;
            this.pictureId = obj.pictureId;
            this.status = obj.status;
            this.tenantId = obj.tenantId;
            this.tenantName = obj.tenantName;
            this.tenantPictureId = obj.tenantPictureId;
            this.type = obj.type;
        }
    }
    BpmUserModel.prototype.formatValue = function (value) {
        return value && value !== 'null' ? value : '';
    };
    return BpmUserModel;
}());
exports.BpmUserModel = BpmUserModel;
