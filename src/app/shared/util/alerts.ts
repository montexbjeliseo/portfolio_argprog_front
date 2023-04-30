import Swal from 'sweetalert2';

function alertError(msg: string) {
    Swal.fire({
      title: 'Error',
      text: msg,
      icon: 'warning',
      background: "rgba(33, 37, 41)"
    });
  }

function alertSuccess(msg: string) {
    Swal.fire(
      {
        title: 'Operación exitosa!',
        text: msg,
        icon: 'success',
        background: "rgba(33, 37, 41)"
      });
}

export {
    alertError, 
    alertSuccess
}