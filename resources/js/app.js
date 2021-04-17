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
        ADD_CHILD_COMMENT: (state, child) => {
            child.grand_children = []
            let objIndex = state.comments.findIndex((obj => obj.id == child.parent_id));
            let childrenArray = state.comments[objIndex].children
            childrenArray.unshift(child)
            state.comments[objIndex].enable = !state.comments[objIndex].enable
        },
        FETCH_COMMENTS: (state, comments) => {
            state.comments = state.comments.concat(comments)
        },
        FETCH_DETAILS: (state, details) => {
            state.details = details
        },
        ADD_COMMENT: (state, comment) => {
            state.comments = [{
                ...comment
            }, ...state.comments]
        },
        APPEND_CHILD_COMMENTS: (state, payload) => {
            let objIndex = state.comments.findIndex((obj => obj.id == payload.id));
            console.log(state.comments[objIndex])
            console.log("payload.comments", payload.comments)
            state.comments[objIndex].children = [...payload.comments, ...state.comments[objIndex].children]
        },
        ENABLE_PARENT_COMMENT_BOX: (state, parentComment) => {
            let objIndex = state.comments.findIndex((obj => obj.id == parentComment.id));
            state.comments[objIndex].enable = !state.comments[objIndex].enable
        },
        ENABLE_GRANDCHILD_COMMENT_BOX: (state, grandChildComment) => {
            console.log("grandChildComment", grandChildComment)
            let objIndex = state.comments.findIndex((obj => obj.id == parentComment.id));
            state.comments[objIndex].children
        }
    },
    getters: {
        comments: state => state.comments
    },
    actions: {
        addChildComment({
            commit,
            state
        }, payload) {
            commit('ADD_CHILD_COMMENT', payload)
        },
        enableParentCommentBox({
            commit,
            state
        }, comment) {
            commit('ENABLE_PARENT_COMMENT_BOX', comment)
        },
        enableGrandchildCommentBox({
            commit,
            state
        }, comment) {
            commit('ENABLE_GRANDCHILD_COMMENT_BOX', comment)
        },
        fetchParentComments({
            commit,
            state
        }, id) {
            httpClient({
                url: `/comments/${id}`,
                method: "get",
            }).then((response) => {
                const {
                    data,
                    ...others
                } = response.data
                const updatedComments = data.map(item => {
                    return {
                        ...item,
                        enable: false,
                        grand_children: []
                    }
                })
                commit('APPEND_CHILD_COMMENTS', {
                    comments: updatedComments,
                    id
                })
            });
        },
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
                        enable: false,
                        children: []
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
            return new Promise((resolve, reject) => {
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
                        enable: false,
                        children: []
                    }
                    if (payload.parent_id) {
                        commit('ADD_CHILD_COMMENT', updatedComment)
                        resolve(updatedComment)
                    } else {
                        commit('ADD_COMMENT', updatedComment)
                        resolve(updatedComment)
                    }

                }).catch(error => {
                    reject(error)
                })
            })

        }
    }
})

const app = new Vue({
    el: '#app',
    store
});
