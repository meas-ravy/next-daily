import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default function Home() {
  // នេះគឺជា Server Action
  async function createProduct(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const priceStr = formData.get("price") as string;
    const catIdStr = formData.get("categoryId") as string;
    const supIdStr = formData.get("suplierId") as string;

    const price = parseFloat(priceStr);
    const categoryId = parseInt(catIdStr);
    const suplierId = parseInt(supIdStr);

    if (!name || isNaN(price) || isNaN(categoryId) || isNaN(suplierId)) {
      console.error("Missing or invalid form data");
      return;
    }

    try {
      await prisma.product.create({
        data: {
          name,
          price,
          categoryId,
          suplierId,
          stock: 10,
        },
      });
      revalidatePath("/"); // Update ទំព័រដើមឱ្យឃើញទិន្នន័យថ្មី
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <form
        action={createProduct}
        className="flex flex-col gap-4 w-full max-w-sm p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800"
      >
        <div className="mb-2 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            បន្ថែមផលិតផលថ្មី
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            សូមបញ្ចូលព័ត៌មានផលិតផលខាងក្រោម
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium px-1">ឈ្មោះផលិតផល</label>
          <input
            name="name"
            required
            placeholder="ឈ្មោះទំនិញ"
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-transparent outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium px-1">តម្លៃ ($)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            placeholder="តម្លៃ"
            className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-transparent outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium px-1">ID ប្រភេទ</label>
            <input
              name="categoryId"
              type="number"
              required
              placeholder="ID ប្រភេទ"
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-transparent outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium px-1">
              ID អ្នកផ្គត់ផ្គង់
            </label>
            <input
              name="suplierId"
              type="number"
              required
              placeholder="ID អ្នកផ្គត់ផ្គង់"
              className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-transparent outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-black/5 dark:shadow-white/5"
        >
          បន្ថែមផលិតផល
        </button>
      </form>
    </main>
  );
}
