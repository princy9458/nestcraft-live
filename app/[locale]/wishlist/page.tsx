// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Heart,
//   Trash2,
//   ArrowRight,
//   ShoppingBag,
//   ChevronRight,
//   Search,
//   ArrowLeft,
// } from "lucide-react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "@/lib/store/store";
// import { motion, AnimatePresence } from "motion/react";
// import { ProductFormState } from "@/lib/store/products/productsSlices";
// import { toast } from "sonner";
// import { updateProfileThunk } from "@/lib/store/auth/authThunks";
// import Link from "next/link";

// export default function WishlistPage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { user, isAuthenticated } = useSelector(
//     (state: RootState) => state.auth,
//   );

//   const wishlistIds = user?.wishlist || [];

//   const handleRemove = async (product: ProductFormState) => {
//     if (!user?._id) return;

//     let copiedList = structuredClone(wishlistIds);
//     const existingProduct = copiedList.find((prod) => prod._id === product._id);
//     if (existingProduct) {
//       copiedList = copiedList.filter((prod) => prod._id !== product._id);
//     }
//     try {
//       const res = await dispatch(
//         updateProfileThunk({
//           userData: {
//             wishlist: copiedList,
//           },
//         }),
//       ).unwrap();
//       if (res.success) {
//         toast.success("Product removed from wishlist");
//       }
//     } catch (error) {
//       toast.error("Failed to remove product from wishlist");
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ink px-6 text-center">
//         <div className="w-20 h-20 bg-olive/10 border border-olive/20 rounded-full flex items-center justify-center mb-6">
//           <Heart size={32} className="text-olive-lt opacity-50" />
//         </div>
//         <h1 className="font-head text-[32px] font-extrabold text-white uppercase italic mb-4">
//           Access Denied
//         </h1>
//         <p className="text-white/50 max-w-sm mb-8">
//           Please log in to view and manage your tactical wishlist.
//         </p>
//         <Link
//           href="/login"
//           className="bg-olive text-white font-head text-[13px] font-bold tracking-widest uppercase px-10 py-4 rounded-[2px] hover:bg-olive-lt transition-all"
//         >
//           Login to Account
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="wishlist-root bg-ink min-h-screen pb-24">
//       {/* HEADER BREADCRUMBS */}
//       <div className="bg-charcoal/50 border-b border-white/5 py-4">
//         <div className="container max-w-[1340px] px-6 mx-auto">
//           <div className="flex items-center gap-2 font-head text-[10px] font-bold tracking-[0.15em] text-white/40 uppercase italic">
//             <Link href="/" className="hover:text-gold transition-colors">
//               Home
//             </Link>
//             <ChevronRight size={10} />
//             <span className="text-gold">Wishlist</span>
//           </div>
//         </div>
//       </div>

//       <div className="container max-w-[1340px] px-6 mx-auto pt-16">
//         {/* PAGE TITLE */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 font-head text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
//               <div className="h-0.5 w-6 bg-gold" /> SAVED FOR MISSION
//             </div>
//             <h1 className="font-head text-[48px] md:text-[60px] font-extrabold tracking-[0.02em] text-white uppercase italic leading-none">
//               Your <span className="text-gold not-italic">Wishlist</span>
//             </h1>
//             <p className="text-white/40 text-[14px] italic max-w-md">
//               Review and manage your selected gear. Items saved here are ready
//               for deployment when you are.
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="pill bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
//               <span className="text-gold font-bold">{wishlistIds.length}</span>
//               <span className="text-white/40 text-[11px] font-bold uppercase tracking-wider">
//                 Items Saved
//               </span>
//             </div>
//             <Link
//               href="/shop"
//               className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-olive-lt hover:text-gold transition-colors uppercase tracking-widest italic"
//             >
//               <ArrowLeft size={14} /> Continue Shopping
//             </Link>
//           </div>
//         </div>

