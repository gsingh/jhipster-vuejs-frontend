/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import HeavyPlateFinishedUpdateComponent from '@/entities/heavy-plate-finished/heavy-plate-finished-update.vue';
import HeavyPlateFinishedClass from '@/entities/heavy-plate-finished/heavy-plate-finished-update.component';
import HeavyPlateFinishedService from '@/entities/heavy-plate-finished/heavy-plate-finished.service';

import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('HeavyPlateFinished Management Update Component', () => {
    let wrapper: Wrapper<HeavyPlateFinishedClass>;
    let comp: HeavyPlateFinishedClass;
    let heavyPlateFinishedServiceStub: SinonStubbedInstance<HeavyPlateFinishedService>;

    beforeEach(() => {
      heavyPlateFinishedServiceStub = sinon.createStubInstance<HeavyPlateFinishedService>(HeavyPlateFinishedService);

      wrapper = shallowMount<HeavyPlateFinishedClass>(HeavyPlateFinishedUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          heavyPlateFinishedService: () => heavyPlateFinishedServiceStub,

          shiftManagerService: () => new ShiftManagerService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.heavyPlateFinished = entity;
        heavyPlateFinishedServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(heavyPlateFinishedServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.heavyPlateFinished = entity;
        heavyPlateFinishedServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(heavyPlateFinishedServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
