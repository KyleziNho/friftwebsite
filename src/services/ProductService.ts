import { db, auth } from '../firebase/config';
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface ProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  detailedSubcategory?: string;
  brand?: string;
  size?: string;
  material?: string;
  colors?: string[];
  condition?: string;
  tags?: string[];
  hiddenTags?: string[];
  collectionLocations: string[];
  collection: string;
  status: string;
  imageUrl: string;
  additionalImages?: string[];
  userId: string;
  userEmail: string;
  userName: string;
  views: number;
  createdAt: Timestamp;
  createdAtISO: string;
}

export const CATEGORIES = {
  'Women': ['Clothing', 'Shoes', 'Bags', 'Accessories', 'Beauty'],
  'Men': ['Clothing', 'Shoes', 'Bags', 'Accessories', 'Grooming'],
  'Home': [
    'Furniture',
    'Kitchen & Dining',
    'Bedroom',
    'Bathroom',
    'Lighting',
    'Outdoor',
    'Home Office',
    'Decor'
  ],
  'Electronics': [
    'Phones & Tablets',
    'Computers & Laptops',
    'Audio & Headphones',
    'Cameras',
    'Wearables',
    'Gaming',
    'Accessories'
  ],
  'Sports': [
    'Equipment',
    'Clothing',
    'Footwear',
    'Accessories',
    'Outdoor Gear'
  ],
  'Tickets': ['Club Nights', 'Concerts', 'Sports', 'Theatre', 'Travel'],
};

export const DETAILED_SUBCATEGORIES = {
  'Women': {
    'Clothing': [
      'Outerwear',
      'Jumpers & Sweaters',
      'Dresses',
      'Skirts',
      'Tops & T-Shirts',
      'Jeans',
      'Trousers & Leggings',
      'Shorts & Cropped Trousers',
      'Jumpsuits & Playsuits',
      'Swimwear',
      'Lingerie & Nightwear',
      'Activewear',
      'Costumes & Special Outfits',
      'Other Clothing'
    ],
    'Shoes': [
      'Ballerinas',
      'Boat Shoes',
      'Loafers & Moccasins',
      'Boots',
      'Clogs & Mules',
      'Espadrilles',
      'Flip Flops & Slides',
      'Heels',
      'Lace-up Shoes',
      'Mary Janes & T-Bar Shoes',
      'Sandals',
      'Slippers',
      'Sports Shoes',
      'Trainers'
    ],
  },
  'Men': {
    'Clothing': [
      'Outerwear',
      'Jumpers & Sweaters',
      'Shirts',
      'T-Shirts & Polo Shirts',
      'Jeans',
      'Trousers & Chinos',
      'Shorts',
      'Suits & Formal Wear',
      'Underwear & Nightwear',
      'Activewear',
      'Swimwear',
      'Hoodies & Sweatshirts',
      'Other Clothing'
    ],
    'Shoes': [
      'Dress Shoes',
      'Casual Shoes',
      'Loafers & Slip-ons',
      'Boots',
      'Trainers & Sneakers',
      'Sports Shoes',
      'Sandals & Flip Flops',
      'Boat Shoes',
      'Work Boots',
      'Slippers',
      'Other Shoes'
    ],
    'Bags': [
      'Backpacks',
      'Laptop Bags & Cases',
      'Briefcases',
      'Messenger Bags',
      'Duffel Bags',
      'Gym Bags',
      'Travel Bags & Suitcases',
      'Crossbody Bags',
      'Belt Bags & Fanny Packs',
      'Wallets',
      'Card Holders',
      'Other Bags'
    ],
  },
};

