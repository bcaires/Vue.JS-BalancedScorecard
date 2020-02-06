<template>
  <div class="map-strategy">
     <PageTitle icon="fa fa-sitemap" main="Mapa Estratégico" subTitle="Balanced Scorecad - Ilustração das táticas para Instituição de Ensino"/>
     <div class="map">
       <!-- <organization-chart :datasource="chart"/> -->
        <vo-basic :data="chartData"></vo-basic>
     </div>
  </div>
</template>

<script>
// import OrganizationChart from 'vue-organization-chart'
// import 'vue-organization-chart/dist/orgchart.css'
import axios from 'axios'
import { VoBasic } from 'vue-orgchart'
import {baseApiUrl, showError} from '@/global'
import PageTitle from '../template/PageTitle'
export default {
  name: "MapStrategy",
  components: { PageTitle,baseApiUrl, showError, VoBasic },
  data: function(){
    return {
    chartData: {}
    }
  },
  methods:{
    loadMap(){
      const url = `${baseApiUrl}/map/strategy`
      axios.get(url).then(res => {
        this.chartData = res.data[0]
        // for(let i=0; i< res.data.length; i++){
        //   this.chartData[i] = res.data[i]
        // }
      })
    }
  },
 
  mounted(){
    this.loadMap()
  }
  
};
</script>

<style>
</style>