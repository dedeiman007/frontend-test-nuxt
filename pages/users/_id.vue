<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-7">
            <div class="box border-3">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0 fw-medium">
                            Detail Pengguna
                        </h5>
                        <div class="mt-1 font-size-13 text-gray">
                            Silahkan edit data pengguna
                        </div>
                    </div>
                </div>
                <div class="line mt-4 mb-2"></div>
                <div class="row">
                    <div class="col-md-6 mt-3">
                        <label class="fw-medium font-size-14">Nama</label>
                        <input type="text" class="form-control" v-model="user.name" placeholder="Masukkan nama" readonly>
                    </div>
                    <div class="col-md-6 mt-3">
                        <label class="fw-medium font-size-14">Email</label>
                        <input type="email" class="form-control" v-model="user.email" placeholder="Masukkan email" readonly>
                    </div>
                    <div class="col-md-6 mt-3">
                        <label class="fw-medium font-size-14">Jenis Kelamin</label>
                        <b-form-group v-slot="{ ariaDescribedby }" disabled>
                            <b-form-radio v-model="user.gender" :aria-describedby="ariaDescribedby" name="some-radios" value="male" disabled>Male</b-form-radio>
                            <b-form-radio v-model="user.gender" :aria-describedby="ariaDescribedby" name="some-radios" value="female" disabled>Female</b-form-radio>
                        </b-form-group>
                    </div>
                    <div class="col-md-6 mt-3">
                        <label class="fw-medium font-size-14">Status</label>
                        <div class="d-flex mt-1">
                            <label class="switch mr-4" for="checkbox">
                                <input type="checkbox" id="checkbox" v-model="user.status" disabled>
                                <div class="radio-slider round"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box border-3 mt-4" v-if="posts.length > 0">
                <div class="d-flex align-items-center">
                    <div>
                        <h5 class="mb-0 fw-medium">
                            List Post
                        </h5>
                    </div>
                    <div class="ml-auto">
                        <a href="javascript:void(0)" v-b-modal.create-modal class="btn btn-primary">
                            Tambah Post
                        </a>
                    </div>
                </div>
                <div class="line mt-4 mb-2"></div>
                <div class="modern-table-boxed">
                    <div class="d-table-row header">
                        <div class="d-table-cell">
                            ID
                        </div>
                        <div class="d-table-cell">
                            Title
                        </div>
                        <div class="d-table-cell">
                            Action
                        </div>
                    </div>
                    <template v-for="post in posts">
                        <div class="d-table-row">
                            <div class="d-table-cell">
                                {{ post.id }}
                            </div>
                            <div class="d-table-cell">
                                {{ post.title }}
                            </div>
                            <div class="d-table-cell">
                                <a href="javascript:void(0)" v-b-modal.show-modal class="text-blue mr-2" @click="showModal(post)">
                                    <img :src="'/icon/view.png'" width="15" alt="">
                                </a>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="box border-3 mt-4 text-center" v-else>
                <h3 class="text-gray">
                    List Post Kosong
                </h3>
            </div>
            <div class="row mt-4">
                <div class="col-md-3">
                    <nuxt-link to="/users" class="btn btn-outline btn-block">
                        Kembali
                    </nuxt-link>
                </div>
            </div>
            <b-modal id="show-modal" title="Detail Post">
                <div class="my-4" v-if="post != null">
                    <span class="font-size-14">
                        Title
                    </span>
                    <br>
                    <span class="font-size-12">
                        {{ post.title }}
                    </span>
                    <div class="mt-3">
                        <span class="font-size-14">
                            Body
                        </span>
                        <br>
                        <span class="font-size-12" v-html="post.body">
                        </span>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">
                            Hapus Post
                        </button>
                    </div>
                </div>
            </b-modal>
            <b-modal id="create-modal" title="Create Post" size="lg" :static="true" @ok="storePost()" @show="prepare()">
                <div class="my-4">
                    <label class="fw-medium">
                        Title
                    </label>
                    <input type="text" class="form-control" v-model="req_post.title" placeholder="Masukkan title">
                    <div class="mt-3">
                        <span class="font-size-14">
                            Body
                        </span>
                        <div class="mt-2">
                            <textarea id="default"></textarea>
                        </div>
                    </div>
                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
    import Api from '../../api/Api'; 

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
                posts: [],
                post: null,
                req_post: {
                    title: '',
                    body: '',
                },
                inited: false,
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

            Api.get(`/users/${id}/posts`)
            .then((res)=>{
                var data = res.data
                this.posts = data
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        mounted() {
        },
        computed: {
        },
        components: {
        },
        methods: {
            showModal(post) {
                this.post = post
            },
            storePost() {
                var data = {
                    title: this.req_post.title,
                    body: tinyMCE.activeEditor.getContent()
                }

                Api.post(`/users/${this.id}/posts`, data)
                .then((res)=>{
                    location.reload()
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            deletePost(post_id) {
                Api.delete(`/users/${this.id}/posts/${post_id}`)
                .then((res)=>{
                    location.reload()
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            prepare() {
                if(this.inited) {
                    return false
                }

                this.inited = true

                setTimeout(()=>{
                    tinymce.init({
                        selector: 'textarea#default',
                        height: 400
                    });
                }, 1000)
            }
        }
    }
</script>