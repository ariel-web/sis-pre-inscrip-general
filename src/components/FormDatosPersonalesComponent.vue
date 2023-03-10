<template>
  <!-- <n-card id="pago" class="card-datos">
    <template #header> PAGO POR DERECHO DE ADMISIÓN</template>
    <n-grid cols="1 600:2" :x-gap="20">
      <n-grid-item>
        <n-alert :show-icon="false">
          <n-tabs type="line" animated>
            <n-tab-pane name="oasis" tab="Agencia">
              <n-space justify="center">
                <n-image
                  width="350"
                  lazy
                  src="/assets/exam_voucher/voucherDniBN.jpg"
                />
              </n-space>
            </n-tab-pane>
            <n-tab-pane name="the beatles" tab="Pago en caja">
              <n-space justify="center">
       
              </n-space>
            </n-tab-pane>
          </n-tabs>
        </n-alert>
      </n-grid-item>

      <n-grid-item>
        <n-form
          :model="formData"
          :rules="rules"
          ref="formPagoRef"
          label-placement="left"
          label-width="110"
        >


          <n-form-item path="voucher_pago.secuencia" label="N° secuencia:">
            <n-input
              v-model:value="formData.voucher_pago.secuencia"
              placeholder="330236"
            />
          </n-form-item>
          <n-form-item path="voucher_pago.fecha" label="Fecha de pago:">
            <n-input
              type="date"
              v-model:value="formData.voucher_pago.fecha"
              placeholder=""
            />
          </n-form-item>

          <n-form-item path="voucher_pago.monto" label="Monto:">
            <n-input
              v-model:value="formData.voucher_pago.monto"
              placeholder=""
            />
          </n-form-item>
        </n-form>
      </n-grid-item>
    </n-grid>
  </n-card> -->

  <n-card id="persona" class="card-datos">
    <template #header> DATOS PERSONALES </template>
    <n-form
      ref="formPerRef"
      :model="formData"
      :rules="rules"
      :label-placement="showLabel"
      label-width="220"
    >
      <n-form-item path="primer_ap" label="Primer Apellido">
        <n-input
          v-model:value="formData.primer_ap"
          placeholder="Primer Apellido"
          class="mayus"
        />
      </n-form-item>

      <n-form-item path="segundo_ap" label="Segundo Apellido">
        <n-input
          v-model:value="formData.segundo_ap"
          placeholder="Segundo Apellido"
          class="mayus"
        />
      </n-form-item>

      <n-form-item path="nombres" label="Nombres">
        <n-input
          v-model:value="formData.nombres"
          placeholder="Nombres"
          class="mayus"
        />
      </n-form-item>

      <n-form-item path="celular" label="Celular">
        <n-input
          v-model:value="formData.celular"
          placeholder="Celular"
          :allow-input="onlyAllowNumber"
          maxlength="9"
          show-count
        />
      </n-form-item>

      <n-form-item path="correo" label="Correo">
        <n-auto-complete
          v-model:value="formData.correo"
          :input-props="{
            autocomplete: 'disabled',
          }"
          :options="options"
          placeholder="Correo"
          class="mayus"
        />
      </n-form-item>

      <n-form-item label="Sexo" path="sexo">
        <n-select
          v-model:value="formData.sexo"
          placeholder="Sexo"
          clearable
          :options="[
            { label: 'MASCULINO', value: 'M' },
            { label: 'FEMENINO', value: 'F' },
          ]"
        />
      </n-form-item>

      <n-form-item label="Estado Civil" path="estado_civil">
        <n-select
          v-model:value="formData.estado_civil"
          clearable
          placeholder="Estado Civil"
          :options="[
            { label: 'SOLTERO', value: 'S' },
            { label: 'CASADO', value: 'C' },
            { label: 'VIUDO', value: 'V' },
            { label: 'DIVORCIADO', value: 'D' },
          ]"
        />
      </n-form-item>

      <template v-if="formData.estado_civil == 'C' && formData.sexo == 'F'">
        <n-form-item path="casada_ap" label="Apellido de casada">
          <n-input
            v-model:value="formData.casada_ap"
            placeholder="Apellido de casada"
            class="mayus"
          />
        </n-form-item>
      </template>

      <n-form-item label="Fecha de Nacimiento" path="fecha_nacimiento">
        <n-input
          v-model:value="formData.fecha_nacimiento"
          type="date"
          placeholder=""
        />
      </n-form-item>
      <n-form-item path="numero_ubigeo" label="Número de ubigeo de nacimiento">
        <n-input
          v-model:value="formData.numero_ubigeo"
          placeholder="Número de ubigeo"
          :allow-input="onlyAllowNumber"
          maxlength="6"
          show-count
        />
      </n-form-item>
    </n-form>
  </n-card>

  <n-card id="residencia" class="card-datos">
    <template #header> LUGAR DE RESIDENCIA </template>

    <n-form
      ref="formResRef"
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
          placeholder="País"
        />
      </n-form-item>

      <template v-if="formData.pais === 1">
        <n-form-item path="departamento" label="Departamento">
          <n-select
            v-model:value="formData.departamento"
            filterable
            clearable
            :options="data_departamentos"
            placeholder="Departamento"
          />
        </n-form-item>

        <n-form-item path="provincia" label="Provincia">
          <n-select
            v-model:value="formData.provincia"
            :loading="data_provincias_loading"
            filterable
            clearable
            :options="data_provincias"
            placeholder="Provincia"
          />
        </n-form-item>

        <n-form-item path="distrito" label="Distrito">
          <n-select
            v-model:value="formData.distrito"
            :loading="data_distritos_loading"
            filterable
            clearable
            :options="data_distritos"
            placeholder="Distrito"
          />
        </n-form-item>
      </template>

      <n-form-item path="direccion" label="Dirección">
        <n-input
          v-model:value="formData.direccion"
          placeholder="Dirección"
          class="mayus"
        />
      </n-form-item>
    </n-form>
  </n-card>

  <n-card id="apoderado" class="card-datos">
    <template #header> DATOS DEL APODERADO </template>

    <n-form
      ref="formTutRef"
      :model="formData"
      :rules="rules"
      :label-placement="showLabel"
      label-width="200"
    >
      <div v-for="(item, index) in formData.padres" :key="index">
        <n-divider title-placement="left">
          {{ item.parentesco }}
        </n-divider>

        <n-form-item
          :path="`padres[${index}].tipo_doc`"
          label="Tipo de documento"
        >
          <n-radio-group v-model:value="item.tipo_doc">
            <n-space>
              <n-radio value="dni"> DNI </n-radio>
              <n-radio value="carne"> Carné Extrangería </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item
          :path="`padres[${index}].num_doc`"
          label="Número de documento"
        >
          <n-input
            v-model:value="item.num_doc"
            clearable
            placeholder="Número de documento"
            :allow-input="onlyAllowNumber"
            :maxlength="formData.padres[index].tipo_doc == 'dni' ? 8 : 12"
            show-count
          />
        </n-form-item>

        <n-form-item :path="`padres[${index}].nombres`" label="Nombres">
          <n-input
            v-model:value="item.nombres"
            clearable
            placeholder="Nombres"
            class="mayus"
          />
        </n-form-item>

        <n-form-item
          :path="`padres[${index}].primer_ap`"
          label="Primer Apellido"
        >
          <n-input
            v-model:value="item.primer_ap"
            clearable
            placeholder="Primer Apellido"
            class="mayus"
          />
        </n-form-item>

        <n-form-item
          :path="`padres[${index}].segundo_ap`"
          label="Segundo Apellido"
          class="mayus"
        >
          <n-input
            v-model:value="item.segundo_ap"
            clearable
            placeholder="Segundo Apellido"
            class="mayus"
          />
        </n-form-item>
      </div>
    </n-form>

    <template #action>
      <n-space justify="end">
        <n-button
          size="large"
          type="primary"
          @click="handleValidateClick"
          icon-placement="right"
          :loading="loading"
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

