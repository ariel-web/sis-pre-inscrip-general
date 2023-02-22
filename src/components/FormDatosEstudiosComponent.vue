<template>
  <n-card class="card-datos" title="DATOS DEL COLEGIO DE PROCEDENCIA">
    <n-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-placement="showLabel"
      label-width="200"
    >
      <n-form-item path="primer_ap" label="País">
        <n-select
          v-model:value="formData.pais"
          label-field="nombre"
          value-field="id"
          filterable
          clearable
          :options="paises"
          placeholder=""
        />
      </n-form-item>

      <template v-if="formData.pais === 1">
        <n-form-item path="departamento" label="Departamento">
          <n-select
            v-model:value="formData.departamento"
            filterable
            clearable
            :options="data_departamentos"
            placeholder=""
          />
        </n-form-item>

        <n-form-item path="provincia" label="Provincia">
          <n-select
            v-model:value="formData.provincia"
            :loading="data_provincias_loading"
            filterable
            clearable
            :options="data_provincias"
            placeholder=""
          />
        </n-form-item>

        <n-form-item path="distrito" label="Distrito">
          <n-select
            v-model:value="formData.distrito"
            :loading="data_distritos_loading"
            filterable
            clearable
            :options="data_distritos"
            placeholder=""
          />
        </n-form-item>

        <n-form-item path="colegio" label="Colegio">
          <n-select
            v-model:value="formData.colegio"
            :loading="data_colegios_loading"
            filterable
            clearable
            :options="data_colegios"
            placeholder=""
          />
        </n-form-item>
      </template>
<!-- 
      <n-form-item path="direccion" label="Dirección del colegio">
        <n-input
          v-model:value="formData.direccion"
          class="mayus"
          placeholder=""
        />
      </n-form-item> -->

      <n-form-item path="egreso" label="Año de egreso">
        <n-input
          :allow-input="onlyAllowNumber"
          maxlength="4"
          show-count
          v-model:value="formData.egreso"
          placeholder="2022"
          :max="2023"
          minVal="2000"
        />
      </n-form-item>
    </n-form>

    <template #action>
      <n-space justify="space-between">
        <n-button
          size="large"
          type="primary"
          @click="atras"
          icon-placement="left"
        >
          ATRAS
          <template #icon>
            <n-icon>
              <ArrowBack />
            </n-icon>
          </template>
        </n-button>

        <n-button
          size="large"
          type="primary"
          @click="handleValidateClick"
          icon-placement="right"
        >
          SIGUIENTE
          <template #icon>
            <n-icon>
              <ArrowForward />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
  </n-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useMessage } from "naive-ui";
import ApiService from "../services/apiService.js";

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  showLabel: String,
  paises: Array,
});
const emit = defineEmits(["update:modelValue", "paso"]);

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const formRef = ref(null);
const message = useMessage();

const data_departamentos = ref([]);
const data_provincias = ref([]);
const data_provincias_loading = ref(false);
const data_distritos = ref([]);
const data_distritos_loading = ref(false);
const data_colegios = ref([]);
const data_colegios_loading = ref(false);

const formData = ref({
  pais: 1,
  departamento: null,
  provincia: null,
  distrito: null,
  colegio: null,
  direccion: null,
  egreso: null,
});

const releRequired = {
  required: true,
  message: "Obligatorio",
  trigger: ["input", "blur"],
};

const rules = {
  pais: [releRequired],
  direccion: [releRequired],
  egreso: {
    type: "number",
    required: true,
    trigger: ["input", "blur"],
    validator(rule, value) {
      let long = 4;
      if (!value) {
        return new Error("Obligatorio");
      } else if (isNaN(value)) {
        return new Error("Solo se permite numeros");
      } else if (value.length != long) {
        return new Error("Año de egreso invalido");
      }

      return true;
    },
  },
};

watch(
  () => ({ ...formData.value }),
  (val, old) => {
    if (val.departamento != old.departamento) {
      //formData.value.provincia = null;
      //formData.value.distrito = null;
      if (val.departamento != null) {
        getProvincias();
      }
    }

    if (val.provincia != old.provincia) {
      //formData.value.distrito = null;
      if (val.departamento != null && val.provincia != null) {
        getDistritos();
      }
    }

    if (val.distrito != old.distrito) {
      //formData.value.distrito = null;
      if (
        val.departamento != null &&
        val.provincia != null &&
        val.distrito != null
      ) {
        getColegios();
      }
    }
  }
);

//GET DEPARTAMENTOS
const getDepartamentos = async () => {
  let res = await ApiService.getDepartamentos();
  data_departamentos.value = res;
};

//GET PROVINCIAS
const getProvincias = async () => {

  data_provincias_loading.value = true;
  let res = await ApiService.getProvincias(formData.value.departamento);
  data_provincias.value = res;
  data_provincias_loading.value = false;
};

//GET Distritos
const getDistritos = async () => {
  

  data_distritos_loading.value = true;
  let res = await ApiService.getDistritos(
    formData.value.departamento,
    formData.value.provincia
  );
  data_distritos.value = res;
  data_distritos_loading.value = false;
};

//GET Distritos
const getColegios = async () => {
  data_colegios_loading.value = true;
  let res = await ApiService.getColegios(formData.value.distrito);
  data_colegios.value = res;
  data_colegios_loading.value = false;
};

const initialize = async () => {
  await getDepartamentos();

  if (props.modelValue != null) {
    formData.value = props.modelValue;
  }
};

initialize();

const handleValidateClick = async (e) => {
  //SIGUIENTE
  e.preventDefault();

  formRef.value?.validate((errors) => {
    if (!errors) {
      message.success("Paso Siguiente");
      emit("update:modelValue", formData.value);
      emit("paso", 3);
    } else {
      console.log(errors);
      message.error("Llenar el formulario de manera correcta");
    }
  });
};
const atras = async (e) => {
  e.preventDefault();
  emit("update:modelValue", formData.value);
  emit("paso", 1);
};
</script>
