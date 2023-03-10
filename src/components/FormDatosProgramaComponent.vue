<template>
  <n-card class="card-datos" title="PROGRAMA DE ESTUDIOS">
    <n-form
      :model="formData"
      :rules="rules"
      ref="formRef"
      :label-placement="showLabel"
      label-width="200"
    >
      <n-form-item path="programa_estudios" label="Programa de estudio">
        <n-select
          v-model:value="formData.programa_estudios"
          filterable
          clearable
          :options="data_programas"
        />
      </n-form-item>

      <n-form-item path="modalidad" label="Modadlidad">
        <n-select
          v-model:value="formData.modalidad"
          filterable
          clearable
          :options="modalidades"
        />
      </n-form-item>

      <template
        v-if="
          formData.modalidad == 2
        "
      >
        <n-form-item path="" label="Código discapacidad">
          <n-input
            v-model:value="formData.codigo_discapacidad"
            style="text-transform: uppercase"
            placeholder=""
          />
        </n-form-item>
      </template>


      

      <template
        v-if="
          formData.programa_estudios == 14 || formData.programa_estudios == 6
        "
      >
        <n-form-item path="codigo_medico" label="Código de examen medico">
          <n-input
            v-model:value="formData.codigo_medico"
            style=""
            placeholder=""
          />
        </n-form-item>
      </template>
    </n-form>
  </n-card>

  <n-card class="card-datos" title="ARCHIVOS">

    <n-grid cols="1 600:2" :x-gap="20">
      <!-- <n-grid-item>
        <n-divider title-placement="left">
          <small> Foto del postulante (JPG, PNG) </small>
        </n-divider>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          @change="fotoPostulanteChange"
        />

        <template v-if="fotoUrl">
          <n-space justify="center">
            <n-image width="200" :src="fotoUrl" />
          </n-space>
        </template>
      </n-grid-item> -->

      <n-grid-item>
       
        <h4> Certificado de estudios (PDF) </h4>
       
        <input type="file" accept=".pdf" @change="certificadoChange" />
        <div style="height: 10px"></div>
        <label>Codigo certificado</label>
        <n-input
          style=""
          v-model:value="formData.codigo_constancia"
          placeholder="N° de serie o Código virtual"
        />
      </n-grid-item>
    </n-grid>

    <template
      v-if="formData.programa_estudios == 14 || formData.programa_estudios == 6"
    >
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
                  <n-image
                    width="200"
                    lazysx| 
                    src="../../public/assets/exam_voucher/voucher-caja.jpg"
                  />
                </n-space>
              </n-tab-pane>
            </n-tabs>
          </n-alert>
        </n-grid-item>

        <n-grid-item class="mt-1">
          <n-form
            :model="formData"
            :rules="rules"
            ref="formPagoRef"
            label-placement="left"
            label-width="110"
          >
            <!-- <n-card embedded class="mt-0 mb-1">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              @change="pagoDerechoChange"
            />

            <template v-if="uploadUrl">
              <n-space justify="center">
                <n-image width="200" :src="uploadUrl" />
              </n-space>
            </template>
          </n-card> -->

            <n-form-item
              path="voucher_pago_medico.secuencia"
              label="N° secuencia:"
            >
              <n-input
                v-model:value="formData.voucher_pago_medico.secuencia"
                placeholder="330236"
              />
            </n-form-item>
            <n-form-item
              path="voucher_pago_medico.fecha"
              label="Fecha de pago:"
            >
              <n-input
                type="date"
                v-model:value="formData.voucher_pago_medico.fecha"
                placeholder=""
              />
            </n-form-item>

            <n-form-item path="voucher_pago_medico.monto" label="Monto:">
              <n-input
                v-model:value="formData.voucher_pago_medico.monto"
                placeholder=""
              />
            </n-form-item>
          </n-form>
        </n-grid-item>
      </n-grid>
    </template>

    <template #action>
      <n-space justify="space-between">
        <n-button
          size="large"
          type="primary"
          @click="pasoAnterior"
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
          icon-placement="right"
          @click="guardarInscripcion"
        >
          GUARDAR
          <template #icon>
            <n-icon>
              <Save />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
  </n-card>

  <n-modal v-model:show="examenVocaModal">
    <n-card
      title="Examen vocacional"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <ExamenVocacional
        :programa="formData.programa_estudios"
        :codigo="codigoV"
        :dni="dniV"
        :preguntas="preguntas"
        :datos_personales="datos_personales"
      />
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useMessage } from "naive-ui";
import ApiService from "../services/apiService.js";
import { useRoute } from "vue-router";
import ExamenVocacional from "./ExamenVocacionalComponent.vue";

