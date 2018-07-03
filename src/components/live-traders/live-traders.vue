<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>

        <!-- Bot List Section -->
        <v-flex xs12 sm4 md5>
          <v-layout row wrap>
            <v-select
            :items="coins"
            color="success"
            prepend-icon="search"
            v-model="filterInput"
            label="Search bots by coin type"
            autocomplete
            class="mr-2"
            ></v-select>
            <v-tooltip bottom>
              <app-trader-add-dialog
              slot="activator"></app-trader-add-dialog>
              <span>Add New Trader</span>
            </v-tooltip>
          </v-layout>

          <!-- Bot List Column -->
          <v-layout row wrap>
            <v-flex xs12 class="mt-2">
              <v-card class="bot-list">
                <v-toolbar color="grey lighten-2">
                  <v-toolbar-title>Trader Bots
                  </v-toolbar-title>
                </v-toolbar>
                <v-layout row wrap v-if="loading">
                  <v-flex xs12 class="text-xs-center">
                    <v-progress-circular 
                    indeterminate 
                    color="green"
                    :width="2"
                    :size="30"
                    ></v-progress-circular>
                  </v-flex>
                </v-layout>
                <v-list 
                v-if="checkTradersLoad"
                two-line>
                  <template v-for="trader in traders">
                    <v-list-tile
                      :key="trader.id"
                      ripple
                      @click="selectTrader(trader)"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>{{ trader.rule }}</v-list-tile-title>
                        <v-list-tile-sub-title class="text--primary">{{ trader.exchange }}</v-list-tile-sub-title>
                        <v-list-tile-sub-title>{{ trader.symbolA }}/{{ trader.symbolB}}, {{trader.aggregation}} min</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-list-tile-action-text v-if="statusToggle === true">READY</v-list-tile-action-text>
                        <v-list-tile-action-text v-else>STOPPED</v-list-tile-action-text>
                        <v-switch 
                        v-model="statusToggle"
                        class="pb-2 pl-4"></v-switch>
                      </v-list-tile-action>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- Bot Details Section -->
        <v-flex xs12 sm8 md7 v-if="select"
        v-model="trader">
          <v-card class="bot-details">

            <!-- Bot Details Card Header -->
            <v-card-title primary-title>
              <v-flex xs12 sm10>
                <div>
                  <div class="headline">
                    Bot Details
                  </div>
                  <div>
                    {{trader.rule}}, {{trader.exchange}} {{trader.symbolA}}/{{trader.symbolB}}, {{trader.aggregation}} min
                  </div>
                  <div>
                    <v-tooltip bottom>
                        <app-trader-edit-dialog
                        slot="activator"
                        :trader="trader"></app-trader-edit-dialog>
                      <span>Edit Trader</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <v-btn 
                      slot="activator"
                      flat
                      icon 
                      color="pink">
                        <v-icon>delete</v-icon>
                      </v-btn>
                      <span>Delete Trader</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <v-btn 
                      slot="activator"
                      flat
                      icon 
                      color="info">
                        <v-icon>bar_chart</v-icon>
                      </v-btn>
                      <span>View Trading Chart</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <v-btn 
                      slot="activator"
                      flat
                      icon 
                      color="brown">
                        <v-icon>assignment</v-icon>
                      </v-btn>
                      <span>View Workbook</span>
                    </v-tooltip>
                  </div>
                </div>
              </v-flex>

              <!-- Toggle Button -->
              <v-flex xs12 sm2>
                <v-layout column>
                  <span 
                  v-if="statusToggle === true"
                  class="mt-2 ml-3">READY</span>
                  <span 
                  v-else
                  class="mt-2">STOPPED</span>
                  <v-switch 
                  v-model="statusToggle"
                  class="pl-4"></v-switch>
                </v-layout>
              </v-flex>
            </v-card-title>

            <!-- Bot Details Panel -->
            <v-expansion-panel expand focusable>
              <v-expansion-panel-content>
                <div slot="header">
                Trader Bot Details
                </div>
                <v-card>
                  <v-layout row wrap class="ml-2">
                    <v-flex xs6>
                      <v-card-text>
                        <div>
                          Start Budget: {{trader.startBudget}}
                        </div>
                        <div>
                          Min Bet: {{trader.minBet}}
                        </div>
                        <div>
                          Max Bet: {{trader.maxBet}}
                        </div>
                        <div>
                          Fee: {{trader.fee}}
                        </div>
                        <div>
                          Trades: {{trader.orders}}
                        </div>
                        <div>
                          Current Price: {{trader.lastPrice}}
                        </div>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs6>
                      <v-card-text>
                        <div>
                          Start Trading At: {{trader.startTradingAt | dateFilter}}
                        </div>
                        <div>
                          Last Evaluation At: {{trader.lastEvaluationAt | dateFilter}}
                        </div>
                        <div>
                          {{trader.symbolA}} Balance: {{trader.symbolABalance}}
                        </div>
                        <div>
                          {{trader.symbolB}} Balance: {{trader.symbolBBalance}}
                        </div>
                        <div>
                          Total Gain: {{trader.getTotalGain}}%
                        </div>
                        <div>
                          Daily Gain: {{trader.getDailyGain}}%
                        </div>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <!-- Trade Log Panel -->
            <v-expansion-panel expand focusable>
              <v-expansion-panel-content 
              v-for="(item, i) in 1"
              :key="i"
              :value="item === 1">
                <div slot="header">
                Trader Log
                </div>
                <v-card>
                  <v-data-table
                    :headers="headers"
                    :items="orders"
                    hide-actions
                    class="elevation-1"
                  >
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.id }}</td>
                      <td class="text-xs-right">{{ props.item.symbolA }}</td>
                      <td class="text-xs-right"
                      v-if="props.item.orderType === true">&rarr;</td>
                      <td class="text-xs-right"
                      v-else>&larr;</td>
                      <td class="text-xs-right">{{ props.item.symbolB }}</td>
                      <td class="text-xs-right">{{ props.item.price }}</td>
                      <td class="text-xs-right">{{ props.item.gain }}</td>
                      <td class="text-xs-right">{{ props.item.status }}</td>
                      <td class="text-xs-right">{{ props.item.closedAt | dateFilter}}</td>
                    </template>
                  </v-data-table>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      trader: {},
      filterInput: '',
      // Bot List Filter Autocomplete List
      coins: ['Bitcoin', 'Ethereum', 'Banca', 'Noah Coin', 'MaidSafeCoin', 'Cardano', 'Bytecoin', 'BitStation', 'Daneel', 'Dashcoin', 'EOS', 'Lisk', 'Litecoin', 'Nxt', 'TRON', 'NEM', 'Monero', 'Ripple', 'HireMatch'],
      statusToggle: false,
      traderSelected: false,
      // Datatable Header List
      headers: [
        {
          text: 'Order Id',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Source Coin',
          align: 'right',
          value: 'symbolA'
        },
        {
          text: 'Transaction',
          align: 'right',
          value: 'orderType'
        },
        {
          text: 'Target Coin',
          align: 'right',
          value: 'symbolB'
        },
        { text: 'Price', value: 'price' },
        {
          text: 'Gain (%)',
          align: 'right',
          value: 'gain'
        },
        {
          text: 'Status',
          align: 'right',
          value: 'status'
        },
        {
          text: 'Closed At',
          align: 'left',
          value: 'closedAt'
        }
      ]
    }
  },
  // Init by calling traders and orders apis
  mounted () {
    this.$store.dispatch('tradersApi')
    this.$store.dispatch('ordersApi')
  },
  // Get traders and orders arrays from vuex store
  computed: {
    traders () {
      return this.$store.getters.getTraders
    },
    select () {
      return this.traderSelected
    },
    orders () {
      return this.$store.getters.getOrders
    },
    loading () {
      return this.$store.getters.getLoading
    },
    checkTradersLoad () {
      return this.traders != null
    }
  },
  methods: {
    selectTrader (trader) {
      this.trader = trader
      this.traderSelected = true
    }
  }
}
</script>

<!-- CSS scoped for this page only -->
<style scoped>
  .bot-list {
    position: absolute;
    top: 20%;
    bottom: 2%;
    right: 60%;
    left: 1%;
    overflow: auto;
  }

  .bot-details {
    position: absolute;
    top: 10%;
    bottom: 2%;
    right: 1%;
    left: 42%;
    overflow: auto;
  }
</style>

