import Swal from 'sweetalert2';

const alertTheme = {
  background: "rgba(33, 37, 41, 0.8)",
  textColor: "#fff",
  confirmButtonColor: '#3085d6',
  confirmDeleteButtonColor: '#f00',
  cancelButtonColor: '#d33'
};

function alertError(msg: string) {
    Swal.fire({
      title: 'Error',
      text: msg,
      icon: 'warning',
      background: alertTheme.background,
      color: alertTheme.textColor,
      confirmButtonColor: alertTheme.confirmButtonColor
    });
  }

function alertSuccess(msg: string) {
    Swal.fire(
      {
        title: 'Operación exitosa!',
        text: msg,
        icon: 'success',
        background: alertTheme.background,
        color: alertTheme.textColor,
        confirmButtonColor: alertTheme.confirmButtonColor
      });
}

export {
    alertError, 
    alertSuccess,
    alertTheme
}