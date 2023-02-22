import http from "../utils/http.js";

class ApiService {
  static getCodigoUnico = async (dni) => {
    let res = await http.post("get-codigo", dni);
    return res.data.datos;
  };

  static getPaiseSelect = async () => {
    let res = await http.get("select-data/get-paises");
    return res.data.datos;
  };

  static getDepartamentos = async () => {
    let res = await http.get("select-data/get-departamentos");
    return res.data.datos;
  };

  static getProvincias = async (departamento) => {
    let res = await http.get("select-data/get-provincias/" + departamento);
    return res.data.datos;
  };

  static getDistritos = async (departamento, provincia) => {
    let res = await http.get(
      "select-data/get-distritos/" + departamento + provincia
    );
    return res.data.datos;
  };

  static getColegios = async (ubigeo) => {
    let res = await http.get("/select-data/get-colegios/" + ubigeo);
    return res.data.datos;
  };

  static getProgramasEstudios = async () => {
    let res = await http.get("select-data/get-programa-estudios");
    return res.data.datos;
  };
  static guardaDatos = async (formData) => {
    let res = await http.post("/pre-inscripcion/guardar", formData);

    return res.data;
  };

  static getPreguntas = async (id) => {
    let res = await http.get("preguntas/" + id);
    return res.data.datos;
  };

  static iniciarPreInscripcion = async (dni) => {
    let res = await http.get("iniciar-pre-inscripcion/" + dni);
    return res.data;
  };

  static validarDatos = async (datos) => {
    let res = await http.post("validar-datos", datos);
    return res.data;
  };
}

export default ApiService;
