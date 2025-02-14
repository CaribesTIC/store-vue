// src/modules/Auth/stores/dashboard/dashboardStore.ts
import { defineStore } from "pinia";
import useHttp from "@/composables/useHttp";
import type { Existence } from "@/modules/Store/types/Existence";
import Http from "@/utils/Http";
import { ref } from "vue"; // Importación CORRECTA de ref desde 'vue'

export const useDashboardStore = defineStore("dashboard", () => {
  const { errors, loading, getError } = useHttp();
  const existences = ref<Existence[]>([]);
  const categoryDistributionData = ref([]);
  const stockMovementsData = ref([]);
  const lowStockItems = ref([]);
  const warehouses = ref([]);

  async function fetchExistences() {
    loading.value = true;
    errors.value = {};
    try {
      const response = await Http.get("/api/existences");
      existences.value = response.data;
    } catch (err) {
      errors.value = getError(err);
      console.error("Error fetching existences:", err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchCategoryDistribution() {
    try {
      const response = await Http.get("/api/dashboard/category-distribution");
      categoryDistributionData.value = response.data;
    } catch (error) {
      errors.value = getError(error);
      console.error("Error fetching category distribution:", error);
    }
  }

  async function fetchStockMovements() {
    try {
      const response = await Http.get("/api/dashboard/stock-movements");
      stockMovementsData.value = response.data;
    } catch (error) {
      errors.value = getError(error);
      console.error("Error fetching stock movements:", error);
    }
  }

  async function fetchLowStockItems() {
    try {
      const response = await Http.get("/api/dashboard/low-stock-items");
      lowStockItems.value = response.data;
    } catch (error) {
      errors.value = getError(error);
      console.error("Error fetching low stock items:", error);
    }
  }

  async function fetchWarehouses() {
    try {
      const response = await Http.get("/api/dashboard/warehouses");
      warehouses.value = response.data;
    } catch (error) {
      errors.value = getError(error);
      console.error("Error fetching warehouses:", error);
    }
  }

  return {
    existences,
    loading,
    errors,
    fetchExistences,
    categoryDistributionData,
    stockMovementsData,
    lowStockItems,
    warehouses,
    fetchCategoryDistribution,
    fetchStockMovements,
    fetchLowStockItems,
    fetchWarehouses,
  };
});
