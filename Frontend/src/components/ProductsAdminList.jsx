import ProductAdminCard from './ProductAdminCard'

const ProductsAdminList = ({ products, handleDisable, fetchProducts }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-8 px-8 overflow-y-auto w-full pt-4 border-t-2 border-[#dfdcdc]'>
      {products.length ? (
        products.map((product) => (
          <ProductAdminCard key={product.id} product={product} handleDisable={handleDisable} fetchProducts={fetchProducts} />
        ))
      ) : (
        <div className='col-span-full flex items-center justify-center p-4'>
          <h1 className='font-bold text-2xl text-center'>No se encontraron coincidencias.</h1>
        </div>
      )}
    </div>
  )
}

export default ProductsAdminList
