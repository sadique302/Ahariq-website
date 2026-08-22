"use client";

import React, { useState } from "react";
import productsData from "../data/products.json";
import { HealthScore } from "../components/HealthScore";
import { ShieldCheck, Search, Sparkles, Flame, AlertTriangle, X } from "lucide-react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const filteredProducts = productsData.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.barcode.includes(query) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pb-24">
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight">
                  Ahar<span className="text-emerald-600">IQ</span>
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  आहार
                </span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium leading-none">
                Indian Food Health & Safety Decode
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 text-white p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Decodes Indian Grocery Labels</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Know What You & Your Family Are Eating.
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Detect hidden <strong>Palmolein Oil</strong>, <strong>Refined Maida</strong>, <strong>Harmful INS Additives</strong>, and high sugar levels in Indian groceries instantly.
            </p>
          </div>
        </section>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Maggi, Parle-G, Amul, Kurkure, Atta, Ghee..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-base tracking-tight">Popular Indian Products</h2>
            </div>
            <span className="text-xs font-semibold text-stone-400">
              {filteredProducts.length} Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 hover:shadow-md transition-all flex items-center gap-4 cursor-pointer group"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-stone-200 dark:border-stone-800 group-hover:scale-105 transition-transform"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                    {product.brand}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-emerald-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 truncate">{product.summary}</p>
                </div>

                <div className="shrink-0">
                  <HealthScore
                    score={product.healthScore}
                    verdict={product.verdict}
                    verdictType={product.verdictType}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-3xl border border-stone-200 dark:border-stone-800 p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    {selectedProduct.brand}
                  </span>
                  <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xs text-stone-400">{selectedProduct.nameHindi}</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center p-4 bg-stone-50 dark:bg-stone-800/40 rounded-2xl">
                <HealthScore
                  score={selectedProduct.healthScore}
                  verdict={selectedProduct.verdict}
                  verdictHindi={selectedProduct.verdictHindi}
                  verdictType={selectedProduct.verdictType}
                  size="lg"
                />
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {selectedProduct.summary}
              </p>

              {selectedProduct.warnings && selectedProduct.warnings.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    Critical Health Flags
                  </h4>
                  <div className="space-y-2">
                    {selectedProduct.warnings.map((w: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50"
                      >
                        <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block">
                          {w.title}
                        </span>
                        <p className="text-xs text-rose-800/80 dark:text-rose-300/80">
                          {w.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.cleanerAlternative && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-emerald-600">
                      Cleaner Indian Alternative
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded-full">
                      Score: {selectedProduct.cleanerAlternative.score}/100
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {selectedProduct.cleanerAlternative.name}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300">
                    {selectedProduct.cleanerAlternative.reason}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
