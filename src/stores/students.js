import { defineStore } from 'pinia';
import { http } from '@/httpCommons';

export const useStudentsStore = defineStore('students', {
    state: () => {
        return {
            id: null,
            students: [],
            errors: [],
            urls: '/students',
            formData: {
                id: null,
                student_id: '',
                title: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                description: '',
            },
            // table: {
            //     fields: [
            //         {key: 'client_number', label: 'Code', sortable: true},
            //         {key: 'full_name', label: 'Name', sortable: true},
            //         {key: 'email', label: 'Email'},
            //         {key: 'status', label: 'Status'},
            //         {key: 'actions', label: 'Actions', thClass: 'text-center', tdClass: 'text-center'},
            //     ]
            // },
            links: {
                first: null,
                last: null,
                next: null,
                prev: null,
            },
            meta: {
                current_page: 1,
                per_page: 10,
                total: 0,
                from: 1,
                to: 10,
                sort: 'desc',
                order_by: 'Choose',
                sort_by: 'created_at',
                sort_desc: true,
                search: '',
                page_sizes: [10, 25, 50, 100],
            },
        }
    },
    getters: {
        getStudents: (state) => state.students,
        getlinks: (state) => state.links,
        getMeta: (state) => state.meta,
    },
    actions: {
        async getAll(parameters = {
            params: {
                page: 1
            }
        }) {
            console.log(parameters);
            await http.get(this.urls, parameters).then(response => {
                if (response.status === 200) {
                    this.students = response.data.data;
                    this.links = response.data.links;
                    this.meta = response.data.meta;
                }
            });
        },
        // async loadPage(pageNo) {
        //     await http.get(this.urls, {
        //         params: {
        //             page: parseInt(pageNo)
        //         }
        //     }).then(response => {
        //         this.students = response.data.data;
        //         this.links = response.data.links;
        //         this.meta = response.data.meta;
        //     });
        // },
        save() {
            //
        }
    },
});