//         {wishlistIds.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             <AnimatePresence mode="popLayout">
//               {wishlistIds.map((product) => (
//                 <motion.article
//                   key={product._id}
//                   layout
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.9,
//                     transition: { duration: 0.2 },
//                   }}
//                   className="product-card group bg-dark border border-white/6 rounded-[3px] overflow-hidden hover:border-olive/40 transition-all duration-300 shadow-xl"
//                 >
//                   <div className="aspect-[4/5] bg-mid relative overflow-hidden">
//                     <Link
//                       href={`/product/${product.slug}`}
//                       className="block w-full h-full"
//                     >
//                       <img
//                         src={
//                           product.gallery?.[0]?.url ||
//                           "https://placehold.co/600x800?text=No+Image"
//                         }
//                         alt={product.name}
//                         className="w-full h-full object-cover grayscale-[0.2] brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
//                       />
//                     </Link>

//                     {/* ABSOLUTE ACTIONS */}
//                     <div className="absolute top-4 right-4 z-10">
//                       <button
//                         onClick={() => handleRemove(product)}
//                         className="w-10 h-10 bg-red text-white border border-white/10 rounded-[2px] flex items-center justify-center hover:bg-olive transition-colors shadow-lg group/btn"
//                         title="Remove from Wishlist"
//                       >
//                         <Trash2
//                           size={18}
//                           className="group-hover/btn:scale-110 transition-transform"
//                         />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="p-6 space-y-4">
//                     <div className="space-y-1">
//                       <div className="text-[10px] font-bold text-olive-lt uppercase tracking-widest opacity-60">
//                         {product.sku || "Tactical Gear"}
//                       </div>
//                       <h3 className="font-head text-[18px] font-bold text-white uppercase tracking-[0.02em] leading-tight group-hover:text-gold transition-colors line-clamp-2">
//                         <Link href={`/product/${product.slug}`}>
//                           {product.name}
//                         </Link>
//                       </h3>
//                     </div>