const loading = ref(false);

const formPagoRef = ref(null);
const formPerRef = ref(null);
const formTutRef = ref(null);
const formResRef = ref(null);
const message = useMessage();

const data_departamentos = ref([]);
const data_provincias = ref([]);
const data_provincias_loading = ref(false);
const data_distritos = ref([]);
const data_distritos_loading = ref(false);

const formData = ref({
  primer_ap: "",
  segundo_ap: "",
  casada_ap: "",
  nombres: "",
  celular: "",
  correo: "",
  sexo: null,
  estado_civil: null,
  fecha_nacimiento: null,
  numero_ubigeo: "",
  numero_doc: "",
  ubicacion: {
    departamento: null,
    provincia: null,
    distrito: null,
  },
  ubicacion_ubigeo: "",
  padres: [
    {
      parentesco: "Padre o apoderado", //padre madre, tutor
      tipo_doc: "dni",
      num_doc: "",
      primer_ap: "",
      segundo_ap: "",
      nombres: "",
    },
    {
      parentesco: "Madre", //padre madre, tutor
      tipo_doc: "dni",
      num_doc: "",
      primer_ap: "",
      segundo_ap: "",
      nombres: "",
    },
  ],

  pais: 1,
  departamento: null,
  provincia: null,
  distrito: null,
  direccion: null,

  voucher_pago: {
    file: null,
    secuencia: window.localStorage.getItem("secuencia"),
    fecha: window.localStorage.getItem("fecha"),
    hora: null,
    monto: window.localStorage.getItem("monto"),
  },
});

