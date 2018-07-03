export default {
  getTraders (state) {
    return state.traders.sort((traderA, traderB) => {
      return traderA.rule > traderB.rule
    })
  },
  getTrader (state) {
    return (traderId) => {
      return state.traders.find((trader) => {
        return trader.id === traderId
      })
    }
  },
  getOrders (state) {
    return state.orders.sort((orderA, orderB) => {
      return orderA.closedAt > orderB.closedAt
    })
  },
  getOrder (state) {
    return (orderId) => {
      return state.orders.find((order) => {
        return order.id === orderId
      })
    }
  },
  getUser (state) {
    return state.user
  },
  getLoading (state) {
    return state.loading
  },
  getError (state) {
    return state.error
  }
}
