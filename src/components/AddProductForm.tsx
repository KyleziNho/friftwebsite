import React, { useState, useRef } from 'react';
import { 
  ProductService, 
  CATEGORIES, 
  DETAILED_SUBCATEGORIES, 
  COLLECTION_LOCATIONS,
  ProductData 
} from '../services/ProductService';
import '../styles/AddProductForm.css';

interface AddProductFormProps {
  onProductCreated?: (productId: string) => void;
  onClose?: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductCreated, onClose }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    detailedSubcategory: '',
    brand: '',
    size: '',
    material: '',
    condition: '',
    tags: '',
    collectionLocations: ['City Centre (Virgil)'] as string[],
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const colors = [
    'Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Pink',
    'Purple', 'Orange', 'Brown', 'Navy', 'Beige', 'Gold', 'Silver', 'Multicolor'
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset dependent fields when category changes
    if (field === 'category') {
      setFormData(prev => ({
        ...prev,
        subcategory: '',
        detailedSubcategory: '',
        size: '',
        condition: ''
      }));
    } else if (field === 'subcategory') {
      setFormData(prev => ({
        ...prev,
        detailedSubcategory: '',
        size: '',
        condition: ''
      }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedImages.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }
    setSelectedImages(prev => [...prev, ...files].slice(0, 10));
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newImages = [...selectedImages];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    
    setSelectedImages(newImages);
    setDraggedIndex(null);
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleCollectionLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      collectionLocations: prev.collectionLocations.includes(location)
        ? prev.collectionLocations.filter(l => l !== location)
        : [...prev.collectionLocations, location]
    }));
  };

  const getSizeOptions = () => {
    return ProductService.getSizeOptions(formData.category, formData.subcategory, formData.detailedSubcategory);
  };

  const getConditionOptions = () => {
    return ProductService.getConditionOptions(formData.category, formData.subcategory);
  };

  const shouldShowSizeField = () => {
    return ProductService.shouldShowSizeField(formData.subcategory);
  };

  const shouldShowConditionField = () => {
    return ProductService.shouldShowConditionField(formData.category);
  };

  const getDetailedSubcategories = (): string[] | null => {
    if ((formData.category === 'Women' || formData.category === 'Men') && formData.subcategory) {
      const categoryData = DETAILED_SUBCATEGORIES[formData.category as 'Women' | 'Men'];
      const subcategoryData = categoryData[formData.subcategory as keyof typeof categoryData];
      return subcategoryData || null;
    }
    return null;
  };

  const validateForm = (): { isValid: boolean; errorMessage: string } => {
    if (selectedImages.length === 0) {
      return { isValid: false, errorMessage: 'Please add at least one image' };
    }
    if (!formData.name.trim()) {
      return { isValid: false, errorMessage: 'Please enter a product name' };
    }
    if (!formData.description.trim()) {
      return { isValid: false, errorMessage: 'Please enter a description' };
    }
    if (!formData.category || !formData.subcategory) {
      return { isValid: false, errorMessage: 'Please select category and subcategory' };
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      return { isValid: false, errorMessage: 'Please set a valid price' };
    }
    if (shouldShowSizeField() && (!formData.size || formData.size === 'Select Size')) {
      return { isValid: false, errorMessage: 'Please select a size' };
    }
    if (shouldShowConditionField() && (!formData.condition || formData.condition === 'Select Condition')) {
      return { isValid: false, errorMessage: 'Please select the condition' };
    }
    if (formData.collectionLocations.length === 0 && formData.category !== 'Tickets') {
      return { isValid: false, errorMessage: 'Please select a collection location' };
    }
    
    return { isValid: true, errorMessage: '' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      alert(validation.errorMessage);
      return;
    }

    setIsUploading(true);

    try {
      // Upload images
      const imageUrls = await ProductService.uploadImages(selectedImages, 'products', 'admin-user');
      
      if (imageUrls.length === 0) {
        throw new Error('Failed to upload images');
      }

      // Prepare product data
      const productData: Omit<ProductData, 'id' | 'createdAt' | 'createdAtISO' | 'views'> = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        subcategory: formData.subcategory || undefined,
        detailedSubcategory: formData.detailedSubcategory || undefined,
        brand: formData.brand.trim() || undefined,
        size: (shouldShowSizeField() && formData.size !== 'Select Size') ? formData.size : undefined,
        material: formData.material.trim() || undefined,
        colors: selectedColors.length > 0 ? selectedColors : undefined,
        condition: (shouldShowConditionField() && formData.condition !== 'Select Condition') ? formData.condition : undefined,
        tags: formData.tags.trim() ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : undefined,
        collectionLocations: formData.collectionLocations,
        collection: formData.collectionLocations[0],
        status: 'active',
        imageUrl: imageUrls[0],
        additionalImages: imageUrls.length > 1 ? imageUrls.slice(1) : undefined,
        userName: 'Admin',
        userId: '',
        userEmail: '',
      };

      const productId = await ProductService.createProduct(productData);
      
      alert('Product created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        subcategory: '',
        detailedSubcategory: '',
        brand: '',
        size: '',
        material: '',
        condition: '',
        tags: '',
        collectionLocations: ['City Centre (Virgil)'],
      });
      setSelectedImages([]);
      setSelectedColors([]);
      
      if (onProductCreated) {
        onProductCreated(productId);
      }
      
    } catch (error) {
      console.error('Error creating product:', error);
      alert(`Failed to create product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="add-product-form">
      <div className="form-header">
        <h2>Add New Product</h2>
        {onClose && (
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        {/* Image Upload Section */}
        <div className="form-section">
          <h3>Product Images</h3>
          <div className="image-upload-area">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
            />
            
            {selectedImages.length === 0 ? (
              <div className="upload-placeholder" onClick={() => fileInputRef.current?.click()}>
                <div className="upload-icon">📷</div>
                <p>Click to add images</p>
                <span>Add up to 10 photos</span>
              </div>
            ) : (
              <div className="images-grid">
                {selectedImages.map((file, index) => (
                  <div
                    key={index}
                    className={`image-item ${draggedIndex === index ? 'dragging' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <img src={URL.createObjectURL(file)} alt={`Product ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                    {index === 0 && <span className="main-image-badge">Main</span>}
                  </div>
                ))}
                {selectedImages.length < 10 && (
                  <div className="add-more-btn" onClick={() => fileInputRef.current?.click()}>
                    +
                  </div>
                )}
              </div>
            )}
            <p className="upload-hint">
              {selectedImages.length === 0 ? 'Add up to 10 photos.' : 'Add up to 10 photos. Drag to reorder.'}
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Price (£) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your product..."
              rows={4}
              required
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="form-section">
          <h3>Category</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {Object.keys(CATEGORIES).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {formData.category && (
              <div className="form-group">
                <label>Subcategory *</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  required
                >
                  <option value="">Select Subcategory</option>
                  {CATEGORIES[formData.category as keyof typeof CATEGORIES]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}
            
            {getDetailedSubcategories() && (
              <div className="form-group">
                <label>Detailed Category</label>
                <select
                  value={formData.detailedSubcategory}
                  onChange={(e) => handleInputChange('detailedSubcategory', e.target.value)}
                >
                  <option value="">Select Detailed Category</option>
                  {getDetailedSubcategories()?.map((detailed: string) => (
                    <option key={detailed} value={detailed}>{detailed}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="form-section">
          <h3>Product Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="Enter brand name"
              />
            </div>
            
            <div className="form-group">
              <label>Material</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => handleInputChange('material', e.target.value)}
                placeholder="e.g., Cotton, Leather, Polyester"
              />
            </div>
            
            {shouldShowSizeField() && (
              <div className="form-group">
                <label>Size *</label>
                <select
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  required
                >
                  {getSizeOptions().map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
            
            {shouldShowConditionField() && (
              <div className="form-group">
                <label>Condition *</label>
                <select
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                  required
                >
                  {getConditionOptions().map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="Enter tags separated by commas"
            />
          </div>
        </div>

        {/* Colors */}
        <div className="form-section">
          <h3>Colors</h3>
          <div className="colors-grid">
            {colors.map(color => (
              <button
                key={color}
                type="button"
                className={`color-btn ${selectedColors.includes(color) ? 'selected' : ''}`}
                onClick={() => toggleColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Collection Locations */}
        {formData.category !== 'Tickets' && (
          <div className="form-section">
            <h3>Collection Locations *</h3>
            <div className="locations-grid">
              {COLLECTION_LOCATIONS.map(location => (
                <button
                  key={location}
                  type="button"
                  className={`location-btn ${formData.collectionLocations.includes(location) ? 'selected' : ''}`}
                  onClick={() => toggleCollectionLocation(location)}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="spinner"></div>
                Uploading...
              </>
            ) : (
              'Create Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;