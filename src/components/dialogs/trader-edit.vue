<template>
  <v-dialog
  transition="dialog-bottom-transition"
  max-width="400px"
  v-model="editDialog">
    <v-btn 
    flat
    icon
    color="success"
    slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container fluid>
        <v-toolbar card dark color="success">
          <v-btn icon dark @click.native="editDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Modify Trader Bot</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn 
            dark 
            flat 
            @click="saveEdits">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field 
              v-model="editedRule"
              name="editedRule"
              color="success"
              label="Strategy"
              disabled>
              </v-text-field>
              <v-text-field 
              v-model="editedExchange"
              name="editedExchange"
              color="success"              
              label="Exchange"
              disabled>
              </v-text-field>
              <v-select
              :items="aggregation"
              v-model="editedAggregation"
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
              @click.native="editDialog = false">Close</v-btn>
              <v-btn 
              flat 
              success 
              class="success darken-1"
              @click="saveEdits"
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
  props: ['trader'],
  data () {
    return {
      editDialog: false,
      editedRule: this.trader.rule,
      editedExchange: this.trader.exchange,
      editedAggregation: this.trader.aggregation,
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
    saveEdits () {
      // check if any compulsory field is empty
      if (this.editedRule.trim() === '' || this.editedExchange.trim() === '' || this.editedAggregation.trim() === '') {
        alert('Please fill in all required fields.')
        return
      }
      /* send form details to vuex store for post API
      this.$store.dispatch('editTrader', {
        companyId: this.company.id,
        name: this.editedName,
        hq: this.editedHq,
        description: this.editedDescription,
        website: this.editedWebsite,
        editedDate: new Date()
      }) */
      this.editDialog = false
    }
  }
}
</script>

