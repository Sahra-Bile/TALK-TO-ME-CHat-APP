import { toast } from 'react-toastify'

export const notifySuccess = (msg: string) =>
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
  })

export const notifyFailure = (msg: string) =>
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 4000,
  })

