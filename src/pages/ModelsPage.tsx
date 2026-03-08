import { useState } from "react";
import ModelCard from "@/components/ModelCard";
import { models, searchModels } from "@/data/models";
import { Search } from "lucide-react";

const ModelsPage = () => {
  const [query, setQuery] = useState("");
  const displayed = query.length > 1 ? searchModels(query) : models;

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">All Models</h1>
            <p className="text-muted-foreground text-sm mt-1">{displayed.length} models available</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search models..."
              className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayed.map(m => <ModelCard key={m.id} model={m} />)}
        </div>

        {displayed.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No models found for "{query}"</div>
        )}
      </div>
    </div>
  );
};

export default ModelsPage;
