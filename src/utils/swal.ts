import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
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

export const showSwalContinue = (title: string, router: AppRouterInstance) => {
  Swal.fire({
    title,
    customClass: {
      popup: 'swal-popup',
      title: 'swal-title ',
      confirmButton: 'swal-cart-button',
      cancelButton: 'swal-continue-button',
      actions: 'swal-actions'
    },
    buttonsStyling: false,
    showCancelButton: true,
    confirmButtonText: '장바구니 이동하기',
    cancelButtonText: '계속 쇼핑하기',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      router.push(`/cart`);
    }
  });
};
