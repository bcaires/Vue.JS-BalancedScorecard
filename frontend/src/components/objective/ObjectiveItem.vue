<template>
<div class="objective-item">
    <router-link :to="{name:'ObjectiveById', params: {id: objective.id}}">
      <div class="objective-item-image d-none d-sm-block">
        <img src="@/assets/bsc.png" height="150" width="150" alt="Objective" />
      </div>
      <div class="objective-item-info">
        <h2>{{objective.name}}</h2>
        <p>{{objective.indicators}}</p>
        <p v-if="objective.priority">Prioridade: <strong style="color: red">Alta</strong></p>
        <p v-else>Prioridade: <strong style="color: green">Baixa</strong></p>
        <label v-if="objective.percentage" for="progress-bar">Progresso:</label>
        <label v-else for="progress-bar"><strong>Objetivo não foi iniciado</strong></label>
        <b-progress v-if="objective.percentage" class="progress-bar mb-3" :value="objective.percentage" :max="max" 
        show-value :precision="1">{{objective.percentage}}%</b-progress>
        <span class="objective-item-author">
          <strong>Responsável: </strong>
          {{objective.author}}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'ObjectiveItem',
    props: ['objective'],
    data: function (){
        return {
            max:100
        }
    }
}
</script>

<style>
.objective-item{
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #FFF;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}
.objective-item a {
    display:flex;
    align-items: start;
    text-decoration: none;
    color: #000;
}

.objective-item-info h2{
    font: 1.7rem;
}
.objective-item-image{
    padding-right: 20px;
    margin-right: 20px;
}
.objective-item-image img{
    border-radius: 20px;

}
.objective-item-info{
    display:flex;
    align-self: stretch;
    flex-direction: column;
}
.objective-item-info p{
    flex: 1;
    color: #555;
    font-size: 1.1rem;
}

</style>