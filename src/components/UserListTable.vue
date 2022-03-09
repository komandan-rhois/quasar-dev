<template>
  <q-table
    title="Users List"
    :rows="users"
    :columns="columnsData"
    :rows-per-page-options="rowsPerPage"
    row-key="name"
  >
    <template #body="props">
      <q-tr :props="props">
        <q-td
          key="id"
          :props="props"
        >
          {{ props.row.id }}
        </q-td>
        <q-td
          key="email"
          :props="props"
        >
          {{ props.row.email }}
        </q-td>
        <q-td
          key="name"
          :props="props"
        >
          {{ props.row.name }}
        </q-td>
        <q-td
          key="gender"
          :props="props"
        >
          {{ props.row.gender }}
        </q-td>
        <q-td
          key="status"
          :props="props"
        >
          {{ props.row.status }}
        </q-td>
        <q-td
          class="text-right"
        >
          <q-btn-group
            unelevated
          >
            <q-btn
              color="info"
              icon="visibility"
              @click="goToViewUser(props.row.id)"
            />
            <q-btn
              color="positive"
              icon="create"
              @click="goToEditUser(props.row.id)"
            />
            <q-btn
              color="negative"
              icon="delete"
              @click="goToRemoveUser(props.row.id)"
            />
          </q-btn-group>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script lang="ts">
import { User } from 'src/services/models';
import { ref, PropType, defineComponent } from 'vue';
import useUserRouterMethods from 'src/hooks/useUserRouterMethods';

export default defineComponent({
  name: 'UserListTable',
  props: {
    users: {
      type: Array as PropType<User[]>,
      default: () => ([]),
    },
  },
  setup() {
    const columnsData = ref([
      {
        align: 'left',
        field: 'id',
        label: 'ID',
        name: 'id',
        required: true,
        sortable: true,
      },
      {
        align: 'left',
        field: 'email',
        label: 'E-mail',
        name: 'email',
        sortable: true,
      },
      {
        align: 'left',
        field: 'name',
        label: 'Nama',
        name: 'name',
        sortable: true,
      },
      {
        align: 'left',
        field: 'gender',
        label: 'Jenis Kelamin',
        name: 'gender',
        sortable: true,
      },
      {
        align: '',
        field: '',
        label: '',
        name: '',
        sortable: false,
      },
    ]);
    const rowsPerPage = ref([5, 10, 15, 20, 0]);
    const {
      goToViewUser,
      goToEditUser,
      goToRemoveUser,
    } = useUserRouterMethods();

    return {
      columnsData,
      rowsPerPage,
      goToViewUser,
      goToEditUser,
      goToRemoveUser,
    };
  },
});
</script>
