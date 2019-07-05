/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EventOfPlateMillUpdateComponent from '@/entities/event-of-plate-mill/event-of-plate-mill-update.vue';
import EventOfPlateMillClass from '@/entities/event-of-plate-mill/event-of-plate-mill-update.component';
import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';

import PictureOfEventService from '@/entities/picture-of-event/picture-of-event.service';

import VideoOfEventService from '@/entities/video-of-event/video-of-event.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('EventOfPlateMill Management Update Component', () => {
    let wrapper: Wrapper<EventOfPlateMillClass>;
    let comp: EventOfPlateMillClass;
    let eventOfPlateMillServiceStub: SinonStubbedInstance<EventOfPlateMillService>;

    beforeEach(() => {
      eventOfPlateMillServiceStub = sinon.createStubInstance<EventOfPlateMillService>(EventOfPlateMillService);

      wrapper = shallowMount<EventOfPlateMillClass>(EventOfPlateMillUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          eventOfPlateMillService: () => eventOfPlateMillServiceStub,

          pictureOfEventService: () => new PictureOfEventService(),

          videoOfEventService: () => new VideoOfEventService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.eventOfPlateMill = entity;
        eventOfPlateMillServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(eventOfPlateMillServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.eventOfPlateMill = entity;
        eventOfPlateMillServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(eventOfPlateMillServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
