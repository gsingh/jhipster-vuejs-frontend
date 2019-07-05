/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ShippingUpdateComponent from '@/entities/shipping/shipping-update.vue';
import ShippingClass from '@/entities/shipping/shipping-update.component';
import ShippingService from '@/entities/shipping/shipping.service';

import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Shipping Management Update Component', () => {
    let wrapper: Wrapper<ShippingClass>;
    let comp: ShippingClass;
    let shippingServiceStub: SinonStubbedInstance<ShippingService>;

    beforeEach(() => {
      shippingServiceStub = sinon.createStubInstance<ShippingService>(ShippingService);

      wrapper = shallowMount<ShippingClass>(ShippingUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          shippingService: () => shippingServiceStub,

          shiftManagerService: () => new ShiftManagerService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.shipping = entity;
        shippingServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(shippingServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.shipping = entity;
        shippingServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(shippingServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
