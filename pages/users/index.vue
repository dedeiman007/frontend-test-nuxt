<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-10">
            <div class="box border-3">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0 fw-medium">
                            Daftar Pengguna
                        </h5>
                        <div class="mt-1 font-size-14 text-gray">
                            Lis data pengguna
                        </div>
                    </div>
                    <div class="ml-auto">
                        <nuxt-link to="users/create" class="btn btn-primary">
                            Tambah Pengguna
                        </nuxt-link>
                    </div>
                </div>
                <div class="line mt-4 mb-2"></div>
                <div class="modern-table-boxed">
                    <div class="d-table-row header">
                        <div class="d-table-cell">
                            ID
                        </div>
                        <div class="d-table-cell">
                            Nama
                        </div>
                        <div class="d-table-cell">
                            Email
                        </div>
                        <div class="d-table-cell">
                            Jenis kelamin
                        </div>
                        <div class="d-table-cell">
                            Status
                        </div>
                        <div class="d-table-cell">
                            Aksi
                        </div>
                    </div>
                    <template v-for="list in paginatedCards">
                        <div class="d-table-row">
                            <div class="d-table-cell">
                                {{ list.id }}
                            </div>
                            <div class="d-table-cell capitalize">
                                {{ list.name }}
                            </div>
                            <div class="d-table-cell">
                                {{ list.email }}
                            </div>
                            <div class="d-table-cell capitalize">
                            {{ list.gender }}
                            </div>
                            <div class="d-table-cell capitalize">
                                <div class="d-flex align-items-center">
                                    <div class="status-color red mr-2" v-if="list.status == 'inactive'"></div>
                                    <div class="status-color green mr-2" v-else></div>
                                    <div>{{ list.status }}</div>
                                </div>
                            </div>
                            <div class="d-table-cell shrink">
                                <nuxt-link :to="`/users/${ list.id }`" class="text-blue mr-2">
                                    <img :src="'/icon/view.png'" width="15" alt="">
                                </nuxt-link>
                                <nuxt-link :to="`/users/edit/${ list.id }`" class="text-yellow mr-2">
                                    <img :src="'/icon/edit.png'" width="15" alt="">
                                </nuxt-link>
                                <a href="javascript:void(0)" class="text-red" @click="deleteUser(list.id)">
                                    <img :src="'/icon/delete.png'" width="15" alt="">
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
                <b-pagination
                    class="mt-4"
                    v-model="currentPage"
                    :per-page="perPage"
                    :total-rows="lists.length"
                    pills    
                >
                </b-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from '../../api/Api'; 

    export default {
        data() {
            return {
                lists: [],
                perPage: 5,
                currentPage: 1,
                icon: {
                    eye: 'assets/icon/eye.png'
                }
            }
        },
        mounted() {
            Api.get('/users')
            .then((res)=>{
                this.lists = res.data
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        computed: {
            paginatedCards() {
                const { currentPage, perPage } = this;
                const start = (currentPage - 1) * perPage;
                const end = currentPage * perPage;
                return this.lists.slice(start, end);
            }
        },
        methods: {
            deleteUser(user_id) {
                Api.delete(`/users/${user_id}`)
                .then((res)=>{
                    location.reload()
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>