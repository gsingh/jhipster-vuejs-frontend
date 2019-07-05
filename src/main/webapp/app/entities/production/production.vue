<template>
    <div>
        <h2 id="page-heading">
            <span id="production-heading">Productions</span>
            <router-link :to="{name: 'ProductionCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-production">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Production
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && productions && productions.length === 0">
            <span>No productions found</span>
        </div>
        <div class="table-responsive" v-if="productions && productions.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Prod Date</span></th>
                    <th><span>Shift</span></th>
                    <th><span>No Of Plates</span></th>
                    <th><span>Prod Tonnage</span></th>
                    <th><span>Manager</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="production in productions"
                    :key="production.id">
                    <td>
                        <router-link :to="{name: 'ProductionView', params: {productionId: production.id}}">{{production.id}}</router-link>
                    </td>
                    <td>{{production.prodDate}}</td>
                    <td>{{production.shift}}</td>
                    <td>{{production.noOfPlates}}</td>
                    <td>{{production.prodTonnage}}</td>
                    <td>
                        <div v-if="production.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: production.manager.id}}">{{production.manager.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ProductionView', params: {productionId: production.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'ProductionEdit', params: {productionId: production.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(production)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jhipsterApp.production.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-production-heading" >Are you sure you want to delete this Production?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-production" v-on:click="removeProduction()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./production.component.ts">
</script>
