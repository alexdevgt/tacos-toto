/* ============================
   SPLASH
============================ */
setTimeout(() => {
  const splash = document.getElementById("splash");
  if (splash) splash.style.display = "none";
}, 2600);

/* ============================
   CARRUSEL
============================ */
let indice = 0;
let intervalo;

const slides = document.querySelectorAll(".slide");
const puntosContenedor = document.querySelector(".puntos");

if (slides.length && puntosContenedor) {
  slides.forEach((_, i) => {
    const punto = document.createElement("span");
    punto.onclick = () => mostrarSlide(i);
    puntosContenedor.appendChild(punto);
  });
}

const puntos = document.querySelectorAll(".puntos span");

function mostrarSlide(i) {
  if (!slides.length || !puntos.length) return;

  slides[indice].classList.remove("activo");
  puntos[indice].classList.remove("activo");

  indice = (i + slides.length) % slides.length;

  slides[indice].classList.add("activo");
  puntos[indice].classList.add("activo");
}

function siguienteSlide() { mostrarSlide(indice + 1); }
function anteriorSlide() { mostrarSlide(indice - 1); }

function iniciarAuto() {
  clearInterval(intervalo);
  intervalo = setInterval(siguienteSlide, 3500);
}

function detenerAuto() { clearInterval(intervalo); }

if (slides.length > 0) {
  mostrarSlide(0);
  iniciarAuto();

  const contenedor = document.querySelector(".slide-contenedor");
  if (contenedor) {
    contenedor.addEventListener("mouseenter", detenerAuto);
    contenedor.addEventListener("mouseleave", iniciarAuto);
  }
}

/* FLECHAS FUNCIONALES */
const flechaIzq = document.getElementById("flecha-izq");
const flechaDer = document.getElementById("flecha-der");

if (flechaIzq) flechaIzq.onclick = anteriorSlide;
if (flechaDer) flechaDer.onclick = siguienteSlide;

/* ============================
   MODAL
============================ */
const productos = document.querySelectorAll(".producto");
const modal = document.getElementById("modal-producto");
const cerrarModal = document.getElementById("cerrarModal");

const modalImg = document.getElementById("modal-img");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescripcion = document.getElementById("modal-descripcion");
const modalPrecio = document.getElementById("modal-precio");
const modalBoton = document.getElementById("modal-boton");

const infoProductos = {
  "TACOS AL PASTOR": {
    descripcion: "Carne al Pastor y tortilla de maíz. Porción de 3 unidades.",
    precio: "Q 30.00",
    img: "img/menu/tacos-al-pastor.png"
  },
  "FLAUTAS": {
    descripcion: "Carne de res hilachada, tortilla de harina recién hecha y queso mozzarella. Porción de 3 unidades.",
    precio: "Q 35.00",
    img: "img/menu/flautas.png"
  },
  "TACOS DE RES": {
    descripcion: "Carne 100% de res, tortillas de maíz. Porción de 3 unidades.",
    precio: "Q 30.00",
    img: "img/menu/tacos-de-res.png"
  },
  "TAQUIGRINGAS": {
    descripcion: "Carne al Pastor, tortilla de maíz y queso mozzarella. Porción de 3 unidades.",
    precio: "Q 33.00",
    img: "img/menu/taquigringas.png"
  },
  "GRINGAS": {
    descripcion: "Carne al Pastor, tortilla de harina mediana y queso mozzarella. Porción de 3 unidades.",
    precio: "Q 25.00",
    img: "img/menu/gringas.png"
  },
  "GRINGAS DE RES": {
    descripcion: "Carne 100% de res, tortilla de harina mediana y queso mozzarella. Porción de 3 unidades.",
    precio: "Q 33.00",
    img: "img/menu/gringas-de-res.png"
  },
  "HAWAIANAS": {
    descripcion: "Carne al Pastor, tortilla de harina mediana, piña y queso mozzarella. Porción de 3 unidades.",
    precio: "Q 25.00",
    img: "img/menu/hawaianas.png"
  },
  "SUPER GRINGA": {
    descripcion: "Carne al Pastor, 2 tortillas de harina grande, salchicha y queso mozzarella. 1 unidad.",
    precio: "Q 25.00",
    img: "img/menu/super-gringa.png"
  },
  "SUPER HAWAIANA": {
    descripcion: "Carne al Pastor, 2 tortillas de harina grande, piña, salchicha y queso mozzarella. 1 unidad.",
    precio: "Q 25.00",
    img: "img/menu/super-hawaiana.png"
  },
  "TORTA": {
    descripcion: "Carne al Pastor, pan, salchicha y queso Kraft. 1 unidad.",
    precio: "Q 22.00",
    img: "img/menu/torta.png"
  },
  "SUPER TORTA": {
    descripcion: "Carne al Pastor, pan, salchicha, queso mozzarella y huevo. 1 unidad.",
    precio: "Q 27.00",
    img: "img/menu/super-torta.png"
  },
  "SINCRONIZADAS": {
    descripcion: "Jamón, salchicha, tortilla de harina mediana y queso mozzarella. Porción de 3 unidades.",
    precio: "Q 25.00",
    img: "img/menu/sincronizadas.png"
  },
  "QUESADILLAS": {
    descripcion: "Tortilla de harina pequeña y queso mozzarella. Porción de 3 unidades.",
    precio: "Q 33.00",
    img: "img/menu/quesadillas.png"
  }
};

if (productos && modal) {
  productos.forEach(producto => {
    producto.addEventListener("click", () => {
      const key = producto.getAttribute("data-key");
      const data = infoProductos[key];
      if (!data) return;

      modalTitulo.textContent = key;
      modalDescripcion.textContent = data.descripcion;
      modalPrecio.textContent = data.precio;
      modalImg.src = data.img;
      modalImg.alt = key;

      modalBoton.href = "https://www.pedidosya.com.gt/restaurantes/siquinala/tacos-toto";
      modal.style.display = "flex";
    });
  });
}

if (cerrarModal && modal) {
  cerrarModal.onclick = () => modal.style.display = "none";
  modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
}

/* ============================
   BUSCADOR PREDICTIVO
============================ */
const buscadorInput = document.getElementById("buscador-input");
const resultados = document.getElementById("buscador-resultados");

if (buscadorInput && resultados && productos) {
  buscadorInput.addEventListener("input", () => {
    const texto = buscadorInput.value.toLowerCase();
    resultados.innerHTML = "";

    if (texto.length === 0) {
      resultados.style.display = "none";
      // Mostrar todo el menú si se borra el texto
      productos.forEach(p => p.style.display = "");
      return;
    }

    // Filtrar productos en el grid
    productos.forEach(prod => {
      const nombre = prod.querySelector("h3").textContent.toLowerCase();
      prod.style.display = nombre.includes(texto) ? "" : "none";
    });

    // Coincidencias para lista predictiva (empieza con)
    const coincidencias = [...productos].filter(prod =>
      prod.querySelector("h3").textContent.toLowerCase().startsWith(texto)
    );

    if (coincidencias.length === 0) {
      resultados.style.display = "none";
      return;
    }

    coincidencias.forEach(prod => {
      const li = document.createElement("li");
      li.textContent = prod.querySelector("h3").textContent;
      li.onclick = () => {
        prod.scrollIntoView({ behavior: "smooth", block: "center" });
        resultados.style.display = "none";
        buscadorInput.value = li.textContent;
      };
      resultados.appendChild(li);
    });

    resultados.style.display = "block";
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".buscador")) resultados.style.display = "none";
  });
}

