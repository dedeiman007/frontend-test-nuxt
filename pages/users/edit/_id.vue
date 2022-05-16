<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-7">
            <div class="box border-3">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0 fw-medium">
                            Edit Pengguna
                        </h5>
                        <div class="mt-1 font-size-13 text-gray">
                            Silahkan edit data pengguna
                        </div>
                    </div>
                </div>
                <div class="line mt-4 mb-2"></div>
                <div class="row">
                    <div class="col-md-12" v-if="errors.length > 0">
                      <b-alert show variant="danger">
                        <ul>
                            <li v-for="error in errors">
                                {{ error.field }}
                                {{ error.message }}
                            </li>
                        </ul>
                      </b-alert>
                    </div>
                    <div class="col-md-6 mt-3">
                        <label class="fw-medium font-size-14">Nama</label>
                        <input type="text" class="form-control" v-model="user.name" placeholder="Masukkan nama">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label class="fw-medium font-size-14">Email</label>
                        <input type="email" class="form-control" v-model="user.email" placeholder="Masukkan email">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label class="fw-medium font-size-14">Jenis Kelamin</label>
                        <b-form-group v-slot="{ ariaDescribedby }">
                            <b-form-radio v-model="user.gender" :aria-describedby="ariaDescribedby" name="some-radios" value="male">Male</b-form-radio>
                            <b-form-radio v-model="user.gender" :aria-describedby="ariaDescribedby" name="some-radios" value="female">Female</b-form-radio>
                        </b-form-group>
                    </div>
                    <div class="col-md-6 mt-3">
                        <label class="fw-medium font-size-14">Status</label>
                        <div class="d-flex mt-1">
                            <label class="switch mr-4" for="checkbox">
                                <input type="checkbox" id="checkbox" v-model="user.status">
                                <div class="radio-slider round"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-6 mt-3">
                    <div class="row">
                        <div class="col-md-6">
                            <nuxt-link to="/users" class="btn btn-outline btn-block">
                                Batal
                            </nuxt-link>
                        </div>
                        <div class="col-md-6">
                            <a href="javascript:void(0)" @click="update()" class="btn btn-primary btn-block">
                                Update
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Api from '../../../api/Api'; 

    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    gender: '',
                    status: '',
                },
                id: '',
                errors: [],
            }
        },
        created() {
            var id = this.$route.params.id
            this.id = id

            Api.get(`/users/${id}`)
            .then((res)=>{
                var data = res.data
                this.user = data
                this.user.status = data.status == 'active' ? true : false
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        computed: {
        },
        components: {
        },
        methods: {
            update() {
                var data = this.user
                data.status = data.status ? 'active': 'inactive'
                Api.patch(`/users/${ this.id }`, data)
                .then((res)=>{
                    window.location = '/users'
                })
                .catch((err)=>{
                    this.errors = err.response.data
                })
            }
        }
    }
</script>