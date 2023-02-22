<template>
  <template v-if="paso == 1">
    <FormDatosPersonalesComponent
      @paso="paso = $event"
      :showLabel="labelPlacement"
      :paises="paises"
      v-model="datos_personales"
    />
  </template>
  <template v-if="paso == 2">
    <FormDatosEstudiosComponent
      @paso="paso = $event"
      :showLabel="labelPlacement"
      :paises="paises"
      v-model="datos_estudios"
    />
  </template>
  <template v-if="paso == 3">
    <FormDatosProgramaComponent
      @paso="paso = $event"
      :showLabel="labelPlacement"
      :datos_personales="datos_personales"
      :paises="paises"
      v-model="datos_programa"
    />
  </template>

  <template v-if="paso == 4">
    <RevisionDatosComponent
      :datos_personales="datos_personales"
      :datos_estudios="datos_estudios"
      :datos_programa="datos_programa"
      :codigo="codigo"
      @paso="paso = $event"
    />
  </template>
</template>

<script setup>
import { ref } from "vue";
import ApiService from "../services/apiService.js";

import FormDatosPersonalesComponent from "../components/FormDatosPersonalesComponent.vue";
import FormDatosEstudiosComponent from "../components/FormDatosEstudiosComponent.vue";
import FormDatosProgramaComponent from "../components/FormDatosProgramaComponent.vue";
import RevisionDatosComponent from "../components/RevisionDatosComponent.vue";

const paso = ref(1);

const props = defineProps({
  datos_personales: Object,
  datos_estudios: Object,
  datos_programa: Object,
  codigo: String,
  dni: String,
});

const datos_personales = ref(null);
const datos_estudios = ref(null);
const datos_programa = ref(null);
const codigo = ref(null);

const labelPlacement = ref("left");

const paises = ref([]);
const width = ref(document.documentElement.clientWidth);
const resizeBy = () => {
  width.value = document.documentElement.clientWidth;
  labelPlacement.value = width.value < 650 ? "top" : "left";
};
window.addEventListener("resize", resizeBy);
const initialize = async () => {
  paises.value = await ApiService.getPaiseSelect();
};



resizeBy();
initialize();
</script>

<style>
.card-datos {
  display: flex;
  width: 80vw;
  min-width: 300px;
  max-width: 850px;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
</style>