const route = useRoute();

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  showLabel: String,
  paises: Array,
  datos_personales: Object,
});
const emit = defineEmits(["update:modelValue", "paso"]);

const examenVocaModal = ref(false);

const formRef = ref(null);
const formPagoRef = ref(null);
const message = useMessage();

const data_programas = ref([]);
const data_programas_loading = ref(false);

const formData = ref({
  programa_estudios: "",
  codigo_medico: "",
  codigo_constancia: "",
  modalidad: 1,
  codigo_discapacidad:"",

  foto_postulante: null,
  certificado_estudios: null,

  voucher_pago_medico: {
    file: null,
    secuencia: null,
    fecha: "",
    hora: "",
    monto: "",
  },
});

const modalidades = [
{
    "value":1,
    "label":"EXAMEN GENERAL"
  },  
  {
    "value":2,
    "label":"CONADIS"
  }
]

const rules = {
  programa_estudios: {
    type: "number",
    required: true,
    message: "Obligatorio",
    trigger: ["blur", "input"],
  },
  codigo_medico: {
    required: true,
    message: "Obligatorio",
    trigger: ["blur", "input"],
  },

  modalidad: {
    required: true,
    message: "Obligatorio",

  },

  voucher_pago_medico: {
    secuencia: {
      required: true,
      message: "Obligatorio",
      trigger: ["blur", "input"],
    },
    fecha: {
      required: true,
      message: "Obligatorio",
      trigger: ["blur", "input"],
    },
    monto: {
      required: true,
      message: "Obligatorio",
      trigger: ["blur", "input"],
    },
  },
};

const preguntas = ref([]);
const datosPersonaless = ref(null);

watch(
  () => ({ ...formData.value }),
  async (val, old) => {
    if (val.programa_estudios != old.programa_estudios) {
      examenVocaModal.value = true;
      let res = await ApiService.getPreguntas(formData.value.programa_estudios);
      preguntas.value = res;
    }
  }
);  

//GET Distritos
const getProgramasEstudios = async () => {
  data_programas_loading.value = true;
  let res = await ApiService.getProgramasEstudios();
  data_programas.value = res;
  data_programas_loading.value = false;
};

const initialize = async () => {
  await getProgramasEstudios();
  if (props.modelValue != null) {
    formData.value = props.modelValue;
  }
  datosPersonaless.value = JSON.stringify(props.datos_personales);
};

initialize();

const pasoAnterior = async (e) => {
  //SIGUIENTE
  e.preventDefault();
  emit("update:modelValue", formData.value);
  emit("paso", 2);
};

const guardarInscripcion = (e) => {
  //SIGUIENTE
  e.preventDefault();

  formRef.value?.validate((errors) => {
    if (!errors) {
      if (
        formData.value.programa_estudios == 14 ||
        formData.value.programa_estudios == 6
      ) {
        formPagoRef.value?.validate((errors) => {
          if (errors) {
            message.error("Llenar el formulario de manera correcta");
          }
        });
      }

      if (certificadoUrl.value == null) {
        message.error("Certificado de estudios es obligatorio");
      } else {
        emit("update:modelValue", formData.value);
        emit("paso", 4);
        message.success("Finalizar");
      }
    } else {
      message.error("Llenar el formulario de manera correcta");
    }
  });
  //await formTutRef.value?.validate();
  //await formPerRef.value?.validate();
};

const fotoUrl = ref(null);
const certificadoUrl = ref(null);

// ARCHIVOS

const fotoPostulanteChange = (e) => {
  let file = e.target.files[0];

  formData.value.foto_postulante = file;
  fotoUrl.value = URL.createObjectURL(file);
};

const certificadoChange = (e) => {
  let file = e.target.files[0];
  formData.value.certificado_estudios = file;
  certificadoUrl.value = URL.createObjectURL(file);
};

const dniV = route.params.id;
const codigoV = route.params.codigo;
</script>
