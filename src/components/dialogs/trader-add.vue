<template>
  <v-dialog
  transition="dialog-bottom-transition"
  max-width="400px"
  v-model="addDialog">
    <v-btn 
    fab
    dark
    color="success"
    slot="activator">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-container fluid>
        <v-toolbar card dark color="success">
          <v-btn icon dark @click.native="addDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Trader Bot</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn 
            dark 
            flat 
            @click="saveadds">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-select
              :items="rules" 
              v-model="addedRule"
              name="addedRule"
              color="success"
              label="Strategy"
              :rules="[v => !!v || 'Strategy is required']"
              required
              >
              </v-select>
              <v-select
              :items="exchanges"
              v-model="addedExchange"
              name="addedExchange"
              color="success"              
              label="Exchange"
              :rules="[v => !!v || 'Exchange is required']"
              required
              >
              </v-select>
              <v-select
              :items="aggregation"
              v-model="addedAggregation"
              color="success"              
              label="Aggregation"
              :rules="[v => !!v || 'Aggregation is required']"
              required>
              </v-select>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn 
              flat 
              class="blue--text darken-1"
              @click.native="addDialog = false">Close</v-btn>
              <v-btn 
              flat 
              success 
              class="success darken-1"
              @click="saveadds"
              >Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      addDialog: false,
      addedRule: '',
      addedExchange: '',
      addedAggregation: '',
      rules: [
        { text: 'BuyOrderTSL' },
        { text: 'OrderBook' },
        { text: 'OrderBookTSL' },
        { text: 'RSlv2' },
        { text: 'SellOrderTSL' }
      ],
      exchanges: [
        { text: 'Binance' },
        { text: 'BitStamp' },
        { text: 'HitBTC' }
      ],
      aggregation: [
        { text: '1 min' },
        { text: '3 min' },
        { text: '5 min' },
        { text: '10 min' },
        { text: '15 min' },
        { text: '30 min' },
        { text: '60 min' }
      ]
    }
  },
  methods: {
    saveadds () {
      // check if any compulsory field is empty
      if (this.addedRule.trim() === '' || this.addedExchange.trim() === '' || this.addedAggregation.trim() === '') {
        alert('Please fill in all required fields.')
        return
      }
      /* send form details to vuex store for post API
      this.$store.dispatch('addTrader', {
        companyId: this.company.id,
        name: this.addedName,
        hq: this.addedHq,
        description: this.addedDescription,
        website: this.addedWebsite,
        addedDate: new Date()
      }) */
      this.addDialog = false
    }
  }
}
</script>

