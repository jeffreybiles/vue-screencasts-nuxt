<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">Number users</th>
        <th class="text-left">Paid monthly</th>
        <th class="text-left">Paid yearly</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in data" :key="row.range">
        <td><v-icon>{{row.icon}}</v-icon> {{ row.range }}</td>
        <td>
          {{ row.monthlyPrice | currency }}/user
          (save {{row.monthlySaving}}%)
        </td>
        <td>
          {{ row.yearlyPrice | currency }}/user
          (save {{row.yearlySaving}}%)
        </td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
    export default {
        name: "OrderPricesTable",
        props: {
          data: {
            type: Array,
            default: () => []
          }
        }
    }
</script>

<style scoped>

</style>
