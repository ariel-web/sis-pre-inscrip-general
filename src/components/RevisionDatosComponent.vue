<template>
  <n-card>
    <template v-if="inscrito === 1">
      <div style="width: 400px; text-align: center">
        <h2>Felicitaciones ya está pre-inscrito</h2>

        <br />

        <div style="display: flex; justify-content: center">
          <a
            class="b-block"
            :href="
              'https://back-admi.arielluqu3.com/api/constancia-pre-inscripcion-general/' +
              dniV
            "
          >
            DESCARGAR CONSTANCIA DE PRE-INSCRIPCIÓN
          </a>
        </div>
      </div>
    </template>
    <template v-if="inscrito === 2">
      <div style="width: 400px; text-align: center">
        <h2>
          Ocurrió un problema al momento de registrar sus datos verifique que ha
          llenado todos los datos del formulario
        </h2>
        <h2>Vuelva a Intentarlo</h2>
        <h2>
          Si el problema persiste comuniquese con el Administrador, solo para
          pre-inscripccionres (Solo whatsapp 928845434)
        </h2>

        <n-button class="b-block" type="primary" @click="atras">
          ATRAS
        </n-button>
      </div>
    </template>

    <!-- <div style="text-align: center; width: 600px">
      <h2>
        {{ datos_personales.nombres }} EL SISTEMA DE PRE-INCRIONES ESTÁ EN
        REAJUSTES, ESTAÁRA DISPONIBLE DESDE VIERNES 3 DE FEBRERO A PARTIR DE LAS
        8:30AM
      </h2>
      <h3>!Muchas Gracias por su comprensión!</h3>
      <h3 style="margin-bottom: -40px">cod. de Solicitud:</h3>
      <h1 style="font-size: 40px">{{ codigo }}</h1>
    </div> -->
  </n-card>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ApiService from "../services/apiService";
const route = useRoute();
const emit = defineEmits(["update:modelValue", "paso"]);
//back-cepre.arielluqu3.com
const inscrito = ref(0);

const atras = () => {
  emit("paso", 3);
};
const props = defineProps({
  datos_personales: Object,
  datos_estudios: Object,
  datos_programa: Object,
  codigo: String,
  dni: String,
});
const text_res = ref("");
const resultado = ref("");

const dniV = route.params.id;

const initialize = async () => {
  let data = new FormData();
  data.append("datos_personales", JSON.stringify(props.datos_personales));
  data.append("datos_programa", JSON.stringify(props.datos_programa));
  data.append("datos_estudios", JSON.stringify(props.datos_estudios));

  data.append("foto_postulante", props.datos_programa.foto_postulante);
  data.append("pdf_certificado", props.datos_programa.certificado_estudios);

  data.append("tipo_doc", window.localStorage.getItem("tipo_doc"));
  data.append("dni", window.localStorage.getItem("num_doc"));
  data.append("codigo", window.localStorage.getItem("codigo"));

  let res = await ApiService.guardaDatos(data);

  resultado.value = res.estado;

  if (resultado.value) {
    console.log("Registro exitoso");
    inscrito.value = 1;
    window.localStorage.removeItem("tipo_doc");
    window.localStorage.removeItem("num_doc");
    window.localStorage.removeItem("codigo");

    window.localStorage.removeItem("secuencia");
    window.localStorage.removeItem("fecha");
    window.localStorage.removeItem("monto");
  } else {
    console.log("Ocurrio un errror");
    inscrito.value = 2;
  }
};

initialize();
</script>
