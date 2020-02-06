<template>
  <div class="map-admin">
    <b-form>
      <input id="map-id" type="hidden" v-model="map.id" />

      <b-form-group label="Nome:" label-for="map-name">
        <b-form-input
          id="map-name"
          type="text"
          v-model="map.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o Nome para o atributo do mapa..."
        />
      </b-form-group>

      <b-form-group label="Mapa Pai:" label-for="map-parentId">
        <b-form-select
          v-if="mode === 'save'"
          id="map-parentId"
          :options="maps"
          v-model="map.parentId"
        />
        <b-form-input v-else id="map-parentId" type="text" v-model="map.path" readonly />
      </b-form-group>

      <b-form-group label="Perspectiva Pertencente:" label-for="map-perspectiveId" required>
        <b-form-select id="map-perspectiveId"
        :options="perspective" v-model="map.perspectiveId"/>
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
            placeholder="Pesquisar atributo mapa..."
          />
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
    
    <b-table hover striped :items="maps" :fields="fields" :filter="filter">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadMap(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadMap(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>

  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "MapAdmin",
  data: function() {
    return {
      mode: "save",
      map: {},
      maps: [],
      filter: null,
      perspective: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho Mapa", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadMaps() {
      const url = `${baseApiUrl}/map`;
      axios.get(url).then(res => {
        // this.maps = res.data
        this.maps = res.data.map(map => {
          return { ...map, value: map.id, text: map.path };
        });
      });
    },
    loadPerspective() {
      axios.get(`${baseApiUrl}/perspectiveForMap`).then(res => {
        this.perspective = res.data.map(perspectives => {
          return { value: perspectives.id, text: perspectives.name };
        });
      });
    },
    reset() {
      this.mode = "save";
      this.map = {};
      this.loadMaps();
    },
    save() {
      const method = this.map.id ? "put" : "post";
      const id = this.map.id ? `/${this.map.id}` : "";
      axios[method](`${baseApiUrl}/map${id}`, this.map)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.map.id;
      axios
        .delete(`${baseApiUrl}/map/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadMap(map, mode = "save") {
      this.mode = mode;
      this.map = { ...map };
    }
  },
  mounted() {
    this.loadMaps();
    this.loadPerspective();
  }
};
</script>

<style>
</style>