/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import NormalisingUpdateComponent from '@/entities/normalising/normalising-update.vue';
import NormalisingClass from '@/entities/normalising/normalising-update.component';
import NormalisingService from '@/entities/normalising/normalising.service';

import ShiftManagerService from '@/entities/shift-manager/shift-manager.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Normalising Management Update Component', () => {
    let wrapper: Wrapper<NormalisingClass>;
    let comp: NormalisingClass;
    let normalisingServiceStub: SinonStubbedInstance<NormalisingService>;

    beforeEach(() => {
      normalisingServiceStub = sinon.createStubInstance<NormalisingService>(NormalisingService);

      wrapper = shallowMount<NormalisingClass>(NormalisingUpdateComponent, {
        store,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          normalisingService: () => normalisingServiceStub,

          shiftManagerService: () => new ShiftManagerService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.normalising = entity;
        normalisingServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(normalisingServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.normalising = entity;
        normalisingServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(normalisingServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
