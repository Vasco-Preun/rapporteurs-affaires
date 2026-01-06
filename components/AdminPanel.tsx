"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  ServiceItem,
  ScriptItem,
  ArgumentItem,
  PrimeItem,
  ExampleItem,
  VideoItem,
} from "@/types";
import { Save, LogOut, Plus, Trash2 } from "lucide-react";

type ContentType = "services" | "scripts" | "arguments" | "primes" | "examples" | "videos";

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ContentType>("services");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // État pour chaque type de contenu
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [scripts, setScripts] = useState<ScriptItem[]>([]);
  const [argumentItems, setArgumentItems] = useState<ArgumentItem[]>([]);
  const [primes, setPrimes] = useState<PrimeItem[]>([]);
  const [examples, setExamples] = useState<ExampleItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch("/api/admin/content");
      if (response.ok) {
        const data = await response.json();
        setServices(data.services || []);
        setScripts(data.scripts || []);
        setArgumentItems(data.arguments || []);
        setPrimes(data.primes || []);
        setExamples(data.examples || []);
        setVideos(data.videos || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services,
          scripts,
          arguments: argumentItems,
          primes,
          examples,
          videos,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "services":
        return services;
      case "scripts":
        return scripts;
      case "arguments":
        return argumentItems;
      case "primes":
        return primes;
      case "examples":
        return examples;
      case "videos":
        return videos;
    }
  };

  const setCurrentData = (data: any[]) => {
    switch (activeTab) {
      case "services":
        setServices(data as ServiceItem[]);
        break;
      case "scripts":
        setScripts(data as ScriptItem[]);
        break;
      case "arguments":
        setArgumentItems(data as ArgumentItem[]);
        break;
      case "primes":
        setPrimes(data as PrimeItem[]);
        break;
      case "examples":
        setExamples(data as ExampleItem[]);
        break;
      case "videos":
        setVideos(data as VideoItem[]);
        break;
    }
  };

  const addNewItem = () => {
    const current = getCurrentData();
    const newId = Date.now().toString();
    let newItem: any = { id: newId };

    switch (activeTab) {
      case "services":
        newItem = { id: newId, title: "", description: "", category: "entreprise" };
        break;
      case "scripts":
        newItem = { id: newId, title: "", type: "appel", content: "" };
        break;
      case "arguments":
        newItem = {
          id: newId,
          service: "",
          problem: "",
          benefit: "",
          example: "",
          closingQuestion: "",
        };
        break;
      case "primes":
        newItem = {
          id: newId,
          title: "",
          description: "",
          conditions: "",
          status: "active",
        };
        break;
      case "examples":
        newItem = {
          id: newId,
          businessType: "",
          context: "",
          message: "",
          objective: "",
        };
        break;
      case "videos":
        newItem = {
          id: newId,
          title: "",
          description: "",
          category: "youtube",
          youtubeId: "",
        };
        break;
    }

    setCurrentData([...current, newItem]);
  };

  const deleteItem = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      const current = getCurrentData();
      setCurrentData(current.filter((item: any) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: string, value: any) => {
    const current = getCurrentData();
    setCurrentData(
      current.map((item: any) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const tabs: { value: ContentType; label: string }[] = [
    { value: "services", label: "Services" },
    { value: "scripts", label: "Scripts" },
    { value: "arguments", label: "Arguments" },
    { value: "primes", label: "Primes" },
    { value: "examples", label: "Exemples" },
    { value: "videos", label: "Vidéos" },
  ];

  const currentData = getCurrentData();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.value
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <button onClick={handleSave} className="btn-primary flex items-center" disabled={loading}>
            <Save className="mr-2" size={16} />
            {loading ? "Sauvegarde..." : "Sauvegarder"}
          </button>
          {saved && <span className="text-green-600 font-medium">✓ Sauvegardé</span>}
          <button onClick={handleLogout} className="btn-secondary flex items-center">
            <LogOut className="mr-2" size={16} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Content Editor */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {tabs.find((t) => t.value === activeTab)?.label} ({currentData.length})
          </h2>
          <button onClick={addNewItem} className="btn-secondary flex items-center text-sm">
            <Plus className="mr-2" size={16} />
            Ajouter
          </button>
        </div>

        <div className="space-y-4">
          {currentData.map((item: any, index: number) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(item).map((key) => {
                  if (key === "id") return null;

                  const value = item[key];
                  const isTextarea = typeof value === "string" && value.length > 50;

                  return (
                    <div key={key} className={isTextarea ? "md:col-span-2" : ""}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key}
                      </label>
                      {isTextarea ? (
                        <textarea
                          value={value || ""}
                          onChange={(e) => updateItem(item.id, key, e.target.value)}
                          className="input-field"
                          rows={4}
                        />
                      ) : (
                        <input
                          type="text"
                          value={value || ""}
                          onChange={(e) => updateItem(item.id, key, e.target.value)}
                          className="input-field"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {currentData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun élément. Cliquez sur &quot;Ajouter&quot; pour en créer un.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

