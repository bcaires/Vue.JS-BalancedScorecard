<template>
    <div class="perspective-admin">
        <b-form>
            <input id="perspective-id" type="hidden" v-model="perspective.id" />
            <b-form-group label="Nome:" label-for="perspective-name">
                <b-form-input id="perspective-name" type="text"
                    v-model="perspective.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome da Perspectiva..." />
            </b-form-group>
            <b-form-group label="Perspectiva Pai:" label-for="perspective-parentId">
                <b-form-select v-if="mode === 'save'"
                    id="perspective-parentId"
                    :options="perspectives" v-model="perspective.parentId" />
                <b-form-input v-else
                    id="perspective-parentId" type="text"
                    v-model="perspective.path"
                    readonly />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr/>
        <b-row>
  
  <b-col md="6" sm="12" class="mt-3 mb-3">
    <b-input-group >
      <b-form-input  v-model="filter" type="search" id="filterInput" placeholder="Pesquisar perspectivas..."/>
    <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
            </b-input-group-append>
    </b-input-group>
  </b-col>
</b-row>


        <b-table hover striped :items="perspectives" :fields="fields" :filter="filter">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadPerspective(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadPerspective(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'PerspectiveAdmin',
    data: function() {
        return {
            mode: 'save',
            perspective: {},
            perspectives: [],
            filter:null,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'path', label: 'Caminho', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadPerspectives() {
            const url = `${baseApiUrl}/perspectives`
            axios.get(url).then(res => {
                // this.perspectives = res.data
                this.perspectives = res.data.map(perspective => {
                    return { ...perspective, value: perspective.id, text: perspective.path }
                })
            })
        },
        reset() {
            this.mode = 'save'
            this.perspective = {}
            this.loadPerspectives()
        },
        save() {
            const method = this.perspective.id ? 'put' : 'post'
            const id = this.perspective.id ? `/${this.perspective.id}` : ''
            axios[method](`${baseApiUrl}/perspectives${id}`, this.perspective)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.perspective.id
            axios.delete(`${baseApiUrl}/perspectives/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadPerspective(perspective, mode = 'save') {
            this.mode = mode
            this.perspective = { ...perspective }
        }
    },
    mounted() {
        this.loadPerspectives()
    }
}
</script>

<style>

</style>