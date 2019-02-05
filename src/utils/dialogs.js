import Swal from 'sweetalert2'

export default {
  toasts: {
    error: async (msg) => {
      return Swal.fire({
        title: '错误',
        text: msg || '未知错误',
        type: 'error',
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000
      })
    },
    success: async (msg) => {
      return Swal.fire({
        title: '成功',
        text: msg || '操作完成',
        type: 'success',
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000
      })
    }
  },
  confirm: async (msg) => {
    return (await Swal.fire({
      title: '三思而后行',
      text: msg || '确定操作？',
      type: 'warning'
    })).value
  }
}