const releRequired = {
  required: true,
  message: "Obligatorio",
  trigger: ["input", "blur"],
};

const ruleEamil = {
  type: "email",
  required: true,
  message: "Correo no valido",
  trigger: ["input", "blur"],
};

const validPadres = {
  parentesco: [releRequired],
  tipo_doc: [releRequired],
  num_doc: {
    type: "number",
    required: true,
    trigger: ["input", "blur"],
    validator(rule, value) {
      console.log("validando");
      let long = formData.value.padres[0].tipo_doc == "dni" ? 8 : 12;
      if (!value) {
        return new Error("Obligatorio");
      } else if (isNaN(value)) {
        return new Error("Solo se permite numeros");
      } else if (value.length != long) {
        return new Error("Número de documento invalido");
      }

      return true;
    },
  },
  primer_ap: [releRequired],
  nombres: [releRequired],
};

const validMadre = {
  num_doc: {
    type: "number",
    required: false,
    trigger: ["input", "blur"],
    validator(rule, value) {
      let long = formData.value.padres[1].tipo_doc == "dni" ? 8 : 12;
      if (!value) {
        return true;
      } else if (value.length != long) {
        return new Error("Número de documento invalido");
      }

      return true;
    },
  },
};

const rules = {
  primer_ap: [releRequired],
  nombres: [releRequired],
  celular: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error("Obligatorio");
      } else if (value.toString().length != 9) {
        return new Error("Número de celular invalido");
      }
      return true;
    },

    trigger: ["input", "blur"],
  },
  correo: [ruleEamil],
  sexo: [releRequired],
  estado_civil: [releRequired],
  fecha_nacimiento: [
    {
      required: true,
      trigger: ["blur", "change"],
      message: "Seleccion su fecha de nacimiento",
    },
  ],
  numero_ubigeo: {
    required: true,
    validator(rule, value) {
      if (!value) {
        return new Error("Obligatorio");
      } else if (value.toString().length != 6) {
        return new Error("Número de ubigeo invalido");
      }
      return true;
    },

    trigger: ["input", "blur"],
  },
  padres: [validPadres, validMadre],

  pais: {
    required: true,
    message: "Obligatorio",
    trigger: ["change", "blur"],
  },
  direccion: [releRequired],

  // voucher_pago: {
  //   secuencia: {
  //     required: true,
  //     message: "Obligatorio",
  //     trigger: ["blur", "input"],
  //   },
  //   fecha: {
  //     required: true,
  //     message: "Obligatorio",
  //     trigger: ["blur", "input"],
  //   },
  //   monto: {
  //     required: true,
  //     message: "Obligatorio",
  //     trigger: ["blur", "input"],
  //   },
  // },
};

watch(
  () => ({ ...formData.value }),
  (val, old) => {
    //if (val.fecha_nacimiento) {}

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

const initialize = async () => {
  await getDepartamentos();

  if (props.modelValue != null) {
    formData.value = props.modelValue;
    formData.value.provincia = props.modelValue.provincia;
  }
};

initialize();

const options = computed(() => {
  return ["@gmail.com", "@hotmail.com", "@outlook.com"].map((suffix) => {
    const prefix = formData.value.correo.split("@")[0];
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    };
  });
});

const validarDatos = async () => {
  let datos = {
    correo: formData.value.correo,
    celular: formData.value.celular,
  };
  return ApiService.validarDatos(datos);
};

const goToSection = (sectionid) => {
  let section = document.getElementById(sectionid);

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

const handleValidateClick = async (e) => {
  //SIGUIENTE
  e.preventDefault();

  formPerRef.value?.validate((errors) => {
    if (!errors) {
      formTutRef.value?.validate((errors) => {
        if (!errors) {
          formResRef.value?.validate(async (errors) => {
            if (!errors) {
              let res = await validarDatos();
              if (res.estado) {
                emit("update:modelValue", formData.value);
                emit("paso", 2); //CHANGED PASO
                message.success("Paso Siguiente");
              } else {
                message.error(res.mensaje);
              }
            } else {
              goToSection("apodeado");
              message.error("Llenar el formulario de manera correcta");
            }
          });
        } else {
          goToSection("residencia");
          message.error("Llenar el formulario de manera correcta");
        }
      });
    } else {
      goToSection("persona");
      message.error("Llenar el formulario de manera correcta");
    }
  });
};



</script>
