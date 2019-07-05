/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import HeavyPlateFinishedDetailComponent from '@/entities/heavy-plate-finished/heavy-plate-finished-details.vue';
import HeavyPlateFinishedClass from '@/entities/heavy-plate-finished/heavy-plate-finished-details.component';
import HeavyPlateFinishedService from '@/entities/heavy-plate-finished/heavy-plate-finished.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('HeavyPlateFinished Management Detail Component', () => {
    let wrapper: Wrapper<HeavyPlateFinishedClass>;
    let comp: HeavyPlateFinishedClass;
    let heavyPlateFinishedServiceStub: SinonStubbedInstance<HeavyPlateFinishedService>;

    beforeEach(() => {
      heavyPlateFinishedServiceStub = sinon.createStubInstance<HeavyPlateFinishedService>(HeavyPlateFinishedService);

      wrapper = shallowMount<HeavyPlateFinishedClass>(HeavyPlateFinishedDetailComponent, {
        store,
        localVue,
        provide: { heavyPlateFinishedService: () => heavyPlateFinishedServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundHeavyPlateFinished = { id: 123 };
        heavyPlateFinishedServiceStub.find.resolves(foundHeavyPlateFinished);

        // WHEN
        comp.retrieveHeavyPlateFinished(123);
        await comp.$nextTick();

        // THEN
        expect(comp.heavyPlateFinished).toBe(foundHeavyPlateFinished);
      });
    });
  });
});
