<template>
<div class="objective-by-id">
    <PageTitle icon="fa fa-file-o"
      :main="objective.name"
      :subTitle="objective.indicators" />
      <div class="objective-content" v-html="objective.content"></div>
</div>

</template>

<script>
import PageTitle from "../template/PageTitle";
import axios from 'axios'
import {baseApiUrl} from "@/global"


import 'highlightjs/styles/dracula.css' 
import hljs from 'highlightjs/highlight.pack.js'

export default {
  name: "ObjectiveById",
  components: { PageTitle },
  data: function() {
    return {
      objective: {}
    };
  },
  methods: {
      loadObjectives(){
          axios.get(`${baseApiUrl}/objectives/${this.$route.params.id}`)
          .then(res => this.objective = res.data)
      }
  },

  mounted(){
      this.loadObjectives();
  },

   updated(){
        document.querySelectorAll('.objective-content pre').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
};
</script>

<style>
.objective-content{
    background-color: #fff;
    border-radius: 8px;
    padding: 25px;
}
.objective-content pre{
    padding: 20px;
    border-radius: 8px;
    font-size: 1.2rem;
    background-color: #1e1e1e;
    color: #FFF;
}
.objective-content img{
    max-width: 100%;
}
.objective-content:last-child{
    margin-bottom: 0px;
}
</style>