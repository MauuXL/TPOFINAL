const { createApp } = Vue;

createApp({
  data() {
    return {
      productos: [],
      url: 'http://yoxber.pythonanywhere.com/productos',
      error: false,
      cargando: true,
      id: 0,
      nombre: "",
      imagen: "",
      stock: 0,
      precio: 0,
      carrito: [], // Nueva propiedad para almacenar los productos seleccionados
      contador: 0, // Nueva propiedad para contar los productos seleccionados
      total: 0, // Nueva propiedad para calcular el total de los productos seleccionados
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.productos = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(producto) {
      const url = this.url + '/' + producto;
      var options = {
        method: 'DELETE',
      };
      fetch(url, options)
        .then(res => res.text()) // or res.json()
        .then(res => {
          location.reload();
        });
    },
    grabar() {
      let producto = {
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        imagen: this.imagen,
      };
      var options = {
        body: JSON.stringify(producto),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };
      fetch(this.url, options)
        .then(() => {
          alert("Registro grabado");
          window.location.href = "../templates/productos.html";
        })
        .catch(err => {
          console.error(err);
          alert("Error al grabar");
        });
    },
    agregarAlCarrito(producto) {
      this.carrito.push(producto); // Agrega el producto al carrito
      this.contador += 1; // Incrementa el contador de productos seleccionados
      this.total += producto.precio; // Suma el precio del producto al total
    },
    eliminarDelCarrito(producto) {
      const index = this.carrito.indexOf(producto);
      if (index !== -1) {
        this.carrito.splice(index, 1); // Elimina el producto del carrito
        this.contador -= 1; // Decrementa el contador de productos seleccionados
        this.total -= producto.precio; // Resta el precio del producto del total
      }
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount('#app');

