import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useUserAdminStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    theme: null,
    loading: false,
    news: [],
    singleNews: {},
    singlePageLoading: false,
    page: 1,
    totalPage: 1,
   setCurrentPage : (page)=>set({totalPage:page}),
    getAllNews: async () => {
        set({ loading: true });
        try {
            const { page } = get();
            const response = await axiosInstance.get(`/news?page=${page}&limit=10`)
            console.log(response)
            set({ news: response.data.news, loading: false, totalPage: response.data.totalPages });
        } catch (error) {
            set({ loading: false, news: [], totalPage: null })
        } finally {
            set({ loading: false });
        }
    },
    getSingleNews: async (newsId) => {
        set({ singlePageLoading: true });
        try {
            const response = await axiosInstance.get(`/news/${newsId}`);
            set({ singleNews: response.data.news, singlePageLoading: false, });
        } catch (error) {
            set({
                singlePageLoading: false,
                singleNews: {}
            });
            console.log(error);

        } finally {
            set({ singlePageLoading: false })
        }
    },

}));

// export const useUserAdminStore = ()
