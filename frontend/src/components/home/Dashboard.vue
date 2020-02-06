<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" subTitle="Base de conhecimento" />
    <div class="stats">
      <div class="stats-users">
        <Stat icon="fa fa-user" title="Usuários Cadastrados" color="#20B2AA" :value="stats.users" />
      </div>
      <div class="stats-objectives">
        <Stat
          icon="fa fa-cubes"
          title="Objetivos Cadastrados"
          color="#008B8B"
          :value="stats.objectives"
        />
      </div>
      <div class="stats-perspectives">
        <Stat
          icon="fa fa-globe"
          title="Perspectivas Cadastrados"
          color="#5F9EA0"
          :value="stats.perspectives"
        />
      </div>
    </div>
    <hr />
    <div class="users-objectives">
    <div class="graph-users">
      <chartjs-pie class="users-graph" :labels="labelsUsers" :datasets="dataUsers" :option="option"></chartjs-pie>
    </div>

    <div class="graph-objectives">
      <chartjs-pie class="objectives-graph" :labels="labelObjectives" :datasets="dataObjectives" :option="optionObj"></chartjs-pie>
    </div>

    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import Stat from "../home/Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "Dashboard",
  components: { PageTitle, Stat },

  data: function() {
    return {
      stats: {},
      labelsUsers: ["Usuários Ativos", "Usuários Inativos"],
      array: [],
      objArray: [],
      dataUsers: [
        {
          data: [],
          backgroundColor: ["#0099FF", "#A9A9A9"]
        }
      ],
      option: {
        title: {
          display: true,
          position: "bottom",
          text: "Usuarios ativos e inativos do sistema"
        }
      },
      labelObjectives: ["Objetivos Concluídos", "Objetivos Não-Concluídos", "Objetivos não-iniciados"],
      dataObjectives: [
        {
          data: [],
          backgroundColor: ["#0099FF", "#A9A9A9", "yellow"]
        }
      ],
      optionObj: {
        title: {
          display:true,
          position: "bottom",
          text: "Objetivos dos sistema."
        }
      }
    };
  },
  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/stats`).then(res => (this.stats = res.data));
    },
    getUsers() {
      axios.get(`${baseApiUrl}/countUsers`).then(res => {
        // console.log(res.data)
        this.array.push(res.data.countActives, res.data.countInactives);
        this.dataUsers[0].data = this.array;
      });
    },
    getObjectives(){
      axios.get(`${baseApiUrl}/countObjectives`).then(res => {
       
        this.objArray.push(res.data.completedCount, res.data.notCompletedCount, res.data.stopedCount)
        this.dataObjectives[0].data =  this.objArray
      })
    }
  },

  mounted() {
    this.getStats();
    this.getUsers();
    this.getObjectives()
  }
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.users-objectives{
  display: flex;
  flex-wrap: wrap;
}
.graph-users{
  flex: 1;
  display: flex;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  height: 300px;
  width: 500px;
  flex-wrap:wrap;
  margin-right: 1px;
}
.graph-users .users-graph{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.graph-objectives{
  flex: 1;
  display: flex;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  height: 300px;
  width: 500px;
  flex-wrap:wrap;
}
.graph-objectives .objectives-graph{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>