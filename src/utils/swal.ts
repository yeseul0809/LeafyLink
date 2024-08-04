import Swal from 'sweetalert2';

const showSwal = (title: string) => {
  Swal.fire({
    title,
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title ',
      confirmButton: 'swal-confirm-button'
    },
    buttonsStyling: false,
    confirmButtonText: '확인'
  });
};

export default showSwal;
