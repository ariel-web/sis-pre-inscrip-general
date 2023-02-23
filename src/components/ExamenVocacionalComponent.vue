<template>
  <div v-if="cont === 0">

    <h3>Postulante:</h3>
      <div class="mb-1">
        <strong> Nombres y apellidos : </strong> {{ datos_personales.nombres }}
        {{ datos_personales.primer_ap }}
        {{ datos_personales.segundo_ap }}
      </div>
      <div class="mb-1">
        <strong> Número de documento de identidad : </strong>
        {{ num_doc }}
      </div>
      
    <div
      v-for="(item, index) in preguntas"
      :key="item.id"
      style="margin-bottom: 20px"
    >
      

      <n-card>
        <div style="margin-bottom: 20px">
          <h4>{{ item.pregunta }}</h4>
        </div>

        <div
          v-if="item.url !== null"
          style="display: flex; justify-content: center"
        >
          <img :src="item.url" class="rounded-md mb-6" />
        </div>

        <div v-if="index === 0">
          <n-radio-group v-model:value="res.res1" name="res1">
            <n-radio
              v-for="ite in item.respuestas"
              :key="ite.id"
              :value="ite"
              :label="ite.respuesta"
            />
          </n-radio-group>
        </div>
        <div v-if="index === 1">
          <n-radio-group v-model:value="res.res2" name="res2">
            <div>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </div>
          </n-radio-group>
        </div>
        <div v-if="index === 2">
          <n-radio-group v-model:value="res.res3" name="res3">
            <div>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </div>
          </n-radio-group>
        </div>

        <div v-if="index === 3">
          <n-radio-group v-model:value="res.res4" name="res4">
            <p>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </p>
          </n-radio-group>
        </div>

        <div v-if="index === 4">
          <n-radio-group v-model:value="res.res5" name="res5">
            <div>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </div>
          </n-radio-group>
        </div>

        <div v-if="index === 5">
          <n-radio-group v-model:value="res.res6" name="res6">
            <div>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </div>
          </n-radio-group>
        </div>

        <div v-if="index === 6">
          <n-radio-group v-model:value="res.res7" name="res7">
            <div>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </div>
          </n-radio-group>
        </div>

        <div v-if="index === 7">
          <n-radio-group v-model:value="res.res8" name="res8">
            <div>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </div>
          </n-radio-group>
        </div>

        <div v-if="index === 8">
          <n-radio-group v-model:value="res.res9" name="res9">
            <div>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </div>
          </n-radio-group>
        </div>

        <div v-if="index === 9">
          <n-radio-group v-model:value="res.res10" name="res10">
            <div>
              <n-radio
                v-for="ite in item.respuestas"
                :key="ite.id"
                :value="ite"
                :label="ite.respuesta"
              />
            </div>
          </n-radio-group>
        </div>
      </n-card>
    </div>

    <n-button btnClass="btn-dark" @click="GuardarExamen">
      Guardar Examen
    </n-button>
    <div>
      <!-- <div class="grid grid-cols-1 gap-5" v-for="(item, index) in preguntas" :key="item.id">
                <Pregunta :pregunta="item.pregunta"  :items="item.respuestas" />
            </div> -->
    </div>
  </div>
  <div v-else>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 450px"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        preset="card"
      >
        <div style="display: flex; justify-content: center">
          <div style="text-align: center">
            <div><h2>FELICITACIONES TERMINASTE TU EXAMEN VOCACIONAL</h2></div>
            <h2>IMPRIME TU CONSTANCIA</h2>
            <n-button
              btnClass="btn-dark"
              style="padding: 10px 20px"
              @click="decargarExamen"
              >IMPRIMIR</n-button>
          </div>
        </div>
      </n-card>
    </n-modal> 

    Nota de examen vocacional: {{ nota }}
  </div>
</template>

<script>
import axios from "axios"; 
import http from "../utils/http";
export default {
  props: {
    programa: Number,
    preguntas: Array,
    datos_personales: Object,
  },
  data() {
    return {
      cont: 0,
      nota: 0,
      resps: [],
      preguntas2: [],
      res: {
        res1: null,
        res2: null,
        res3: null,
        res4: null,
        res5: null,
        res6: null,
        res7: null,
        res8: null,
        res9: null,
        res10: null,
      },
      showModal: false,
      num_doc: null,
    };
  },

  methods: {
    async getPreguntas() {
      let res = await axios.get("/preguntas/" + programa);
      this.preguntas2 = res.data.datos;
    },
    async GuardarExamen() {
      let codigo_pre = window.localStorage.getItem("codigo");
     
      let res = await http.post("guardar-examen", {
        respuestas: this.res,
        codigo: codigo_pre,
      });
      this.nota =
        this.res.res1.valor +
        this.res.res2.valor +
        this.res.res3.valor +
        this.res.res4.valor +
        this.res.res5.valor +
        this.res.res6.valor +
        this.res.res7.valor +
        this.res.res8.valor +
        this.res.res9.valor +
        this.res.res10.valor;
      this.cont = 1;
      this.showModal = true;
    },

    async decargarExamen() {
        let codigo_pre = window.localStorage.getItem("codigo");
        let nombre = this.datos_personales.nombres+" "+this.datos_personales.primer_ap+" "+this.datos_personales.segundo_ap;
        window.open(
            "https://back-cepre.arielluqu3.com/api/constancia-vocacional2/" +
            codigo_pre +"/"+this.num_doc+this.programa+"/"+nombre  
        );
        this.showModal = false;
    },
  },

  mounted() {
    this.num_doc = window.localStorage.getItem("num_doc");
    //      this.getPreguntas();
    // this.fetchrespuestas();
  },
};
</script>
