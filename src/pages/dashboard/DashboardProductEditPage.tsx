import { useParams, useNavigate } from 'react-router-dom';
import { useVendorContext } from '@/contexts/VendorContext';
import ProductForm from '@/components/dashboard/ProductForm';
import type { Product } from '@/types';

export default function DashboardProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { vendor, products, addProduct, updateProduct } = useVendorContext();

  const isNew = !id || id === 'new';
  const existing = isNew ? undefined : products.find((p) => p.id === id);

  // If editing and product not found, redirect
  if (!isNew && !existing) {
    return (
      <div className="dashboard-page">
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  const handleSave = (product: Product) => {
    if (isNew) {
      addProduct(product);
    } else {
      updateProduct(product.id, product);
    }
    navigate('/dashboard/products');
  };

  const handleCancel = () => {
    navigate('/dashboard/products');
  };

  return (
    <div className="dashboard-page">
      <ProductForm
        product={existing}
        vendorId={vendor?.id ?? ''}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
