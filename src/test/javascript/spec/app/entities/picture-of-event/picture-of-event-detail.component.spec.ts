/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import PictureOfEventDetailComponent from '@/entities/picture-of-event/picture-of-event-details.vue';
import PictureOfEventClass from '@/entities/picture-of-event/picture-of-event-details.component';
import PictureOfEventService from '@/entities/picture-of-event/picture-of-event.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('PictureOfEvent Management Detail Component', () => {
    let wrapper: Wrapper<PictureOfEventClass>;
    let comp: PictureOfEventClass;
    let pictureOfEventServiceStub: SinonStubbedInstance<PictureOfEventService>;

    beforeEach(() => {
      pictureOfEventServiceStub = sinon.createStubInstance<PictureOfEventService>(PictureOfEventService);

      wrapper = shallowMount<PictureOfEventClass>(PictureOfEventDetailComponent, {
        store,
        localVue,
        provide: { pictureOfEventService: () => pictureOfEventServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPictureOfEvent = { id: 123 };
        pictureOfEventServiceStub.find.resolves(foundPictureOfEvent);

        // WHEN
        comp.retrievePictureOfEvent(123);
        await comp.$nextTick();

        // THEN
        expect(comp.pictureOfEvent).toBe(foundPictureOfEvent);
      });
    });
  });
});
