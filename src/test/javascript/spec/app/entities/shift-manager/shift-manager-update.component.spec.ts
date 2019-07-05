/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ShiftManagerUpdateComponent from '@/entities/shift-manager/shift-manager-update.vue';
import ShiftManagerClass from '@/entities/shift-manager/shift-manager-update.component';
import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

import ProductionService from '@/entities/production/production.service';

import HeavyPlateFinishedService from '@/entities/heavy-plate-finished/heavy-plate-finished.service';

import NormalisingService from '@/entities/normalising/normalising.service';

import ShippingService from '@/entities/shipping/shipping.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('ShiftManager Management Update Component', () => {
    let wrapper: Wrapper<ShiftManagerClass>;
    let comp: ShiftManagerClass;
    let shiftManagerServiceStub: SinonStubbedInstance<ShiftManagerService>;

    beforeEach(() => {
      shiftManagerServiceStub = sinon.createStubInstance<ShiftManagerService>(ShiftManagerService);

      wrapper = shallowMount<ShiftManagerClass>(ShiftManagerUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          shiftManagerService: () => shiftManagerServiceStub,

          productionService: () => new ProductionService(),

          heavyPlateFinishedService: () => new HeavyPlateFinishedService(),

          normalisingService: () => new NormalisingService(),

          shippingService: () => new ShippingService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.shiftManager = entity;
        shiftManagerServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(shiftManagerServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.shiftManager = entity;
        shiftManagerServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(shiftManagerServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
