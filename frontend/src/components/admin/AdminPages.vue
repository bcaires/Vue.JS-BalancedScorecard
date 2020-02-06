<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main="Administração do sistema" subTitle="Cadastros" />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Objetivos" active>
            <ObjectivesAdmin />
          </b-tab>
          <b-tab title="Perspectivas">
            <PerspectiveAdmin />
          </b-tab>
          <b-tab title="Usuários">
            <UserAdmin />
          </b-tab>
          <b-tab title="Mapa Estratégico">
            <MapAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import UserAdmin from "./UserAdmin";
import PerspectiveAdmin from "./PerspectiveAdmin";
import MapAdmin from "./MapAdmin";
import ObjectivesAdmin from "./ObjetivesAdmin";

import PageTitle from "../template/PageTitle";
export default {
  name: "AdminPages",
  components: {PageTitle, UserAdmin, PerspectiveAdmin, MapAdmin, ObjectivesAdmin}
};
</script>

<style>
</style>