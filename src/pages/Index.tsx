import { Link } from "react-router-dom";
import { ArrowRight, Box, Sparkles } from "lucide-react";
import HeroViewer from "@/components/HeroViewer";
import ModelCard from "@/components/ModelCard";
import CategoryCard from "@/components/CategoryCard";
import { categories, getFeaturedModels, getRecentModels } from "@/data/models";

const Index = () => {
  const featured = getFeaturedModels();
  const recent = getRecentModels();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 pt-20 grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 glass-card px-3 py-1.5 text-xs font-mono text-primary">
              <Sparkles className="w-3 h-3" />
              Developer Resource Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Resource<span className="text-gradient">AI</span>
              <br />
              <span className="text-2xl md:text-3xl text-muted-foreground font-normal mt-2 block">
                Copy Ready 3D Models for Developers
              </span>
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Explore real-time 3D models and integrate them into your projects instantly. Preview, rotate, and copy code snippets.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/models"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity glow-sm"
              >
                Explore Models <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 glass-card px-6 py-3 font-medium hover:bg-secondary/60 transition-colors"
              >
                <Box className="w-4 h-4" /> Browse Categories
              </Link>
            </div>
          </div>

          <div className="h-[400px] lg:h-[500px]">
            <HeroViewer />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Featured Models</h2>
              <p className="text-sm text-muted-foreground mt-1">Hand-picked 3D models</p>
            </div>
            <Link to="/models" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(m => <ModelCard key={m.id} model={m} />)}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">Categories</h2>
          <p className="text-sm text-muted-foreground mb-8">Browse models by category</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(c => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>

      {/* Recent */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">Recently Added</h2>
          <p className="text-sm text-muted-foreground mb-8">Fresh models added to the library</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map(m => <ModelCard key={m.id} model={m} />)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 ResourceAI</span>
          <span className="font-mono text-xs text-primary">Built for developers</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
