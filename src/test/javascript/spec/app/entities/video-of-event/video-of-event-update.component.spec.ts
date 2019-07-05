/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import VideoOfEventUpdateComponent from '@/entities/video-of-event/video-of-event-update.vue';
import VideoOfEventClass from '@/entities/video-of-event/video-of-event-update.component';
import VideoOfEventService from '@/entities/video-of-event/video-of-event.service';

import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('VideoOfEvent Management Update Component', () => {
    let wrapper: Wrapper<VideoOfEventClass>;
    let comp: VideoOfEventClass;
    let videoOfEventServiceStub: SinonStubbedInstance<VideoOfEventService>;

    beforeEach(() => {
      videoOfEventServiceStub = sinon.createStubInstance<VideoOfEventService>(VideoOfEventService);

      wrapper = shallowMount<VideoOfEventClass>(VideoOfEventUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          videoOfEventService: () => videoOfEventServiceStub,

          eventOfPlateMillService: () => new EventOfPlateMillService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.videoOfEvent = entity;
        videoOfEventServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(videoOfEventServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.videoOfEvent = entity;
        videoOfEventServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(videoOfEventServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
