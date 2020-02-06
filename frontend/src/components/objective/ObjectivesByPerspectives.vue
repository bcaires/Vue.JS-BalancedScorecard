<template>
  <div class="objectives-by-perspectives">
    <PageTitle icon="fa fa-folder-o" subTitle="Objetivos" :main="perspective.name"/>
    <ul>
      <li v-for="objective in objectives" :key="objective.id">
        <ObjectiveItem :objective="objective"/>
      </li>
    </ul>
    <div class="load-more">
        <button v-if="loadMore"
        class="btn btn-lg btn-outline-primary"
        @click="getObjectives">Carregar</button>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import axios from "axios";
import { baseApiUrl } from "@/global";
import ObjectiveItem from './ObjectiveItem'
export default {
  name: "ObjectivesByPerspectives",
  components: { PageTitle, ObjectiveItem },
  data: function() {
    return {
      perspective: {},
      objectives: [],
      page: 1,
      loadMore: true
    };
  },
  methods: {
    getPerspective() {
      const url = `${baseApiUrl}/perspectives/${this.perspective.id}`;
      axios.get(url).then(res => (this.perspective = res.data));
    },
    getObjectives() {
      const url = `${baseApiUrl}/objectives/${this.perspective.id}/perspectives?page=${this.page}`;
      axios.get(url).then(res => {
        this.objectives = this.objectives.concat(res.data);
        this.page++;
        if (res.data.lenght === 0) this.loadMore = false;
      });
    }
  },
  watch: {
    $route(to){
      this.perspective.id = to.params.id 
      this.objectives=[]
      this.page = 1
      this.loadMore = true
      this.getPerspective()
      this.getObjectives()
    }
  },
  mounted() {
    this.perspective.id = this.$route.params.id; //pegar id da req
    this.getPerspective();
    this.getObjectives();
  }
};
</script>

<style>
.objectives-by-perspectives ul{
    list-style: none;
    padding: 0px;
}
.objectives-by-perspectives .load-more{
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
}
</style>