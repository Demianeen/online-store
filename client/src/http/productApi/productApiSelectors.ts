export {}

// let params = selectProductParams(store.getState())
// export const getState = (state: RootState, params: IProductParams[]) =>
//   productApiSlice.endpoints.getProducts.select(params)(state).data

// store.subscribe(() => {
//   params = selectProductParams(store.getState())
//   console.log(params)
// })

// export const selectProductResult = productApiSlice.endpoints.getProducts.select(params)

// export const selectProductData = createSelector(
//   selectProductResult,
//   (result) => result.data
// )

// export const {
//   selectAll: selectAllProducts,
//   selectById: selectProductById,
//   selectIds: selectProductsIds,
//   selectTotal: selectProductsQuantity,
//   selectEntities: selectProductEntities
// } = productsAdapter.getSelectors<RootState>(
//   (state) => getState(state, params) ?? productsAdapterInitialState
// )
