<template>
  <div class="card-inicio">
    <n-card class="mt-1 mb-1">
      <template #header> PRE INSCRIPCIÓN - <b> EXAMEN GENERAL </b> </template>
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
        <n-form-item label="Tipo de documento de identidad" path="tipo_doc">
          <n-radio-group v-model:value="formValue.tipo_doc" name="tipo-doc">
            <n-space>
              <n-radio value="dni"> DNI </n-radio>
              <n-radio value="carnet"> Carné de Extrangería </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>

        <n-form-item label="Número del documento" path="dni">
          <n-input-number
            v-model:value="formValue.dni"
            :show-button="false"
            class="b-block"
            placeholder="Número del documento"
            :validator="validator"
          />
        </n-form-item>

        <n-divider title-placement="center">
          PAGO POR DERECHO DE ADMISIÓN
        </n-divider>

        <n-alert class="mb-1" :show-icon="false">
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
                  width="350"
                  lazy
                  src="/assets/exam_voucher/voucher-caja.jpg"
                />
              </n-space>
            </n-tab-pane>
          </n-tabs>
        </n-alert>

        <n-form-item path="voucher_pago.secuencia" label="N° secuencia:">
          <n-input
            v-model:value="formValue.voucher_pago.secuencia"
            placeholder="330236"
          />
        </n-form-item>
        <n-form-item path="voucher_pago.fecha" label="Fecha de pago:">
          <n-input
            type="date"
            v-model:value="formValue.voucher_pago.fecha"
            placeholder=""
          />
        </n-form-item>

        <n-form-item path="voucher_pago.monto" label="Monto:">
          <n-input
            v-model:value="formValue.voucher_pago.monto"
            placeholder=""
          />
        </n-form-item>

        <div>
          <vue-recaptcha
            @verify="verifyMethod"
            @expired="recaptcha = false"
            sitekey="6LfuV3wkAAAAACGAmSGKYTNZAoff-1L3eqXgRwOV"
          ></vue-recaptcha>
        </div>

        <n-button
          class="b-block"
          type="primary"
          @click="handleValidateClick"
          icon-placement="right"
          :loading="loading"
        >
          INICIAR POSTULACIÓN
        </n-button>
      </n-form>
      <template #action>
        <n-space justify="center"> © Copyright 2023 - UNA-Puno </n-space>
      </template>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

import { VueRecaptcha } from "vue-recaptcha";
import ApiService from "../services/apiService.js";
import axios from "axios";

const validator = (x) => x > 0;

const router = useRouter();
const message = useMessage();

const loading = ref(false);

const formRef = ref(null);

const formValue = ref({
  tipo_doc: "dni",
  dni: null,

  voucher_pago: {
    file: null,
    secuencia: null,
    fecha: "",
    hora: "",
    monto: "",
  },
});

const rules = {
  tipo_doc: {
    required: true,
  },
  dni: {
    required: true,
    validator(rule, value) {
      let long = formValue.value.tipo_doc == "dni" ? 8 : 12;
      if (!value) {
        return new Error("Obligatorio");
      } else if (value.toString().length != long) {
        return new Error("Número de documento invalido");
      }
      return true;
    },

    trigger: ["input", "blur"],
  },

  voucher_pago: {
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

const handleValidateClick = async (e) => {
  e.preventDefault();

  await formRef.value?.validate(async (errors) => {
    if (!errors) {
      loading.value = true;
      let codigo = await ApiService.iniciarPreInscripcion(formValue.value.dni);
      if (recaptcha.value == false) {
        message.error("Completar el reCapcha");
      } else if (codigo.estado) {
        window.localStorage.setItem("tipo_doc", formValue.value.tipo_doc);
        window.localStorage.setItem("num_doc", formValue.value.dni);
        window.localStorage.setItem("codigo", codigo.codigo);

        window.localStorage.setItem(
          "secuencia",
          formValue.value.voucher_pago.secuencia
        );
        window.localStorage.setItem(
          "fecha",
          formValue.value.voucher_pago.fecha
        );
        window.localStorage.setItem(
          "monto",
          formValue.value.voucher_pago.monto
        );

        router.push("/postulante/" + formValue.value.dni + "/" + codigo.codigo);
      } else {
        message.error(codigo.mensaje);
      }
      loading.value = false;
    } else {
      console.log(errors);
      message.error("Datos ingresados no validos"); 
    }
  });
};

const recaptcha = ref(false); //CHANGED FOR SNAPCHAT
const verifyMethod = async () => {
  recaptcha.value = true;
};
</script>

<style>
.card-inicio {
  display: flex;
  width: 50vw;
  min-width: 300px;
  max-width: 450px;
}
</style>
