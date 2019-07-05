/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PictureOfEventUpdateComponent from '@/entities/picture-of-event/picture-of-event-update.vue';
import PictureOfEventClass from '@/entities/picture-of-event/picture-of-event-update.component';
import PictureOfEventService from '@/entities/picture-of-event/picture-of-event.service';

import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('PictureOfEvent Management Update Component', () => {
    let wrapper: Wrapper<PictureOfEventClass>;
    let comp: PictureOfEventClass;
    let pictureOfEventServiceStub: SinonStubbedInstance<PictureOfEventService>;

    beforeEach(() => {
      pictureOfEventServiceStub = sinon.createStubInstance<PictureOfEventService>(PictureOfEventService);

      wrapper = shallowMount<PictureOfEventClass>(PictureOfEventUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          pictureOfEventService: () => pictureOfEventServiceStub,

          eventOfPlateMillService: () => new EventOfPlateMillService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.pictureOfEvent = entity;
        pictureOfEventServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(pictureOfEventServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.pictureOfEvent = entity;
        pictureOfEventServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(pictureOfEventServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
