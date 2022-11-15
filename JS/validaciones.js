export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "el campo Nombre no puede estar vacío",
  },

  email: {
    valueMissing: "El campo Email no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },

  password: {
    valueMissing: "El campo password no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una mayúscula, un número y no puede contener caracteres especiales",
  },

  nacimiento: {
    valueMissing: "El campo Fecha de Nacimiento no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },

  numero: {
    valueMissing: "El campo Fecha de Teléfono no puede estar vacío",
    patternMismatch: "Deben de ser 10 números",
  },

  direccion: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La Dirección debe contener entre 10 a 40 caracteres",
  },

  ciudad: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "La Ciudad debe contener entre 10 a 40 caracteres",
  },

  estado: {
    valueMissing: "Este campo no puede estar vacío",
    patternMismatch: "El Estado debe contener entre 10 a 40 caracteres",
  },
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });

  return mensaje;
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fechaCliente) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fechaCliente.getUTCFullYear() + 18,
    fechaCliente.getUTCMonth(),
    fechaCliente.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
