import axios from "axios";
import { useEffect, useState } from "react";

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const services = {
    create: async (resource) => {
      try {
        await axios.post(baseUrl, resource);
        fetchResources(); // Refresh the list after creating a new resource
      } catch (error) {
        console.error("Error creating resource:", error);
      }
    },
    update: async (id, resource) => {
      try {
        await axios.put(`${baseUrl}/${id}`, resource);
        fetchResources(); // Refresh the list after updating a resource
      } catch (error) {
        console.error("Error updating resource:", error);
      }
    }
  };

  return [
    resources,
    services
  ];
};