import { defineStore } from 'pinia';
import { http } from '@/httpCommons';

export const useTeachersStore = defineStore('teachers', {
    state: () => {
        return {
            id: null,
            teachers: [],
            errors: [],
            urls: '/teachers',
            formData: {
                id: null,
                teacher_id: '',
                title: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                description: '',
                designation: '',
            },
            table: {
                fields: [
                    {key: 'client_number', label: 'Code', sortable: true},
                    {key: 'full_name', label: 'Name', sortable: true},
                    {key: 'email', label: 'Email'},
                    {key: 'status', label: 'Status'},
                    {key: 'actions', label: 'Actions', thClass: 'text-center', tdClass: 'text-center'},
                ]
            },
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
        getTeachers: (state) => state.teachers,
        getlinks: (state) => state.links,
        getMeta: (state) => state.meta,
    },
    actions: {
        async getAll() {
            await http.get(this.urls).then(response => {
                if (response.status === 200) {
                    this.teachers = response.data.data;
                    this.links = response.data.links;
                    this.meta = response.data.meta;
                }
            });
        },
        save() {
            //
        }
    },
});