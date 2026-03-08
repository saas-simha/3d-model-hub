import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ModelCard from "@/components/ModelCard";
import { categories, getModelsByCategory } from "@/data/models";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const models = getModelsByCategory(slug || "");

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Category not found</h1>
          <Link to="/categories" className="text-primary hover:underline text-sm">Browse categories</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </Link>

        <div className="mb-8">
          <div className="text-4xl mb-2">{category.icon}</div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground mt-1">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map(m => <ModelCard key={m.id} model={m} />)}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
