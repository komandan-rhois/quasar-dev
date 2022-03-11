<template>
  <q-page padding>
    <h1 class="text-h4 q-mt-none q-mb-md">
      {{ getPageTitle }}
    </h1>
    <q-separator class="q-my-md" />
    <q-form>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-md-6 q-gutter-md">
          <p class="text-h6">
            Data User
          </p>
          <q-input
            v-model="user.name"
            outlined
            label="Nama *"
            hide-bottom-space
            lazy-rules
            :disable="routeIs.view"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input
            v-model="user.email"
            outlined
            hide-bottom-space
            type="email"
            label="Alamat E-mail *"
            lazy-rules
            :disable="routeIs.view"
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />
          <q-input
            v-model="user.gender"
            outlined
            hide-bottom-space
            type="tel"
            label="Jenis Kelamin"
            :disable="routeIs.view"
          />
          <q-input
            v-model="user.status"
            outlined
            hide-bottom-space
            label="Status"
            :disable="routeIs.view"
          />
        </div>

        <div class="col-xs-12 col-md-6 q-gutter-md">
          <div class="q-pa-md" style="max-width: 350px">
            <q-list>
              <div v-for="detail in userPosts" :key="detail">
                <q-item>
                  <q-item-section>
                    <q-item-label> {{ detail.title }}</q-item-label>
                    <q-item-label caption>
                      {{ detail.body }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>
                      2 min ago
                    </q-item-label>
                    <div class="text-orange">
                      <q-icon name="star" />
                      <q-icon name="star" />
                      <q-icon name="star" />
                    </div>
                  </q-item-section>
                </q-item>

                <q-separator spaced inset />
              </div>
            </q-list>
          </div>
        </div>

        <div v-if="routeIs.update || routeIs.create" class="col-xs-12">
          <q-btn
            :label="routeIs.update ? 'Update' : 'Create'"
            color="primary"
            @click="formSubmit"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            @click="resetState"
          />
        </div>
        <div v-else class="col-xs-12">
          <q-btn label="Go Back" color="primary" @click="goToListUser" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { UserInterface } from "src/interface/UserInt";
import { PostInterface } from "src/interface/PostInt";
import useUsersService from "src/hooks/useUsersService";
import useCatchError from "src/hooks/useCatchError";
import useUserRouterMethods from "src/hooks/useUserRouterMethods";
import useSuccessNotify from "src/hooks/useSuccessNotify";

const baseState = (): UserInterface => ({
  id: 0,
  email: "",
  name: "",
  gender: "",
  status: ""
});
const basePost = (): PostInterface => ({
  id: 0,
  title: "",
  body: ""
});
export default defineComponent({
  name: "UserForm",
  setup() {
    const $route = useRoute();
    const {
      getUserById,
      createUser,
      updateUser,
      getUserPosts
    } = useUsersService();
    const { errorNotify } = useCatchError();
    const { successNotify } = useSuccessNotify();
    const { goToListUser } = useUserRouterMethods();

    const routeIs = computed(() => ({
      create: !!$route.meta.create,
      update: !!$route.meta.update,
      view: !!$route.meta.view
    }));

    const userId = $route.params.id as string;
    const user = ref<UserInterface>(baseState());
    const userPosts = ref<PostInterface>(basePost());

    const getPageTitle = computed(() => {
      if (routeIs.value.view) return user.value.name;
      if (routeIs.value.update) return "Update User";
      return "Create User";
    });

    const getUserData = async () => {
      user.value = await getUserById(userId);
    };

    const getPostData = async () => {
      userPosts.value = await getUserPosts(userId);
    };

    const resetState = async () => {
      if (routeIs.value.create) {
        user.value = baseState();
      }
      if (routeIs.value.update) {
        await getUserData();
      }
    };

    onBeforeMount(async () => {
      try {
        await getUserData();
        await getPostData();
      } catch (e) {
        errorNotify(e as Error);
      }
    });

    const createNewUser = async () => {
      try {
        await createUser(user.value);
        successNotify("User create successfully!");
        await goToListUser();
      } catch (e) {
        errorNotify(e);
      }
    };

    const updateCurrentUser = async () => {
      try {
        await updateUser(userId, user.value);
        successNotify("User updated successfully!");
        await goToListUser();
      } catch (e) {
        errorNotify(e);
      }
    };

    const formSubmit = async () => {
      if (routeIs.value.create) await createNewUser();
      if (routeIs.value.update) await updateCurrentUser();
    };

    return {
      userPosts,
      user,
      routeIs,
      getPageTitle,
      resetState,
      formSubmit
    };
  }
});
</script>
