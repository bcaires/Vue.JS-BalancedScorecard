<template>
  <div class="objective-admin">
    <b-form>
      <input id="objective-id" type="hidden" v-model="objective.id" />

      <b-form-group label="Nome:" label-for="objective-name">
        <b-form-input
          id="objective-name"
          type="text"
          v-model="objective.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o Nome do Objetivo..."
        />
      </b-form-group>

      <b-form-group label="Indicadores" label-for="objective-indicators">
        <b-form-input
          id="objective-indicators"
          type="text"
          v-model="objective.indicators"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o Indicador.."
        />
      </b-form-group>

      <b-form-group v-if="mode === 'save'" label="Perspectiva:" label-for="objective-perspectiveId">
        <b-form-select
          id="objective-perspectiveId"
          :options="perspectives"
          v-model="objective.perspectiveId"
        />
      </b-form-group>

      <b-form-group v-if="mode === 'save'" label="Responsável:" label-for="objective-userId">
        <b-form-select id="objective-userId" :options="users" v-model="objective.userId" />
      </b-form-group>

      <b-form-group
        label="Informe a data limite de conclusão do objetivo:"
        label-for="objective-expiration"
      >
        <datetime v-model="objective.expiration" />
      </b-form-group>

      <b-form-checkbox
        id="objective-priority"
        class="mt-3 mb-3"
        v-show="mode === 'save'"
        v-model="objective.priority"
      >Prioridade Alta?</b-form-checkbox>

      <DIV id="progress">
      <b-row>
        <b-col md="6" sm="12">
          <label for="range-2" class="mt-3">Progresso do objetivo:</label>
          <b-form-input id="range-2" v-model="objective.percentage" type="range" min="0" max="100"></b-form-input>
          <div class="value mb-3">{{objective.percentage}}%</div>
        </b-col>
      </b-row>
      </DIV>

      <b-form-group
        v-if="mode === 'save'"
        label="Conteúdo do objetivo / Descrição :"
        label-for="objective-content"
      >
        <VueEditor v-model="objective.content" placeholder="Informe o conteúdo do objetivo..." />
      </b-form-group>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>

    <hr />

    <b-row>
      <b-col md="6" sm="12" class="mt-3 mb-3">
        <b-input-group>
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Pesquisar objetivos..."
          />
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>

    <b-table hover striped :items="objectives" :fields="fields" :filter="filter">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadObjective(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadObjective(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>

    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { Datetime } from "vue-datetime";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ObjectivesAdmin",
  components: { VueEditor, Datetime },
  data: function() {
    return {
      mode: "save",
      objective: {},
      objectives: [],
      perspectives: [],
      users: [],
      page: 1,
      filter: null,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome do objetivo", sortable: true },
        { key: "indicators", label: "Indicadores", sortable: true },
        {
          key: "expiration",
          label: "Prazo",
          sortable: true,
          formatter: value => (value ? value : "Sem prazo")
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadObjectives() {
      const url = `${baseApiUrl}/objectives?page=${this.page}`;
      axios.get(url).then(res => {
        this.objectives = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.objective = {};
      this.loadObjectives();
    },
    save() {
      const method = this.objective.id ? "put" : "post";
      const id = this.objective.id ? `/${this.objective.id}` : "";
      this.objective.percentage = parseInt(this.objective.percentage)
      console.log(this.objective)
      axios[method](`${baseApiUrl}/objectives${id}`, this.objective)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.objective.id;
      axios
        .delete(`${baseApiUrl}/objectives/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadObjective(objective, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/objectives/${objective.id}`)
        .then(res => (this.objective = res.data));
    },
    loadPerspectives() {
      const url = `${baseApiUrl}/perspectives`;
      axios.get(url).then(res => {
        this.perspectives = res.data.map(perspective => {
          return { value: perspective.id, text: perspective.path };
        });
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    }
  },
  watch: {
    page() {
      this.loadObjectives();
    }
  },
  mounted() {
    this.loadUsers();
    this.loadPerspectives();
    this.loadObjectives();
  }
};
</script>

<style>
.value {
  display:flex;
  justify-content: flex-end;
  align-items: center;
}
</style>