export const SIZE_OPTIONS = {
  womenTops: [
    'Select Size',
    'XS (UK 6 / EU 34)',
    'S (UK 8 / EU 36)',
    'M (UK 10 / EU 38)',
    'L (UK 12 / EU 40)',
    'XL (UK 14 / EU 42)',
    'XXL (UK 16 / EU 44)',
    '3XL (UK 18 / EU 46)',
    '4XL (UK 20 / EU 48)',
    'One Size'
  ],
  womenBottoms: [
    'Select Size',
    'UK 4 / EU 32',
    'UK 6 / EU 34',
    'UK 8 / EU 36',
    'UK 10 / EU 38',
    'UK 12 / EU 40',
    'UK 14 / EU 42',
    'UK 16 / EU 44',
    'UK 18 / EU 46',
    'UK 20 / EU 48',
    'UK 22 / EU 50',
    'W24', 'W25', 'W26', 'W27', 'W28', 'W29', 'W30',
    'W31', 'W32', 'W33', 'W34', 'W36', 'W38'
  ],
  menTops: [
    'Select Size',
    'XS (Chest 34-36")',
    'S (Chest 36-38")',
    'M (Chest 38-40")',
    'L (Chest 40-42")',
    'XL (Chest 42-44")',
    'XXL (Chest 44-46")',
    '3XL (Chest 46-48")',
    '4XL (Chest 48-50")'
  ],
  menBottoms: [
    'Select Size',
    'W28', 'W29', 'W30', 'W31', 'W32', 'W33', 'W34',
    'W36', 'W38', 'W40', 'W42', 'W44',
    'XS (28-30")',
    'S (30-32")',
    'M (32-34")',
    'L (34-36")',
    'XL (36-38")',
    'XXL (38-40")',
    '3XL (40-42")'
  ],
  dresses: [
    'Select Size',
    'UK 4 / EU 32',
    'UK 6 / EU 34',
    'UK 8 / EU 36',
    'UK 10 / EU 38',
    'UK 12 / EU 40',
    'UK 14 / EU 42',
    'UK 16 / EU 44',
    'UK 18 / EU 46',
    'UK 20 / EU 48',
    'UK 22 / EU 50',
    'One Size'
  ],
  outerwear: [
    'Select Size',
    'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'
  ],
  womenShoes: [
    'Select Size',
    'UK 2 / EU 35', 'UK 2.5 / EU 35.5', 'UK 3 / EU 36', 'UK 3.5 / EU 36.5',
    'UK 4 / EU 37', 'UK 4.5 / EU 37.5', 'UK 5 / EU 38', 'UK 5.5 / EU 38.5',
    'UK 6 / EU 39', 'UK 6.5 / EU 39.5', 'UK 7 / EU 40', 'UK 7.5 / EU 40.5',
    'UK 8 / EU 41', 'UK 8.5 / EU 41.5', 'UK 9 / EU 42'
  ],
  menShoes: [
    'Select Size',
    'UK 5 / EU 38', 'UK 5.5 / EU 38.5', 'UK 6 / EU 39', 'UK 6.5 / EU 40',
    'UK 7 / EU 40.5', 'UK 7.5 / EU 41', 'UK 8 / EU 42', 'UK 8.5 / EU 42.5',
    'UK 9 / EU 43', 'UK 9.5 / EU 44', 'UK 10 / EU 44.5', 'UK 10.5 / EU 45',
    'UK 11 / EU 46', 'UK 11.5 / EU 46.5', 'UK 12 / EU 47', 'UK 13 / EU 48'
  ]
};

export const CONDITION_OPTIONS = {
  clothing: [
    'Select Condition',
    'New with Tags',
    'New without Tags',
    'Like New / Tried On Only',
    'Gently Worn',
    'Well Worn'
  ],
  electronics: [
    'Select Condition',
    'Brand New (Sealed)',
    'Open Box / Like New',
    'Refurbished (Certified)',
    'Used – Excellent',
    'Used – Good',
    'Used – Fair',
    'For Parts / Not Working'
  ],
  beauty: [
    'Select Condition',
    'New (Sealed)',
    'New (Unsealed, Never Used)',
    'Gently Used',
    'For Parts / Collector\'s Item'
  ],
  homeGoods: [
    'Select Condition',
    'Brand New',
    'Like New',
    'Lightly Used',
    'Well Used / Rustic',
    'For Parts / Needs Repair'
  ],
  general: [
    'Select Condition',
    'New',
    'Like New',
    'Gently Used',
    'Well Used',
    'For Parts / Needs Repair'
  ]
};

export const COLLECTION_LOCATIONS = [
  'City Centre (Virgil)',
  'University Campus',
  'King\'s Cross',
  'Shoreditch',
  'Camden',
  'Greenwich',
  'Canary Wharf',
  'Clapham',
  'Brixton',
  'Other'
];

export class ProductService {
  private static storage = getStorage();

