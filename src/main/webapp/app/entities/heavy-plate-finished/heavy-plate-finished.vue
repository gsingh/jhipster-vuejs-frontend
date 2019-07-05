<template>
    <div>
        <h2 id="page-heading">
            <span id="heavy-plate-finished-heading">Heavy Plate Finisheds</span>
            <router-link :to="{name: 'HeavyPlateFinishedCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-heavy-plate-finished">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new HeavyPlateFinished
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
        <div class="alert alert-warning" v-if="!isFetching && heavyPlateFinisheds && heavyPlateFinisheds.length === 0">
            <span>No heavyPlateFinisheds found</span>
        </div>
        <div class="table-responsive" v-if="heavyPlateFinisheds && heavyPlateFinisheds.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>H P Finished Date</span></th>
                    <th><span>Shift</span></th>
                    <th><span>No Of Plates</span></th>
                    <th><span>H P Finished Tonnage</span></th>
                    <th><span>Manager</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="heavyPlateFinished in heavyPlateFinisheds"
                    :key="heavyPlateFinished.id">
                    <td>
                        <router-link :to="{name: 'HeavyPlateFinishedView', params: {heavyPlateFinishedId: heavyPlateFinished.id}}">{{heavyPlateFinished.id}}</router-link>
                    </td>
                    <td>{{heavyPlateFinished.hPFinishedDate}}</td>
                    <td>{{heavyPlateFinished.shift}}</td>
                    <td>{{heavyPlateFinished.noOfPlates}}</td>
                    <td>{{heavyPlateFinished.hPFinishedTonnage}}</td>
                    <td>
                        <div v-if="heavyPlateFinished.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: heavyPlateFinished.manager.id}}">{{heavyPlateFinished.manager.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'HeavyPlateFinishedView', params: {heavyPlateFinishedId: heavyPlateFinished.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'HeavyPlateFinishedEdit', params: {heavyPlateFinishedId: heavyPlateFinished.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(heavyPlateFinished)"
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
            <span slot="modal-title"><span id="jhipsterApp.heavyPlateFinished.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-heavyPlateFinished-heading" >Are you sure you want to delete this Heavy Plate Finished?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-heavyPlateFinished" v-on:click="removeHeavyPlateFinished()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./heavy-plate-finished.component.ts">
</script>
