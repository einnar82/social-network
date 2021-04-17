import Vue from 'vue'
import 'es6-promise/auto'
import Buefy from 'buefy'
import Vuex from 'vuex'
import httpClient from './helpers/http'
import 'buefy/dist/buefy.css'
import './bootstrap';
import {
    reject
} from 'lodash'


Vue.use(Buefy)
Vue.use(Vuex)

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('index', require('./views/index.vue').default);

const store = new Vuex.Store({
    state: {
        comments: [],
        details: {}
    },
    mutations: {
        FETCH_COMMENTS: (state, comments) => {
            state.comments = comments
        },
        FETCH_DETAILS: (state, details) => {
            state.details = details
        },
        ADD_COMMENT: (state, comment) => {
            state.comments = [{
                ...comment
            }, ...state.comments]
        }
    },
    getters: {
        comments: state => state.comments
    },
    actions: {
        fetchComments({
            commit,
            state
        }) {
            httpClient({
                url: "/comments",
                method: "get",
            }).then((response) => {
                const {
                    data,
                    ...others
                } = response.data
                const updatedComments = data.map(item => {
                    return {
                        ...item,
                        enable: false
                    }
                })
                commit('FETCH_COMMENTS', updatedComments)
                commit('FETCH_DETAILS', others)
            });
        },
        fetchOtherComments({
            commit,
            state
        }) {
            httpClient({
                url: state.details.links.next,
                method: "get",
            }).then((response) => {
                const {
                    data,
                    ...others
                } = response.data
                const updatedComments = data.map(item => {
                    return {
                        ...item,
                        enable: false
                    }
                })
                commit('FETCH_COMMENTS', updatedComments)
                commit('FETCH_DETAILS', others)
            });
        },
        addComment({
            commit,
            state
        }, payload) {
            httpClient({
                url: "/comments",
                method: "post",
                data: {
                    ...payload
                }
            }).then((response) => {
                const {
                    data,
                    ...others
                } = response.data
                const updatedComment = {
                    ...data,
                    enable: false
                }
                commit('ADD_COMMENT', updatedComment)
                resolve(comment)
            }).catch(error => {
                reject(error)
            })
        }
    }
})

const app = new Vue({
    el: '#app',
    store
});