  static getSizeOptions(category: string, subcategory: string, detailedSubcategory: string): string[] {
    if (subcategory === 'Shoes') {
      return category === 'Women' ? SIZE_OPTIONS.womenShoes : SIZE_OPTIONS.menShoes;
    }

    if (subcategory === 'Clothing') {
      if (category === 'Women') {
        if (['Tops & T-Shirts', 'Jumpers & Sweaters', 'Shirts & Blouses'].includes(detailedSubcategory)) {
          return SIZE_OPTIONS.womenTops;
        }
        if (['Jeans', 'Trousers & Leggings', 'Shorts & Cropped Trousers', 'Skirts'].includes(detailedSubcategory)) {
          return SIZE_OPTIONS.womenBottoms;
        }
        if (['Dresses', 'Jumpsuits & Playsuits'].includes(detailedSubcategory)) {
          return SIZE_OPTIONS.dresses;
        }
        if (detailedSubcategory === 'Outerwear') {
          return SIZE_OPTIONS.outerwear;
        }
        return SIZE_OPTIONS.womenTops;
      } else if (category === 'Men') {
        if (['T-Shirts & Polo Shirts', 'Shirts', 'Jumpers & Sweaters'].includes(detailedSubcategory)) {
          return SIZE_OPTIONS.menTops;
        }
        if (['Jeans', 'Trousers & Chinos', 'Shorts'].includes(detailedSubcategory)) {
          return SIZE_OPTIONS.menBottoms;
        }
        if (['Outerwear', 'Suits & Formal Wear'].includes(detailedSubcategory)) {
          return SIZE_OPTIONS.outerwear;
        }
        return SIZE_OPTIONS.menTops;
      }
      return SIZE_OPTIONS.outerwear;
    }

    return [];
  }

  static getConditionOptions(category: string, subcategory: string): string[] {
    switch (category) {
      case 'Women':
      case 'Men':
        if (['Clothing', 'Shoes', 'Accessories'].includes(subcategory)) {
          return CONDITION_OPTIONS.clothing;
        }
        break;
      case 'Electronics':
        return CONDITION_OPTIONS.electronics;
      case 'Beauty':
      case 'Grooming':
        return CONDITION_OPTIONS.beauty;
      case 'Home':
        return CONDITION_OPTIONS.homeGoods;
      default:
        return CONDITION_OPTIONS.general;
    }
    return CONDITION_OPTIONS.general;
  }

  static shouldShowSizeField(subcategory: string): boolean {
    return subcategory === 'Clothing' || subcategory === 'Shoes';
  }

  static shouldShowConditionField(category: string): boolean {
    return category !== 'Tickets';
  }

  static async uploadImage(file: File, folder: string, userId: string, index: number): Promise<string> {
    try {
      const timestamp = Date.now().toString();
      const filename = `${timestamp}-${index}.jpeg`;
      const storageRef = ref(this.storage, `${folder}/${userId}/${filename}`);
      
      const metadata = {
        contentType: 'image/jpeg',
        customMetadata: {
          'uploaded_by': userId,
          'timestamp': timestamp,
        },
      };
      
      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      
      console.log('Image uploaded successfully:', downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  static async uploadImages(files: File[], folder: string, userId: string): Promise<string[]> {
    const downloadUrls: string[] = [];
    console.log(`Starting upload of ${files.length} images to ${folder}/${userId}`);
    
    for (let i = 0; i < files.length; i++) {
      try {
        const url = await this.uploadImage(files[i], folder, userId, i + 1);
        downloadUrls.push(url);
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error);
        // Continue with other images
      }
    }
    
    console.log(`Completed upload of ${downloadUrls.length} images`);
    return downloadUrls;
  }

  static async createProduct(productData: Omit<ProductData, 'id' | 'createdAt' | 'createdAtISO' | 'views'>): Promise<string> {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      const now = new Date();
      const timestamp = Timestamp.now();
      const isoString = now.toISOString();

      const finalProductData: ProductData = {
        ...productData,
        userId: user.uid,
        userEmail: user.email || '',
        createdAt: timestamp,
        createdAtISO: isoString,
        views: 0,
      };

      // Remove undefined values
      Object.keys(finalProductData).forEach(key => {
        if (finalProductData[key as keyof ProductData] === undefined) {
          delete finalProductData[key as keyof ProductData];
        }
      });

      console.log('Creating product with data:', finalProductData);
      
      const docRef = await addDoc(collection(db, 'products'), finalProductData);
      
      // Update the document with its ID
      await updateDoc(doc(db, 'products', docRef.id), { id: docRef.id });
      
      console.log('Product created successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
}