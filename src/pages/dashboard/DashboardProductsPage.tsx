import { useVendorContext } from '@/contexts/VendorContext';
import ProductList from '@/components/dashboard/ProductList';

export default function DashboardProductsPage() {
  const { products, deleteProduct, canAddProduct, listingLimit } = useVendorContext();

  return (
    <div className="dashboard-page">
      <ProductList
        products={products}
        onDelete={deleteProduct}
        canAddProduct={canAddProduct}
        listingLimit={listingLimit}
      />
    </div>
  );
}
