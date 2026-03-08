import { Link } from "react-router-dom";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/models";

const CategoriesPage = () => (
  <div className="min-h-screen pt-24">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">All Categories</h1>
      <p className="text-muted-foreground mb-8">Browse 3D models by category</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(c => <CategoryCard key={c.slug} category={c} />)}
      </div>
    </div>
  </div>
);

export default CategoriesPage;