//                     <div className="flex items-center justify-between pt-4 border-t border-white/5">
//                       <div className="text-[22px] font-head font-extrabold text-white">
//                         ${product.pricing?.price || product.price || "0.00"}
//                       </div>
//                       <Link
//                         href={`/product/${product.slug}`}
//                         className="bg-[#c9a227] text-black font-head text-[11px] font-bold tracking-widest uppercase px-5 py-3 rounded-[2px] hover:bg-[#5a6330] hover:text-white transition-all flex items-center gap-2 group/link italic"
//                       >
//                         View Details
//                         <ArrowRight
//                           size={14}
//                           className="group-hover/link:translate-x-1 transition-transform"
//                         />
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.article>
//               ))}
//             </AnimatePresence>
//           </div>
//         ) : (
//           /* EMPTY STATE */
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="py-32 flex flex-col items-center text-center max-w-lg mx-auto"
//           >
//             <div className="w-24 h-24 bg-olive/5 border border-olive/10 rounded-full flex items-center justify-center mb-8 relative">
//               <ShoppingBag size={40} className="text-white/10" />
//               <Heart
//                 size={20}
//                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold animate-pulse"
//               />
//             </div>
//             <h2 className="font-head text-[32px] font-extrabold text-white uppercase italic mb-4">
//               Wishlist is <span className="text-gold">Empty</span>
//             </h2>
//             <p className="text-white/40 mb-10 leading-relaxed italic">
//               Your tactical arsenal is currently empty. Scouts are reporting new
//               gear arrivals daily. Explore the shop to save equipment for your
//               next mission.
//             </p>
//             <Link
//               href="/shop"
//               className="bg-[#c9a227] text-black font-head text-[13px] font-bold tracking-widest uppercase px-12 py-4 rounded-[2px] hover:bg-[#5a6330] hover:text-white transition-all active:translate-y-1 flex items-center gap-3"
//             >
//               <Search size={18} /> Browse Equipment
//             </Link>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useState } from "react";
import {
  Heart,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ChevronRight,
  Search,
  ArrowLeft,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store/store";
import { motion, AnimatePresence } from "motion/react";
import { ProductFormState } from "@/lib/store/products/productsSlices";
import { toast } from "sonner";
import { updateProfileThunk } from "@/lib/store/auth/authThunks";
import Link from "next/link";

export default function WishlistPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const wishlistIds = user?.wishlist || [];

  const handleRemove = async (product: ProductFormState) => {
    if (!user?._id) return;

    let copiedList = structuredClone(wishlistIds);
    const existingProduct = copiedList.find((prod) => prod.id === product.id);
    if (existingProduct) {
      copiedList = copiedList.filter((prod) => prod.id !== product.id);
    }
    try {
      const res = await dispatch(
        updateProfileThunk({
          userData: {
            wishlist: copiedList,
          },
        }),
      ).unwrap();
      if (res.success) {
        toast.success("Product removed from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
          <Heart size={32} className="text-secondary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Please log in
        </h1>
        <p className="text-muted font-semibold max-w-sm mb-8">
          Log in to view and manage the products you've saved to your wishlist.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center justify-center bg-primary text-white px-10 h-14 rounded-full text-[14px] font-bold uppercase tracking-wider hover:bg-primary/90 transition-all"
        >
          Login to Account
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-12 px-[5%] max-w-7xl mx-auto">
      {/* BREADCRUMBS */}
      <div className="crumbs flex items-center gap-2 mb-8 text-sm font-bold text-muted">
        <Link href="/" className="hover:text-secondary transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="opacity-50" />
        <strong className="text-foreground">Wishlist</strong>
      </div>

      {/* PAGE TITLE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-[42px] md:text-[52px] font-bold tracking-tight leading-none">
            Your Wishlist
          </h1>
          <p className="text-muted font-semibold mt-3 max-w-md">
            Pieces you've saved for later. They'll be right here whenever
            you're ready.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-surface border border-border px-5 py-2.5 rounded-full flex items-center gap-2">
            <span className="text-secondary font-black">
              {wishlistIds.length}
            </span>
            <span className="text-muted text-[11px] font-black uppercase tracking-wider">
              {wishlistIds.length === 1 ? "Item Saved" : "Items Saved"}
            </span>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 text-[12px] font-black text-secondary hover:text-primary transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>
      </div>

      {wishlistIds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlistIds.map((product) => (
              <motion.article
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: 0.2 },
                }}
                className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-secondary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/5] bg-background relative overflow-hidden">
                  <Link
                    href={`/product/${product.slug}`}
                    className="block w-full h-full"
                  >
                    <img
                      src={
                        product.gallery?.[0]?.url ||
                        "https://placehold.co/600x800?text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>

                  {/* REMOVE ACTION */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => handleRemove(product)}
                      className="w-10 h-10 bg-white text-foreground border border-border rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 hover:text-red-500 hover:border-red-300 hover:scale-110 transition-all duration-300"
                      title="Remove from Wishlist"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-black text-muted uppercase tracking-[2px]">
                      {product.sku || "Nest Craft"}
                    </div>
                    <h3 className="font-heading text-[18px] font-black leading-tight text-foreground/92 group-hover:text-secondary transition-colors line-clamp-2">
                      <Link href={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
                    <div className="text-[18px] font-black text-secondary">
                      {formatPrice(
                        Number(product.pricing?.price || product.price || 0),
                      )}
                    </div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="bg-primary text-white text-[11px] font-bold tracking-wider uppercase px-5 h-11 rounded-full hover:bg-primary/90 transition-all flex items-center gap-2 group/link"
                    >
                      View
                      <ArrowRight
                        size={14}
                        className="group-hover/link:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* EMPTY STATE */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-28 flex flex-col items-center text-center max-w-lg mx-auto"
        >
          <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-8 relative">
            <ShoppingBag size={40} className="text-secondary/30" />
            <Heart
              size={20}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary animate-pulse"
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Your wishlist is empty
          </h2>
          <p className="text-muted font-semibold mb-10 leading-relaxed">
            You haven't saved anything yet. Browse the shop and tap the heart
            on pieces you love — they'll be waiting for you here.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-primary text-white text-[13px] font-bold tracking-wider uppercase px-12 h-14 rounded-full hover:bg-primary/90 transition-all"
          >
            <Search size={17} /> Browse Products
          </Link>
        </motion.div>
      )}
    </div>
  );
}
