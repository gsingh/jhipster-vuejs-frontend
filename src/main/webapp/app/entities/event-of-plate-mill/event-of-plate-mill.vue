<template>
    <div>
        <h2 id="page-heading">
            <span id="event-of-plate-mill-heading">Event Of Plate Mills</span>
            <router-link :to="{name: 'EventOfPlateMillCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-event-of-plate-mill">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new EventOfPlateMill
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
        <div class="alert alert-warning" v-if="!isFetching && eventOfPlateMills && eventOfPlateMills.length === 0">
            <span>No eventOfPlateMills found</span>
        </div>
        <div class="table-responsive" v-if="eventOfPlateMills && eventOfPlateMills.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Event Date</span></th>
                    <th><span>Event Name</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="eventOfPlateMill in eventOfPlateMills"
                    :key="eventOfPlateMill.id">
                    <td>
                        <router-link :to="{name: 'EventOfPlateMillView', params: {eventOfPlateMillId: eventOfPlateMill.id}}">{{eventOfPlateMill.id}}</router-link>
                    </td>
                    <td>{{eventOfPlateMill.eventDate}}</td>
                    <td>{{eventOfPlateMill.eventName}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'EventOfPlateMillView', params: {eventOfPlateMillId: eventOfPlateMill.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'EventOfPlateMillEdit', params: {eventOfPlateMillId: eventOfPlateMill.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(eventOfPlateMill)"
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
            <span slot="modal-title"><span id="jhipsterApp.eventOfPlateMill.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-eventOfPlateMill-heading" >Are you sure you want to delete this Event Of Plate Mill?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-eventOfPlateMill" v-on:click="removeEventOfPlateMill()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./event-of-plate-mill.component.ts">
</script>
