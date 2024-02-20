import { cookies } from 'next/headers'
import { WidgetItem } from '@/components'
import { products, type Product } from '@/data/products'
import { ItemCard } from '@/shopping-cart'

export const metada = {
  title: 'Carrito de compras',
  description: 'Este es la pagina del carrito de compras de la aplicacion. Aqui se muestran los productos que el usuario ha agregado al carrito de compras.'
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart: Record<string, number>): ProductInCart[] => {
  const productsInCart: ProductInCart[] = []

  for (const id of Object.keys(cart)) {
    const product = products.find(prod => prod.id === id)
    if (product) {
      productsInCart.push({ product, quantity: cart[id] })
    }
  }

  return productsInCart
}

export default function CartPage() {
  const cookieStore = cookies()
  const cart: Record<string, number> = JSON.parse(cookieStore.get('cart')?.value ?? '{}')

  const productsInCart = getProductsInCart(cart)

  const totalToPay = productsInCart.reduce((prev, current) => (current.product.price * current.quantity) + prev, 0)

  return (
    <div>
      <h1 className="text-xl">Productos en el carrito</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 sm:w-8/12">
          {
            productsInCart.map(({ product, quantity }) =>
              <ItemCard key={product.id} product={product} quantity={quantity} />
            )
          }
        </div>

        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title='Total a pagar:'>
            <div className='mt-2 flex justify-center gap-4'>
              <h3 className='text-3xl font-bold text-gray-700'>${(totalToPay * 1.15).toFixed(2)}</h3>
            </div>
            <span className='font-bold text-center text-gray-500'>Impuestos 15%: $ {(totalToPay * 0.15).toFixed(2)}</span>
          </WidgetItem>
        </div>

      </div>
    </div>
  )
}
