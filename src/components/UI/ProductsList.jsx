/* eslint-disable react/prop-types */

import ProductCard from './ProductCard'

export const ProductsList = ({data}) => {
  return (
    <>
        {data?.map((item, index)=>(
            <ProductCard key={index} item={item} />
        ))}
    </>
  )
}
