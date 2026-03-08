import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/models";

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group glass-card p-6 hover:glow-sm transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-4xl mb-3">{category.icon}</div>
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
      <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs font-mono text-primary">{category.count} models</span>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
};

export default CategoryCard;
