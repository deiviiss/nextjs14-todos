import { getCookie, hasCookie, setCookie } from 'cookies-next'

export const getCookieCart = (): Record<string, number> => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') ?? '{}')
    return cookieCart
  }

  return {}
}

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart()
  if (cookieCart[id]) {
    cookieCart[id]++
  } else {
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  // If the product is not in the cart, return
  if (!cookieCart[id]) return

  let updateCart = cookieCart

  const { [id]: removedFromCart, ...restProducts } = cookieCart

  updateCart = restProducts

  setCookie('cart', JSON.stringify(updateCart))
}

export const removeSingleProductFromCart = (id: string) => {
  const cookieCart = getCookieCart()
  // If the product is not in the cart, return
  if (!cookieCart[id]) return

  let updateCart = cookieCart

  cookieCart[id] = cookieCart[id] - 1

  if (cookieCart[id] === 0) {
    const { [id]: removedFromCart, ...restProducts } = cookieCart

    updateCart = restProducts
  }

  setCookie('cart', JSON.stringify(updateCart))
}
