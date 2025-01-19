import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../lib/supabase';
import { AddressData } from '../lib/types';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  country: z.string().min(2, 'Country is required')
});

interface AddressFormProps {
  onSubmit: (data: AddressData) => Promise<void>;
}

export const AddressForm = ({ onSubmit }: AddressFormProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddressData>({
    resolver: zodResolver(addressSchema)
  });

  const handleFormSubmit = async (data: AddressData) => {
    try {
      // Save address to Supabase
      const { error } = await supabase
        .from('addresses')
        .insert([data]);

      if (error) throw error;
      
      await onSubmit(data);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            {...register('fullName')}
            className="w-full p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/90"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Address Line 1</label>
          <input
            {...register('addressLine1')}
            className="w-full p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/90"
            placeholder="123 Main St"
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Address Line 2 (Optional)</label>
          <input
            {...register('addressLine2')}
            className="w-full p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/90"
            placeholder="Apt 4B"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">City</label>
            <input
              {...register('city')}
              className="w-full p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/90"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">State</label>
            <input
              {...register('state')}
              className="w-full p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/90"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">ZIP Code</label>
            <input
              {...register('zipCode')}
              className="w-full p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/90"
              placeholder="12345"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Country</label>
            <input
              {...register('country')}
              className="w-full p-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-white/90"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-md"
      >
        {isSubmitting ? 'Saving...' : 'Save Shipping Details'}
      </button>
    </form>
  );
};