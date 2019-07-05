/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ShiftManagerDetailComponent from '@/entities/shift-manager/shift-manager-details.vue';
import ShiftManagerClass from '@/entities/shift-manager/shift-manager-details.component';
import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ShiftManager Management Detail Component', () => {
    let wrapper: Wrapper<ShiftManagerClass>;
    let comp: ShiftManagerClass;
    let shiftManagerServiceStub: SinonStubbedInstance<ShiftManagerService>;

    beforeEach(() => {
      shiftManagerServiceStub = sinon.createStubInstance<ShiftManagerService>(ShiftManagerService);

      wrapper = shallowMount<ShiftManagerClass>(ShiftManagerDetailComponent, {
        store,
        localVue,
        provide: { shiftManagerService: () => shiftManagerServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundShiftManager = { id: 123 };
        shiftManagerServiceStub.find.resolves(foundShiftManager);

        // WHEN
        comp.retrieveShiftManager(123);
        await comp.$nextTick();

        // THEN
        expect(comp.shiftManager).toBe(foundShiftManager);
      });
    });
  });
});
