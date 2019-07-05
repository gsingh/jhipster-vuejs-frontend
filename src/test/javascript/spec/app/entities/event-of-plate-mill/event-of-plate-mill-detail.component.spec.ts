/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EventOfPlateMillDetailComponent from '@/entities/event-of-plate-mill/event-of-plate-mill-details.vue';
import EventOfPlateMillClass from '@/entities/event-of-plate-mill/event-of-plate-mill-details.component';
import EventOfPlateMillService from '@/entities/event-of-plate-mill/event-of-plate-mill.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('EventOfPlateMill Management Detail Component', () => {
    let wrapper: Wrapper<EventOfPlateMillClass>;
    let comp: EventOfPlateMillClass;
    let eventOfPlateMillServiceStub: SinonStubbedInstance<EventOfPlateMillService>;

    beforeEach(() => {
      eventOfPlateMillServiceStub = sinon.createStubInstance<EventOfPlateMillService>(EventOfPlateMillService);

      wrapper = shallowMount<EventOfPlateMillClass>(EventOfPlateMillDetailComponent, {
        store,
        localVue,
        provide: { eventOfPlateMillService: () => eventOfPlateMillServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEventOfPlateMill = { id: 123 };
        eventOfPlateMillServiceStub.find.resolves(foundEventOfPlateMill);

        // WHEN
        comp.retrieveEventOfPlateMill(123);
        await comp.$nextTick();

        // THEN
        expect(comp.eventOfPlateMill).toBe(foundEventOfPlateMill);
      });
    });
  });
});
